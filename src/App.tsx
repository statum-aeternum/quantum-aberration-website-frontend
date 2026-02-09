import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import About from "./sections/About";
import News from "./sections/News";
import Merch from "./sections/Merch";
import Contact from "./sections/Contact";
function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedMerchSlug, setSelectedMerchSlug] = useState<string | null>(
    null,
  );
  const [selectedNewsSlug, setSelectedNewsSlug] = useState<string | null>(null);
  useEffect(() => {
    // Détecter la section depuis l'URL au chargement
    const hash = window.location.hash.slice(1);
    const [section, slug] = hash.split("/");

    if (section) {
      setActiveSection(section);
      if (slug) {
        if (section === "merch") {
          setSelectedMerchSlug(slug);
          setTimeout(() => scrollToSection("merch", true), 100);
        }
        if (section === "news") {
          setSelectedNewsSlug(slug);
          setTimeout(() => scrollToSection("news", true), 100);
        }
      }
    } else {
      setActiveSection("home");
    }

    const handleScroll = () => {
      // Ne pas mettre à jour l'URL pendant le scroll si on a un slug actif
      if (selectedMerchSlug || selectedNewsSlug) return;

      const sections = ["home", "about", "news", "merch", "contact"];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            if (activeSection !== section) {
              setActiveSection(section);
              window.history.replaceState(null, "", `#${section}`);
            }
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, selectedMerchSlug, selectedNewsSlug]);
  const scrollToSection = (sectionId: string, skipUrlUpdate = false) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      if (!skipUrlUpdate) {
        window.history.pushState(null, "", `#${sectionId}`);
      }
    }
  };
  const openMerchProduct = (slug: string) => {
    setSelectedMerchSlug(slug);
    window.history.pushState(null, "", `#merch/${slug}`);
    if (activeSection !== "merch") {
      scrollToSection("merch", true);
    }
  };
  const closeMerchProduct = () => {
    setSelectedMerchSlug(null);
    window.history.pushState(null, "", "#merch");
  };
  const openNewsItem = (slug: string) => {
    setSelectedNewsSlug(slug);
    window.history.pushState(null, "", `#news/${slug}`);
  };
  const closeNewsItem = () => {
    setSelectedNewsSlug(null);
    window.history.pushState(null, "", "#news");
  };
  return (
    <div className="min-h-screen">
      <Navigation
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      <main>
        <Home />
        <About onMerchClick={openMerchProduct} />
        <News
          selectedNewsSlug={selectedNewsSlug}
          onNewsClose={closeNewsItem}
          onNewsOpen={openNewsItem}
        />
        <Merch
          selectedProductSlug={selectedMerchSlug}
          onProductClose={closeMerchProduct}
          onProductOpen={openMerchProduct}
        />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
export default App;
