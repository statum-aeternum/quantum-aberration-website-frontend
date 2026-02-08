import { useEffect, useState } from "react";

interface StickyTitleProps {
  title: string;
  sectionId: string;
}

const StickyTitle = ({ title, sectionId }: StickyTitleProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const navHeight = 80; // hauteur de la topbar
        const progress = Math.max(0, Math.min(1, (navHeight - rect.top) / 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionId]);

  const getBgColor = () => {
    switch (sectionId) {
      case "about":
        return "bg-space-900";
      case "news":
        return "bg-space-950";
      case "merch":
        return "bg-space-900";
      case "contact":
        return "bg-space-950";
      default:
        return "bg-space-900";
    }
  };

  const fontSize = 6 - scrollProgress * 4; // De 6rem à 2rem
  const marginBottom = 16 * (1 - scrollProgress);
  const padding = scrollProgress * 16;

  return (
    <div
      className={`sticky z-40 transition-all duration-300 ${scrollProgress > 0 ? `${getBgColor()}/95 backdrop-blur-sm border-b border-space-700` : "bg-transparent"}`}
      style={{
        top: "56px",
        paddingTop: `${padding}px`,
        paddingBottom: `${padding}px`,
      }}
    >
      <div className="container mx-auto px-6">
        <h2
          className="font-death bg-gradient-to-b bg-clip-text text-transparent from-amber-50 to-yellow-300 transition-all duration-300 text-center"
          style={{
            fontSize: `${fontSize}rem`,
            marginBottom: `${marginBottom}px`,
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
};

export default StickyTitle;
