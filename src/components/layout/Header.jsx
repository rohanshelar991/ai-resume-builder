import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useAuth } from "../../context/AuthContext";
import { Sun, Moon, Menu, X, Home, FileText, Palette, Users } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useDarkMode();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: Users },
    { name: "Builder", path: "/builder", icon: FileText },
    { name: "Templates", path: "/templates", icon: Palette },
    { name: "Features", path: "/#features", icon: Users },
  ];

  // Close mobile menu when clicking outside
  const handleClickOutside = (e) => {
    if (mobileMenuOpen && !e.target.closest('.mobile-menu')) {
      setMobileMenuOpen(false);
    }
  };

  // Add event listener for clicks outside
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 glassmorphism">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      <Link
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
      >
        AI Resume
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <nav className="flex items-center gap-4" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <HashLink
              key={item.name}
              smooth
              to={item.path}
              className="text-sm font-medium hover:text-primary/80 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label={item.name}
            >
              <item.icon size={16} />
              <span>{item.name}</span>
            </HashLink>
          ))}
        </nav>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        {user ? (
          <button onClick={logout} className="btn-outline">
            Logout
          </button>
        ) : (
          <Link
            to="/auth"
            className="btn-primary"
            aria-label="Get started with resume builder"
          >
            Get Started
          </Link>
        )}
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu absolute top-full left-0 right-0 bg-background/90 backdrop-blur-lg border-b border-border md:hidden">
          <div className="flex flex-col py-4 px-6 space-y-2">
            {navItems.map((item) => (
              <HashLink
                key={item.name}
                smooth
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium hover:text-primary/80 transition-colors flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label={item.name}
              >
                <item.icon size={18} />
                {item.name}
              </HashLink>
            ))}
            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="btn-outline mt-2 py-3 text-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary mt-2 py-3 text-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Get started with resume builder"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
