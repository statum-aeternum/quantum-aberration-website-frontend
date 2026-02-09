import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface NavigationProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionClick }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { id: "news", label: "News", path: "/news" },
    { id: "merch", label: "Merch", path: "/merch" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-space-900/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <ul className="flex justify-center space-x-8">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                to={section.path}
                onClick={() => onSectionClick(section.id)}
                className={`text-lg font-medium transition-colors duration-300 hover:text-cosmic-purple ${
                  activeSection === section.id
                    ? "text-cosmic-purple"
                    : "text-white"
                }`}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
