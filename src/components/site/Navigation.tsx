import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandWordmark } from "./BrandWordmark";
import { BookCallButton } from "./PageBlocks";
import { services } from "@/config/site";
import { cn } from "@/lib/utils";

const navLink =
  "text-sm font-medium text-ash transition-colors hover:text-paper data-[status=active]:text-paper";
const mobileLink = "block border-b border-line-dark py-4 font-display text-xl";

export function Navigation() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const servicesItem = useRef<HTMLLIElement>(null);
  const servicesButton = useRef<HTMLButtonElement>(null);
  const servicesPanel = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close both menus after navigating
  useEffect(() => {
    setServicesOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (servicesOpen) servicesButton.current?.focus();
      setServicesOpen(false);
      setMenuOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!servicesItem.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [servicesOpen, menuOpen]);

  // Following a link to the page you're already on doesn't change the path, so close here too
  const closeOnLink = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) {
      setServicesOpen(false);
      setMenuOpen(false);
    }
  };

  const solid = scrolled || servicesOpen || menuOpen;

  return (
    <header
      className={cn(
        "surface-dark fixed inset-x-0 top-0 z-50 border-b text-paper transition-colors duration-300",
        solid ? "border-line-dark bg-obsidian/90 backdrop-blur-md" : "border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="container-site flex h-[var(--nav-h)] items-center justify-between gap-6"
      >
        <Link to="/" aria-label="Up2Linkd home" className="text-[1.6rem]">
          <BrandWordmark />
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          <li ref={servicesItem} className="relative" onClick={closeOnLink}>
            <button
              ref={servicesButton}
              type="button"
              aria-expanded={servicesOpen}
              aria-controls={servicesPanel}
              onClick={() => setServicesOpen((open) => !open)}
              className={cn(
                navLink,
                "inline-flex items-center gap-1.5",
                pathname.startsWith("/services") && "text-paper",
              )}
            >
              Services
              <ChevronDown
                className={cn("size-4 transition-transform", servicesOpen && "rotate-180")}
                aria-hidden
              />
            </button>
            <div
              id={servicesPanel}
              hidden={!servicesOpen}
              className="absolute left-1/2 top-full mt-5 w-[23rem] -translate-x-1/2 rounded-2xl border border-line-dark bg-obsidian p-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)]"
            >
              <ul>
                {services.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={s.path}
                      className="block rounded-xl px-4 py-3.5 transition-colors hover:bg-graphite/70 data-[status=active]:bg-graphite/70"
                    >
                      <span className="block font-display font-semibold">{s.name}</span>
                      <span className="mt-1 block text-sm leading-snug text-ash">{s.menuLine}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li>
            <Link to="/our-approach" className={navLink}>
              Our Approach
            </Link>
          </li>
          <li>
            <Link to="/contact" className={navLink}>
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <BookCallButton className="hidden px-5 py-2.5 text-sm sm:inline-flex" />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line-dark lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        onClick={closeOnLink}
        className="max-h-[calc(100svh-var(--nav-h))] overflow-y-auto border-t border-line-dark bg-obsidian lg:hidden"
      >
        <div className="container-site py-6">
          <p className="eyebrow text-ash">Services</p>
          <ul className="mt-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={s.path} className={mobileLink}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-4">
            <li>
              <Link to="/our-approach" className={mobileLink}>
                Our Approach
              </Link>
            </li>
            <li>
              <Link to="/contact" className={mobileLink}>
                Contact
              </Link>
            </li>
          </ul>
          <BookCallButton className="mt-8 w-full" />
        </div>
      </div>
    </header>
  );
}
