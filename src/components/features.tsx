import {
  ImageIcon,
  Share2,
  Code,
  Lock,
  Palette,
  RefreshCcw,
} from "lucide-react";
import { GridPattern } from "./magicui/grid-pattern";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <ImageIcon className="h-8 w-8 text-blue-600 dark:text-indigo-800" />,
    title: "Image Support",
    description: "Add and organize visuals effortlessly within your notes.",
  },
  {
    icon: <Share2 className="h-8 w-8 text-blue-600 dark:text-indigo-800" />,
    title: "Export & Share",
    description: "Easily share or export your notes to multiple platforms.",
  },
  {
    icon: <Code className="h-8 w-8 text-blue-600 dark:text-indigo-800" />,
    title: "Effortless Markdown",
    description: "Write with speed and structure using Markdown support.",
  },
  {
    icon: <Lock className="h-8 w-8 text-blue-600 dark:text-indigo-800" />,
    title: "Private & Secure",
    description: "Keep your notes encrypted and accessible only to you.",
  },
  {
    icon: <Palette className="h-8 w-8 text-blue-600 dark:text-indigo-800" />,
    title: "Customizable Themes",
    description: "Personalize your workspace with elegant themes.",
  },
  {
    icon: <RefreshCcw className="h-8 w-8 text-blue-600 dark:text-indigo-800" />,
    title: "Cloud Sync",
    description: "Access your notes from anywhere, automatically synced.",
  },
];

export const Features = () => {
  return (
    <div className="rounded-2xl bg-background relative flex items-center justify-center overflow-hidden p-20">
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
      <section className="max-w-6xl mx-auto">
        <div className="relative isolate mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Everything you need for smart note-taking
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              FusionNote combines powerful features with elegant design.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-xl bg-neutral-300 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-6 transition hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700"
              >
                <div className="flex items-start gap-4">
                  {feature.icon}
                  <h3 className="text-base font-semibold text-primary group-hover:text-indigo-600 transition">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-primary/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
