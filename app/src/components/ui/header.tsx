"use client";
import {
  Github,
  Instagram,
  Linkedin,
  Moon,
  Sun,
  ExternalLink,
} from "lucide-react";
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
import Image from "next/image";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b py-4 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="text-md leading-none font-medium flex justify-between items-center max-w-7xl mx-auto px-6">
        <Link className="flex items-center group" href="/">
          <div className="transition-transform group-hover:scale-105">
            {theme === "dark" ? (
              <Image
                width={48}
                height={48}
                alt="ResumeLab Icon"
                src={"/icon-dark.png"}
              />
            ) : (
              <Image
                width={48}
                height={48}
                alt="ResumeLab Icon"
                src={"/icon-light.png"}
              />
            )}
          </div>
        </Link>

        <ul className="flex items-center ">
          <li>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </li>

          <li>
            <Link
              href="/about"
              className="relative px-3 py-2 rounded-lg font-medium hover:text-black dark:hover:text-white transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10 group"
            >
              About
              <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-black dark:bg-white transition-all duration-200 group-hover:w-3/4 -translate-x-1/2"></span>
            </Link>
          </li>

    
          <li>
            <Dialog>
              <DialogTrigger asChild>
                <button className="relative px-3 py-2 rounded-lg text-md font-medium cursor-pointer hover:text-black dark:hover:text-white transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10 group">
                  Contact
                  <span className="absolute bottom-0 left-1/2 w-0 h-[1px]  bg-black dark:bg-white transition-all duration-200 group-hover:w-3/4 -translate-x-1/2"></span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl">Contact Me</DialogTitle>
                  <DialogDescription>
                    Contact me for collaborations, inquiries, or opportunities.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col sm:flex-row justify-center gap-3 mt-3">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/danilosmoura_/"
                    className="flex-1"
                  >
                    <Button className="w-full flex items-center justify-center space-x-2 ">
                      <Instagram className="w-4 h-4" /> <span>Instagram</span>
                    </Button>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/danilosantos-moura/"
                    className="flex-1"
                  >
                    <Button className="w-full flex items-center justify-center space-x-2">
                      <Linkedin className="w-4 h-4" /> <span>LinkedIn</span>
                    </Button>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/DaniDMoura"
                    className="flex-1"
                  >
                    <Button className="w-full flex items-center justify-center space-x-2 ">
                      <Github className="w-4 h-4" /> <span>GitHub</span>
                    </Button>
                  </a>
                </div>
              </DialogContent>
            </Dialog>
          </li>

          <li>
            <a
              href="https://github.com/DaniDMoura/resume-gen"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-3 py-2 rounded-lg font-medium hover:text-black dark:hover:text-white transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10 group inline-flex items-center gap-1"
            >
              Source
              <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-black dark:bg-white transition-all duration-200 group-hover:w-3/4 -translate-x-1/2"></span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/DaniDMoura?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-3 py-2 rounded-lg font-medium hover:text-black dark:hover:text-white transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10 group inline-flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              GitHub
              <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-black dark:bg-white transition-all duration-200 group-hover:w-3/4 -translate-x-1/2"></span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
