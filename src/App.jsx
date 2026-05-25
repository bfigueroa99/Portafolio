import { useEffect, useState } from 'react';

const skillList = [
  'C',
  'C++',
  'Python',
  'Ruby on Rails',
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Django',
  'PostgreSQL',
  'Docker',
  'Git',
];

const experienceList = [
  {
    id: 'experience-1',
    title: 'Desarrollador Web',
    company: 'Brunell.io',
    period: '2025 - Presente',
    description:
      'Plataforma de analítica de video end-to-end con IA, integrando Django para backend de eventos, YOLO para detección en vivo y panel de reportes dinámicos.',
  },
  {
    id: 'experience-2',
    title: 'Tesis: Media Master',
    company: 'Media Master',
    period: '2025',
    description:
      'Juego de alfabetización mediática con Django y React. Usuarios gestionan y clasifican noticias como reales o falsas, con interacción envolvente y lógica educativa.',
  },
  {
    id: 'experience-3',
    title: 'Práctica de Ciberseguridad',
    company: 'Lippinet',
    period: '2024',
    description:
      'Uso de herramientas de ciberseguridad para protección de datos y análisis de distintas competencias en seguridad informática.',
  },
];

const educationList = [
  {
    id: 'education-1',
    program: 'Inglés nivel B2',
    institution: 'Kaplan, UK',
    period: '2025 - 2026',
  },
  {
    id: 'education-2',
    program: 'Ingeniería Civil en Ciencias de la Computación',
    institution: 'Universidad de los Andes',
    period: '2019 - 2025',
  },
  {
    id: 'education-3',
    program: 'Curso de Inglés',
    institution: 'Instituto Chileno Británico',
    period: '2020 - 2025',
  },
];

const projectCards = [
  {
    id: 'project-1',
    title: 'Plataforma IA para video',
    description:
      'Sistema integral con detección en vivo, analítica de video y reportes interactivos para decisiones basadas en datos.',
    tags: ['React', 'Django', 'YOLO'],
  },
  {
    id: 'project-2',
    title: 'Juego Media Master',
    description:
      'Aplicación educativa que enseña a clasificar noticias reales y falsas con una experiencia gamificada.',
    tags: ['React', 'Django', 'UX'],
  },
  {
    id: 'project-3',
    title: 'Proyectos web empresariales',
    description:
      'Desarrollo full-stack con enfoque en rendimiento, seguridad y experiencia de usuario fluida.',
    tags: ['Node.js', 'PostgreSQL', 'Docker'],
  },
];

const navLinks = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#portfolio', label: 'Portafolio' },
  { href: '#contact', label: 'Contacto' },
];

