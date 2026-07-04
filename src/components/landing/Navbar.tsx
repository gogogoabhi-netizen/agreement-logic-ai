import { useEffect, useState } from "react";
import { Menu, X, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Who It's For", href: "#who-its-for" },
  { label: "Platform", href: "#platform" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-white/85 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2" aria-label="Pactly home">
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              scrolled || mobileOpen ? "bg-primary text-primary-foreground" : "bg-white/10 text-white"
            )}
          >
            <FileSignature className="h-5 w-5" />
          </span>
          <span
            className={cn(
              "text-lg font-bold tracking-tight",
              scrolled || mobileOpen ? "text-primary" : "text-white"
            )}
          >
            Pactly
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                scrolled
                  ? "text-muted-foreground hover:text-primary"
                  : "text-white/75 hover:text-white"
              )}
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="bg-accent text-accent-foreground shadow-md hover:bg-accent/90">
            <a href="#contact">Book a Demo</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={cn(
            "md:hidden",
            scrolled || mobileOpen ? "text-primary" : "text-white"
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-white shadow-lg md:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="#contact" onClick={() => setMobileOpen(false)}>
                Book a Demo
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
