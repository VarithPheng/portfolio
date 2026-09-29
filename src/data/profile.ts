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
    },
    {
      label: "LinkedIn",
      handle: "Varith Pheng",
      href: "https://www.linkedin.com/in/varith-pheng-85508a2ba/",
      icon: "simple-icons:linkedin",
    },
    {
      label: "GitHub",
      handle: "@VarithPheng",
      href: "https://github.com/VarithPheng",
      icon: "simple-icons:github",
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

export const toolTypes = ["Frontend", "Backend", "Databases", "Cloud & DevOps", "Design"] as const;

export interface Tool {
  name: string;
  icon: string;
  type: (typeof toolTypes)[number];
}

export const tools: Tool[] = [
  { name: "TypeScript", icon: "simple-icons:typescript", type: "Frontend" },
  { name: "React", icon: "simple-icons:react", type: "Frontend" },
  { name: "Next.js", icon: "simple-icons:nextdotjs", type: "Frontend" },
  { name: "Tailwind CSS", icon: "simple-icons:tailwindcss", type: "Frontend" },
  { name: "NestJS", icon: "simple-icons:nestjs", type: "Backend" },
  { name: "Express", icon: "simple-icons:express", type: "Backend" },
  { name: "FastAPI", icon: "simple-icons:fastapi", type: "Backend" },
  { name: "PostgreSQL", icon: "simple-icons:postgresql", type: "Databases" },
  { name: "MySQL", icon: "simple-icons:mysql", type: "Databases" },
  { name: "Supabase", icon: "simple-icons:supabase", type: "Databases" },
  { name: "Docker", icon: "simple-icons:docker", type: "Cloud & DevOps" },
  { name: "AWS", icon: "simple-icons:amazonwebservices", type: "Cloud & DevOps" },
  { name: "Vercel", icon: "simple-icons:vercel", type: "Cloud & DevOps" },
  { name: "Figma", icon: "simple-icons:figma", type: "Design" },
];

/** Tools grouped by type, in `toolTypes` order; empty types are skipped. */
export const toolGroups = toolTypes
  .map((type) => ({ type, tools: tools.filter((t) => t.type === type) }))
  .filter((g) => g.tools.length > 0);
