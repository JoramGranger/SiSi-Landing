import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface OutreachCardProps {
  title: string;
  description: string;
  images: string[];
  category: string;
  impact: string;
}

export const OutreachCard = ({ title, description, images, category, impact }: OutreachCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="card-premium group">
      <div className="relative h-72 w-full overflow-hidden rounded-2xl mb-6">
        <div className="relative w-full h-full">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`${title} - Image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>

        <div className="absolute top-4 right-4 z-10">
          <span className="glass text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
            {category}
          </span>
        </div>
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 glass p-2.5 rounded-xl hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronLeft className="text-white" size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 glass p-2.5 rounded-xl hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronRight className="text-white" size={20} />
            </button>
            
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImage 
                      ? 'w-8 bg-white shadow-lg' 
                      : 'w-1.5 bg-white/60 hover:bg-white/80'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="relative space-y-4">
        <h4 className="text-2xl font-extrabold text-charcoal-900 tracking-tight group-hover:text-emerald-600 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-charcoal-700 leading-relaxed line-clamp-3">{description}</p>
        
        <div className="pt-4 border-t border-charcoal-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-charcoal-600 font-bold uppercase tracking-wide mb-1">Impact</p>
              <p className="text-lg font-extrabold text-emerald-600">{impact}</p>
            </div>
            <button className="glass-dark p-3 rounded-xl hover:bg-emerald-500 transition-all duration-300 group/btn flex-shrink-0">
              <ArrowRight className="text-emerald-600 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
