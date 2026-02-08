import { MerchItem } from "../types";

interface ProductPopupProps {
  product: MerchItem;
  onClose: () => void;
}

const ProductPopup = ({ product, onClose }: ProductPopupProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div
        className="bg-space-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-space-600"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-white">{product.name}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-300 mb-6 text-lg">{product.description}</p>

            <div className="mt-auto">
              <div className="text-4xl font-bold text-cosmic-purple mb-6">
                {product.price}€
              </div>
              <div className="bg-space-700 border border-space-600 rounded-lg p-4 text-center">
                <p className="text-gray-300 mb-2">Vente sur place uniquement</p>
                <p className="text-gray-400 text-sm">
                  Contactez-nous par mail si vous n'avez pas l'occasion de nous
                  voir en live
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
