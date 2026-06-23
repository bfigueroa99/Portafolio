import { useEffect, useRef, useState } from 'react';

const githubUsername = 'bfigueroa99';

const fallbackGithubUser = {
  login: 'bfigueroa99',
  name: 'Benjamin Figueroa Guzman',
  bio: 'Perfil disponible en GitHub.',
  avatar_url: `https://github.com/bfigueroa99.png?size=200`,
  html_url: 'https://github.com/bfigueroa99',
  public_repos: 0,
  followers: 0,
  following: 0,
  created_at: new Date().toISOString(),
  location: '',
  blog: '',
};

const cvSummary = {
  name: 'Benjamin Figueroa Guzman',
  title: 'Ingeniero de Software / Desarrollador Full-stack',
  location: 'Santiago, Chile',
  email: 'bfigueroa@miuandes.cl',
  phone: '+56 9 5682 0650',
  summary:
    'Ingeniero de software con experiencia en desarrollo full-stack, creación de aplicaciones web modernas y soluciones empresariales.',
};

const experience = [
  {
    role: 'Desarrollador Web',
    company: 'Brunell.io',
    period: '2025 — presente',
    details:
      'Desarrollé una plataforma de analítica de video end-to-end con IA, integrando Django para el backend de eventos y YOLO para detección.',
  },
  {
    role: 'Tesista',
    company: 'Media Master',
    period: '2025',
    details:
      'Desarrollo de un juego sobre alfabetización mediática con Django y React. La aplicación permite gestionar y jugar partidas donde se clasifican noticias como reales o falsas.',
  },
  {
    role: 'Práctica Ciberseguridad',
    company: 'Lippinet',
    period: '2024',
    details:
      'Uso de distintas herramientas de ciberseguridad para la protección de datos y estudio de las competencias existentes del rubro.',
  },
];

const education = [
  {
    title: 'Ingeniería en Computación',
    institution: 'Universidad de los Andes',
    period: '2017 — 2021',
  },
  {
    title: 'Inglés Intermedio-Avanzado',
    institution: 'Kaplan UK',
    period: '2026',
  },
  {
    title: 'Inglés Avanzado',
    institution: 'Instituto Chileno Británico',
    period: '2019 — 2024',
  },
];

const skills = [
  'C',
  'C++',
  'Python',
  'Ruby on Rails',
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'PostgreSQL',
  'Docker',
  'Git',
];

const timelineItems = [
  ...experience.map((item) => ({
    title: item.role,
    subtitle: item.company,
    period: item.period,
    details: item.details,
    kind: 'experience',
  })),
  ...education.map((item) => ({
    title: item.title,
    subtitle: item.institution,
    period: item.period,
    details: 'Formación académica relevante.',
    kind: 'education',
  })),
];

