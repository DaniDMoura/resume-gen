import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileUser, Github } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProjectInfo {
  title: string
  description: string
  tools?: string
  link?: string
}

interface ExperienceInfo {
  company: string
  role: string
  startDate: string 
  endDate?: string  
  description?: string
}

interface LanguageInfo {
  name: string
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native'
}

interface CertificationsInfo {
  title: string
  issuer: string
  date: string 
  link?: string
}

interface EducationInfo {
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate?: string
  description?: string
}



interface ResumeInfo {
  name: string
  number: string
  email: string
  bio: string
  site1?: string
  site2?: string

  about?: string
  skills?: string[]
  projects?: ProjectInfo[]

  experience?: ExperienceInfo[]
  languages?: LanguageInfo[]
  certifications?: CertificationsInfo[]
  education?: EducationInfo[]
}


const page = () => {
  return (
    <section className="mx-8 border-x-1  max-lg:h-[87vh] xl:h-[90vh] flex justify-center items-center">
      <div className="text-center flex space-y-8 flex-col">
        <h1 className="text-8xl font-medium tracking-tight">
          Your resume, <br /> made smarter.
        </h1>
        <p className="text-x">
          ResumeLab is the platform that puts smart resume building, speed,
          <br /> and control in your hands — without sacrificing simplicity or
          quality.
        </p>
        <div className="flex  justify-center items-center space-x-5">
          <Dialog>
            <form>
              <DialogTrigger>
                <Button
                  asChild
                  className="hover:bg-stone-200 cursor-pointer bg-white p-7 w-50 text-black border"
                >
                  <span>
                    <FileUser /> Create Resume
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] sm:h-[500px]">
                <DialogHeader className="sm:h-[80px]">
                  <DialogTitle>Create Resume</DialogTitle>
                  <DialogDescription>
                    Enter your personal, educational, and work details step by
                    step. ResumeLab will automatically create a polished PDF
                    resume for you.
                  </DialogDescription>
                </DialogHeader>
                <div className="sm:h-[300px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Label htmlFor="name" className="text-[10px] opacity-60">
                        Enter your full name
                      </Label>
                      <Input id="name" name="name" placeholder="John Doe" />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="about">Bio</Label>
                      <Label htmlFor="about" className="text-[10px] opacity-60">
                        Write a short bio
                      </Label>
                      <Input
                        id="about"
                        name="about"
                        placeholder="I am a software developer..."
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="number">Number</Label>
                      <Label
                        htmlFor="number"
                        className="text-[10px] opacity-60"
                      >
                        Your contact phone number
                      </Label>
                      <Input
                        id="number"
                        name="number"
                        placeholder="+55 11 91234-5678"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Label htmlFor="email" className="text-[10px] opacity-60">
                        Your professional email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        placeholder="example@mail.com"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="site1">Site 1 <span className="text-[10px] opacity-60">(Optional)</span></Label>
                      <Label htmlFor="site1" className="text-[10px] opacity-60">
                        Your personal or portfolio site 
                      </Label>
                      <Input
                        id="site1"
                        name="site1"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="site2">Site 2 <span className="text-[10px] opacity-60">(Optional)</span></Label>
                      <Label htmlFor="site2" className="text-[10px] opacity-60">
                        Another relevant site or profile 
                      </Label>
                      <Input
                        id="site2"
                        name="site2"
                        placeholder="https://github.com/username"
                      />
                    </div>


                  </div>
                </div>
                <DialogFooter className="sm:h-[120px]">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">
                    <ChevronRight />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
          <a
            href="https://github.com/DaniDMoura/resume-gen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="cursor-pointer p-7 w-50">
              <Github /> Star on GitHub
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default page;
