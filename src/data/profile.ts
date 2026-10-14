import aupp from "@/assets/aupp.png";
import fhsu from "@/assets/fhsu.png";

export const contact = {
  email: "p.varith@gmail.com",
  links: [
    {
      label: "Telegram",
      handle: "@Varith_Pheng",
      href: "https://t.me/Varith_Pheng",
      icon: "simple-icons:telegram",
      color: "#26A5E4",
    },
    {
      label: "LinkedIn",
      handle: "Varith Pheng",
      href: "https://www.linkedin.com/in/varith-pheng-85508a2ba/",
      icon: "simple-icons:linkedin",
      color: "#0A66C2",
    },
    {
      label: "GitHub",
      handle: "@VarithPheng",
      href: "https://github.com/VarithPheng",
      icon: "simple-icons:github",
      color: "#FFFFFF",
    },
  ],
};

export const education = [
  {
    school: "American University of Phnom Penh",
    logo: aupp,
    degree: "Bachelor of Science in Information Technology Management",
    years: "2023 – present",
  },
  {
    school: "Fort Hays State University",
    logo: fhsu,
    degree: "Bachelor of Science in Computer Science",
    years: "2023 – present",
  },
];

export interface Project {
  title: string;
  year: number;
  kind: string;
  summary: string;
  details: string[];
  stack: string[];
  links: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    title: "Baray checkout",
    year: 2026,
    kind: "Payments",
    summary:
      "A storefront that takes real payments through Baray, a Cambodian payment gateway. Customers pay by scanning a KHQR code with any Cambodian bank app.",
    details: [
      "Prices are recalculated from the server catalog, so the amount charged can't be changed from the browser.",
      "Order payloads are encrypted with AES-256-CBC before they reach Baray's API.",
      "A webhook decrypts the order ID Baray sends back to confirm each payment.",
    ],
    stack: ["Astro", "TypeScript", "Baray API", "Vercel"],
    links: [
      { label: "Try the store", href: "/store" },
      { label: "Source", href: "https://github.com/VarithPheng/portfolio" },
    ],
  },
  {
    title: "Gold signals",
    year: 2026,
    kind: "Machine learning",
    summary:
      "Turns a pretrained LSTM model's forecast for gold (XAUUSD) into buy, sell or hold signals, with a live dashboard and a backtest.",
    details: [
      "Pulls market data from Yahoo Finance and computes 24 technical indicators per bar.",
      "Only signals when market regime, pullback and indicator agreement all line up with the model.",
      "Backtest over one year of daily data: 2.25 profit factor at a 46% win rate.",
    ],
    stack: ["Python", "Streamlit", "Hugging Face"],
    links: [{ label: "Source", href: "https://github.com/VarithPheng/xauusd-ai" }],
  },
  {
    title: "Health monitor",
    year: 2024,
    kind: "Desktop app",
    summary:
      "A desktop app that reads patient vital signs and flags readings outside the normal range for each patient's age and gender.",
    details: [
      "Stores patient records in PostgreSQL.",
      "Highlights patients who need attention so they stand out in a long list.",
      "Generates realistic test patients for demos and testing.",
    ],
    stack: ["C++", "wxWidgets", "PostgreSQL"],
    links: [{ label: "Source", href: "https://github.com/VarithPheng/HealthMonitoringSystem" }],
  },
];

export const toolTypes = ["Frontend", "Backend", "Databases", "Cloud & DevOps", "Design"] as const;

export interface Tool {
  name: string;
  icon: string;
  type: (typeof toolTypes)[number];
  /** Brand colour, lightened to white where the brand is black so it shows on the dark page. */
  color: string;
}

export const tools: Tool[] = [
  { name: "TypeScript", icon: "simple-icons:typescript", type: "Frontend", color: "#3178C6" },
  { name: "React", icon: "simple-icons:react", type: "Frontend", color: "#61DAFB" },
  { name: "Next.js", icon: "simple-icons:nextdotjs", type: "Frontend", color: "#FFFFFF" },
  { name: "Tailwind CSS", icon: "simple-icons:tailwindcss", type: "Frontend", color: "#06B6D4" },
  { name: "NestJS", icon: "simple-icons:nestjs", type: "Backend", color: "#E0234E" },
  { name: "Express", icon: "simple-icons:express", type: "Backend", color: "#FFFFFF" },
  { name: "FastAPI", icon: "simple-icons:fastapi", type: "Backend", color: "#009688" },
  { name: "PostgreSQL", icon: "simple-icons:postgresql", type: "Databases", color: "#4169E1" },
  { name: "MySQL", icon: "simple-icons:mysql", type: "Databases", color: "#4479A1" },
  { name: "Supabase", icon: "simple-icons:supabase", type: "Databases", color: "#3FCF8E" },
  { name: "Docker", icon: "simple-icons:docker", type: "Cloud & DevOps", color: "#2496ED" },
  { name: "AWS", icon: "simple-icons:amazonwebservices", type: "Cloud & DevOps", color: "#FF9900" },
  { name: "Vercel", icon: "simple-icons:vercel", type: "Cloud & DevOps", color: "#FFFFFF" },
  { name: "Figma", icon: "simple-icons:figma", type: "Design", color: "#F24E1E" },
];

/** Logos for project tech that isn't in the main stack list. */
const otherLogos: Record<string, { icon: string; color: string }> = {
  Astro: { icon: "simple-icons:astro", color: "#FF5D01" },
  Python: { icon: "simple-icons:python", color: "#3776AB" },
  Streamlit: { icon: "simple-icons:streamlit", color: "#FF4B4B" },
  "Hugging Face": { icon: "simple-icons:huggingface", color: "#FFD21E" },
  "C++": { icon: "simple-icons:cplusplus", color: "#00599C" },
};

/** Logo and brand colour for a piece of tech, e.g. to show next to a project's stack. */
export const findLogo = (name: string) => tools.find((t) => t.name === name) ?? otherLogos[name];

/** Page sections, in order, as listed in the rail and the mobile dock. */
export const sections = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
