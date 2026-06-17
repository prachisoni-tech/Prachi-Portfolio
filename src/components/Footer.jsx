import { ArrowUp, Mail } from 'lucide-react';

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

const LinkedinIcon = ({ size = 20, ...props }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3 className="footer-logo">Prachi Soni</h3>
          <p className="footer-tagline">Java Full Stack Developer</p>
        </div>

        <div className="footer-right">
          <div className="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href="mailto:soniprachi6897@gmail.com" className="footer-social-link" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>

          <button onClick={scrollToTop} className="scroll-top-btn" title="Scroll to top" aria-label="Scroll to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">&copy; {new Date().getFullYear()} Prachi Soni. All rights reserved.</p>
        <p className="built-with">Built with React, Spring Boot, MySQL & GSAP.</p>
      </div>

      <style>{`
        .footer {
          background: #07070a;
          border-top: 1px solid var(--border-color);
          padding: 4rem 2rem 2rem;
          color: hsl(var(--text-secondary));
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 3rem;
        }

        .footer-logo {
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.25rem;
        }

        .footer-tagline {
          font-size: 0.9rem;
          color: hsl(var(--text-muted));
        }

        .footer-right {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .footer-socials {
          display: flex;
          gap: 1rem;
        }

        .footer-social-link {
          color: hsl(var(--text-muted));
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-social-link:hover {
          color: #fff;
          transform: translateY(-2px);
        }

        .scroll-top-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: hsl(var(--text-secondary));
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .scroll-top-btn:hover {
          background: hsl(var(--accent-purple));
          color: #fff;
          border-color: hsl(var(--accent-purple));
          transform: translateY(-3px);
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: hsl(var(--text-muted));
        }

        @media (max-width: 576px) {
          .footer {
            padding: 3rem 1.5rem 1.5rem;
          }
          .footer-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
            padding-bottom: 2rem;
          }
          .footer-right {
            width: 100%;
            justify-content: space-between;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
