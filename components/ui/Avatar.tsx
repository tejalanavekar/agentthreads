"use client";

import Image from "next/image";
import { useState } from "react";
import { getProfileColor } from "@/lib/profile-color";

interface AvatarProps {
  src?: string | null;
  displayName: string;
  size?: number;
  className?: string;
}

export function Avatar({ src, displayName, size = 40, className = "" }: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  if (src && !errored) {
    return (
      <Image src={src} alt={displayName} width={size} height={size} unoptimized
        onError={() => setErrored(true)}
        className={`rounded-full object-cover bg-neutral-200 ${className}`}
        style={{ width: size, height: size, minWidth: size }} />
    );
  }

  const { avatar } = getProfileColor(displayName);
  return (
    <div className={`rounded-full bg-gradient-to-br ${avatar} flex items-center justify-center text-white font-semibold ${className}`}
      style={{ width: size, height: size, minWidth: size, fontSize: size * 0.36 }}>
      {initials}
    </div>
  );
}
