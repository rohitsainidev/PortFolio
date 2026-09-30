import { useState, useEffect, useRef } from "react";
import {
  FaEnvelope,
  FaPaperPlane,
  FaCheck,
  FaUser,
  FaPenNib,
  FaMessage,
} from "react-icons/fa6";
import ContactIllustration from "./ContactIllustration";
import "./Contact.css";

function Contact() {
  const contactRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const recipientEmail = "darkbyte225@gmail.com";

  // Section Observer
  useEffect(() => {
    const section = contactRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (submitError) setSubmitError("");
  };

  // Handle Real Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `Portfolio Contact: ${formData.subject || "New Message"}`,
          subject: formData.subject,
          message: formData.message,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json();

      if (response.ok || data.success === "true" || data.success === true) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 6000);
      } else {
        setSubmitError("Failed to send message. Please try again or email directly.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={`contact-sec-container ${
        isSectionVisible ? "contact-sec-visible" : ""
      }`}
      id="contact"
      ref={contactRef}
    >
      {/* Background Ambient Glows */}
      <div className="contact-sec-glow-left" aria-hidden="true" />
      <div className="contact-sec-glow-right" aria-hidden="true" />

      <div className="contact-inner-wrapper">
        {/* Header */}
        <div className="contact-sec-header reveal-up">
          <span className="contact-sec-badge">GET IN TOUCH</span>
          <h2 className="contact-sec-title">
            Let&apos;s Build <span className="gradient-text">Something Great</span>
          </h2>
          <p className="contact-sec-desc">
            Have a project in mind, a job opportunity, or just want to chat tech?
            Feel free to reach out directly or send a message.
          </p>
        </div>

        {/* 2-Column Main Wrapper */}
        <div className="contact-sec-wrapper">
          {/* Left Column: Animated Mail & Airplane Illustration */}
          <div className="contact-sec-illustration-col reveal-left">
            <ContactIllustration />
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-sec-form-col reveal-right">
            <form className="contact-sec-form" onSubmit={handleSubmit}>
              <div className="contact-sec-form-header">
                <h3>Send a Direct Message</h3>
                <p>Fill out the form below and I&apos;ll get back to you soon.</p>
              </div>

              {/* Success Alert Banner */}
              {isSubmitted && (
                <div className="contact-sec-success-alert">
                  <FaCheck />
                  <span>
                    Thank you! Your message has been sent successfully. I will get
                    back to you shortly at your email.
                  </span>
                </div>
              )}

              {/* Error Alert Banner */}
              {submitError && (
                <div className="contact-sec-error-alert">
                  <span>{submitError}</span>
                </div>
              )}

              {/* Name & Email Fields */}
              <div className="contact-sec-form-row">
                <div className="contact-sec-input-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <div className="contact-sec-input-wrap">
                    <FaUser className="contact-sec-input-icon" />
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      required
                    />
                  </div>
                </div>

                <div className="contact-sec-input-group">
                  <label htmlFor="contact-email">Your Email</label>
                  <div className="contact-sec-input-wrap">
                    <FaEnvelope className="contact-sec-input-icon" />
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Subject Field */}
              <div className="contact-sec-input-group">
                <label htmlFor="contact-subject">Subject</label>
                <div className="contact-sec-input-wrap">
                  <FaPenNib className="contact-sec-input-icon" />
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full-Stack Project Inquiry"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="contact-sec-input-group">
                <label htmlFor="contact-message">Your Message</label>
                <div className="contact-sec-input-wrap textarea-wrap">
                  <FaMessage className="contact-sec-input-icon" />
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project idea, timeline, or message..."
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`contact-sec-submit-btn ${
                  isSubmitting ? "loading" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="contact-sec-spinner" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;