import React from 'react';
import { Download, Cpu, Layout, Database, Wrench } from 'lucide-react';

export default function About() {
  const skillCategories = [
    {
      title: 'Backend Development',
      icon: <Cpu className="category-icon" />,
      skills: ['Spring Boot', 'Spring Security', 'RESTful APIs', 'Hibernate / JPA', 'Java Core & Advance', 'Microservices', 'JWT Auth', 'Spring Cloud'],
      color: 'purple'
    },
    {
      title: 'Frontend Development',
      icon: <Layout className="category-icon" />,
      skills: ['React.js', 'Redux Toolkit', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Bootstrap', 'Tailwind CSS', 'Axios', 'GSAP'],
      color: 'blue'
    },
    {
      title: 'Databases',
      icon: <Database className="category-icon" />,
      skills: ['MySQL', 'SQL Workbench', 'MongoDB', 'Database Schema Design', 'Query Optimization'],
      color: 'teal'
    },
    {
      title: 'Tools & DevOps',
      icon: <Wrench className="category-icon" />,
      skills: ['Git / GitHub', 'Docker', 'AWS (EC2, S3)', 'Postman', 'Jenkins', 'Maven', 'IntelliJ IDEA / VS Code'],
      color: 'rose'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-header">
        <span className="section-tag">About Me</span>
        <h2 className="section-title">My Technical Core</h2>
      </div>

      <div className="about-grid">
        <div className="about-text-container">
          <h3 className="about-subtitle">Building end-to-end scalable solutions</h3>
          <p className="about-paragraph">
            I am a passionate <strong>Java Full Stack Developer</strong> with <strong>1.5+ years of hands-on experience</strong> in architecting, coding, and maintaining web applications. My sweet spot lies at the intersection of robust backend logic and interactive, clean frontends.
          </p>
          <p className="about-paragraph">
            I specialize in optimizing query efficiency in SQL, writing reliable endpoints in Spring Boot with enterprise-grade security standards, and constructing responsive UI states in React. My work focuses on performance, readability, and clean system design.
          </p>

          <a 
            href="/CV_Prachi_Soni_2026.pdf" 
            download="Prachi_Soni_Resume.pdf"
            className="btn btn-secondary about-download-btn"
          >
            <Download size={18} />
            <span>Download My Resume</span>
          </a>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-card glass-panel">
              <div className={`icon-wrapper ${category.color}`}>
                {category.icon}
              </div>
              <h4 className="skill-card-title">{category.title}</h4>
              <div className="skill-tags">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 6rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 4rem;
          align-items: start;
        }

        .about-text-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .about-subtitle {
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1.3;
          color: #fff;
          background: linear-gradient(135deg, #fff 60%, hsl(var(--accent-purple)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .about-paragraph {
          font-size: 1.05rem;
          color: hsl(var(--text-secondary));
          line-height: 1.75;
        }

        .about-paragraph strong {
          color: #fff;
        }

        .about-download-btn {
          align-self: flex-start;
          margin-top: 1rem;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .skill-card {
          padding: 1.5rem;
          border-color: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .icon-wrapper.purple { background: rgba(147, 51, 234, 0.15); color: #c084fc; }
        .icon-wrapper.blue { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
        .icon-wrapper.teal { background: rgba(20, 184, 166, 0.15); color: #2dd4bf; }
        .icon-wrapper.rose { background: rgba(244, 63, 94, 0.15); color: #fb7185; }

        .category-icon {
          width: 22px;
          height: 22px;
        }

        .skill-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1rem;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          font-size: 0.75rem;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: hsl(var(--text-secondary));
        }

        .skill-card:hover .skill-tag {
          border-color: rgba(255, 255, 255, 0.1);
          color: hsl(var(--text-primary));
        }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 576px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
          .about-section {
            padding: 4rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}