import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FusionNote",
  description: "FusionNote is a note-taking app that allows you to create and share notes with others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header>
              <SignedOut>
                {/* <SignInButton /> */}
                {/* <SignUpButton /> */}
              </SignedOut>
              <SignedIn>
                {/* <UserButton /> */}
              </SignedIn>
            </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
