import { CineView, Scene } from 'cineview';
import type { CineViewErrorDetail } from 'cineview';
import { LanguageToggle } from '@/components/LanguageToggle';
import { HeroScene } from '@/scenes/HeroScene';
import { FilmographyScene } from '@/scenes/FilmographyScene';
import { SiteScene } from '@/scenes/SiteScene';
import { ContactScene } from '@/scenes/ContactScene';
import { useDesignSize } from '@/hooks/useDesignSize';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import projectsData from '@/data/projects.json';
import { ProjectsData } from '@/data/types';

const { projects } = projectsData as ProjectsData;

function handleError(detail: CineViewErrorDetail) {
  // FIRST_SCENE_TIMEOUT 等可恢复错误走框架默认静态回退,只记录不接管
  console.error(`[cineview] ${detail.code}: ${detail.message}`, detail.context ?? '');
}

export default function App() {
  const { size, variant } = useDesignSize();
  const reduced = useReducedMotion();

  return (
    <>
      <LanguageToggle />
      <CineView
        key={variant} // 跨断点重挂载换设计尺(1440/750)
        mode="scroll"
        config={{ size }}
        modes={{ scroll: { direction: 'y', sceneSizing: 'content' } }}
        scrollbar={{
          enabled: true,
          width: 8,
          autoHide: true,
          thumbColor: '#be3b2a',
          trackColor: 'rgba(31, 29, 26, 0.08)',
        }}
        callbacks={{ onError: handleError }}
      >
        <Scene sceneId="hero" layout={{ width: '100%', height: '100vh' }}>
          <HeroScene variant={variant} reduced={reduced} />
        </Scene>

        {/* 滚动截流只给作品列表:逐行展开演完才放行 */}
        <Scene
          sceneId="works"
          layout={{ width: '100%', height: '100vh' }}
          scroll={{ zoneId: 'works-zone', trigger: 'center-lock' }}
        >
          <FilmographyScene projects={projects} variant={variant} reduced={reduced} />
        </Scene>

        <Scene sceneId="site" layout={{ width: '100%', height: '100vh' }}>
          <SiteScene variant={variant} reduced={reduced} />
        </Scene>

        <Scene sceneId="contact" layout={{ width: '100%', height: '100vh' }}>
          <ContactScene variant={variant} reduced={reduced} />
        </Scene>
      </CineView>
    </>
  );
}
