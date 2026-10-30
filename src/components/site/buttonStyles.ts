import { cn } from "@/lib/utils";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-[0.95rem] font-semibold transition";

export const buttonStyles = {
  /** The one primary CTA style: Book a Discovery Call. */
  primary: cn(buttonBase, "bg-lime text-obsidian hover:brightness-95"),
  /** Quieter action on dark backgrounds. */
  quietDark: cn(buttonBase, "border border-line-dark text-paper hover:border-paper/40"),
  /** Quieter action on warm white. */
  quietLight: cn(buttonBase, "border border-line-light text-obsidian hover:border-obsidian/40"),
  /** Solid secondary action on warm white. */
  dark: cn(buttonBase, "bg-obsidian text-paper hover:bg-graphite"),
  /** Solid secondary action on black. */
  light: cn(buttonBase, "bg-paper text-obsidian hover:bg-white"),
};
