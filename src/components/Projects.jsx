import { ExternalLink, Database, Layers, ShieldCheck, HeartHandshake } from 'lucide-react';

const GithubIcon = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const projects = [
    {
      title: 'Garden Fever',
      subtitle: 'Spring Boot, ReactJs, MySQL, Docker',
      icon: <Layers className="proj-icon purple" />,
      description: 'Built a full-stack platform for renting and purchasing agricultural tools and services.',
      bullets: [
        'Developed backend using Spring Boot and Hibernate, exposing REST APIs for product and user management',
        'Implemented role-based authentication using Spring Security, ensuring secure access for admins and users',
        'Designed and managed MySQL database schema for efficient data handling',
        'Dockerized the application for easy deployment and environment consistency',
        'Enabled admin features like adding, updating, and deleting product listings'
      ],
      tech: ['React.js', 'Spring Boot', 'MySQL', 'Hibernate', 'Spring Security', 'Docker'],
      github: '#',
      live: '#'
    },
    {
      title: 'My Helper',
      subtitle: 'HTML, CSS, JavaScript, PHP',
      icon: <HeartHandshake className="proj-icon blue" />,
      description: 'MyHelper is a home services platform that connects users with verified professionals like plumbers, electricians, and cleaners.',
      bullets: [
        'Designed for convenience, especially for those new to a city, it simplifies finding trusted experts. Users can easily book services, track progress, and receive timely assistance.',
        'The platform is built using HTML, CSS, JavaScript, and PHP, with MySQL as the primary database for managing service requests, user profiles, and bookings.'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
      github: '#',
      live: '#'
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="section-header">
        <span className="section-tag">Featured Work</span>
        <h2 className="section-title">Personal Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.title} className="project-card glass-panel">
            <div className="project-body">
              <div className="project-heading">
                <div className="project-icon-box">
                  {project.icon}
                </div>
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <h4 className="project-subtitle">{project.subtitle}</h4>
                </div>
              </div>

              <p className="project-desc">{project.description}</p>

              <ul className="project-bullets">
                {project.bullets.map((bullet, idx) => (
                  <li key={idx} className="project-bullet">
                    <span className="proj-bullet-dot"></span>
                    <span className="proj-bullet-text">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="project-footer">
              <div className="project-tech-list">
                {project.tech.map((t) => (
                  <span key={t} className="badge project-tech-badge">
                    {t}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a href={project.github} className="project-link-icon" title="View Source Code" aria-label="View Source Code">
                  <GithubIcon size={20} />
                </a>
                <a href={project.live} className="project-link-icon" title="Live Preview" aria-label="Live Preview">
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .projects-section {
          padding: 6rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .project-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.5rem;
          border-color: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          height: 100%;
        }

        .project-heading {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .project-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .proj-icon {
          width: 24px;
          height: 24px;
        }
        .proj-icon.purple { color: #c084fc; }
        .proj-icon.blue { color: #60a5fa; }

        .project-title {
          font-size: 1.5rem;
          font-weight: 750;
          color: #fff;
        }

        .project-subtitle {
          font-size: 0.95rem;
          color: hsl(var(--text-muted));
          font-weight: 500;
        }

        .project-desc {
          font-size: 1.05rem;
          color: hsl(var(--text-secondary));
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .project-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .project-bullet {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .proj-bullet-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: hsl(var(--accent-purple));
          margin-top: 0.55rem;
          flex-shrink: 0;
        }

        .project-card:nth-child(2) .proj-bullet-dot {
          background: hsl(var(--accent-blue));
        }

        .proj-bullet-text {
          font-size: 0.9rem;
          color: hsl(var(--text-secondary));
          line-height: 1.5;
        }

        .project-footer {
          border-top: 1px solid hsl(var(--border-color));
          padding-top: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .project-tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .project-tech-badge {
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .project-links {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .project-link-icon {
          color: hsl(var(--text-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .project-link-icon:hover {
          color: #fff;
          transform: translateY(-2px);
        }

        @media (max-width: 992px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .projects-section {
            padding: 4rem 1.5rem;
          }
          .project-card {
            padding: 1.5rem;
          }
          .project-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
