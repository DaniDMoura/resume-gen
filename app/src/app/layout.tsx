import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/header";
import { Inter, Yesteryear } from 'next/font/google';
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ['latin'], 
  weight: ['400', '500', '700'], 
  variable: '--font-inter', 
});

const yesteryear = Yesteryear({
  subsets: ['latin'], 
  weight: ['400'], 
  variable: '--font-yesteryear', 
});

export const metadata: Metadata = {
  title: "ResumeLab | Generate your personalized resumes",
  description: "ResumeLab is the platform that puts smart resume building, speed, and control in your hands — without sacrificing simplicity or quality.",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/icon-48.png" sizes="20" />
      </head>
      <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header/>
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
