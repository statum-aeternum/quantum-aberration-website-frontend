import { useState, useEffect } from "react";
import { NewsItem } from "../types";
import { getNews } from "../api";
import StickyTitle from "../components/StickyTitle";
import NewsPopup from "../components/NewsPopup";
import { Helmet } from "react-helmet";

interface NewsProps {
  selectedNewsSlug: string | null;
  onNewsClose: () => void;
  onNewsOpen: (slug: string) => void;
}

const News = ({ selectedNewsSlug, onNewsClose, onNewsOpen }: NewsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNews, setTotalNews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const newsPerPage = 10;
  const totalPages = Math.ceil(totalNews / newsPerPage);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { news: fetchedNews, total } = await getNews(
          currentPage,
          newsPerPage,
        );
        setNews(fetchedNews);
        setTotalNews(total);
      } catch (error) {
        console.error("Erreur lors du chargement des news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]);

  useEffect(() => {
    if (selectedNewsSlug && news.length > 0) {
      const newsItem = news.find((item) => item.slug === selectedNewsSlug);
      if (newsItem) {
        setSelectedNews(newsItem);
      }
    }
  }, [selectedNewsSlug, news]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("news")?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <section id="news" className="min-h-screen py-20 bg-space-950 relative">
        <div className="container mx-auto px-6">
          <StickyTitle title="News" sectionId="news" />
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cosmic-purple"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>News | Quantum Aberration</title>
        <meta name="description" content="Les news du groupe" />
        <meta property="og:title" content="News" />
        <meta property="og:description" content="Les news du groupe" />
        <meta property="og:type" content="section" />
      </Helmet>
      <section id="news" className="min-h-screen py-20 bg-space-950 relative">
        <div className="container mx-auto px-6">
          <StickyTitle title="News" sectionId="news" />

          <div className="space-y-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-space-800 rounded-lg overflow-hidden shadow-xl border border-space-700 md:h-64"
              >
                <div className="md:flex md:h-full">
                  <div className="md:w-1/3 h-48 md:h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-cosmic-purple">
                        {item.title}
                      </h3>
                      <span className="text-gray-400 text-sm">
                        {new Date(item.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed line-clamp-3">
                      {item.content}
                    </p>
                    <button
                      onClick={() => onNewsOpen(item.slug)}
                      className="mt-4 bg-cosmic-purple hover:bg-cosmic-blue text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                    >
                      Voir plus
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 space-x-2">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                      currentPage === page
                        ? "bg-cosmic-purple text-white"
                        : "bg-space-700 text-gray-300 hover:bg-space-600"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {selectedNews && (
          <NewsPopup
            news={selectedNews}
            onClose={() => {
              setSelectedNews(null);
              onNewsClose();
            }}
          />
        )}
      </section>
    </>
  );
};

export default News;
