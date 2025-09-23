"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type LogoProps = {
  size?: number;
};

const Logo = ({ size = 48 }: LogoProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Link className="flex items-center group" href="/">
      <div>
        <Image
          width={size}
          height={size}
          alt="ResumeLab Icon"
          src={theme === "dark" ? "/icon-dark.png" : "/icon-light.png"}
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;
