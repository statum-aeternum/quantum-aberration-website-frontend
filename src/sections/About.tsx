import { useState } from "react";
import StickyTitle from "../components/StickyTitle";
import GamePopup from "../components/GamePopup";

interface AboutProps {
  onMerchClick: (slug: string) => void;
}

const About = ({ onMerchClick }: AboutProps) => {
  const [showGame, setShowGame] = useState(false);

  const handleGameEnd = (slug: string) => {
    setShowGame(false);
    onMerchClick(slug);
  };

  return (
    <>
      <section id="about" className="min-h-screen py-20 bg-space-900 relative">
        <div className="container mx-auto px-6">
          <StickyTitle title="About" sectionId="about" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative inline-block">
              <div className="relative w-full">
                <img
                  src="/Quantum-Aberration-Band-Photo.gif"
                  alt="Quantum Aberration Band"
                  className="w-full rounded-lg shadow-2xl border border-space-700"
                />

                {/* Zone cliquable invisible */}
                <a
                  className="absolute cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-full"
                  style={{
                    top: "25%",
                    left: "51.25%",
                    width: "9.58%",
                    height: "11.25%",
                    display: "block",
                    zIndex: 10,
                  }}
                  onClick={() => setShowGame(true)}
                ></a>

                <p className="mt-2 text-sm text-gray-400 text-right">
                  Photo : Matthieu
                </p>
              </div>

              {/* Zone cliquable avec effet glitch */}
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Quantum Aberration est un groupe de death metal technique
                parisien formé en 2022. Nous explorons les confins de l'univers
                à travers une musique complexe et brutale, mêlant technicité
                extrême et atmosphères cosmiques.
              </p>

              <div className="pt-6">
                <h3 className="text-2xl font-bold text-cosmic-purple mb-4">
                  Notre EP "Call of the Void"
                </h3>
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/xFoBpXmMMGY"
                    title="Quantum Aberration - Call of the Void EP"
                    className="w-full h-full rounded-lg border border-space-700"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {showGame && (
          <GamePopup
            onClose={() => setShowGame(false)}
            onGameEnd={handleGameEnd}
          />
        )}
      </section>
    </>
  );
};

export default About;
