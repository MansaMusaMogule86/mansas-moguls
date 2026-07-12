"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Mail, MapPin, Briefcase, User, Building2, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CTASectionProps {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function CTASection({ 
  title = "TALK TO\nTHE EMPIRE", 
  description = "Partnerships, investments, press, or building with us — reach the right division.",
  primary,
  secondary 
}: CTASectionProps = {}) {
  const angledClipPath = {
    clipPath: "polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)"
  };

  const simpleAngledClip = {
    clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
  };

  const [sent, setSent] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#020202] py-24 overflow-hidden border-t border-gold/10 flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Golden floor grid */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[60vh] opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 100%, rgba(212,175,55,0.4) 0%, transparent 60%), linear-gradient(0deg, transparent 24%, rgba(212,175,55,0.3) 25%, rgba(212,175,55,0.3) 26%, transparent 27%, transparent 74%, rgba(212,175,55,0.3) 75%, rgba(212,175,55,0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(212,175,55,0.3) 25%, rgba(212,175,55,0.3) 26%, transparent 27%, transparent 74%, rgba(212,175,55,0.3) 75%, rgba(212,175,55,0.3) 76%, transparent 77%, transparent)",
            backgroundSize: "100% 100%, 60px 60px, 60px 60px",
            transform: "perspective(500px) rotateX(60deg) translateY(100px) scale(2)",
            maskImage: "linear-gradient(to top, black, transparent)"
          }}
        />
        
        {/* Deep background flares */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gold/10 blur-[120px] rounded-full opacity-30" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-gold/5 blur-[150px] rounded-full opacity-40" />

        {/* Central Logo Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] w-[800px] h-[800px]">
          <Image src="/mansas-moguls-crown.png" alt="Logo Watermark" fill className="object-contain" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Text & Contact Nodes */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="text-[10px] uppercase font-mono tracking-[0.3em] text-gold mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-gold/50" />
                GET IN TOUCH
              </div>
              <h2 className="text-5xl lg:text-7xl font-heading mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-gold/80 to-gold/30 pb-2 whitespace-pre-line" style={{ textShadow: "0 4px 30px rgba(212,175,55,0.2)" }}>
                {title}
              </h2>
              <p className="text-gray-400 max-w-md leading-relaxed text-sm">
                {description}
              </p>

              {(primary || secondary) && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {primary && (
                    <Link
                      href={primary.href}
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold via-gold-bright to-gold px-6 text-sm font-semibold text-empire-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(214,170,56,0.45)]"
                    >
                      {primary.label}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                  {secondary && (
                    <Link
                      href={secondary.href}
                      className="inline-flex h-12 items-center justify-center rounded-lg border border-gold/25 bg-gold/5 px-6 text-sm font-medium text-gold backdrop-blur-md transition-colors hover:border-gold/50 hover:bg-gold/10 hover:text-gold-bright"
                    >
                      {secondary.label}
                    </Link>
                  )}
                </div>
              )}
            </motion.div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "EMAIL", value: "empire@mansasmoguls.com" },
                { icon: MapPin, label: "HEADQUARTERS", value: "Dubai, United Arab Emirates" },
                { icon: Briefcase, label: "ENTITY", value: "Mansas Moguls Holding" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative p-[1px] bg-gradient-to-r from-gold/30 to-white/5 cursor-pointer"
                  style={simpleAngledClip}
                >
                  <div 
                    className="relative w-full h-full bg-[#0a0a0a] flex items-center justify-between p-5 transition-colors duration-500 group-hover:bg-[#111]"
                    style={simpleAngledClip}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5 group-hover:bg-gold/10 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                        <item.icon size={16} className="text-gold" />
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-widest text-gold/70 mb-1">{item.label}</div>
                        <div className="text-sm text-white font-medium tracking-wide">{item.value}</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-gold/50 group-hover:text-gold transition-colors transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: The Secure Message Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-[1px] bg-gradient-to-br from-gold/40 via-white/5 to-gold/10 shadow-[0_0_50px_rgba(212,175,55,0.05)]"
            style={angledClipPath}
          >
            <div 
              className="relative w-full h-full bg-[#080808] p-8 lg:p-10 flex flex-col"
              style={angledClipPath}
            >
              <div className="text-[10px] uppercase font-mono tracking-[0.2em] text-gold mb-8">
                SEND A MESSAGE
              </div>

              <form
                className="space-y-6 flex-1 flex flex-col"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 flex items-center gap-1">
                      NAME <span className="text-gold">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={14} className="text-gold/50 group-focus-within:text-gold transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full bg-[#111] border border-white/5 text-white text-sm pl-10 pr-4 py-3 rounded outline-none focus:border-gold/30 focus:bg-[#151515] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 flex items-center gap-1">
                      EMAIL <span className="text-gold">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={14} className="text-gold/50 group-focus-within:text-gold transition-colors" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@company.com"
                        className="w-full bg-[#111] border border-white/5 text-white text-sm pl-10 pr-4 py-3 rounded outline-none focus:border-gold/30 focus:bg-[#151515] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 flex items-center gap-1">
                      COMPANY <span className="text-gold">*</span>
                    </label>
                    <span className="text-[9px] uppercase tracking-widest text-gray-600">Optional</span>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Building2 size={14} className="text-gold/50 group-focus-within:text-gold transition-colors" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Company or venture" 
                      className="w-full bg-[#111] border border-white/5 text-white text-sm pl-10 pr-4 py-3 rounded outline-none focus:border-gold/30 focus:bg-[#151515] transition-all"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2 flex-1 flex flex-col">
                  <label className="text-[9px] uppercase tracking-widest text-gray-400 flex items-center gap-1">
                    MESSAGE <span className="text-gold">*</span>
                  </label>
                  <div className="relative group flex-1 flex flex-col">
                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                      <Pencil size={14} className="text-gold/50 group-focus-within:text-gold transition-colors" />
                    </div>
                    <textarea
                      name="message"
                      required
                      placeholder="How can the empire help?"
                      className="w-full flex-1 min-h-[120px] bg-[#111] border border-white/5 text-white text-sm pl-10 pr-4 py-3 rounded outline-none focus:border-gold/30 focus:bg-[#151515] transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={sent}
                  className="w-full relative group overflow-hidden rounded py-4 mt-4 disabled:cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#f9e596] to-[#b38b22] opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                  <div className="relative flex items-center justify-center gap-2 text-black font-bold text-xs uppercase tracking-[0.2em]">
                    {sent ? (
                      <>
                        MESSAGE SENT
                        <Check size={14} strokeWidth={3} />
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                        <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
            
            {/* Corner Accent Glows */}
            <div className="absolute top-0 left-0 w-8 h-8 bg-gold/30 blur-[20px]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-gold/30 blur-[20px]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
