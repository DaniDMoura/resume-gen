"use client";
import {
  FlaskConical,
  Github,
  Instagram,
  Linkedin,
  Moon,
  Sun,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import Link from "next/link";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="border-b py-4">
      <nav className="text-md leading-none font-medium flex justify-between items-center max-w-7xl mx-auto px-6">
        {/* Logo */}
        <Link className="flex items-center space-x-1" href="/">
          <h1 className="text-2xl font-sans tracking-tight">
            Resume<span className="font-semibold">Lab</span>
          </h1>
          <FlaskConical strokeWidth={1.5} size={28} />
        </Link>

        {/* Nav links */}
        <ul className="flex items-center gap-x-6">
          {/* Dark mode toggle */}
          <li>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              {darkMode ? (
                <Moon size={24} strokeWidth={1.5} />
              ) : (
                <Sun size={24} strokeWidth={1.5} />
              )}
            </button>
          </li>

          {/* About */}
          <li>
            <Link
              href="/about"
              className="text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              About
            </Link>
          </li>

          {/* Contact Modal */}
          <li>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-md font-normal cursor-pointer hover:text-indigo-500 transition-colors">
                  Contact
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl">Contact Me</DialogTitle>
                  <DialogDescription>
                    Contact me for collaborations, inquiries, or opportunities.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-around mt-4">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/danilosmoura_/"
                  >
                    <Button className="flex items-center space-x-2">
                      <Instagram /> <span>Instagram</span>
                    </Button>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/danilosantos-moura/"
                  >
                    <Button className="flex items-center space-x-2">
                      <Linkedin /> <span>LinkedIn</span>
                    </Button>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/DaniDMoura"
                  >
                    <Button className="flex items-center space-x-2">
                      <Github /> <span>GitHub</span>
                    </Button>
                  </a>
                </div>
              </DialogContent>
            </Dialog>
          </li>

          {/* External links */}
          <li>
            <a
              href="https://github.com/DaniDMoura/resume-gen"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-500 transition-colors"
            >
              Source
            </a>
          </li>
          <li>
            <a
              href="https://github.com/DaniDMoura?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-500 transition-colors"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
