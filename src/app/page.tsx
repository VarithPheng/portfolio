"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Send, Download, Phone, Mail, ShoppingBag } from "lucide-react";
import { Icon } from "@iconify/react";
import { Marquee } from "@/components/magicui/marquee";
import { FrontendIcons, BackendIcons } from "@/components/ui/icon";

// ─── Layout rule ─────────────────────────────────────────────────────────────
// Every section has NO horizontal padding.
// All horizontal padding + max-width lives in ONE inner wrapper:
//   <div className="w-full max-w-5xl mx-auto px-5 lg:px-8">
// This guarantees pixel-perfect centering at all screen widths.
// ─────────────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [isLoading,   setIsLoading]   = useState(true);
  const [isOnline,    setIsOnline]    = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const on  = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online",  on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online",  on);
      window.removeEventListener("offline", off);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h   = (now.getUTCHours() + 7) % 24;
      const m   = now.getUTCMinutes();
      setCurrentTime(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const LANGUAGES = [
    { name: "TypeScript", icon: "skill-icons:typescript",  color: "#3178C6" },
    { name: "Python",     icon: "skill-icons:python-dark", color: "#3776AB" },
    { name: "Java",       icon: "skill-icons:java-dark",   color: "#ED8B00" },
  ];

  const EDUCATION = [
    {
      logo:   "/assets/aupp.png",
      name:   "American University of Phnom Penh",
      degree: "B.S. Information Technology Management",
      years:  "2022 – Present",
    },
    {
      logo:   "/assets/fhsu.png",
      name:   "Fort Hays State University",
      degree: "B.S. Computer Science",
      years:  "2022 – Present",
    },
  ];

  /* ── Loading ─────────────────────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#030303] flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="glass w-14 h-14 !rounded-2xl flex items-center justify-center">
            <span className="text-white/75 font-semibold text-lg tracking-wide select-none relative z-10">
              VP
            </span>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white/20"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Page ────────────────────────────────────────────────────────────────── */
  return (
    <div className="bg-[#030303] text-white">

      {/* ── Background blobs — glass needs something behind it to blur ────── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-[140px]" />
        <div className="absolute -bottom-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-white/[0.02]  blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/[0.012] blur-[100px]" />
      </div>

      {/* ── Floating Pill Navbar ──────────────────────────────────────────── */}
      <motion.nav
        className="fixed top-5 left-1/2 -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1,  y: 0   }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="glass-pill px-5 py-2.5 flex items-center gap-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <motion.span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isOnline ? "bg-emerald-400" : "bg-red-400"}`}
              animate={isOnline ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-white/80 text-sm font-medium tracking-wide hover:text-white transition-colors"
            >
              Varith
            </button>
          </div>

          <div className="w-px h-3.5 bg-white/10 flex-shrink-0" />

          <div className="hidden lg:flex items-center gap-5">
            {[
              { label: "About",   id: "education" },
              { label: "Stack",   id: "techstack"  },
              { label: "Connect", id: "connect"    },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-white/40 text-sm hover:text-white/80 transition-colors"
              >
                {label}
              </button>
            ))}
            <div className="w-px h-3.5 bg-white/10 flex-shrink-0" />
          </div>

          <Link
            href="/store"
            className="flex items-center gap-1.5 text-white/40 text-sm hover:text-white/80 transition-colors"
          >
            <ShoppingBag size={13} /> Store
          </Link>

          {currentTime && (
            <span className="hidden lg:block text-white/20 text-xs font-mono tabular-nums">
              {currentTime}
            </span>
          )}
          <div className="hidden lg:block w-px h-3.5 bg-white/10 flex-shrink-0" />

          <div className="flex items-center gap-3">
            <a href="https://github.com/VarithPheng"                      target="_blank" rel="noopener noreferrer" className="text-white/35 hover:text-white/80 transition-colors"><Github   size={13} /></a>
            <a href="https://www.linkedin.com/in/varith-pheng-85508a2ba/" target="_blank" rel="noopener noreferrer" className="text-white/35 hover:text-white/80 transition-colors"><Linkedin size={13} /></a>
            <a href="https://t.me/Varith_Pheng"                           target="_blank" rel="noopener noreferrer" className="text-white/35 hover:text-white/80 transition-colors"><Send     size={13} /></a>
          </div>
        </div>
      </motion.nav>

      {/* ─────────────────────────────────────────────────────────────────────
          HERO
          min-h-screen + flex items-center + py-24 (symmetric) = content at 50vh
          No horizontal padding on <section> — all padding inside the wrapper div
          ─────────────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center py-24">
        <div className="w-full max-w-5xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Text */}
            <motion.div
              className="space-y-8 text-center lg:text-left order-2 lg:order-1"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1,  y: 0  }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-3">
                <p className="eyebrow">Software Developer · Phnom Penh</p>
                <h1
                  className="font-bold text-white tracking-tight leading-[1.05]"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
                >
                  Varith<br />PHENG
                </h1>
              </div>
              <p className="text-white/45 text-[15px] leading-relaxed max-w-sm mx-auto lg:mx-0">
                3rd year student at AUPP &amp; FHSU, building full-stack
                applications with modern web technologies.
              </p>
              <div className="flex flex-col lg:flex-row gap-3 items-center lg:items-start">
                <motion.a
                  href="/assets/cv.pdf"
                  download
                  className="btn-primary w-full lg:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={14} /> Download CV
                </motion.a>
                <motion.button
                  onClick={() => scrollTo("connect")}
                  className="btn-outline w-full lg:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get in touch
                </motion.button>
              </div>
            </motion.div>

            {/* Photo */}
            <motion.div
              className="flex justify-center lg:justify-end order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1,  scale: 1   }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="glass-photo-frame">
                <div className="relative rounded-[22px] overflow-hidden">
                  <Image
                    src="/assets/varith.jpg"
                    alt="Varith PHENG"
                    width={280}
                    height={336}
                    className="w-[200px] h-[240px] lg:w-[280px] lg:h-[336px] object-cover object-center block"
                    priority
                  />
                  <div className="glass-name-tag">
                    <span className="text-white/80 text-sm font-medium">Varith PHENG</span>
                    <span className="text-white/30 text-[11px] tracking-widest uppercase">Software Developer</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          BENTO GRID
          Same wrapper: w-full max-w-5xl mx-auto px-5 lg:px-8
          ─────────────────────────────────────────────────────────────────── */}
      <section className="pb-28">
        <div className="w-full max-w-5xl mx-auto px-5 lg:px-8">
          <div className="bento-grid">

            {/* Education */}
            <motion.div
              id="education"
              className="glass bento-edu p-7 lg:p-9"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45 }}
            >
              <p className="eyebrow mb-6">Education</p>
              <div className="space-y-6 relative z-10">
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="glass-icon-box">
                      <Image src={edu.logo} alt={edu.name} width={28} height={28} className="object-contain w-full h-full" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/75 text-sm font-medium leading-snug">{edu.name}</p>
                      <p className="text-white/38 text-xs mt-1.5">{edu.degree}</p>
                      <p className="text-white/22 text-xs mt-1">{edu.years}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              className="glass bento-lang p-7 lg:p-9"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.07 }}
            >
              <p className="eyebrow mb-6">Languages</p>
              <div className="flex flex-row lg:flex-col gap-3 flex-wrap relative z-10">
                {LANGUAGES.map((lang) => (
                  <div key={lang.name} className="glass-lang-item flex items-center gap-3">
                    <Icon icon={lang.icon} width={20} height={20} style={{ color: lang.color }} />
                    <span className="text-white/60 text-sm">{lang.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              id="techstack"
              className="glass bento-stack p-7 lg:p-9"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <p className="eyebrow mb-6">Tech Stack</p>
              <div className="space-y-5 relative z-10">
                <div>
                  <p className="text-white/18 text-[11px] tracking-[0.14em] uppercase mb-3">Frontend</p>
                  <Marquee pauseOnHover className="[--duration:32s]" reverse>
                    <FrontendIcons showLoading={false} loadingDelay={0} />
                  </Marquee>
                </div>
                <div>
                  <p className="text-white/18 text-[11px] tracking-[0.14em] uppercase mb-3">Backend</p>
                  <Marquee pauseOnHover className="[--duration:48s]">
                    <BackendIcons showLoading={false} loadingDelay={0} />
                  </Marquee>
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              id="connect"
              className="glass bento-cta overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.13 }}
            >
              <div className="grid lg:grid-cols-[1fr_1.6fr] relative z-10">

                {/* Info */}
                <div className="p-7 lg:p-9 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                  <p className="eyebrow mb-5">Connect</p>
                  <h3 className="text-white text-xl lg:text-2xl font-semibold leading-tight mb-2">
                    Let&apos;s build<br />something.
                  </h3>
                  <p className="text-white/30 text-sm leading-relaxed mb-7">
                    Open for freelance work and collaborations.
                  </p>
                  <div className="space-y-3 mb-7">
                    <a href="tel:+85589980726" className="flex items-center gap-3 text-white/40 text-sm hover:text-white/70 transition-colors">
                      <span className="glass-icon-sm"><Phone size={11} /></span>+855 89 980 726
                    </a>
                    <a href="mailto:p.varith@gmail.com" className="flex items-center gap-3 text-white/40 text-sm hover:text-white/70 transition-colors">
                      <span className="glass-icon-sm"><Mail size={11} /></span>p.varith@gmail.com
                    </a>
                  </div>
                  <div className="flex gap-2.5">
                    {[
                      { I: Send,     href: "https://t.me/Varith_Pheng",                           label: "Telegram" },
                      { I: Linkedin, href: "https://www.linkedin.com/in/varith-pheng-85508a2ba/", label: "LinkedIn" },
                      { I: Github,   href: "https://github.com/VarithPheng",                      label: "GitHub"   },
                    ].map(({ I, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="glass-social-btn" title={label}>
                        <I size={14} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <div className="p-7 lg:p-9">
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid lg:grid-cols-2 gap-4">
                      <input type="text"  placeholder="Name"    className="glass-input" />
                      <input type="email" placeholder="Email"   className="glass-input" />
                    </div>
                    <input type="text" placeholder="Subject" className="glass-input" />
                    <textarea placeholder="Message" rows={5} className="glass-input resize-none" />
                    <motion.button
                      type="submit"
                      className="btn-primary w-full"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="pb-10">
        <div className="w-full max-w-5xl mx-auto px-5 lg:px-8">
          <div className="border-t border-white/[0.05] pt-6 flex flex-col lg:flex-row items-center justify-between gap-2">
            <p className="text-white/[0.18] text-xs">© 2025 Varith PHENG. All rights reserved.</p>
            <p className="text-white/[0.18] text-xs">Software Developer · Phnom Penh</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
