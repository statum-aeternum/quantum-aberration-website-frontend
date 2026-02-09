import { useState, useEffect } from "react";
import { MerchItem } from "../types";
import { getMerch } from "../api";
import StickyTitle from "../components/StickyTitle";
import ProductPopup from "../components/ProductPopup";
import { Metadata } from "react";

interface MerchProps {
  selectedProductSlug: string | null;
  onProductClose: () => void;
  onProductOpen: (slug: string) => void;
}

const Merch = ({
  selectedProductSlug,
  onProductClose,
  onProductOpen,
}: MerchProps) => {
  const [merch, setMerch] = useState<MerchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<MerchItem | null>(
    null,
  );

  useEffect(() => {
    const fetchMerch = async () => {
      try {
        const fetchedMerch = await getMerch();
        setMerch(fetchedMerch);
      } catch (error) {
        console.error("Erreur lors du chargement du merch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMerch();
  }, []);

  useEffect(() => {
    if (selectedProductSlug && merch.length > 0) {
      const product = merch.find((item) => item.slug === selectedProductSlug);
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [selectedProductSlug, merch]);

  if (loading) {
    return (
      <section id="merch" className="min-h-screen py-20 bg-space-900 relative">
        <div className="container mx-auto px-6">
          <StickyTitle title="Merch" sectionId="merch" />
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cosmic-purple"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="merch" className="min-h-screen py-20 bg-space-900 relative">
      <div className="container mx-auto px-6">
        <StickyTitle title="Merch" sectionId="merch" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {merch.map((item) => (
            <div
              key={item.id}
              className="bg-space-700 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-space-600"
            >
              <div className="aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  <span className="text-2xl font-bold text-cosmic-purple">
                    {item.price}€
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <button
                  onClick={() => onProductOpen(item.slug)}
                  className="w-full bg-cosmic-purple hover:bg-cosmic-blue text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Voir plus
                </button>
              </div>
            </div>
          ))}
        </div>

        {merch.length === 0 && !loading && (
          <div className="text-center text-gray-400">
            <p>Aucun produit disponible pour le moment.</p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
            onProductClose();
          }}
        />
      )}
    </section>
  );
};

export default Merch;

export const metadata: Metadata = {
  title: "Merch | Quantum Aberration",
  description: "Decouvrez notre merch. Vente sur place uniquement.",
};
