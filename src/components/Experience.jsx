import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Briefcase, Award, GraduationCap } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('work');
  const scrollTriggersRef = useRef([]);

  const killTriggers = () => {
    scrollTriggersRef.current.forEach(t => t.kill());
    scrollTriggersRef.current = [];
  };

  const initAnimations = () => {
    killTriggers();
    
    // Query active items only to animate the currently visible tab
    const timelineItems = sectionRef.current.querySelectorAll('.timeline-wrapper:not(.hidden) .timeline-item');

    timelineItems.forEach((item, index) => {
      const isEven = index % 2 === 0;
      const content = item.querySelector('.timeline-content');
      const dot = item.querySelector('.timeline-dot');

      // Clear any pre-existing styles to prevent jumpiness on tab swap
      gsap.set([content, dot], { clearProps: 'all' });

      const anim1 = gsap.fromTo(content,
        {
          opacity: 0,
          x: isEven ? -50 : 50,
          y: 20
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      const anim2 = gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      if (anim1.scrollTrigger) scrollTriggersRef.current.push(anim1.scrollTrigger);
      if (anim2.scrollTrigger) scrollTriggersRef.current.push(anim2.scrollTrigger);
    });

    ScrollTrigger.refresh();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      initAnimations();
    }, sectionRef);

    return () => {
      ctx.revert();
      killTriggers();
    };
  }, [activeTab]);

  const experiences = [
    {
      role: 'Associate Software Developer',
      company: 'Vinorise Technology',
      period: 'Feb 2025 – Present',
      bullets: [
        'Developed and maintained RESTful APIs using Spring Boot, handling authentication, CRUD operations, and data processing',
        'Implemented secure login and role-based access control using Spring Security',
        'Integrated backend services with MySQL database, optimizing queries for better performance',
        'Collaborated with frontend team (React.js) to ensure smooth API integration and data consistency',
        'Improved application responsiveness by identifying and fixing performance bottlenecks and edge-case bugs',
        'Actively participated in debugging, code reviews, and production issue resolution'
      ]
    },
    {
      role: 'Web Development Intern',
      company: 'ITJobxs',
      period: 'Aug 2023 – Dec 2023',
      bullets: [
        'Built a responsive webpage using Reactjs and JavaScript making the interface work smoothly across different screen sizes.',
        'Worked on user verification flows and helped improve how the platform handled suspicious or low-quality activity.',
        'Contributed to reducing spam posts and bot interactions by supporting validation and security-related improvements.',
        'Added Google reCAPTCHA as part of the verification process to strengthen platform security.'
      ]
    }
  ];

  const education = [
    {
      degree: 'PG-DAC — Post Graduate Diploma in Advanced Computing',
      institution: 'Sunbeam Info-Tech Pvt Ltd, Karad',
      period: 'Aug 2024 – Feb 2025',
      grade: 'CGPA: 7.0',
      bullets: [
        'Specialized in advanced full-stack technologies including Java enterprise architecture, web application development, and databases.',
        'Acquired hands-on experience in software development methodologies, secure programming, and modern engineering tools.'
      ]
    },
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Madhav Institute of Technology & Science, Gwalior',
      period: 'Aug 2021 – Jul 2023',
      grade: 'CGPA: 9.1',
      bullets: [
        'Studied advanced computing courses, data structures, algorithms, database management systems, and software engineering.',
        'Successfully completed academic software projects and established strong fundamental engineering principles.'
      ]
    }
  ];

  const certifications = [
    {
      title: 'NPTEL Certified – Cloud Computing',
      provider: 'NPTEL / Swayam',
      desc: 'Earned certification in Cloud Computing fundamentals, virtualization, architectures, and cloud security paradigms.'
    }
  ];

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="section-header">
        <span className="section-tag">Career Journey</span>
        <h2 className="section-title">Experience & Education</h2>
      </div>

      {/* Tabs Selector */}
      <div className="tab-container glass-panel">
        <button 
          className={`tab-btn ${activeTab === 'work' ? 'active' : ''}`}
          onClick={() => setActiveTab('work')}
        >
          <Briefcase size={16} />
          <span>Work Experience</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          <GraduationCap size={16} />
          <span>Education & Credentials</span>
        </button>
      </div>

      <div className="timeline-container">
        {/* Work Experience Timeline */}
        <div className={`timeline-wrapper ${activeTab === 'work' ? '' : 'hidden'}`}>
          <div className="timeline-line"></div>

          {experiences.map((exp, index) => (
            <div key={exp.company} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-dot">
                <Briefcase size={16} />
              </div>
              
              <div className="timeline-content glass-panel">
                <div className="timeline-header">
                  <span className="timeline-period">
                    <Calendar size={12} />
                    {exp.period}
                  </span>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <h4 className="timeline-company">{exp.company}</h4>
                </div>

                <ul className="timeline-bullets">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="timeline-bullet">
                      <span className="bullet-indicator"></span>
                      <span className="bullet-text">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Education & Credentials Timeline */}
        <div className={`timeline-wrapper ${activeTab === 'education' ? '' : 'hidden'}`}>
          <div className="timeline-line"></div>

          {education.map((edu, index) => (
            <div key={edu.degree} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-dot">
                <GraduationCap size={16} />
              </div>
              
              <div className="timeline-content glass-panel">
                <div className="timeline-header">
                  <span className="timeline-period">
                    <Calendar size={12} />
                    {edu.period}
                  </span>
                  <h3 className="timeline-role">{edu.degree}</h3>
                  <h4 className="timeline-company">{edu.institution}</h4>
                  {edu.grade && <span className="badge timeline-grade">{edu.grade}</span>}
                </div>

                <ul className="timeline-bullets">
                  {edu.bullets.map((bullet, idx) => (
                    <li key={idx} className="timeline-bullet">
                      <span className="bullet-indicator"></span>
                      <span className="bullet-text">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Certifications Section */}
          <div className="certifications-section">
            <div className="cert-title-container">
              <Award size={20} className="cert-heading-icon" />
              <h3 className="certs-title">Certifications & Accomplishments</h3>
            </div>
            <div className="certs-grid">
              {certifications.map((cert) => (
                <div key={cert.title} className="cert-card glass-panel">
                  <div className="cert-icon-wrapper">
                    <Award className="cert-icon" />
                  </div>
                  <div className="cert-info">
                    <h4 className="cert-title">{cert.title}</h4>
                    <span className="cert-provider">{cert.provider}</span>
                    <p className="cert-desc">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .experience-section {
          padding: 6rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        /* Tabs Styling */
        .tab-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          max-width: 480px;
          margin: 0 auto 3.5rem;
          padding: 0.4rem;
          border-radius: 30px;
          border-color: rgba(255, 255, 255, 0.03);
        }

        .tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.7rem 1.25rem;
          border-radius: 25px;
          border: none;
          background: transparent;
          color: hsl(var(--text-secondary));
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
          width: 50%;
          font-size: 0.9rem;
        }

        .tab-btn:hover {
          color: #fff;
        }

        .tab-btn.active {
          background: linear-gradient(135deg, hsl(var(--accent-purple)), hsl(var(--accent-blue)));
          color: #fff;
          box-shadow: 0 4px 15px rgba(147, 51, 234, 0.25);
        }

        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 1rem 0;
        }

        .timeline-wrapper {
          position: relative;
          width: 100%;
        }

        .timeline-wrapper.hidden {
          display: none;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, 
            rgba(147, 51, 234, 0.1) 0%, 
            hsl(var(--accent-purple)) 15%, 
            hsl(var(--accent-blue)) 85%, 
            rgba(59, 130, 246, 0.1) 100%
          );
          transform: translateX(-50%);
        }

        .timeline-item {
          display: flex;
          justify-content: flex-end;
          padding-bottom: 4rem;
          position: relative;
          width: 50%;
        }

        .timeline-item.left {
          align-self: flex-start;
          justify-content: flex-start;
          left: 0;
        }

        .timeline-item.right {
          align-self: flex-end;
          left: 50%;
        }

        .timeline-dot {
          position: absolute;
          right: -20px;
          top: 4px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: hsl(var(--bg-secondary));
          border: 2px solid hsl(var(--accent-purple));
          display: flex;
          align-items: center;
          justify-content: center;
          color: hsl(var(--accent-purple));
          z-index: 10;
          box-shadow: 0 0 15px rgba(147, 51, 234, 0.25);
          transition: var(--transition-smooth);
        }

        .timeline-item.right .timeline-dot {
          left: -20px;
          border-color: hsl(var(--accent-blue));
          color: hsl(var(--accent-blue));
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.25);
        }

        .timeline-content {
          width: 90%;
          padding: 2rem;
          border-color: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
        }

        .timeline-item.left .timeline-content {
          margin-right: auto;
        }

        .timeline-item.right .timeline-content {
          margin-left: auto;
        }

        .timeline-header {
          margin-bottom: 1.5rem;
          border-bottom: 1px solid hsl(var(--border-color));
          padding-bottom: 1rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
        }

        .timeline-period {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: hsl(var(--text-muted));
          margin-bottom: 0.5rem;
          background: rgba(255, 255, 255, 0.02);
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .timeline-role {
          font-size: 1.35rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
        }

        .timeline-company {
          font-size: 1.05rem;
          font-weight: 600;
          color: hsl(var(--accent-purple));
        }

        .timeline-item.right .timeline-company {
          color: hsl(var(--accent-blue));
        }

        .timeline-grade {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          background: rgba(59, 130, 246, 0.1);
          color: #60a5fa;
          border-color: rgba(59, 130, 246, 0.2);
        }

        .timeline-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .timeline-bullet {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .bullet-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: hsl(var(--accent-purple));
          margin-top: 0.5rem;
          flex-shrink: 0;
        }

        .timeline-item.right .bullet-indicator {
          background: hsl(var(--accent-blue));
        }

        .bullet-text {
          font-size: 0.95rem;
          color: hsl(var(--text-secondary));
          line-height: 1.5;
        }

        /* Certifications Styling */
        .certifications-section {
          margin-top: 5rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .cert-title-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .cert-heading-icon {
          color: hsl(var(--accent-purple));
        }

        .certs-title {
          font-size: 1.8rem;
          color: #fff;
          margin: 0;
        }

        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .cert-card {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.5rem;
          border-color: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
        }

        .cert-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(168, 85, 247, 0.15);
          color: #c084fc;
          flex-shrink: 0;
        }

        .cert-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .cert-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }

        .cert-provider {
          font-size: 0.85rem;
          color: hsl(var(--accent-blue));
          font-weight: 600;
        }

        .cert-desc {
          font-size: 0.9rem;
          color: hsl(var(--text-secondary));
          line-height: 1.5;
          margin-top: 0.25rem;
        }

        /* Responsive timeline */
        @media (max-width: 768px) {
          .timeline-line {
            left: 20px;
          }
          
          .timeline-item {
            width: 100% !important;
            left: 0 !important;
            padding-left: 45px;
            padding-bottom: 3rem;
          }
          
          .timeline-dot {
            left: 0px !important;
            right: auto !important;
          }
          
          .timeline-content {
            width: 100%;
          }

          .certs-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .experience-section {
            padding: 4rem 1.5rem;
          }
          .timeline-content {
            padding: 1.5rem;
          }
          .tab-container {
            flex-direction: column;
            border-radius: 16px;
            padding: 0.5rem;
            max-width: 100%;
          }
          .tab-btn {
            width: 100%;
            border-radius: 10px;
          }
          .certs-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </section>
  );
}
