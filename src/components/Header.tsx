import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  User,
  Zap,
  Briefcase,
  FolderOpen,
  MessageSquare,
  Mail,
  Code2,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home", icon: Home, isRoute: false },
  { name: "About", href: "#about", icon: User, isRoute: false },
  { name: "Concepts", href: "#skills", icon: Zap, isRoute: false },
  { name: "Services", href: "#services", icon: Briefcase, isRoute: false },
  { name: "Projects", href: "#projects", icon: FolderOpen, isRoute: false },
  { name: "Engineering", href: "/engineering", icon: Wrench, isRoute: true },
  // { name: 'Testimonials', href: '#testimonials', icon: MessageSquare },
  { name: "Contact", href: "#contact", icon: Mail, isRoute: false },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Background blur overlay when mobile menu is open */}
      <div
        className={cn(
          "fixed inset-0 z-40 backdrop-blur-md bg-background/60 transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "glass-strong py-4" : "py-6 bg-transparent",
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center gap-2 font-display text-xl md:text-2xl font-bold gradient-text"
          >
            <Code2 className="w-5 h-5 md:w-6 md:h-6" />
            <span>CodeWithAbhishek</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="nav-link text-sm font-medium"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="nav-link text-sm font-medium"
                >
                  {link.name}
                </a>
              ),
            )}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg glass hover:bg-primary/10 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg glass"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg glass relative z-50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden absolute top-full left-0 right-0 glass-strong transition-all duration-300 overflow-hidden border-t border-primary/10",
            isMobileMenuOpen ? "max-h-screen py-6" : "max-h-0",
          )}
        >
          <nav className="container mx-auto px-6 flex flex-col gap-2">
            {navLinks.map((link, index) => {
              const IconComponent = link.icon;
              const commonProps = {
                className: cn(
                  "flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300",
                  "hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20",
                  "hover:pl-6 hover:text-primary",
                  "border-b border-border/30 last:border-b-0",
                  "relative overflow-hidden group",
                ),
                style: {
                  animationDelay: `${index * 50}ms`,
                  animation: isMobileMenuOpen
                    ? "fade-up 0.3s ease-out forwards"
                    : "none",
                } as React.CSSProperties,
              };
              const inner = (
                <>
                  <IconComponent className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-secondary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                </>
              );
              return link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  {...commonProps}
                >
                  {inner}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  {...commonProps}
                >
                  {inner}
                </a>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
};
