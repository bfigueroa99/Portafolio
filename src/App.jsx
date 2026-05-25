import { useEffect, useState } from 'react';

const githubUsername = 'bfigueroa99';

const cvSummary = {
  name: 'Benjamin Figueroa Guzman',
  title: 'Ingeniero de Software / Desarrollador Full-stack',
  location: 'Santiago, Chile',
  email: 'bfigueroag99@gmail.com',
  phone: '+56 9 5682 0650',
  summary:
    'Ingeniero de software con experiencia en desarrollo full-stack, creación de aplicaciones web modernas y soluciones empresariales.',
};

const experience = [
  {
    role: 'Ingeniero de Software',
    company: 'Brunell.io',
    period: '2025 - presente',
    details: '.',
  },
  {
    role: 'Tesista',
    company: 'Media Master',
    period: '2025',
    details: '.',
  },
  {
    role: 'Desarrollador',
    company: 'Lippinet',
    period: '2024',
    details: '.',
  },
];

const education = [
  {
    title: 'Ingeniería en Computación',
    institution: 'Universidad de los Andes',
    period: '2017 - 2021',
  },
  {
    title: 'Ingles Intermedio-Avanzado',
    institution: 'Kaplan UK',
    period: '2026',
  },
  {
    title: 'Inglés Avanzado',
    institution: 'Instituto Chileno Británico',
    period: '2019 - 2024',
  }
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

const selectorItems = [
  { label: 'Sobre mí', href: '#profile' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Educación', href: '#experience' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Proyectos', href: '#github' },
];

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

function App() {
  const [githubUser, setGithubUser] = useState(null);
  const [githubRepos, setGithubRepos] = useState([]);
  const [githubError, setGithubError] = useState(null);
  const [timelineShift, setTimelineShift] = useState(0);

  useEffect(() => {
    let frameId;
    let lastTime;

    const animate = (time) => {
      if (lastTime !== undefined) {
        const delta = time - lastTime;
        setTimelineShift((current) => {
          const next = current + delta * 0.004;
          return next >= 100 ? next - 100 : next;
        });
      }
      lastTime = time;
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    async function fetchGithub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`),
          fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=8`),
        ]);

        if (!userRes.ok) {
          throw new Error(`No se pudo cargar el perfil de GitHub (${userRes.status})`);
        }
        if (!reposRes.ok) {
          throw new Error(`No se pudieron cargar los repositorios (${reposRes.status})`);
        }

        const userData = await userRes.json();
        const repoData = await reposRes.json();

        setGithubUser(userData);
        setGithubRepos(repoData);
      } catch (error) {
        setGithubError(error.message);
      }
    }

    fetchGithub();
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.visible)');
    if (revealElements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [githubUser, githubRepos]);

  const pathNodes = Array.from({ length: 48 }, (_, idx) => {
    const xRatio = idx / 47;
    const sinAtPoint = Math.sqrt(Math.max(0, 1 - Math.pow(1 - 2 * xRatio, 2)));
    return {
      left: 5 + 90 * xRatio,
      top: 18 + 40 * (1 - sinAtPoint),
      opacity: 0.2 + 0.45 * Math.sin(Math.PI * xRatio),
      delay: idx * 0.04,
    };
  });

  return (
    <div className="app-shell">
      <div className="orbit-background" aria-hidden="true">
        <span className="orbit-dot orbit-dot-1" />
        <span className="orbit-dot orbit-dot-2" />
        <span className="orbit-dot orbit-dot-3" />
      </div>

      <section className="hero-section">
        <div className="hero-copy reveal-on-scroll">
          <span className="hero-label">Currículum interactivo</span>
          <h1>{cvSummary.name}</h1>
          <p>{cvSummary.summary}</p>
          <div className="hero-buttons reveal-on-scroll">
            <a href="#profile" className="btn btn-primary">Ver mi CV</a>
            <a href="#github" className="btn btn-secondary">Ver GitHub</a>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <strong>{cvSummary.title}</strong>
              <span>Experiencia profesional comprobada en aplicaciones web.</span>
            </div>
            <div className="stat-card">
              <strong>{cvSummary.location}</strong>
              <span>Ubicación actual para trabajos remotos y colaboraciones.</span>
            </div>
            <div className="stat-card">
              <strong>{skills.length} habilidades</strong>
              <span>Herramientas modernas para proyectos front-end y full-stack.</span>
            </div>
          </div>
        </div>

        <div className="hero-visual reveal-on-scroll" aria-hidden="true">
          <span className="floating-orbit one" />
          <span className="floating-orbit two" />
          <span className="floating-orbit three" />
          <div className="orbit-board">
            <div className="orbit-ring ring-1" />
            <div className="orbit-ring ring-2" />
            <div className="orbit-ring ring-3" />
            <div className="orbit-center">
              <div className="orbit-core" />
            </div>
          </div>
        </div>
      </section>

      <section className="section selector-section reveal-on-scroll">
        <div className="section-header">
          <span>Índice</span>
          <h2>Selección rápida</h2>
          <p>Un menú circular.</p>
        </div>

        <div className="gta-wheel">
          <div className="gta-wheel-ring" />
          <div className="gta-wheel-center">
            <span>Índice</span>
          </div>
          {selectorItems.map((item, index) => {
            const angle = (360 / selectorItems.length) * index;
            return (
              <div
                key={item.label}
                className={`gta-wheel-item ${index === 0 ? 'active' : ''}`}
                style={{ '--angle': `${angle}deg` }}
              >
                <a href={item.href}>
                  <span className="gta-selector-index">{index + 1}</span>
                  <strong>{item.label}</strong>
                </a>
              </div>
            );
          })}
        </div>
      </section>

      <section id="profile" className="section profile-section reveal-on-scroll">
        <div className="section-header reveal-on-scroll">
          <span>Perfil</span>
          <h2>Sobre mí</h2>
          <p>Esta sección presenta mi perfil profesional y datos de contacto.</p>
        </div>

        <article className="about-card pulse-card reveal-on-scroll">
          <h3>Perfil profesional</h3>
          <p>{cvSummary.summary}</p>
          <p>
            <strong>Correo:</strong> {cvSummary.email}
            <br />
            <strong>Teléfono:</strong> {cvSummary.phone}
          </p>
        </article>
      </section>

      <section id="experience" className="section experience-section reveal-on-scroll">
        <div className="section-header reveal-on-scroll">
          <span>Experiencia</span>
          <h2>Mi experiencia clave</h2>
          <p>Trayectoria profesional en roles de ingeniería y desarrollo full-stack, junto con mi formación académica.</p>
        </div>

        <article className="about-card glow-card reveal-on-scroll">
          <div className="experience-timeline">
            {pathNodes.map((node, idx) => (
              <span
                key={`path-node-${idx}`}
                className="timeline-path-node"
                aria-hidden="true"
                style={{
                  left: `${node.left}%`,
                  top: `${node.top}%`,
                  opacity: node.opacity,
                  animationDelay: `${node.delay}s`,
                }}
              />
            ))}
            {timelineItems.map((item, index) => {
              const baseRatio = (index + 0.5) / timelineItems.length;
              const rawRatio = (baseRatio + timelineShift / 100) % 1;
              const left = 5 + 90 * rawRatio;
              const sinAtPoint = Math.sqrt(Math.max(0, 1 - Math.pow(1 - 2 * rawRatio, 2)));
              const top = 18 + 40 * (1 - sinAtPoint);
              return (
                <div
                  key={`${item.subtitle}-${item.title}`}
                  className="timeline-point"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <span className={`timeline-marker ${item.kind === 'education' ? 'education-marker' : ''}`} />
                  <div className={`timeline-card ${item.kind === 'education' ? 'timeline-card-education' : ''}`}>
                    <strong>{item.title}</strong>
                    <span>{item.subtitle} · {item.period}</span>
                    <p>{item.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section id="skills" className="section skills-section reveal-on-scroll">
        <div className="section-header reveal-on-scroll">
          <span>Habilidades</span>
          <h2>Habilidades técnicas</h2>
          <p>Tecnologías y herramientas con las que trabajo habitualmente.</p>
        </div>

        <article className="about-card reveal-on-scroll">
          <div className="skills-bubble-grid">
            {skills.map((skill) => (
              <div key={skill} className="skill-bubble">{skill}</div>
            ))}
          </div>
        </article>
      </section>

      <section id="github" className="section github-section">
        <div className="section-header">
          <span>GitHub</span>
          <h2>Resumen público de perfil y proyectos</h2>
          <p>Una vista limpia y profesional de mi cuenta GitHub, con métricas clave y repositorios actualizados automáticamente.</p>
        </div>

        {githubError ? (
          <div className="github-error">Error cargando GitHub: {githubError}</div>
        ) : githubUser ? (
          <>
            <div className="github-summary-grid reveal-on-scroll">
              <div className="github-profile-card reveal-on-scroll">
                <div className="github-avatar" style={{ backgroundImage: `url(${githubUser.avatar_url})` }} />
                <div className="github-profile-content">
                  <div className="github-profile-title">
                    <div>
                      <a href={githubUser.html_url} target="_blank" rel="noreferrer">{githubUser.name || githubUser.login}</a>
                      <span>@{githubUser.login}</span>
                    </div>
                    <a className="btn btn-secondary github-button" href={githubUser.html_url} target="_blank" rel="noreferrer">Ver perfil</a>
                  </div>
                  <p>{githubUser.bio || 'Ingeniero de software especializado en proyectos públicos y código abierto.'}</p>
                  <div className="github-metrics">
                    <div>
                      <strong>{githubUser.public_repos}</strong>
                      <span>Repositorios públicos</span>
                    </div>
                    <div>
                      <strong>{githubUser.followers}</strong>
                      <span>Seguidores</span>
                    </div>
                    <div>
                      <strong>{githubUser.following}</strong>
                      <span>Siguiendo</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="github-highlight-panel">
                <div className="github-highlight-card reveal-on-scroll">
                  <span className="stat-label">Miembro desde</span>
                  <strong>{formatDate(githubUser.created_at)}</strong>
                  <p>Perfil GitHub activo y consolidado con contribuciones públicas.</p>
                </div>
                <div className="github-highlight-card reveal-on-scroll">
                  <span className="stat-label">Ubicación</span>
                  <strong>{githubUser.location || 'Información pública limitada'}</strong>
                  <p>Localización visible en GitHub para contexto profesional.</p>
                </div>
                <div className="github-highlight-card reveal-on-scroll">
                  <span className="stat-label">Sitio web</span>
                  <strong>{githubUser.blog || 'No definido'}</strong>
                  <p>Enlace directo a tu presencia online o portafolio profesional.</p>
                </div>
              </div>
            </div>

            <div className="repo-grid reveal-on-scroll">
              {githubRepos.length > 0 ? (
                githubRepos.map((repo) => (
                  <article key={repo.id} className="repo-card reveal-on-scroll">
                    <div className="repo-card-top">
                      <h3>
                        <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                      </h3>
                      <span className="repo-language">{repo.language || 'General'}</span>
                    </div>
                    <p>{repo.description || 'Proyecto público en GitHub.'}</p>
                    <div className="repo-meta">
                      <span className="repo-pill">Última actualización: {formatDate(repo.updated_at)}</span>
                      <span className="repo-pill">{repo.private ? 'Privado' : 'Público'}</span>
                    </div>
                    <div className="repo-stats">
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>🍴 {repo.forks_count}</span>
                    </div>
                  </article>
                ))
              ) : (
                <p className="muted">No se encontraron repositorios públicos.</p>
              )}
            </div>
          </>
        ) : (
          <p>Cargando información de GitHub...</p>
        )}
      </section>

      <footer className="footer">
        <p>Benjamin Figueroa Guzman — Perfil público de GitHub</p>
      </footer>
    </div>
  );
}

export default App;
