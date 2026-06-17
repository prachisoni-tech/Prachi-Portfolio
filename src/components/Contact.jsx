import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) tempErrors.name = 'Name must be at least 2 characters';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) tempErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) tempErrors.email = 'Please enter a valid email address';

    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    else if (formData.subject.trim().length < 3) tempErrors.subject = 'Subject must be at least 3 characters';

    if (!formData.message.trim()) tempErrors.message = 'Message content is required';
    else if (formData.message.trim().length < 5) tempErrors.message = 'Message must be at least 10 characters';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const recipient = 'soniprachi6897@gmail.com';

      // Build the email body with all form details pre-filled
      const emailBody =
        `\n${formData.message}`;

      // Detect mobile vs desktop
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isMobile) {
        // On mobile: mailto works perfectly (Gmail/mail app is set as default)
        const mailtoLink =
          `mailto:${recipient}` +
          `?subject=${encodeURIComponent(formData.subject)}` +
          `&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
      } else {
        // On desktop: open Gmail compose directly in a new tab
        // so user doesn't need a mail client configured
        const gmailLink =
          `https://mail.google.com/mail/?view=cm&fs=1` +
          `&to=${encodeURIComponent(recipient)}` +
          `&su=${encodeURIComponent(formData.subject)}` +
          `&body=${encodeURIComponent(emailBody)}`;
        window.open(gmailLink, '_blank');
      }

      // Mark success and reset form
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Confetti Blast on Success!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <span className="section-tag">Let's Connect</span>
        <h2 className="section-title">Get in Touch</h2>
      </div>

      <div className="contact-grid">
        <div className="contact-info-panel glass-panel">
          <h3 className="info-title">Let's build something together</h3>
          <p className="info-desc">
            Whether you have a query, a freelance project proposal, or simply want to chat about Spring Boot architectures or React performance—my inbox is always open.
          </p>

          <div className="info-details">
            <div className="info-item">
              <div className="info-icon-wrapper">
                <Mail size={18} />
              </div>
              <div>
                <span className="info-label">Email Me</span>
                <a href="mailto:soniprachi6897@gmail.com" className="info-value">soniprachi6897@gmail.com</a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrapper">
                <Phone size={18} />
              </div>
              <div>
                <span className="info-label">Call Me</span>
                <a href="tel:+919131362556" className="info-value">+91-9131362556</a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrapper">
                <MapPin size={18} />
              </div>
              <div>
                <span className="info-label">Location</span>
                <span className="info-value">India</span>
              </div>
            </div>
          </div>

          <div className="contact-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
          </div>
        </div>

        <div className="contact-form-panel glass-panel">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                disabled={isSubmitting}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                disabled={isSubmitting}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className={`form-input ${errors.subject ? 'input-error' : ''}`}
                value={formData.subject}
                onChange={handleChange}
                placeholder="Collaboration Proposal"
                disabled={isSubmitting}
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className={`form-input textarea-input ${errors.message ? 'input-error' : ''}`}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Prachi, I would love to discuss a fullstack project..."
                disabled={isSubmitting}
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary form-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="status-banner success-banner">
                Your mail client has opened with everything filled in — just hit Send!
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="status-banner error-banner">
                Oops! Could not open your mail client. Please email soniprachi6897@gmail.com directly.
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        .contact-section {
          padding: 6rem 2rem 10rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 3rem;
          align-items: stretch;
        }

        .contact-info-panel {
          padding: 3rem;
          border-color: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2rem;
        }

        .info-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, #fff 50%, hsl(var(--accent-blue)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .info-desc {
          font-size: 1.05rem;
          color: hsl(var(--text-secondary));
          line-height: 1.7;
        }

        .info-details {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .info-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: hsl(var(--accent-purple));
        }

        .contact-info-panel:hover .info-icon-wrapper {
          color: hsl(var(--accent-blue));
          border-color: rgba(59, 130, 246, 0.2);
        }

        .info-label {
          display: block;
          font-size: 0.8rem;
          color: hsl(var(--text-muted));
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .info-value {
          font-size: 1.05rem;
          font-weight: 600;
          color: #fff;
        }

        .contact-socials {
          display: flex;
          gap: 1rem;
        }

        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: hsl(var(--text-secondary));
          transition: var(--transition-smooth);
        }

        .social-icon-btn:hover {
          background: hsl(var(--accent-purple));
          color: #fff;
          border-color: hsl(var(--accent-purple));
          transform: translateY(-3px);
        }

        .contact-form-panel {
          padding: 3rem;
          border-color: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: hsl(var(--text-secondary));
        }

        .form-input {
          padding: 0.85rem 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid hsl(var(--border-color));
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
          transition: var(--transition-fast);
          width: 100%;
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }

        .form-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.04);
          border-color: hsl(var(--accent-purple));
          box-shadow: 0 0 10px rgba(147, 51, 234, 0.15);
        }

        .input-error {
          border-color: #ef4444 !important;
        }

        .textarea-input {
          resize: vertical;
          min-height: 120px;
        }

        .error-message {
          font-size: 0.8rem;
          color: #ef4444;
          font-weight: 500;
        }

        .form-submit-btn {
          width: 100%;
          margin-top: 0.5rem;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .status-banner {
          padding: 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-top: 1rem;
          text-align: center;
        }

        .success-banner {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.25);
        }

        .error-banner {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.25);
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .contact-section {
            padding: 4rem 1.5rem 6rem;
          }
          .contact-info-panel, .contact-form-panel {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
