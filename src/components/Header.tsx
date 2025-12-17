import { useState, MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services", hash: "#services" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/#about", hash: "#about" },
    { name: "Contact", href: "/#contact", hash: "#contact" },
  ] as const;

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href || location.hash === href.replace("/", "");
  };

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // If we're already on the home page, just scroll to the top (hero)
    if (location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick =
    (href: string, hash?: string) =>
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!hash) return;

      event.preventDefault();
      navigate({ pathname: "/", hash });
    };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center" onClick={handleHomeClick}>
            <img src={logo} alt="Windhoek CV Writers" className="h-20 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(event) => {
                  if (link.href === "/") {
                    handleHomeClick(event);
                  } else {
                    handleNavClick(link.href, (link as { hash?: string }).hash)(event);
                  }
                }}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="cta" size="lg" asChild>
              <a href="tel:0812014151" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(event) => {
                  if (link.href === "/") {
                    handleHomeClick(event);
                  } else {
                    handleNavClick(link.href, (link as { hash?: string }).hash)(event);
                  }
                  setIsOpen(false);
                }}
                className={`text-sm font-medium transition-colors hover:text-primary px-2 py-2 ${
                  isActive(link.href) ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
              ))}
              <Button variant="cta" className="mt-2" asChild>
                <a href="tel:0812014151" className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
