/**
 * 自动采集 GitHub 项目 → src/data/projects.json
 *
 * 数据源:api.github.com/users/AlienMu/repos(公开仓库)
 * 与 content/curation.json 合并:精选顺序、双语文案、accent、截图等。
 * projects.json 生成后提交进 git,本地 dev/build 不依赖网络;CI 构建前必刷新。
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const USER = 'AlienMu';
const OUT_FILE = path.join(ROOT, 'src/data/projects.json');
const CURATION_FILE = path.join(ROOT, 'content/curation.json');
const DEFAULT_SEAL = '#BE3B2A';

async function fetchAllRepos() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const repos = [];
  let url = `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`;
  while (url) {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    }
    repos.push(...(await res.json()));
    const link = res.headers.get('link') ?? '';
    const next = link.match(/<([^>]+)>;\s*rel="next"/);
    url = next ? next[1] : null;
  }
  return repos;
}

function mergeProject(repo, curated) {
  return {
    name: repo.name,
    order: curated?.order ?? Number.MAX_SAFE_INTEGER,
    featured: curated?.featured ?? false,
    title: {
      zh: curated?.title?.zh ?? null,
      en: curated?.title?.en ?? repo.name,
    },
    description: {
      zh: curated?.description?.zh ?? null,
      en: curated?.description?.en ?? repo.description ?? null,
    },
    htmlUrl: repo.html_url,
    homepage: repo.homepage || null,
    language: repo.language ?? null,
    stars: repo.stargazers_count ?? 0,
    topics: curated?.tags?.length ? curated.tags : (repo.topics ?? []),
    pushedAt: repo.pushed_at,
    accent: curated?.accent ?? DEFAULT_SEAL,
    screenshot: curated?.screenshot ?? null,
    links: curated?.links ?? {},
  };
}

async function main() {
  const curation = JSON.parse(await readFile(CURATION_FILE, 'utf8'));
  const excluded = new Set(curation.exclude ?? []);
  const curatedNames = new Set(Object.keys(curation.repos ?? {}));

  const all = await fetchAllRepos();
  const byName = new Map(all.map((r) => [r.name, r]));

  for (const name of curatedNames) {
    if (!byName.has(name)) {
      console.warn(`warn: curation entry "${name}" not found on GitHub — skipped`);
    }
  }

  const eligible = all.filter(
    (r) => !r.fork && !r.archived && !excluded.has(r.name),
  );

  const curatedProjects = eligible
    .filter((r) => curatedNames.has(r.name))
    .map((r) => mergeProject(r, curation.repos[r.name]));

  const unlisted = curation.includeUnlisted
    ? eligible
        .filter((r) => !curatedNames.has(r.name))
        .sort((a, b) => (a.pushed_at < b.pushed_at ? 1 : -1))
        .map((r) => mergeProject(r, null))
    : [];

  const projects = [...curatedProjects.sort((a, b) => a.order - b.order), ...unlisted];

  const names = new Set();
  for (const p of projects) {
    if (names.has(p.name)) {
      throw new Error(`duplicate project name "${p.name}" — sceneId/zoneId 会冲突`);
    }
    names.add(p.name);
  }
  if (projects.length === 0) {
    throw new Error('no projects survived filtering — 不部署空作品集');
  }

  const data = { generatedAt: new Date().toISOString(), projects };
  await writeFile(OUT_FILE, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`ok: ${projects.length} projects → ${path.relative(ROOT, OUT_FILE)}`);
  for (const p of projects) {
    console.log(`  ${String(p.order === Number.MAX_SAFE_INTEGER ? '-' : p.order).padStart(2)}  ${p.name}`);
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
