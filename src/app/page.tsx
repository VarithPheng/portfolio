"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Send,
  Download,
  Phone,
  Mail,
  Terminal,
  Code2,
  Coffee,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { Marquee } from "@/components/magicui/marquee";
import { FrontendIcons, BackendIcons } from "@/components/ui/icon";

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const terminalCommands = [
    "git status",
    "bun run build",
    "docker compose up -d --build",
    "yarn test --coverage",
    "bun dev --turbo",
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border border-white border-t-transparent mx-auto mb-8"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex space-x-2 text-white text-sm tracking-widest"
          >
            {["L", "O", "A", "D", "I", "N", "G"].map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Advanced Developer Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto">
          {/* Top Status Bar */}
          <div className="flex justify-between items-center py-2 px-4 text-xs text-gray-400 border-b border-gray-800/50">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isOnline ? "bg-green-400" : "bg-red-400"
                  }`}
                ></div>
                <span>{isOnline ? "ONLINE" : "OFFLINE"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Terminal size={12} />
                <span>dev-env:active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coffee size={12} />
                <span>caffeine:high</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <span>UTC+7 {currentTime}</span>
              <div className="flex items-center space-x-2">
                <Code2 size={12} />
                <span>TypeScript</span>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex justify-between items-center py-4">
            {/* Developer Identity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-mono"
            >
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-green-400">
                  <span className="text-gray-400">developer@portfolio:~$</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-1"
                  >
                    _
                  </motion.span>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1 ml-12">
                Full-Stack Engineer | System Architect
              </div>
            </motion.div>

            {/* Navigation Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex items-center space-x-8"
            >
              {[
                {
                  name: "Education",
                  section: "education",
                  cmd: "cat education.md",
                },
                {
                  name: "Tech Stack",
                  section: "techstack",
                  cmd: "ls -la tech/",
                },
                {
                  name: "Connect",
                  section: "connect",
                  cmd: "curl contact.dev",
                },
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.section)}
                  className="group relative"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-gray-300 hover:text-white transition-colors font-mono text-sm">
                    ./{item.name.toLowerCase()}
                  </div>
                  <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-green-400 font-mono whitespace-nowrap">
                    $ {item.cmd}
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Developer Tools */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-4"
            >
              {/* Terminal Toggle */}
              <motion.button
                onClick={() => setTerminalOpen(!terminalOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 border border-gray-700 hover:border-gray-500 transition-colors"
              >
                <Terminal size={16} />
              </motion.button>

              {/* Social Links with Tooltips */}
              <div className="flex space-x-3">
                {[
                  {
                    icon: Github,
                    url: "https://github.com/VarithPheng",
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    url: "https://www.linkedin.com/in/varith-pheng-85508a2ba/",
                    label: "LinkedIn",
                  },
                  {
                    icon: Send,
                    url: "https://t.me/Varith_Pheng",
                    label: "Telegram",
                  },
                ].map(({ icon: Icon, url, label }) => (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2 hover:bg-gray-900 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon
                      size={16}
                      className="text-gray-400 group-hover:text-white transition-colors"
                    />
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400 whitespace-nowrap">
                      {label}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Mini Terminal */}
          <AnimatePresence>
            {terminalOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-800 bg-gray-900/50 overflow-hidden"
              >
                <div className="p-4 font-mono text-sm">
                  <div className="flex items-center space-x-2 text-green-400 mb-2">
                    <span>varith@portfolio:~$</span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      _
                    </motion.span>
                  </div>
                  <div className="space-y-1 text-gray-300 text-xs">
                    {terminalCommands.map((cmd, index) => (
                      <motion.div
                        key={cmd}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:text-white cursor-pointer"
                      >
                        <span className="text-green-400">$</span> {cmd}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="section min-h-screen flex items-center"
        style={{ paddingTop: "140px" }}
      >
        <div className="container mx-auto">
          <div className="grid-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="mb-10">
                Software Developer
                <br />
                Based in Phnom Penh
              </h1>
              <p className="text-gray-400 text-lg mb-16 leading-relaxed max-w-lg">
                3rd year university student passionate about creating clean,
                functional software solutions with modern technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/assets/cv.pdf"
                  download
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary inline-flex items-center gap-3"
                >
                  <Download size={16} />
                  Download CV
                </motion.a>
                <motion.button
                  onClick={() => scrollToSection("connect")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary"
                >
                  Get in touch
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="w-80 h-80 border border-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 border border-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-2xl font-mono">VP</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Varith PHENG</h3>
                      <p className="text-gray-400 text-sm">
                        SOFTWARE DEVELOPER
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section section-alt">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="mb-8">Academic Background</h2>
            <p className="text-gray-400 max-w-2xl">
              Currently pursuing dual bachelor degrees in Computer Science and
              Information Technology Management.
            </p>
          </motion.div>

          <div className="grid-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="border border-gray-700 p-8 rounded-lg bg-gray-900/20 hover:bg-gray-900/40 transition-colors"
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative h-12 w-32 flex-shrink-0">
                    <Image
                      src="/assets/aupp.png"
                      alt="American University of Phnom Penh Logo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <h3 className="text-xl font-medium">
                    American University of Phnom Penh
                  </h3>
                </div>
                <div className="ml-36 space-y-3">
                  <p className="text-gray-300 text-lg">
                    Bachelor of Science in Information Technology Management
                  </p>
                  <p className="text-gray-500">2022 - Present</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="border border-gray-700 p-8 rounded-lg bg-gray-900/20 hover:bg-gray-900/40 transition-colors"
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative h-12 w-32 flex-shrink-0">
                    <Image
                      src="/assets/fhsu.png"
                      alt="Fort Hays State University Logo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <h3 className="text-xl font-medium">
                    Fort Hays State University
                  </h3>
                </div>
                <div className="ml-36 space-y-3">
                  <p className="text-gray-300 text-lg">
                    Bachelor of Science in Computer Science
                  </p>
                  <p className="text-gray-500">2022 - Present</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="techstack" className="section">
        <div className="container mx-auto">
          {/* Programming Languages */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="mb-8">Programming Languages</h2>
            <p className="text-gray-400 max-w-2xl mb-20">
              Core programming languages I use for development.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  name: "TypeScript",
                  icon: "skill-icons:typescript",
                  color: "#3178C6",
                },
                {
                  name: "Python",
                  icon: "skill-icons:python-dark",
                  color: "#3776AB",
                },
                {
                  name: "Java",
                  icon: "skill-icons:java-dark",
                  color: "#ED8B00",
                },
              ].map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="skill-item group p-6 border border-gray-700 rounded-lg bg-gray-900/20 hover:bg-gray-900/40 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <Icon
                      icon={lang.icon}
                      width={40}
                      height={40}
                      className="text-gray-400 group-hover:text-white transition-colors flex-shrink-0"
                      style={{ color: lang.color }}
                    />
                    <span className="text-xl font-medium">{lang.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="mb-8">Tech Stack</h2>
            <p className="text-gray-400 max-w-2xl mb-20">
              Technologies and tools I use to build modern, scalable
              applications.
            </p>

            <div className="space-y-12">
              {/* First Marquee Row - Right to Left */}
              <Marquee
                className="rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 py-6"
                pauseOnHover={true}
                reverse={true}
                loadingDelay={800}
              >
                <FrontendIcons showLoading={false} loadingDelay={0} />
              </Marquee>

              {/* Second Marquee Row - Left to Right */}
              <Marquee
                className="rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 py-6"
                pauseOnHover={true}
                reverse={false}
                loadingDelay={800}
              >
                <BackendIcons showLoading={false} loadingDelay={0} />
              </Marquee>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="section section-alt">
        <div className="container mx-auto">
          <div className="grid-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-12">Let&apos;s Connect</h2>

              <div className="space-y-8 mb-16">
                <div className="flex items-center gap-4">
                  <Phone size={18} className="text-gray-400" />
                  <span>+855 89 980 726</span>
                </div>

                <div className="flex items-center gap-4">
                  <Mail size={18} className="text-gray-400" />
                  <span>p.varith@gmail.com</span>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="https://t.me/Varith_Pheng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Telegram
                </a>
                <a
                  href="https://www.linkedin.com/in/varith-pheng-85508a2ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/VarithPheng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="form-input"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Message"
                    className="form-textarea"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Varith PHENG. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
