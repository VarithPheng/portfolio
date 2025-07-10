import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
  /**
   * Whether to show loading skeleton while content loads
   * @default true
   */
  showLoadingSkeleton?: boolean;
  /**
   * Time to wait before starting animation (in ms)
   * @default 1000
   */
  loadingDelay?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  showLoadingSkeleton = true,
  loadingDelay = 1000,
  ...props
}: MarqueeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Wait for images and icons to load
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Add a small delay after loading to ensure smooth start
      setTimeout(() => setHasStarted(true), 100);
    }, loadingDelay);

    return () => clearTimeout(timer);
  }, [loadingDelay]);

  // Preload any images in the children
  useEffect(() => {
    const images = document.querySelectorAll("img");
    const promises: Promise<void>[] = [];

    images.forEach((img) => {
      if (img.complete) return;

      const promise = new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Continue even if image fails
      });
      promises.push(promise);
    });

    // If there are images to load, wait for them
    if (promises.length > 0) {
      Promise.all(promises).then(() => {
        setIsLoaded(true);
        setTimeout(() => setHasStarted(true), 100);
      });
    }
  }, [children]);

  if (showLoadingSkeleton && !isLoaded) {
    return (
      <div
        className={cn(
          "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
          {
            "flex-row": !vertical,
            "flex-col": vertical,
          },
          className
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
                "flex-row": !vertical,
                "flex-col": vertical,
              })}
            >
              <div className="flex space-x-4">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`skeleton-item-${index}`}
                      className="flex flex-col items-center justify-center p-6 mx-4 min-w-[120px] h-[100px] border border-gray-700 rounded-xl bg-black/40 backdrop-blur-sm animate-pulse"
                    >
                      <div className="w-7 h-7 bg-gray-600 rounded mb-2"></div>
                      <div className="w-16 h-3 bg-gray-600 rounded"></div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical && !reverse && hasStarted,
              "animate-marquee-reverse flex-row":
                !vertical && reverse && hasStarted,
              "animate-marquee-vertical flex-col":
                vertical && !reverse && hasStarted,
              "animate-marquee-vertical-reverse flex-col":
                vertical && reverse && hasStarted,
              "group-hover:[animation-play-state:paused]":
                pauseOnHover && hasStarted,
              "flex-row": !vertical && !hasStarted,
              "flex-col": vertical && !hasStarted,
            })}
            style={{
              opacity: hasStarted ? 1 : 0.8,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
