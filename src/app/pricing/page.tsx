// NEED TO MAKE CHANGES!
// app/pricing/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing – FusionNote",
  description: "Simple and transparent pricing plans for every type of user.",
};

const plans = [
  {
    label: "Free",
    description: "Basic notes, markdown",
  },
  {
    label: "Pro",
    description: "Sync, templates, export options",
  },
  {
    label: "Team",
    description: "Collaboration, shared workspaces",
  },
];

export default function Pricing() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-white">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="money">💰</span> Pricing
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        Simple plans table, no dropdown <em>unless</em> you want to split personal/business.
      </p>

      <div className="border border-gray-700 rounded-md overflow-hidden">
        <div className="grid grid-cols-2 bg-gray-800 px-4 py-2 font-semibold text-gray-300">
          <div>Label</div>
          <div>Description</div>
        </div>
        {plans.map((plan, idx) => (
          <div
            key={plan.label}
            className={`grid grid-cols-2 px-4 py-3 ${
              idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
            }`}
          >
            <div className="font-semibold">{plan.label}</div>
            <div>{plan.description}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
