import { useEffect } from "react";

interface GamePopupProps {
  onClose: () => void;
  onGameEnd: (slug: string) => void;
}

const GamePopup = ({ onClose, onGameEnd }: GamePopupProps) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "game-end") {
        const slug =
          import.meta.env.VITE_EASTER_EGG_MERCH_SLUG || "paul-l-alien-2";
        onClose();
        onGameEnd(slug);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onClose, onGameEnd]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md aspect-[3/4]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-cosmic-purple text-4xl z-10"
        >
          ×
        </button>
        <iframe
          src={import.meta.env.VITE_EASTER_EGG_GAME_URL || "/.hidden/"}
          className="w-full h-full border-0 rounded-lg"
          title="Space Shooter Game"
        />
      </div>
    </div>
  );
};

export default GamePopup;
