export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)] dark bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center">
        <div className="font-bold text-2xl">FusionNote</div>
        <div className="space-x-6">
          <a href="#features" className="hover:text-gray-400">Features</a>
          <a href="#how-it-works" className="hover:text-gray-400">How It Works</a>
          <a href="#pricing" className="hover:text-gray-400">Pricing</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center px-4 py-20 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <h1 className="text-5xl font-bold mb-6">Seamless Note-Taking Across Platforms</h1>
        <p className="text-xl max-w-2xl mb-10">
          FusionNote is a modern note-taking application that seamlessly transfers your notes 
          between Notion, Google Keep, and more with just a click.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="rounded-full bg-white text-black px-8 py-3 font-medium">
            Get Started Free
          </button>
          <button className="rounded-full border border-white px-8 py-3 font-medium">
            Learn More
          </button>
        </div>
        <div className="mt-16 w-full max-w-4xl">
          <div className="relative h-80 rounded-lg shadow-xl bg-zinc-800">
            <p className="absolute inset-0 flex items-center justify-center text-gray-400">
              App Screenshot
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-6 bg-zinc-900">
        <h2 className="text-3xl font-bold text-center mb-16">Why Choose FusionNote?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              <span className="text-2xl">✏️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Intuitive Interface</h3>
            <p>Clean, modern design that makes note-taking a pleasure instead of a chore.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Seamless Syncing</h3>
            <p>Transfer notes to Notion and Google Keep with our powerful API integrations.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure Storage</h3>
            <p>Your notes are encrypted and securely stored, accessible only to you.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-20 px-6 bg-zinc-950">
        <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
        <div className="flex flex-col md:flex-row max-w-5xl mx-auto">
          <div className="flex-1">
            <ol className="space-y-6">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">1</span>
                <div>
                  <h3 className="font-bold text-lg mb-2">Create Your Notes</h3>
                  <p>Use our clean editor to jot down your ideas, create checklists, or draft documents.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">2</span>
                <div>
                  <h3 className="font-bold text-lg mb-2">Connect Your Accounts</h3>
                  <p>Link your Notion and Google Keep accounts through our secure authorization process.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">3</span>
                <div>
                  <h3 className="font-bold text-lg mb-2">Transfer with One Click</h3>
                  <p>Send your notes to your preferred platform with a single click, maintaining all formatting.</p>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex-1 mt-10 md:mt-0">
            <div className="h-80 bg-zinc-800 rounded-lg shadow-lg">
              <p className="h-full flex items-center justify-center text-gray-400">
                Integration Diagram
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 text-center bg-zinc-800">
        <h2 className="text-3xl font-bold mb-6">Ready to Streamline Your Note-Taking?</h2>
        <p className="max-w-2xl mx-auto mb-10 text-lg">
          Join thousands of users who have revolutionized their productivity with FusionNote.
        </p>
        <button className="rounded-full bg-white text-black px-8 py-3 font-medium">
          Get Started - It&apos;s Free
        </button>
      </div>

      {/* Footer */}
      <footer className="py-10 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-xl mb-3">FusionNote</h3>
            <p className="text-sm text-gray-400">
              Seamless note-taking across platforms
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Integrations</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Documentation</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:underline">Privacy</a></li>
                <li><a href="#" className="hover:underline">Terms</a></li>
                <li><a href="#" className="hover:underline">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} FusionNote. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
