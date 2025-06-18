'use client'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Hero() {

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
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
              Data to enrich your online business
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-foreground">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </div>
  )
}


// "use client";

// import { useTheme } from "next-themes";
// import { LineShadowText } from "./magicui/line-shadow-text";
// import { ShineBorder } from "./magicui/shine-border";
// import { Button } from "./ui/button";
// import { TypingAnimation } from "./magicui/typing-animation";
// import { useEffect, useState } from "react";

// export const Hero = () => {
//   const theme = useTheme();
//   const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <section className="relative pt-32 pb-20 text-center">
//       <div className="absolute inset-0 bg-grid-white/[0.07] bg-center [mask-image:linear-gradient(to_bottom,white,transparent,transparent)]"></div>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
//         <div className="container">
//         {/* {mounted ? ( */}
//           <TypingAnimation
//             className="text-7xl pb-6 font-bold text-center bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent"
//             duration={120}
//             delay={500}
//             loop
//             reverse
//             pauseBeforeDelete={2000}
//             pauseBeforeRestart={1500}
//           >
//             FusionNote
//           </TypingAnimation>
//           {/* ) : (
//           // SSR-safe static fallback
//           <h1 className="text-6xl font-bold text-white">FusionNote</h1>
//         )} */}
//           <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-3xl md:text-4xl lg:text-5xl">
//             Your Ideas,{" "}
//             <LineShadowText className="italic" shadowColor={shadowColor}>
//               Unified
//             </LineShadowText>{" "}
//             and{" "}
//             <LineShadowText className="italic" shadowColor={shadowColor}>
//               Brilliant
//             </LineShadowText>
//           </h1>
//           <p className="mt-6 max-w-xl mx-auto text-lg text-neutral-500 sm:text-l md:text-xl">
//             Trusted by thousands of writers, developers, and students. Built for
//             speed, privacy, and powerful collaboration — in your workflow.
//           </p>
//           <div className="mt-10 flex justify-center gap-4">
//             <Button
//               variant="outline"
//               className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
//             >
//               <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
//               <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
//                 Start Writing
//               </span>
//             </Button>
//             <Button
//               variant="secondary"
//               className="inline-flex h-12 items-center justify-center rounded-full border border-slate-800 bg-transparent px-8 text-sm font-medium text-slate-300 hover:border-slate-700"
//             >
//               Learn More
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
