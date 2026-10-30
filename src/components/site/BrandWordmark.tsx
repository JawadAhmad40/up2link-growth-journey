import { cn } from "@/lib/utils";

/** Up2Linkd wordmark. The lime "2" stands for the two channels. Use it on dark backgrounds. */
export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display font-bold leading-none tracking-[-0.045em] text-paper",
        className,
      )}
    >
      <span className="sr-only">Up2Linkd</span>
      <span aria-hidden>Up</span>
      <span aria-hidden className="text-lime">
        2
      </span>
      <span aria-hidden>Linkd</span>
    </span>
  );
}
