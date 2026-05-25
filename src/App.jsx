import { useEffect, useState } from 'react';

const githubUsername = 'bfigueroa99';

const cvSummary = {
  name: 'Benjamin Figueroa Guzman',
  title: 'Ingeniero de Software / Desarrollador Full-stack',
  location: 'Chile',
  email: 'benjamin.figueroa@example.com',
  phone: '+56 9 1234 5678',
  summary:
    'Diseño y desarrollo de aplicaciones web modernas con foco en experiencia de usuario, rendimiento y código mantenible. Experiencia en React, Node.js, APIs REST, y proyectos de código abierto.',
};

const experience = [
  {
    role: 'Desarrollador Full-stack',
    company: 'Proyectos independientes',
    period: '2023 - Presente',
    details: 'Implementación de aplicaciones web para clientes y portafolios con React, Vite y plataformas de despliegue modernas.',
  },
  {
    role: 'Ingeniero de Software',
    company: 'Soluciones Digitales',
    period: '2021 - 2023',
    details: 'Coordinación de equipos ágiles, desarrollo front-end y back-end, y mejoras de rendimiento en sistemas de gestión empresarial.',
  },
];

const education = [
  {
    title: 'Ingeniería en Computación',
    institution: 'Universidad Técnica',
    period: '2017 - 2021',
  },
];

const skills = ['React', 'JavaScript', 'CSS Animations', 'Node.js', 'Git', 'APIs REST'];

const selectorItems = [
  { label: 'Sobre mí', href: '#cv' },
  { label: 'Experiencia', href: '#cv' },
  { label: 'Habilidades', href: '#cv' },
  { label: 'Proyectos', href: '#github' },
  { label: 'Contacto', href: '#github' },
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
            <a href="#cv" className="btn btn-primary">Ver mi CV</a>
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
          <p>Un menú circular inspirado en la selección de armas de GTA.</p>
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

      <section id="cv" className="section cv-section">
        <div className="section-header reveal-on-scroll">
          <span>CV</span>
          <h2>Mi trayectoria profesional</h2>
          <p>Un resumen directo de mi perfil, experiencia, educación y capacidades técnicas.</p>
        </div>

        <div className="about-grid">
          <article className="about-card pulse-card reveal-on-scroll">
            <h3>Perfil profesional</h3>
            <p>{cvSummary.summary}</p>
            <p>
              <strong>Correo:</strong> {cvSummary.email}
              <br />
              <strong>Teléfono:</strong> {cvSummary.phone}
            </p>
          </article>
          <article className="about-card glow-card reveal-on-scroll">
            <h3>Experiencia clave</h3>
            {experience.map((item) => (
              <div key={`${item.company}-${item.role}`} className="cv-item">
                <strong>{item.role}</strong>
                <span>{item.company} · {item.period}</span>
                <p>{item.details}</p>
              </div>
            ))}
          </article>
          <article className="about-card float-card reveal-on-scroll">
            <h3>Educación y habilidades</h3>
            {education.map((item) => (
              <div key={`${item.institution}-${item.title}`} className="cv-item">
                <strong>{item.title}</strong>
                <span>{item.institution} · {item.period}</span>
              </div>
            ))}
            <div className="skills-bubble-grid">
              {skills.map((skill) => (
                <div key={skill} className="skill-bubble">{skill}</div>
              ))}
            </div>
          </article>
        </div>
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
