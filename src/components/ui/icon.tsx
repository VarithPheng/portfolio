"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

// Tech stack data with their respective icons and colors
export const TECH_STACK = {
  // Frontend Technologies
  frontend: [
    { name: "Angular", icon: "skill-icons:angular-dark", color: "#DD0031" },
    { name: "React", icon: "skill-icons:react-dark", color: "#61DAFB" },
    { name: "Next.js", icon: "skill-icons:nextjs-dark", color: "#FFFFFF" },
    {
      name: "Tailwind CSS",
      icon: "skill-icons:tailwindcss-dark",
      color: "#38BDF8",
    },
    { name: "shadcn/ui", icon: "simple-icons:shadcnui", color: "#FFFFFF" },
    { name: "Figma", icon: "skill-icons:figma-dark", color: "#F24E1E" },
    { name: "Vercel", icon: "skill-icons:vercel-dark", color: "#FFFFFF" },
  ],
  // Backend & Infrastructure
  backend: [
    {
      name: "Express.js",
      icon: "skill-icons:expressjs-dark",
      color: "#FFFFFF",
    },
    { name: "NestJS", icon: "skill-icons:nestjs-dark", color: "#E0234E" },
    { name: "FastAPI", icon: "skill-icons:fastapi", color: "#009688" },
    { name: "MySQL", icon: "skill-icons:mysql-dark", color: "#4479A1" },
    {
      name: "PostgreSQL",
      icon: "skill-icons:postgresql-dark",
      color: "#336791",
    },
    { name: "Oracle", icon: "simple-icons:oracle", color: "#F80000" },
    { name: "Supabase", icon: "skill-icons:supabase-dark", color: "#3ECF8E" },
    { name: "Docker", icon: "skill-icons:docker", color: "#2496ED" },
    { name: "AWS", icon: "skill-icons:aws-dark", color: "#FF9900" },
    { name: "Swagger", icon: "simple-icons:swagger", color: "#85EA2D" },
    { name: "Postman", icon: "skill-icons:postman", color: "#FF6C37" },
  ],
  // Programming Languages
  languages: [
    { name: "TypeScript", icon: "skill-icons:typescript", color: "#3178C6" },
    { name: "Python", icon: "skill-icons:python-dark", color: "#3776AB" },
    { name: "Java", icon: "skill-icons:java-dark", color: "#ED8B00" },
  ],
} as const;

// Type definitions
export type TechItem = {
  name: string;
  icon: string; // Now uses icon name string instead of React component
  color: string;
};

interface TechIconProps {
  tech: TechItem;
  showLoading?: boolean;
  loadingDelay?: number;
  className?: string;
}

// Loading skeleton component
const IconSkeleton = ({ className }: { className?: string }) => (
  <div
    className={`flex flex-col items-center justify-center p-5 mx-3 min-w-[108px] h-[90px] border border-white/[0.07] rounded-xl bg-white/[0.02] ${
      className || ""
    }`}
  >
    <div className="w-6 h-6 bg-white/10 rounded animate-pulse mb-2"></div>
    <div className="w-14 h-2.5 bg-white/10 rounded animate-pulse"></div>
  </div>
);

// Individual tech icon component with preloading
export const TechIcon = ({
  tech,
  showLoading = true,
  loadingDelay = 200,
  className = "",
}: TechIconProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, loadingDelay);

    return () => clearTimeout(timer);
  }, [loadingDelay]);

  // Show skeleton while loading
  if (showLoading && !isLoaded) {
    return <IconSkeleton className={className} />;
  }

  // Error fallback
  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-5 mx-3 min-w-[108px] h-[90px] border border-white/[0.07] rounded-xl bg-white/[0.02] ${className}`}
      >
        <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-xs text-white/30">
          ?
        </div>
        <span className="text-xs text-white/30 mt-2">{tech.name}</span>
      </div>
    );
  }

  try {
    return (
      <div
        className={`flex flex-col items-center justify-center p-5 mx-3 min-w-[108px] h-[90px] border border-white/[0.07] rounded-xl bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-300 group cursor-pointer ${className}`}
      >
        <Icon
          icon={tech.icon}
          width={26}
          height={26}
          style={{ color: tech.color }}
          className="mb-2 opacity-80 group-hover:opacity-100 transition-opacity"
          onError={() => setHasError(true)}
        />
        <span className="text-[13px] font-medium text-white/45 group-hover:text-white/80 transition-colors">
          {tech.name}
        </span>
      </div>
    );
  } catch {
    setHasError(true);
    return <IconSkeleton className={className} />;
  }
};

// Bulk icon preloader hook
export const useIconPreloader = (icons: TechItem[], delay: number = 1000) => {
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return allLoaded;
};

// Convenience components for different tech categories
export const FrontendIcons = ({
  showLoading = true,
  loadingDelay = 100,
  className = "",
}: {
  showLoading?: boolean;
  loadingDelay?: number;
  className?: string;
}) => (
  <>
    {TECH_STACK.frontend.map((tech, index) => (
      <TechIcon
        key={tech.name}
        tech={tech}
        showLoading={showLoading}
        loadingDelay={loadingDelay + index * 50}
        className={className}
      />
    ))}
  </>
);

export const BackendIcons = ({
  showLoading = true,
  loadingDelay = 100,
  className = "",
}: {
  showLoading?: boolean;
  loadingDelay?: number;
  className?: string;
}) => (
  <>
    {TECH_STACK.backend.map((tech, index) => (
      <TechIcon
        key={tech.name}
        tech={tech}
        showLoading={showLoading}
        loadingDelay={loadingDelay + index * 50}
        className={className}
      />
    ))}
  </>
);

export const LanguageIcons = ({
  showLoading = true,
  loadingDelay = 100,
  className = "",
}: {
  showLoading?: boolean;
  loadingDelay?: number;
  className?: string;
}) => (
  <>
    {TECH_STACK.languages.map((tech, index) => (
      <TechIcon
        key={tech.name}
        tech={tech}
        showLoading={showLoading}
        loadingDelay={loadingDelay + index * 50}
        className={className}
      />
    ))}
  </>
);

// All icons combined (useful for marquee)
export const AllTechIcons = ({
  showLoading = true,
  loadingDelay = 100,
  className = "",
  category = "all",
}: {
  showLoading?: boolean;
  loadingDelay?: number;
  className?: string;
  category?: "all" | "frontend" | "backend" | "languages";
}) => {
  const getIcons = () => {
    switch (category) {
      case "frontend":
        return TECH_STACK.frontend;
      case "backend":
        return TECH_STACK.backend;
      case "languages":
        return TECH_STACK.languages;
      default:
        return [...TECH_STACK.frontend, ...TECH_STACK.backend];
    }
  };

  const icons = getIcons();

  return (
    <>
      {icons.map((tech, index) => (
        <TechIcon
          key={tech.name}
          tech={tech}
          showLoading={showLoading}
          loadingDelay={loadingDelay + index * 30}
          className={className}
        />
      ))}
    </>
  );
};