const navItems = [
  { label: 'Perfil', href: '#profile', index: '01' },
  { label: 'Trayectoria', href: '#experience', index: '02' },
  { label: 'Stack', href: '#skills', index: '03' },
  { label: 'GitHub', href: '#github', index: '04' },
];

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/*  Hero — escena 3D animada en canvas (grilla en perspectiva + nodos) */
/* ------------------------------------------------------------------ */
function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    // Ajusta el backing store del canvas a su caja de layout. Se llama en cada
    // frame: así se autocorrige ante reflows, carga de fuentes, resize o cambios
    // de devicePixelRatio sin depender de que dispare un evento concreto.
    const fit = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (!cw || !ch) return false;
      width = cw;
      height = ch;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bw = Math.floor(cw * dpr);
      const bh = Math.floor(ch * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };

    fit();
    // ResizeObserver dispara aunque la pestaña no esté visible (a diferencia de
    // requestAnimationFrame): cubre el layout inicial, la carga de fuentes y los
    // cambios de tamaño. El listener de window cubre zoom / devicePixelRatio.
    const resizeObserver = new ResizeObserver(() => fit());
    resizeObserver.observe(canvas);
    window.addEventListener('resize', fit);
    // Las fuentes web cambian la altura del hero al cargar: re-ajusta al terminar.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fit).catch(() => {});
    }

    const onPointer = (e) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener('pointermove', onPointer);

    // Nodos (contenedores) que viajan en profundidad por el "patio"
    const NODE_COUNT = 26;
    const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
      x: (Math.random() - 0.5) * 2, // -1..1 en eje horizontal del suelo
      z: Math.random(), // 0 (lejos) .. 1 (cerca)
      speed: 0.02 + Math.random() * 0.05,
      accent: i % 6 === 0,
    }));

    let raf;
    let t = 0;

    const draw = () => {
      fit();
      if (!width || !height) {
        raf = window.requestAnimationFrame(draw);
        return;
      }
      t += 0.016;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const horizon = height * 0.42;
      const vpx = width * 0.5 + (pointer.x - 0.5) * width * 0.16;
      const groundH = height - horizon;

      // Resplandor del horizonte
      const glow = ctx.createRadialGradient(vpx, horizon, 0, vpx, horizon, width * 0.7);
      glow.addColorStop(0, 'rgba(216, 255, 62, 0.10)');
      glow.addColorStop(0.4, 'rgba(120, 150, 90, 0.04)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Mapea profundidad z (0 lejos -> 1 cerca) a una coordenada Y en pantalla
      const yAt = (z) => horizon + groundH * (z * z * 0.92 + 0.02);

      // Líneas horizontales (avanzan hacia el espectador)
      const ROWS = 18;
      for (let i = 0; i < ROWS; i++) {
        let z = ((i / ROWS) + (reduced ? 0 : t * 0.06)) % 1;
        const y = yAt(z);
        const alpha = 0.04 + z * 0.16;
        ctx.strokeStyle = `rgba(220, 224, 232, ${alpha})`;
        ctx.lineWidth = 0.5 + z * 0.8;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Líneas que convergen al punto de fuga
      const COLS = 26;
      for (let i = 0; i <= COLS; i++) {
        const f = i / COLS;
        const xBottom = (f - 0.5) * width * 2.6 + width * 0.5;
        const grad = ctx.createLinearGradient(vpx, horizon, xBottom, height);
        grad.addColorStop(0, 'rgba(220, 224, 232, 0)');
        grad.addColorStop(1, 'rgba(220, 224, 232, 0.10)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(vpx, horizon);
        ctx.lineTo(xBottom, height);
        ctx.stroke();
      }

      // Nodos viajando por el suelo
      nodes.forEach((n) => {
        if (!reduced) {
          n.z += n.speed * 0.016;
          if (n.z > 1) {
            n.z = 0;
            n.x = (Math.random() - 0.5) * 2;
          }
        }
        const y = yAt(n.z);
        const spread = (y - horizon) / groundH; // 0 en horizonte, 1 abajo
        const x = vpx + n.x * width * 0.85 * spread;
        const size = 1 + spread * (n.accent ? 6 : 4);
        const alpha = 0.1 + spread * 0.7;
        if (n.accent) {
          ctx.fillStyle = `rgba(216, 255, 62, ${alpha})`;
          ctx.shadowColor = 'rgba(216, 255, 62, 0.8)';
          ctx.shadowBlur = 14 * spread;
        } else {
          ctx.fillStyle = `rgba(235, 238, 245, ${alpha})`;
          ctx.shadowColor = 'rgba(180, 200, 220, 0.5)';
          ctx.shadowBlur = 8 * spread;
        }
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Partículas de atmósfera sobre el horizonte
      const STARS = 40;
      for (let i = 0; i < STARS; i++) {
        const sx = (Math.sin(i * 12.9898) * 43758.5453) % 1;
        const sy = (Math.sin(i * 78.233) * 12543.123) % 1;
        const px = (Math.abs(sx) * width + (pointer.x - 0.5) * 30 * (i % 5)) % width;
        const py = Math.abs(sy) * horizon * 0.92;
        const tw = 0.2 + 0.3 * Math.abs(Math.sin(t * 0.8 + i));
        ctx.fillStyle = `rgba(210, 220, 235, ${reduced ? 0.25 : tw})`;
        ctx.fillRect(px, py, 1.2, 1.2);
      }

      raf = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener('resize', fit);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  Cursor personalizado (solo punteros finos)                         */
/* ------------------------------------------------------------------ */
function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) {
      return undefined;
    }
    const ring = ringRef.current;
    const dot = dotRef.current;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dot.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    };
    const isInteractive = (el) =>
      el && el.closest && el.closest('a, button, [data-cursor]');
    const onOver = (e) => {
      if (isInteractive(e.target)) ring.classList.add('cursor-active');
    };
    const onOut = (e) => {
      if (isInteractive(e.target)) ring.classList.remove('cursor-active');
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      raf = window.requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerover', onOver);
    window.addEventListener('pointerout', onOut);
    document.body.classList.add('has-custom-cursor');

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerout', onOut);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

function App() {
  const [githubUser, setGithubUser] = useState(null);
  const [githubRepos, setGithubRepos] = useState([]);
  const [githubError, setGithubError] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const heroInnerRef = useRef(null);
  const progressRef = useRef(null);

  // GitHub
  useEffect(() => {
    async function fetchGithub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`),
          fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=8`),
        ]);

        if (!userRes.ok) {
          const message =
            userRes.status === 403
              ? 'Límite de la API de GitHub alcanzado. Se muestran datos básicos sin repositorios.'
              : `No se pudo cargar el perfil de GitHub (${userRes.status})`;
          throw new Error(message);
        }

        const userData = await userRes.json();
        setGithubUser(userData);

        if (reposRes.ok) {
          const repoData = await reposRes.json();
          setGithubRepos(repoData);
        } else if (reposRes.status === 403) {
          throw new Error('Límite de la API de GitHub alcanzado. No se cargaron repositorios.');
        } else {
          throw new Error(`No se pudieron cargar los repositorios (${reposRes.status})`);
        }
      } catch (error) {
        setGithubError(error.message);
        setGithubUser(fallbackGithubUser);
        setGithubRepos([]);
      }
    }

    fetchGithub();
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]:not(.in)');
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [githubUser, githubRepos]);

  // Scroll: parallax del hero, barra de progreso y estado de la nav
  useEffect(() => {
    let raf;
    const reduced = prefersReducedMotion();
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        }
        if (heroInnerRef.current && !reduced) {
          const f = Math.min(y / window.innerHeight, 1);
          heroInnerRef.current.style.transform = `translateY(${y * 0.18}px)`;
          heroInnerRef.current.style.opacity = `${1 - f * 0.85}`;
        }
        setScrolled(y > 40);
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="app">
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <CustomCursor />

      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <header className={`nav ${scrolled ? 'nav-solid' : ''}`}>
        <a href="#top" className="nav-brand" data-cursor>
          <span className="nav-mark">B</span>
          <span className="nav-name">Benjamin Figueroa</span>
        </a>
        <nav className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} data-cursor>
              <span className="nav-index">{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href={`mailto:${cvSummary.email}`} data-cursor>
          Contacto
        </a>
      </header>

      <section id="top" className="hero">
        <HeroCanvas />
        <div className="hero-fade" aria-hidden="true" />

        <div className="hero-inner" ref={heroInnerRef}>
          <span className="hero-eyebrow">
            <span className="pulse-dot" /> Disponible para proyectos · {cvSummary.location}
          </span>

          <h1 className="hero-title">
            <span className="line">Benjamin</span>
            <span className="line outline">Figueroa</span>
          </h1>

          <div className="hero-meta">
            <p className="hero-role">{cvSummary.title}</p>
            <p className="hero-summary">{cvSummary.summary}</p>
          </div>

          <div className="hero-actions">
            <a href="#experience" className="btn btn-primary" data-cursor>
              Explorar trayectoria
              <span className="btn-arrow">↓</span>
            </a>
            <a
              href="https://github.com/bfigueroa99"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              data-cursor
            >
              Ver GitHub
            </a>
          </div>
        </div>

        <div className="hero-hud" aria-hidden="true">
          <div className="hud-item">
            <span className="hud-label">Rol</span>
            <span className="hud-value">Full-stack Engineer</span>
          </div>
          <div className="hud-item">
            <span className="hud-label">Base</span>
            <span className="hud-value">Santiago · CL</span>
          </div>
          <div className="hud-item">
            <span className="hud-label">Stack</span>
            <span className="hud-value">{skills.length}+ tecnologías</span>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>scroll</span>
          <span className="scroll-line" />
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...skills, ...skills, ...skills].map((skill, i) => (
            <span key={`${skill}-${i}`} className="marquee-item">
              {skill}
              <span className="marquee-sep">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* 01 — Perfil */}
      <section id="profile" className="section">
        <div className="section-grid">
          <div className="section-head" data-reveal>
            <span className="section-index">01</span>
            <h2 className="section-title">Sobre mí</h2>
          </div>
          <div className="section-body">
            <p className="lead" data-reveal>
              {cvSummary.summary} Construyo productos web de extremo a extremo, desde la
              arquitectura del backend hasta interfaces cuidadas y rápidas.
            </p>

            <div className="contact-grid" data-reveal>
              <a className="contact-card" href={`mailto:${cvSummary.email}`} data-cursor>
                <span className="contact-label">Email</span>
                <span className="contact-value">{cvSummary.email}</span>
              </a>
              <a className="contact-card" href={`tel:${cvSummary.phone.replace(/\s/g, '')}`} data-cursor>
                <span className="contact-label">Teléfono</span>
                <span className="contact-value">{cvSummary.phone}</span>
              </a>
              <div className="contact-card">
                <span className="contact-label">Ubicación</span>
                <span className="contact-value">{cvSummary.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Trayectoria */}
      <section id="experience" className="section">
        <div className="section-grid">
          <div className="section-head" data-reveal>
            <span className="section-index">02</span>
            <h2 className="section-title">Trayectoria</h2>
            <p className="section-sub">Experiencia profesional y formación académica.</p>
          </div>
          <div className="section-body">
            <ul className="timeline">
              {timelineItems.map((item, i) => (
                <li
                  key={`${item.subtitle}-${item.title}`}
                  className="timeline-row"
                  data-reveal
                  style={{ '--i': i }}
                >
                  <div className="timeline-period">
                    <span className={`timeline-kind ${item.kind}`}>
                      {item.kind === 'education' ? 'Educación' : 'Experiencia'}
                    </span>
                    <span className="timeline-date">{item.period}</span>
                  </div>
                  <div className="timeline-main">
                    <h3>{item.title}</h3>
                    <span className="timeline-org">{item.subtitle}</span>
                    <p>{item.details}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03 — Stack */}
      <section id="skills" className="section">
        <div className="section-grid">
          <div className="section-head" data-reveal>
            <span className="section-index">03</span>
            <h2 className="section-title">Stack técnico</h2>
            <p className="section-sub">Tecnologías y herramientas de uso habitual.</p>
          </div>
          <div className="section-body">
            <div className="skills-grid">
              {skills.map((skill, i) => (
                <div
                  key={skill}
                  className="skill-chip"
                  data-reveal
                  data-cursor
                  style={{ '--i': i }}
                >
                  <span className="skill-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — GitHub */}
      <section id="github" className="section">
        <div className="section-grid">
          <div className="section-head" data-reveal>
            <span className="section-index">04</span>
            <h2 className="section-title">GitHub</h2>
            <p className="section-sub">
              Perfil y repositorios actualizados automáticamente desde la API.
            </p>
          </div>
          <div className="section-body">
            {githubUser ? (
              <>
                {githubError && <div className="notice">{githubError}</div>}

                <div className="gh-profile" data-reveal>
                  <div
                    className="gh-avatar"
                    style={{ backgroundImage: `url(${githubUser.avatar_url})` }}
                  />
                  <div className="gh-profile-body">
                    <div className="gh-profile-top">
                      <div>
                        <a
                          className="gh-name"
                          href={githubUser.html_url}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor
                        >
                          {githubUser.name || githubUser.login}
                        </a>
                        <span className="gh-handle">@{githubUser.login}</span>
                      </div>
                      <a
                        className="btn btn-ghost btn-sm"
                        href={githubUser.html_url}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor
                      >
                        Ver perfil
                      </a>
                    </div>
                    <p className="gh-bio">
                      {githubUser.bio ||
                        'Ingeniero de software enfocado en proyectos públicos y código abierto.'}
                    </p>
                    <div className="gh-metrics">
                      <div>
                        <strong>{githubUser.public_repos}</strong>
                        <span>Repositorios</span>
                      </div>
                      <div>
                        <strong>{githubUser.followers}</strong>
                        <span>Seguidores</span>
                      </div>
                      <div>
                        <strong>{githubUser.following}</strong>
                        <span>Siguiendo</span>
                      </div>
                      <div>
                        <strong>{formatDate(githubUser.created_at).split(' ').pop()}</strong>
                        <span>Miembro desde</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="repo-grid">
                  {githubRepos.length > 0 ? (
                    githubRepos.map((repo, i) => (
                      <a
                        key={repo.id}
                        className="repo-card"
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        data-reveal
                        data-cursor
                        style={{ '--i': i }}
                      >
                        <div className="repo-top">
                          <span className="repo-dot" />
                          <h3>{repo.name}</h3>
                        </div>
                        <p>{repo.description || 'Proyecto público en GitHub.'}</p>
                        <div className="repo-foot">
                          <span className="repo-lang">{repo.language || 'General'}</span>
                          <span className="repo-stat">★ {repo.stargazers_count}</span>
                          <span className="repo-stat">⑂ {repo.forks_count}</span>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p className="muted">No se encontraron repositorios públicos.</p>
                  )}
                </div>
              </>
            ) : (
              <p className="muted">Cargando información de GitHub…</p>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner" data-reveal>
          <span className="footer-eyebrow">¿Trabajamos juntos?</span>
          <a className="footer-cta" href={`mailto:${cvSummary.email}`} data-cursor>
            Conversemos
            <span className="btn-arrow">→</span>
          </a>
          <div className="footer-links">
            <a href={`mailto:${cvSummary.email}`} data-cursor>{cvSummary.email}</a>
            <a href="https://github.com/bfigueroa99" target="_blank" rel="noreferrer" data-cursor>
              github.com/bfigueroa99
            </a>
          </div>
          <p className="footer-note">
            © {new Date().getFullYear()} Benjamin Figueroa Guzman · Santiago, Chile
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
