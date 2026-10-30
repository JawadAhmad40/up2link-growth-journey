import { Link } from "@tanstack/react-router";
import { BrandWordmark } from "./BrandWordmark";
import { services, siteConfig } from "@/config/site";

const footerLink = "text-ash transition-colors hover:text-paper";

export function Footer() {
  return (
    <footer className="surface-dark border-t border-line-dark bg-obsidian text-paper">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link to="/" aria-label="Up2Linkd home" className="text-3xl">
            <BrandWordmark />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ash">
            Upwork and LinkedIn client acquisition for agencies and skilled freelancers.
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3 md:col-span-7"
        >
          <div>
            <p className="eyebrow text-paper">Services</p>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={s.path} className={footerLink}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-paper">Company</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/our-approach" className={footerLink}>
                  Our Approach
                </Link>
              </li>
              <li>
                <Link to="/contact" className={footerLink}>
                  Contact
                </Link>
              </li>
              {siteConfig.linkedinUrl && (
                <li>
                  <a
                    href={siteConfig.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLink}
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-paper">Legal</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/privacy" className={footerLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className={footerLink}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container-site flex flex-col gap-3 border-t border-line-dark py-8 text-xs leading-relaxed text-ash md:flex-row md:items-center md:justify-between">
        <p>
          Up2Linkd is an independent service provider and is not affiliated with or endorsed by
          Upwork or LinkedIn.
        </p>
        <p className="shrink-0">© {new Date().getFullYear()} Up2Linkd</p>
      </div>
    </footer>
  );
}
