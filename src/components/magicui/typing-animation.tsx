"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  pauseBeforeDelete?: number;
  pauseBeforeRestart?: number;
  as?: React.ElementType;
  startOnView?: boolean;
  loop?: boolean;
  reverse?: boolean;
}

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  pauseBeforeDelete = 1500,
  pauseBeforeRestart = 1000,
  as: Component = "div",
  startOnView = false,
  loop = false,
  reverse = false,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    let isDeleting = false;

    const type = () => {
      if (!isDeleting && i <= children.length) {
        setDisplayedText(children.substring(0, i));
        i++;
        if (i > children.length && reverse && loop) {
          setTimeout(() => {
            isDeleting = true;
            type();
          }, pauseBeforeDelete);
          return;
        }
      } else if (isDeleting && i >= 0) {
        setDisplayedText(children.substring(0, i));
        i--;
        if (i < 0 && loop) {
          isDeleting = false;
          setTimeout(() => {
            type();
          }, pauseBeforeRestart);
          return;
        }
      }

      if (i <= children.length && i >= 0) {
        setTimeout(type, duration);
      }
    };

    type();

    // Cleanup
    return () => {
      i = 0;
      isDeleting = false;
    };
  }, [children, duration, loop, reverse, pauseBeforeDelete, pauseBeforeRestart, started]);

  return (
  <MotionComponent
    ref={elementRef}
    className={cn(
      "relative h-[5rem] w-full overflow-hidden text-4xl font-bold tracking-[-0.02em]",
      className
    )}
    {...props}
  >
    <span className="block min-h-[5rem] w-full">{displayedText}</span>
  </MotionComponent>
);

}
