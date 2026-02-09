import { useRef, useEffect, useState } from "react";
import { useBackgroundParallax } from "../utils/useBackgroundParallax";
import { getGalaxyAssets } from "../utils/useGalaxyAssets";

const Home = () => {
  const starsRef = useRef<HTMLDivElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);

  const [assets, setAssets] = useState(getGalaxyAssets());

  useEffect(() => {
    const onResize = () => setAssets(getGalaxyAssets());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // vitesses de profondeur réalistes
  useBackgroundParallax(starsRef, 0.25);
  useBackgroundParallax(nebulaRef, 0.15);
  useBackgroundParallax(dustRef, 0.2);
  useBackgroundParallax(raysRef, 0.08);

  return (
    <>
      {/* Layers en background GPU */}
      <div
        ref={starsRef}
        className="galaxy-layer"
        style={{ backgroundImage: `url(${assets.stars})` }}
      />
      <div
        ref={nebulaRef}
        className="galaxy-layer"
        style={{ backgroundImage: `url(${assets.nebula})` }}
      />
      <div
        ref={dustRef}
        className="galaxy-layer"
        style={{ backgroundImage: `url(${assets.dust})` }}
      />
      <div
        ref={raysRef}
        className="galaxy-layer opacity-30"
        style={{ backgroundImage: `url(${assets.rays})` }}
      />

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center"
      >
        <div className="text-center z-10 animate-float px-6">
          <img
            src="/Quantum-Aberration-Logo.png"
            className="w-[28rem] md:w-[32rem] mx-auto mb-8 drop-shadow-2xl animate-fade-in-logo"
            alt="Quantum Aberration Logo"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider drop-shadow-lg opacity-0 animate-fade-in-text">
            QUANTUM
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-cosmic-purple tracking-wider drop-shadow-lg mb-6 opacity-0 animate-fade-in-text">
            ABERRATION
          </h2>

          <p className="text-lg md:text-xl text-gray-300 tracking-[0.4em] uppercase opacity-0 animate-fade-in-text">
            Death Metal Technique Parisien
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
