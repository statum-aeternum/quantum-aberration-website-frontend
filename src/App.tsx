import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import About from "./sections/About";
import News from "./sections/News";
import Merch from "./sections/Merch";
import Contact from "./sections/Contact";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState("home");
  const [selectedMerchSlug, setSelectedMerchSlug] = useState<string | null>(
    null,
  );
  const [selectedNewsSlug, setSelectedNewsSlug] = useState<string | null>(null);

  // 🔒 prevents router/scroll fighting
  const isAutoScrolling = useRef(false);

  const sections = ["home", "about", "news", "merch", "contact"];

  // ✅ Real scroll completion detection
  const scrollToSectionSmooth = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    isAutoScrolling.current = true;
    el.scrollIntoView({ behavior: "smooth" });

    const checkIfDone = () => {
      const rect = el.getBoundingClientRect();
      if (Math.abs(rect.top) < 4) {
        window.removeEventListener("scroll", checkIfDone);
        isAutoScrolling.current = false;
      }
    };

    window.addEventListener("scroll", checkIfDone);
  };

  // ✅ URL → section + modal + scroll
  useEffect(() => {
    const parts = location.pathname.split("/").filter(Boolean);

    const section = parts[0] || "home";
    const slug = parts[1] || null;

    setActiveSection(section);

    if (section === "merch") setSelectedMerchSlug(slug);
    else setSelectedMerchSlug(null);

    if (section === "news") setSelectedNewsSlug(slug);
    else setSelectedNewsSlug(null);

    scrollToSectionSmooth(section);
  }, [location]);

  // ✅ User scroll → update URL (only when NOT auto scrolling)
  useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrolling.current) return;
      if (selectedMerchSlug || selectedNewsSlug) return;

      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;

        const { offsetTop, offsetHeight } = el;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight &&
          activeSection !== section
        ) {
          setActiveSection(section);
          navigate(section === "home" ? "/" : `/${section}`, {
            replace: true,
          });
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, navigate, selectedMerchSlug, selectedNewsSlug]);

  const scrollToSection = (sectionId: string) => {
    navigate(sectionId === "home" ? "/" : `/${sectionId}`);
  };

  const openMerchProduct = (slug: string) => {
    navigate(`/merch/${slug}`);
  };

  const closeMerchProduct = () => {
    navigate("/merch");
  };

  const openNewsItem = (slug: string) => {
    navigate(`/news/${slug}`);
  };

  const closeNewsItem = () => {
    navigate("/news");
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
