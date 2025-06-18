import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";

interface LineShadowTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  shadowColor?: string;
  as?: React.ElementType;
}

export function LineShadowText({
  children,
  shadowColor,
  className,
  as: Component = "span",
  ...props
}: LineShadowTextProps) {
  const MotionComponent = motion.create(Component);
  const content = typeof children === "string" ? children : null;

  if (!content) {
    throw new Error("LineShadowText only accepts string content");
  }

  // Use theme-aware classes instead of CSS variables
  const shadowClasses = shadowColor 
    ? "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]"
    : "after:bg-[linear-gradient(45deg,transparent_45%,theme(colors.foreground)_45%,theme(colors.foreground)_55%,transparent_0)]";

  const shadowStyles = shadowColor 
    ? { "--shadow-color": shadowColor } as React.CSSProperties
    : undefined;

  return (
    <MotionComponent
      style={shadowStyles}
      className={cn(
        "relative z-0 inline-flex",
        "after:absolute after:left-[0.04em] after:top-[0.04em] after:content-[attr(data-text)]",
        shadowClasses,
        "after:-z-10 after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow",
        className,
      )}
      data-text={content}
      {...props}
    >
      {content}
    </MotionComponent>
  );
}