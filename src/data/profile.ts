import aupp from "@/assets/aupp.png";
import fhsu from "@/assets/fhsu.png";

export const contact = {
  email: "p.varith@gmail.com",
  phone: "+855 89 980 726",
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

export interface Tool {
  name: string;
  icon: string;
}

export const tools: Tool[] = [
  { name: "TypeScript", icon: "simple-icons:typescript" },
  { name: "React", icon: "simple-icons:react" },
  { name: "React", icon: "simple-icons:react" },
  { name: "Next.js", icon: "simple-icons:nextdotjs" },
  { name: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
  { name: "Figma", icon: "simple-icons:figma" },
  { name: "NestJS", icon: "simple-icons:nestjs" },
  { name: "Express", icon: "simple-icons:express" },
  { name: "FastAPI", icon: "simple-icons:fastapi" },
  { name: "PostgreSQL", icon: "simple-icons:postgresql" },
  { name: "MySQL", icon: "simple-icons:mysql" },
  { name: "Supabase", icon: "simple-icons:supabase" },
  { name: "Docker", icon: "simple-icons:docker" },
  { name: "AWS", icon: "simple-icons:amazonwebservices" },
  { name: "Vercel", icon: "simple-icons:vercel" },
];
