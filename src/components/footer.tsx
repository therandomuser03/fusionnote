import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} FusionNote. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};