/**
 * =====================================================================
 * Email Service (src/services/emailService.js)
 * =====================================================================
 * Direct serverless email dispatch delivering straight to:
 * ravindudiwakara01@gmail.com
 *
 * Primary method: FormSubmit AJAX endpoint (zero-config, no API key needed)
 * Optional fallback: Web3Forms (if access key is set in .env)
 * Offline fallback: mailto link
 */

const RECIPIENT_EMAIL = "ravindudiwakara01@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_STORAGE_KEY = "portfolio_web3forms_key";

export const emailService = {
  recipientEmail: RECIPIENT_EMAIL,

  /**
   * Optional Web3Forms key lookup
   */
  getApiKey() {
    try {
      const storedKey = localStorage.getItem(WEB3FORMS_STORAGE_KEY);
      if (storedKey && storedKey.trim()) return storedKey.trim();
    } catch {}

    const envKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (envKey && envKey.trim()) return envKey.trim();

    return "";
  },

  setApiKey(key) {
    try {
      if (!key || !key.trim()) {
        localStorage.removeItem(WEB3FORMS_STORAGE_KEY);
      } else {
        localStorage.setItem(WEB3FORMS_STORAGE_KEY, key.trim());
      }
      window.dispatchEvent(new Event("portfolio-email-config-update"));
      return true;
    } catch {
      return false;
    }
  },

  isConfigured() {
    return true; // FormSubmit works natively out-of-the-box with zero keys!
  },

  getMailtoLink({ name = "", email = "", subject = "", message = "" }) {
    const sub = encodeURIComponent(
      subject.trim() || `Portfolio Contact Inquiry from ${name.trim() || "Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`
    );
    return `mailto:${RECIPIENT_EMAIL}?subject=${sub}&body=${body}`;
  },

  /**
   * Sends the contact form payload directly to ravindudiwakara01@gmail.com.
   * Works out-of-the-box without requiring any API keys.
   */
  async sendContactMessage({ name, email, subject, message }) {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject?.trim() || `New Portfolio Message from ${cleanName}`;
    const cleanMessage = message.trim();

    const web3Key = this.getApiKey();

    // 1. If a Web3Forms key is provided, try Web3Forms first
    if (web3Key) {
      try {
        const res = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: cleanName,
            email: cleanEmail,
            subject: cleanSubject,
            message: cleanMessage,
            from_name: `${cleanName} (Portfolio)`,
            reply_to: cleanEmail,
            to_email: RECIPIENT_EMAIL
          })
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && (data.success || data.status === "success")) {
          return {
            success: true,
            message: `Your message has been sent successfully! Delivered directly to ${RECIPIENT_EMAIL}.`
          };
        }
      } catch (err) {
        // Fall through to FormSubmit if Web3Forms fails
      }
    }

    // 2. Zero-Config FormSubmit Engine (direct delivery to ravindudiwakara01@gmail.com)
    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          _subject: cleanSubject,
          message: cleanMessage,
          _captcha: "false",
          _template: "table"
        })
      });

      const data = await response.json().catch(() => ({}));

      // Success response from FormSubmit
      if (response.ok && (data.success === "true" || data.success === true)) {
        return {
          success: true,
          message: `Your message has been sent successfully! Delivered directly to ${RECIPIENT_EMAIL}.`
        };
      }

      // One-time activation notice (first submission to ravindudiwakara01@gmail.com)
      if (data.message && data.message.toLowerCase().includes("activation")) {
        return {
          success: true,
          message: `Your message was received! A one-time activation confirmation has been sent to ${RECIPIENT_EMAIL}. Please open your Gmail and click 'Activate Form' once to activate incoming messages.`
        };
      }

      return {
        success: false,
        message: data.message || "Failed to send message via email service. Please try again or use the email link below."
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.message ||
          "Network error while sending message. Please try again or use the direct email link below."
      };
    }
  }
};

export default emailService;
