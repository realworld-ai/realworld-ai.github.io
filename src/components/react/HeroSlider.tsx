import React, { useState, useEffect } from 'react';

interface HeroSliderProps {
  images: string[];
  interval?: number;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Images */}
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== currentIndex}
        >
          <img
            src={img}
            alt={`Hero slide ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay for contrast */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-sm transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-lab-accent scale-125' 
                  : 'bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
