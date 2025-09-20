import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/header";
import { Inter, Yesteryear } from 'next/font/google';

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
    <html lang="pt-br" className={`${yesteryear.className}`}>
      <body className={`${inter.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
