"use client";

import { useTheme } from "next-themes";
import { LineShadowText } from "./magicui/line-shadow-text";
import { TypingAnimation } from "./magicui/typing-animation";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";

export default function Hero() {
  const theme = useTheme();

  return (
    <div className="bg-background">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-6xl py-16 sm:py-24 lg:py-28">
          <div className="text-left">
            <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
              Fusion
              <LineShadowText className="italic">
                Note
              </LineShadowText>
            </h1>
            <TypingAnimation>Your Ideas, Unified and Brilliant</TypingAnimation>
            <p className="mt-8 max-w-7xl text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Built for speed, privacy, and powerful collaboration — in your workflow.
            </p>
            <div className="mt-10 flex items-center justify-left gap-x-6">
              <div
        className={cn(
          "group rounded-full border border-black/5 bg-blue-600 text-base text-neutral-100 transition-all ease-in hover:cursor-pointer hover:bg-blue-500 dark:border-white/5 dark:bg-indigo-800 dark:hover:bg-indigo-700",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition text-neutral-50 dark:text-neutral-100 ease-out hover:text-neutral-400 hover:duration-300 hover:dark:text-neutral-200">
          <span>Start Writing</span>
        </AnimatedShinyText>
      </div>
              <a href="#" className="text-sm/6 font-semibold text-foreground">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div> */}
      </div>
    </div>
  );
}