import { companyInfo, companyPhoneHref, footer, navItems } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

const columnHeadingClasses =
  "mb-4 font-mono text-[13px] uppercase tracking-[0.14em] text-dim";
const linkClasses =
  "inline-block py-1.5 text-ui text-muted transition-colors hover:text-text";

function logoInitial(name: string): string {
  return name.match(/\p{L}/u)?.[0]?.toUpperCase() ?? "R";
}

export function SiteFooter() {
  const footerNavItems = navItems.filter((item) => item.id !== "home");

  return (
    // Extra bottom padding below lg clears the fixed mobile CTA bar, so the
    // last footer row (privacy link) stays reachable at full scroll.
    <footer className="relative border-t border-text/7 bg-ink px-section-x pt-[clamp(40px,5vw,58px)] pb-29 lg:pb-8">
      <Container>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-9">
          <div className="max-w-75">
            <a href="#home" className="mb-4 flex items-center gap-2.75 text-text">
              <span className="grid size-8.5 place-items-center rounded-[9px] bg-linear-140 from-brass-deep to-brass font-mono text-[17px] font-extrabold text-bg">
                {logoInitial(companyInfo.name)}
              </span>
              <span className="text-base font-bold">{companyInfo.name}</span>
            </a>
            <p className="text-sm leading-relaxed text-muted">{footer.description}</p>
            <div className="mt-4.5 flex gap-2.5">
              <a
                href={companyInfo.facebook}
                aria-label="Facebook"
                className="grid size-11 place-items-center rounded-[10px] border border-text/10 bg-text/5 text-muted transition-colors hover:border-brass/40 hover:text-brass"
              >
                <FacebookIcon />
              </a>
              <a
                href={companyInfo.instagram}
                aria-label="Instagram"
                className="grid size-11 place-items-center rounded-[10px] border border-text/10 bg-text/5 text-muted transition-colors hover:border-brass/40 hover:text-brass"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <nav aria-label="Nawigacja w stopce">
            <p className={columnHeadingClasses}>Nawigacja</p>
            <ul className="flex flex-col gap-1.25">
              {footerNavItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={linkClasses}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Usługi w stopce">
            <p className={columnHeadingClasses}>Usługi</p>
            <ul className="flex flex-col gap-1.25">
              {footer.serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={`#${link.id}`} className={linkClasses}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={columnHeadingClasses}>Kontakt</p>
            <ul className="flex flex-col gap-1.25 text-ui text-muted">
              <li>
                <a href={companyPhoneHref} className={linkClasses}>
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${companyInfo.email}`} className={linkClasses}>
                  {companyInfo.email}
                </a>
              </li>
              <li>{companyInfo.region}</li>
            </ul>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-between gap-3.5 border-t border-text/7 pt-6">
          <span className="text-[13px] text-dim">{footer.copyright}</span>
          <a href="#" className="inline-block py-1.5 text-[13px] text-dim transition-colors hover:text-text">
            {footer.privacyLabel}
          </a>
        </div>
      </Container>
    </footer>
  );
}
