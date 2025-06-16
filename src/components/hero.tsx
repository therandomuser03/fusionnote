"use client";

import { useTheme } from "next-themes";
import { LineShadowText } from "./magicui/line-shadow-text";
import { ShineBorder } from "./magicui/shine-border";
import { Button } from "./ui/button";
import { TypingAnimation } from "./magicui/typing-animation";
import { useEffect, useState } from "react";

export const Hero = () => {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-32 pb-20 text-center">
      <div className="absolute inset-0 bg-grid-white/[0.07] bg-center [mask-image:linear-gradient(to_bottom,white,transparent,transparent)]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="container">
        {mounted ? (
          <TypingAnimation
            className="text-7xl pb-6 font-bold text-center bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent"
            duration={120}
            delay={500}
            loop
            reverse
            pauseBeforeDelete={2000}
            pauseBeforeRestart={1500}
          >
            FusionNote
          </TypingAnimation>
          ) : (
          // SSR-safe static fallback
          <h1 className="text-6xl font-bold text-white">FusionNote</h1>
        )}
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Your Ideas,{" "}
            <LineShadowText className="italic" shadowColor={shadowColor}>
              Unified
            </LineShadowText>{" "}
            and{" "}
            <LineShadowText className="italic" shadowColor={shadowColor}>
              Brilliant
            </LineShadowText>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 sm:text-xl md:text-2xl">
            Trusted by thousands of writers, developers, and students. Built for
            speed, privacy, and powerful collaboration — in your workflow.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button
              variant="outline"
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Start Writing
              </span>
            </Button>
            <Button
              variant="secondary"
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-800 bg-transparent px-8 text-sm font-medium text-slate-300 hover:border-slate-700"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
