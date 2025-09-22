import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/providers/theme-provider";


const inter = Inter({
  subsets: ['latin'], 
  weight: ['400', '500', '700'], 
  variable: '--font-inter', 
});


export const metadata: Metadata = {
  title: "ResumeLab | Generate your personalized resumes",
  description: "ResumeLab is the platform that puts smart resume building, speed, and control in your hands — without sacrificing simplicity or quality.",
  icons: {
    icon: "/icon-48.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}

          </ThemeProvider>
      </body>
    </html>
  );
}
