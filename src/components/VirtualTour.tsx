import React, { useState } from 'react';
import { artworks } from '../data/artworks';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, Info } from 'lucide-react';

export function VirtualTour() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const currentArtwork = artworks[currentIndex];

  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % artworks.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Tour Header */}
      <div className="bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-20 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl text-white mb-2">Virtual Gallery Tour</h1>
          <p className="text-gray-300">Experience our collection from anywhere in the world</p>
        </div>
      </div>

      {/* Main Tour Display */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={currentArtwork.image}
            alt={currentArtwork.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-8 z-30 bg-white/10 backdrop-blur-lg border border-white/20 text-white p-4 rounded-full hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-8 z-30 bg-white/10 backdrop-blur-lg border border-white/20 text-white p-4 rounded-full hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Info Panel */}
        {showInfo && (
          <div className="absolute bottom-24 left-8 right-8 md:left-auto md:right-8 md:w-96 z-30 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white">
            <div className="mb-4">
              <h2 className="text-3xl mb-2">{currentArtwork.title}</h2>
              <p className="text-xl text-gray-300 mb-4">by {currentArtwork.artist}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-gray-400">Year</p>
                  <p>{currentArtwork.year}</p>
                </div>
                <div>
                  <p className="text-gray-400">Medium</p>
                  <p>{currentArtwork.medium}</p>
                </div>
                <div>
                  <p className="text-gray-400">Origin</p>
                  <p>{currentArtwork.origin}</p>
                </div>
                <div>
                  <p className="text-gray-400">Period</p>
                  <p>{currentArtwork.period}</p>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4">
                <p className="text-gray-300 line-clamp-3">{currentArtwork.culturalHistory}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="container mx-auto">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              {artworks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-white'
                      : index < currentIndex
                      ? 'bg-white/50'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <p className="text-white text-center">
              {currentIndex + 1} / {artworks.length}
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Pause Tour' : 'Play Tour'}
            </button>

            <button
              onClick={() => setShowInfo(!showInfo)}
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition-all"
            >
              <Info className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition-all"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition-all">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-32 left-0 right-0 z-10">
        <div className="flex gap-2 overflow-x-auto px-6 pb-2 scrollbar-hide">
          {artworks.map((artwork, index) => (
            <button
              key={artwork.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-white scale-110'
                  : 'border-white/20 opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
