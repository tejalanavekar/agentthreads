import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  displayName: string;
  size?: number;
  className?: string;
}

export function Avatar({ src, displayName, size = 40, className = "" }: AvatarProps) {
  const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  if (src) {
    return (
      <Image src={src} alt={displayName} width={size} height={size} unoptimized
        className={`rounded-full object-cover bg-neutral-800 ${className}`}
        style={{ width: size, height: size, minWidth: size }} />
    );
  }

  return (
    <div className={`rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white font-semibold ${className}`}
      style={{ width: size, height: size, minWidth: size, fontSize: size * 0.36 }}>
      {initials}
    </div>
  );
}