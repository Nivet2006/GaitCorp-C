"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const serviceOptions = [
  "Non-Ferrous Castings",
  "Tools Jigs & Fixtures",
  "Special Purpose Machines",
  "Fabrication & Erection",
  "Prototype Development",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  const fieldClass = (name: string) =>
    `w-full rounded-xl border bg-dark-elevated/80 px-5 py-4 font-dm text-white placeholder-[#4a4a4a] backdrop-blur-sm transition-all duration-300 ${
      focused === name
        ? "border-primary shadow-[0_0_0_4px_rgba(237,29,36,0.12)]"
        : "border-dark-border"
    }`;

  return (
    <ScrollReveal direction="right" className="h-full">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary/5 p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckCircle size={56} className="text-primary" />
            </motion.div>
            <p className="mt-6 font-bebas text-4xl text-white">MESSAGE RECEIVED</p>
            <p className="mt-4 font-dm text-muted">
              We&apos;ll respond within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-dark-border bg-dark-surface/60 p-8 backdrop-blur-xl md:p-12"
          >
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
              Inquiry form
            </p>
            <h2 className="mb-10 font-bebas text-4xl text-white">SEND A MESSAGE</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Full name" name="name">
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className={fieldClass("name")}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                  />
                </Field>
                <Field label="Company" name="company">
                  <input
                    type="text"
                    placeholder="Organization"
                    className={fieldClass("company")}
                    onFocus={() => setFocused("company")}
                    onBlur={() => setFocused(null)}
                  />
                </Field>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Email" name="email">
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={fieldClass("email")}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                </Field>
                <Field label="Phone" name="phone">
                  <input
                    type="tel"
                    placeholder="+91"
                    className={fieldClass("phone")}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                  />
                </Field>
              </div>
              <Field label="Service" name="service">
                <select
                  required
                  className={fieldClass("service")}
                  defaultValue=""
                  onFocus={() => setFocused("service")}
                  onBlur={() => setFocused(null)}
                >
                  <option value="" disabled>
                    Select capability
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Message" name="message">
                <textarea
                  required
                  rows={5}
                  placeholder="Project scope, timeline, materials..."
                  className={fieldClass("message")}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
              </Field>

              {status === "loading" ? (
                <button
                  type="button"
                  disabled
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-5 font-dm font-semibold text-white opacity-80"
                >
                  <Loader2 size={20} className="animate-spin" />
                  Transmitting...
                </button>
              ) : (
                <button
                  type="submit"
                  data-cursor-hover
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-5 font-dm text-lg font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-[0_0_40px_rgba(237,29,36,0.35)]"
                >
                  Send Message
                  <Send size={18} />
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </ScrollReveal>
  );
}

function Field({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
