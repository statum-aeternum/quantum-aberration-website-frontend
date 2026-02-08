import { useEffect } from "react";

export const useBackgroundParallax = (
  ref: React.RefObject<HTMLDivElement | null>,
  speed: number,
) => {
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            // sens corrigé + douceur
            const y = -window.scrollY * speed;
            ref.current.style.backgroundPosition = `center ${y}px`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, speed]);
};
