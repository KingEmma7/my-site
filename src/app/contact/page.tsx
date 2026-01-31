'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import Link from 'next/link';
import { AnimatedEyes } from '@/components/ui/AnimatedEyes';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils/cn';

/**
 * Contact Page
 * 
 * Features:
 * - Animated eyes that follow cursor when input is focused
 * - Form validation with accessible error messages
 * - Keyboard accessible
 * 
 * TODO: Connect to actual form backend (Formspree, Resend, etc.)
 */

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // TODO: Replace with actual form submission
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="section-container">
          <AnimatedSection className="max-w-xl mx-auto text-center">
            <div className="inline-flex p-4 rounded-full bg-accent-muted text-accent mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Message Sent!
            </h1>
            <p className="text-foreground-muted text-lg mb-8">
              Thanks for reaching out. I&apos;ll get back to you as soon as possible.
            </p>
            <Link
              href="/"
              className={cn(
                'inline-flex items-center justify-center',
                'px-6 py-3 rounded-lg',
                'bg-accent text-white font-medium',
                'hover:bg-accent-hover',
                'transition-colors duration-200'
              )}
            >
              Back to Home
            </Link>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="section-container">
        <AnimatedSection className="max-w-xl mx-auto">
          {/* Header with animated eyes */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6 text-accent">
              <AnimatedEyes isFocused={true} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-foreground-muted text-lg">
              Have a project in mind? Let&apos;s talk about how we can work together.
            </p>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={cn(
                  'w-full px-4 py-3 rounded-lg',
                  'bg-surface-elevated border',
                  'text-foreground placeholder:text-foreground-subtle',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                  errors.name
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-border hover:border-foreground-subtle'
                )}
                placeholder="Your name"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="mt-2 text-sm text-rose-500"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  'w-full px-4 py-3 rounded-lg',
                  'bg-surface-elevated border',
                  'text-foreground placeholder:text-foreground-subtle',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                  errors.email
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-border hover:border-foreground-subtle'
                )}
                placeholder="your@email.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-2 text-sm text-rose-500"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={cn(
                  'w-full px-4 py-3 rounded-lg resize-none',
                  'bg-surface-elevated border',
                  'text-foreground placeholder:text-foreground-subtle',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                  errors.message
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-border hover:border-foreground-subtle'
                )}
                placeholder="Tell me about your project..."
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p
                  id="message-error"
                  className="mt-2 text-sm text-rose-500"
                  role="alert"
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'w-full py-3 px-6 rounded-lg font-medium',
                'bg-accent text-white',
                'hover:bg-accent-hover',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                'focus:ring-offset-surface'
              )}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin w-5 h-5"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>

          {/* Alternative contact methods */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-foreground-muted mb-4">
              Prefer another way to connect?
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/KingEmma7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/emmanuel-tagbor-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/KingEmmaDev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors duration-200"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
