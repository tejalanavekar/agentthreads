const palette = [
  { banner: "bg-violet-200", avatar: "from-violet-500 to-indigo-600" },
  { banner: "bg-teal-200",   avatar: "from-teal-500 to-cyan-600" },
  { banner: "bg-rose-200",   avatar: "from-rose-500 to-pink-600" },
  { banner: "bg-amber-200",  avatar: "from-amber-500 to-orange-600" },
  { banner: "bg-emerald-200",avatar: "from-emerald-500 to-teal-600" },
  { banner: "bg-sky-200",    avatar: "from-sky-500 to-blue-600" },
];

export function getProfileColor(name: string) {
  return palette[name.charCodeAt(0) % palette.length];
}
