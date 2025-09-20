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
    <header className="border p-6 h-[12vh]">
      <nav className="text-md leading-none font-medium  flex justify-between items-center">
        <Link className="flex items-center space-x-0.5" href={"/"}>
          <h1 className="text-xl font-sans">
            Resume<span className="font-semibold">Lab</span>
          </h1>
          <FlaskConical strokeWidth={1.5} size={27} />
        </Link>
        <div>
          <ul className="flex space-x-4 items-center">
            <a onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <Moon size={27} strokeWidth={1.5} />
              ) : (
                <Sun size={27} strokeWidth={1.5} />
              )}
            </a>
            <Link href={"about"}>
              <li className="text-indigo-600">About</li>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <a className="text-md cursor-pointer font-normal w-15">
                  Contact
                </a>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Contact Me</DialogTitle>
                  <DialogDescription>
                    Contact me for collaborations, inquiries, or opportunities.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-around">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/danilosmoura_/"
                  >
                    <Button>
                      <Instagram /> Instagram
                    </Button>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/danilosantos-moura/"
                  >
                    <Button>
                      <Linkedin /> LinkedIn
                    </Button>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/DaniDMoura"
                  >
                    <Button>
                      <Github /> GitHub
                    </Button>
                  </a>
                </div>
              </DialogContent>
            </Dialog>

            <a
              href="https://github.com/DaniDMoura/resume-gen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>Source</li>
            </a>
            <a
              href="https://github.com/DaniDMoura?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>GitHub</li>
            </a>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
