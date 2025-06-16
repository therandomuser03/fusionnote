import {
  ImageIcon,
  Share2,
  Code,
  Lock,
  Palette,
  RefreshCcw,
} from "lucide-react";

const features = [
  {
    icon: <ImageIcon className="h-8 w-8 text-purple-400" />,
    title: "Image Support",
    description: "Add and organize visuals effortlessly within your notes.",
  },
  {
    icon: <Share2 className="h-8 w-8 text-purple-400" />,
    title: "Export & Share",
    description: "Easily share or export your notes to multiple platforms.",
  },
  {
    icon: <Code className="h-8 w-8 text-purple-400" />,
    title: "Effortless Markdown",
    description: "Write with speed and structure using Markdown support.",
  },
  {
    icon: <Lock className="h-8 w-8 text-purple-400" />,
    title: "Private & Secure",
    description: "Keep your notes encrypted and accessible only to you.",
  },
  {
    icon: <Palette className="h-8 w-8 text-purple-400" />,
    title: "Customizable Themes",
    description: "Personalize your workspace with elegant themes.",
  },
  {
    icon: <RefreshCcw className="h-8 w-8 text-purple-400" />,
    title: "Cloud Sync",
    description: "Access your notes from anywhere, automatically synced.",
  },
];


export const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
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
              className="group rounded-xl bg-neutral-900 border border-neutral-800 p-6 transition hover:shadow-md hover:border-purple-500/40"
            >
              <div className="flex items-start gap-4">
                {feature.icon}
                <h3 className="text-base font-semibold text-white group-hover:text-purple-400 transition">
                  {feature.title}
                </h3>
              </div>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
