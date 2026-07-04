import { FileSignature } from "lucide-react";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Who It's For", href: "#who-its-for" },
      { label: "Platform", href: "#platform" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Book a Demo", href: "#contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "info@pactlyhq.com", href: "mailto:info@pactlyhq.com" },
      { label: "(307) 554-9921", href: "tel:+13075549921" },
      { label: "Mon–Fri, 9am–5pm PT" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--navy-deep))] py-14 text-white">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="flex items-center gap-2" aria-label="Pactly home">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <FileSignature className="h-5 w-5 text-[hsl(var(--electric-bright))]" />
              </span>
              <span className="text-lg font-bold tracking-tight">Pactly</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              The enterprise AI agreement workflow copilot. Natively
              integrated with ServiceNow and Workday.
            </p>
          </div>

          {footerLinks.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/45">
                {heading}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a
                        href={link.href}
                        className="text-white/75 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span className="text-white/75">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Pactly LLC. All rights reserved.</p>
          <p>pactlyhq.com</p>
        </div>
      </div>
    </footer>
  );
};
