/**
 * =====================================================================
 * Email Service (src/services/emailService.js)
 * =====================================================================
 * Direct serverless email dispatch powered by Web3Forms API.
 * Submissions are forwarded directly to: ravindudiwakara01@gmail.com
 *
 * Configuration:
 * 1. .env variable: VITE_WEB3FORMS_ACCESS_KEY
 * 2. Or Admin Panel / browser storage: localStorage.getItem("portfolio_web3forms_key")
 *
 * To obtain a free Web3Forms access key (takes 10 seconds, no credit card):
 * Visit https://web3forms.com and enter ravindudiwakara01@gmail.com.
 */

const RECIPIENT_EMAIL = "ravindudiwakara01@gmail.com";
const WEB3FORMS_STORAGE_KEY = "portfolio_web3forms_key";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const emailService = {
  recipientEmail: RECIPIENT_EMAIL,

  /**
   * Retrieves the current Web3Forms access key from localStorage or Vite environment.
   */
  getApiKey() {
    try {
      const storedKey = localStorage.getItem(WEB3FORMS_STORAGE_KEY);
      if (storedKey && storedKey.trim()) {
        return storedKey.trim();
      }
    } catch {
      // Storage access blocked or restricted
    }

    const envKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (envKey && envKey.trim()) {
      return envKey.trim();
    }

    return "";
  },

  /**
   * Updates or clears the stored access key.
   */
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

  /**
   * Checks whether an access key has been configured.
   */
  isConfigured() {
    return Boolean(this.getApiKey());
  },

  /**
   * Constructs a fallback mailto: link populated with form data.
   */
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
   * Sends the contact form payload to Web3Forms API.
   *
   * @param {Object} formData
   * @param {string} formData.name
   * @param {string} formData.email
   * @param {string} formData.subject
   * @param {string} formData.message
   */
  async sendContactMessage({ name, email, subject, message }) {
    const apiKey = this.getApiKey();

    if (!apiKey) {
      return {
        success: false,
        needsKey: true,
        message:
          "Web3Forms API key is not configured yet. Please configure your key in .env (VITE_WEB3FORMS_ACCESS_KEY) or in the Admin Dashboard Settings, or use the direct mailto button."
      };
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: apiKey,
          name: name.trim(),
          email: email.trim(),
          subject:
            subject && subject.trim()
              ? subject.trim()
              : `New Portfolio Message from ${name.trim()}`,
          message: message.trim(),
          from_name: `${name.trim()} (via Portfolio)`,
          reply_to: email.trim(),
          to_email: RECIPIENT_EMAIL
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success || data.status === "success")) {
        return {
          success: true,
          message:
            "Your message has been sent successfully! It was delivered directly to ravindudiwakara01@gmail.com."
        };
      } else {
        return {
          success: false,
          needsKey: false,
          message:
            data.message ||
            "Unable to send message via email service. Please check your API key or use the direct email link."
        };
      }
    } catch (error) {
      return {
        success: false,
        needsKey: false,
        message:
          error.message ||
          "Network error while sending message. Please try again or send directly via email client."
      };
    }
  }
};

export default emailService;
