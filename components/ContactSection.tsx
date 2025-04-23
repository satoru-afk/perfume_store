"use client";

import { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

type SubmitStatus = {
  success: boolean;
  message: string;
};

export default function ContactSection() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    success: false,
    message: "",
  });

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) {
      setSubmitStatus({
        success: false,
        message: "Form reference is not available",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    // Validate required environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus({
        success: false,
        message: "Email service configuration is incomplete",
      });
      setIsSubmitting(false);
      return;
    }

    // Create form data object with all fields
    const formData = new FormData(form.current);
    const templateParams = {
      from_name: formData.get("user_name") as string,
      from_email: formData.get("user_email") as string,
      message: formData.get("message") as string,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          toast.success("Message sent successfully!", {
            description: "We'll get back to you soon.",
            richColors: true,
            
            action: {
              label: "Close",
              onClick: () => console.log("Close"),
            },
          });
          form.current?.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          toast.error("Failed to send message.", {
            description: error.text || "Please try again later.",
            richColors: true,
            action: {
              label: "Close",
              onClick: () => console.log("Close"),
            },
          });
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="py-20 bg-rose-50" id="contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-rose-900 mb-4">
            Send Us a Message
          </h2>
          <p className="text-rose-700">
            Like the Little Princes messages carried by migrating birds, your
            words will reach us.
          </p>
        </div>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-white p-8 rounded-xl shadow-sm"
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-rose-800 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="user_name"
              className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="The Little Prince"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-rose-800 mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="user_email"
              className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="prince@asteroid.b612"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-rose-800 mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="What makes your rose so special?"
              required
              disabled={isSubmitting}
            ></textarea>
          </div>

          {submitStatus.message && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                submitStatus.success
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg transition-colors cursor-pointer ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
