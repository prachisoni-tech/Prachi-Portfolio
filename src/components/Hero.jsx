import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const badgesRef = useRef(null);
  const ctasRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    // Select all child elements for GSAP stagger animations
    const titleElements = titleRef.current.children;
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial hidden state to prevent flash of unstyled content
    gsap.set([titleElements, descRef.current, badgesRef.current?.children, ctasRef.current?.children, visualRef.current], {
      opacity: 0,
      y: 20
    });

    tl.to(titleElements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.2
    })
    .to(descRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, '-=0.4')
    .to(badgesRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08
    }, '-=0.3')
    .to(ctasRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1
    }, '-=0.3')
    .to(visualRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, '-=0.5');

    // Floating shape animation
    gsap.to('.floating-glow-1', {
      x: 'random(-40, 40)',
      y: 'random(-40, 40)',
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    gsap.to('.floating-glow-2', {
      x: 'random(-50, 50)',
      y: 'random(-50, 50)',
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, []);

  return (
    <section className="hero-section" ref={containerRef}>
      {/* Background Ambient Glows */}
      <div className="glow-wrapper">
        <div className="glow-circle glow-circle-1 floating-glow-1"></div>
        <div className="glow-circle glow-circle-2 floating-glow-2"></div>
      </div>

      <div className="hero-grid">
        <div className="hero-content">
          <div ref={titleRef}>
            <h1 className="hero-greeting">Hi, I'm</h1>
            <h1 className="hero-name-title">Prachi Soni</h1>
            <h2 className="hero-subtitle">
              Java Full Stack Developer
            </h2>
          </div>

          <p className="hero-desc" ref={descRef}>
            I design and build robust, high-performance web applications. Specializing in crafting microservices with <strong>Spring Boot</strong> and creating fluid, interactive user experiences using <strong>React.js</strong>.
          </p>

          <div className="hero-badges" ref={badgesRef}>
            <span className="badge tech-badge java">Java</span>
            <span className="badge tech-badge spring">Spring Boot</span>
            <span className="badge tech-badge react">React.js</span>
            <span className="badge tech-badge sql">MySQL / SQL</span>
            <span className="badge tech-badge docker">Docker</span>
          </div>

          <div className="hero-ctas" ref={ctasRef}>
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              <span>Get in Touch</span>
            </a>
          </div>
        </div>

        <div className="hero-visual" ref={visualRef}>
          <div className="tech-stack-card glass-panel">
            <div className="card-header-dot">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="code-content">
              <p className="line"><span className="keyword">const</span> developer = &#123;</p>
              <p className="line indent-1"><span className="property">name</span>: <span className="string">"Prachi Soni"</span>,</p>
              <p className="line indent-1"><span className="property">role</span>: <span className="string">"Java Full Stack Developer"</span>,</p>
              <p className="line indent-1"><span className="property">experience</span>: <span className="number">1.5</span>, <span className="comment">// years</span></p>
              <p className="line indent-1"><span className="property">skills</span>: &#91;</p>
              <p className="line indent-2"><span className="string">"Java"</span>, <span className="string">"Spring Boot"</span>,</p>
              <p className="line indent-2"><span className="string">"React.js"</span>, <span className="string">"SQL"</span>,</p>
              <p className="line indent-2"><span className="string">"Docker"</span>, <span className="string">"Spring Security"</span></p>
              <p className="line indent-1">&#93;,</p>
              <p className="line indent-1"><span className="property">passionateAbout</span>: <span className="string">"Scalable & clean architecture"</span></p>
              <p className="line">&#125;;</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          padding: 8rem 2rem 4rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
          align-items: center;
          width: 100%;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }



        .hero-greeting {
          font-size: 1.5rem;
          color: hsl(var(--text-secondary));
          font-weight: 500;
        }

        .hero-name-title {
          font-size: 4.5rem;
          line-height: 1.1;
          font-weight: 900;
          background: linear-gradient(135deg, #fff 40%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 2.2rem;
          font-weight: 700;
          color: hsl(var(--text-secondary));
        }

        .hero-desc {
          font-size: 1.1rem;
          color: hsl(var(--text-secondary));
          max-width: 580px;
          line-height: 1.7;
        }

        .hero-desc strong {
          color: #fff;
          font-weight: 600;
        }

        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin: 0.5rem 0 1rem;
        }

        .tech-badge {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
        }

        .tech-badge.java:hover { border-color: #f89820; color: #f89820; }
        .tech-badge.spring:hover { border-color: #6db33f; color: #6db33f; }
        .tech-badge.react:hover { border-color: #61dafb; color: #61dafb; }
        .tech-badge.sql:hover { border-color: #00758f; color: #00758f; }
        .tech-badge.docker:hover { border-color: #2496ed; color: #2496ed; }

        .hero-ctas {
          display: flex;
          gap: 1rem;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          position: relative;
        }

        .tech-stack-card {
          width: 100%;
          max-width: 420px;
          padding: 2rem;
          border-color: rgba(255, 255, 255, 0.04);
        }

        .card-header-dot {
          display: flex;
          gap: 0.35rem;
          margin-bottom: 1.5rem;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .dot.red { background: #ef4444; }
        .dot.yellow { background: #eab308; }
        .dot.green { background: #22c55e; }

        .code-content {
          font-family: 'Fira Code', 'Courier New', Courier, monospace;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .keyword { color: #f472b6; }
        .property { color: #60a5fa; }
        .string { color: #34d399; }
        .number { color: #fb923c; }
        .comment { color: #9ca3af; font-style: italic; }
        .indent-1 { padding-left: 1.25rem; }
        .indent-2 { padding-left: 2.5rem; }

        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-name-title {
            font-size: 3.5rem;
          }
          .hero-subtitle {
            font-size: 1.8rem;
          }
          .hero-visual {
            order: -1;
          }
        }

        @media (max-width: 576px) {
          .hero-section {
            padding: 7rem 1.5rem 3rem;
          }
          .hero-name-title {
            font-size: 2.8rem;
          }
          .hero-ctas {
            flex-direction: column;
            width: 100%;
          }
          .hero-ctas .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
