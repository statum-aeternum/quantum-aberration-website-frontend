import { NewsItem } from '../types';

interface NewsPopupProps {
  news: NewsItem;
  onClose: () => void;
}

const NewsPopup = ({ news, onClose }: NewsPopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80" onClick={onClose}>
      <div className="bg-space-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-space-600" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center text-2xl z-10"
          >
            ×
          </button>
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-auto"
          />
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-cosmic-purple">{news.title}</h2>
            <span className="text-gray-400 text-sm whitespace-nowrap ml-4">{new Date(news.date).toLocaleDateString('fr-FR')}</span>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">{news.content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPopup;
