"use client";

import { useState, FormEvent } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  const inputClass =
    "w-full rounded border border-dark-border bg-dark-elevated px-[18px] py-[14px] font-dm text-base text-white placeholder-[#4a4a4a] transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10";

  const labelClass =
    "mb-2 block font-dm text-[13px] uppercase tracking-[0.1em] text-muted";

  if (status === "success") {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dark-border bg-dark-surface p-10 text-center">
        <CheckCircle size={48} className="mb-4 text-green-500" />
        <p className="font-dm text-lg text-white">
          Message sent successfully! We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-dark-border bg-dark-surface p-10">
      <h2 className="mb-8 font-dm text-[28px] font-bold text-white">Send Us a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Full Name</label>
            <input type="text" required placeholder="Your name" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Company Name</label>
            <input type="text" placeholder="Company" className={inputClass} />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Email Address</label>
            <input type="email" required placeholder="email@company.com" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" placeholder="+91" className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Service Required</label>
          <select required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Message</label>
          <textarea
            required
            rows={6}
            placeholder="Tell us about your project..."
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded bg-primary py-[18px] font-dm text-lg font-semibold text-white transition-all hover:scale-[1.01] hover:bg-primary-dark active:scale-[0.99] disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