function App() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const sections = document.querySelectorAll('.section-fade');
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleIds = [];
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleIds.push(entry.target.id);
          }
        });
        if (visibleIds.length) {
          setVisible((current) => Array.from(new Set([...current, ...visibleIds])));
        }
      },
      { threshold: 0.25 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-shell">
      <div className="stars-layer" />
      <div className="stars-layer layer2" />
      <div className="stars-layer layer3" />

      <nav className="topbar">
        <div className="brand">Benjamin Figueroa</div>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-copy">
          <span className="hero-label">Ingeniero de Software • Portafolio Profesional</span>
          <h1>
            Construyo soluciones web con impacto, precisión y estilo.<br />
            <span className="glow-text">React</span> + <span className="glow-text">Django</span> + <span className="glow-text">IA</span>
          </h1>
          <p>
            Soy Benjamin Figueroa Guzman, ingeniero civil en computación con foco en productos digitales
            escalables, experiencias interactivas y desarrollo seguro.
          </p>
          <div className="hero-buttons">
            <a href="#portfolio" className="btn btn-primary">Ver proyectos</a>
            <a href="#contact" className="btn btn-secondary">Agendar reunión</a>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <strong>3+</strong>
              <span>Años de experiencia</span>
            </div>
            <div className="stat-card">
              <strong>10+</strong>
              <span>Proyectos reales</span>
            </div>
            <div className="stat-card">
              <strong>B2</strong>
              <span>Inglés profesional</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="avatar-card">
            <div className="avatar-glow" />
            <div className="avatar-badge">Santiago, Chile</div>
            <div className="avatar-content">
              <div className="avatar-circle">👨‍💻</div>
              <h2>Benjamin</h2>
              <p>
                Desarrollo soluciones web con enfoque en analítica, seguridad y experiencia de usuario.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className={`section section-fade ${visible.includes('about') ? 'visible' : ''}`}>
        <div className="section-header">
          <span>Sobre mí</span>
          <h2>Un enfoque estructurado para proyectos digitales profesionales</h2>
        </div>
        <div className="about-grid">
          <div className="about-card pulse-card">
            <h3>Visión estratégica</h3>
            <p>
              Desarrollar productos digitales que cumplan objetivos reales, con un diseño claro,
              rendimiento estable y una experiencia memorable.
            </p>
          </div>
          <div className="about-card glow-card">
            <h3>Metodología</h3>
            <p>
              Trabajo con entregas iterativas, validación temprana y tecnología madura para soluciones confiables.
            </p>
          </div>
          <div className="about-card float-card">
            <h3>Resultados</h3>
            <p>
              Plataformas web escalables, dashboards de analítica y aplicaciones educativas con impacto en usuarios.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className={`section section-fade ${visible.includes('skills') ? 'visible' : ''}`}>
        <div className="section-header">
          <span>Habilidades</span>
          <h2>Stack tecnológico principal</h2>
        </div>
        <div className="skills-bubble-grid">
          {skillList.map((skill) => (
            <div key={skill} className="skill-bubble">
              {skill}
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className={`section section-fade ${visible.includes('experience') ? 'visible' : ''}`}>
        <div className="section-header">
          <span>Experiencia</span>
          <h2>Impacto laboral reciente</h2>
        </div>
        <div className="portfolio-grid">
          {experienceList.map((experience, index) => (
            <article key={experience.id} className={`project-card card-${index + 1}`}>
              <div className="project-tag">{experience.period}</div>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
              <div className="project-tags">
                <span>{experience.company}</span>
              </div>
              <a href="#contact" className="card-link">Conectar</a>
            </article>
          ))}
        </div>
      </section>

      <section id="portfolio" className={`section section-fade ${visible.includes('portfolio') ? 'visible' : ''}`}>
        <div className="section-header">
          <span>Portafolio</span>
          <h2>Proyectos destacados</h2>
        </div>
        <div className="portfolio-grid">
          {projectCards.map((project, index) => (
            <article key={project.id} className={`project-card card-${index + 1}`}>
              <div className="project-tag">Proyecto {index + 1}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a href="#contact" className="card-link">Ver detalles</a>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className={`section section-fade ${visible.includes('education') ? 'visible' : ''}`}>
        <div className="section-header">
          <span>Educación</span>
          <h2>Formación académica y certificaciones</h2>
        </div>
        <div className="about-grid">
          {educationList.map((item) => (
            <div key={item.id} className="about-card glow-card">
              <h3>{item.program}</h3>
              <p>{item.institution}</p>
              <p style={{ marginTop: '0.75rem', color: 'rgba(248, 248, 255, 0.72)' }}>
                {item.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className={`section section-fade ${visible.includes('contact') ? 'visible' : ''}`}>
        <div className="wave-background" />
        <div className="section-header">
          <span>Contacto</span>
          <h2>Vamos a crear algo épico</h2>
        </div>
        <div className="contact-card slide-up-card">
          <p>
            Estoy disponible para proyectos web, soluciones con IA, juegos educativos y desafíos de seguridad.
            Conectemos y transformemos tu idea en una experiencia real.
          </p>
          <a href="mailto:bfigueroag99@gmail.com" className="btn btn-primary">Enviar mensaje</a>
          <p style={{ marginTop: '1rem', color: 'rgba(248, 248, 255, 0.72)' }}>
            +56 9 5682 0650 · Santiago, Chile
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>✨ Benjamin Figueroa Guzman — Ingeniero de Software | React · Django · IA · Ciberseguridad</p>
      </footer>
    </div>
  );
}

export default App;
