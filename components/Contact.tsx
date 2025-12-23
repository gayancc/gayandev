'use client';

import { FormEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { contactInfo } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { Particles } from './Particles';

const initialState = { name: '', email: '', message: '' };
const initialTouched = { name: false, email: false, message: false };

export function Contact() {
  const [form, setForm] = useState(initialState);
  const [touched, setTouched] = useState(initialTouched);
  const [submitted, setSubmitted] = useState(false);
  const emailTo = contactInfo.find((item) => item.label.includes('Email'))?.value ?? '';

  const errors = useMemo(() => {
    return {
      name: form.name.trim().length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
      message: form.message.trim().length < 10,
    };
  }, [form]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (errors.name || errors.email || errors.message) return;
    if (emailTo) {
      const subject = encodeURIComponent(`New message from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\nReply to: ${form.email}`);
      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    }
    setSubmitted(true);
    setForm(initialState);
    setTouched(initialTouched);
  };

  return (
    <section id="contact" className="section-shell">
      <Particles className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 mx-auto w-[92%] max-w-6xl">
        <SectionHeading title="Get in Touch" subtitle="Contact" />
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="glass rounded-3xl p-6">
            <ul className="space-y-3 text-sm">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-fg/70">{item.label}</span>
                  <span className="font-semibold text-fg">{item.value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-white/10 bg-card/60 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-fg/60">Map</p>
              <div className="mt-3 h-40 rounded-xl bg-gradient-to-br from-accent/30 via-transparent to-accent2/30" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-3xl p-6">
            <div className="grid gap-4">
              <label className="text-sm">
                Name
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-card/60 px-4 py-3 text-sm text-fg outline-none transition focus:border-accent"
                  aria-invalid={errors.name}
                  aria-label="Your name"
                />
                {touched.name && errors.name && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 block text-xs text-pink-400"
                  >
                    Please enter at least 2 characters.
                  </motion.span>
                )}
              </label>
              <label className="text-sm">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-card/60 px-4 py-3 text-sm text-fg outline-none transition focus:border-accent"
                  aria-invalid={errors.email}
                  aria-label="Your email"
                />
                {touched.email && errors.email && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 block text-xs text-pink-400"
                  >
                    Please enter a valid email.
                  </motion.span>
                )}
              </label>
              <label className="text-sm">
                Message
                <textarea
                  value={form.message}
                  onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-card/60 px-4 py-3 text-sm text-fg outline-none transition focus:border-accent"
                  aria-invalid={errors.message}
                  aria-label="Your message"
                />
                {touched.message && errors.message && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 block text-xs text-pink-400"
                  >
                    Message should be at least 10 characters.
                  </motion.span>
                )}
              </label>
              <motion.button
                type="submit"
                className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-accent"
                  role="status"
                  aria-live="polite"
                >
                  Message sent! I will get back to you soon.
                </motion.p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
