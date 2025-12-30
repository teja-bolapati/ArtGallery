import React, { useState } from 'react';
import { artworks } from '../data/artworks';
import { Heart, Eye, ShoppingCart, BookOpen, Star, TrendingUp, Bookmark } from 'lucide-react';

export function VisitorDashboard() {
  const [likedArtworks] = useState([artworks[0], artworks[1], artworks[3]]);
  const [viewHistory] = useState([artworks[0], artworks[2], artworks[4], artworks[5]]);
  const [savedTours] = useState([
    { id: '1', name: 'Contemporary Collection Tour', artworks: 8, duration: '15 min', thumbnail: artworks[0].image },
    { id: '2', name: 'Cultural Heritage Journey', artworks: 10, duration: '20 min', thumbnail: artworks[2].image },
  ]);

  const recommendations = artworks.slice(4, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Your personalized art experience</p>
        </div>

        {/* Activity Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            icon={Eye}
            label="Artworks Viewed"
            value={viewHistory.length.toString()}
            color="blue"
          />
          <MetricCard
            icon={Heart}
            label="Liked"
            value={likedArtworks.length.toString()}
            color="red"
          />
          <MetricCard
            icon={Bookmark}
            label="Saved Tours"
            value={savedTours.length.toString()}
            color="purple"
          />
          <MetricCard
            icon={ShoppingCart}
            label="Purchases"
            value="0"
            color="green"
          />
        </div>

        {/* Liked Artworks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-gray-900">Your Liked Artworks</h3>
            <button className="text-purple-600 hover:underline">View All</button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {likedArtworks.map(artwork => (
              <div key={artwork.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  </button>
                </div>
                <h4 className="text-gray-900 mb-1">{artwork.title}</h4>
                <p className="text-gray-600">{artwork.artist}</p>
                <p className="text-purple-600">${artwork.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Virtual Tours */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-gray-900">Saved Virtual Tours</h3>
            <button className="text-purple-600 hover:underline">Browse More Tours</button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {savedTours.map(tour => (
              <div key={tour.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src={tour.thumbnail}
                  alt={tour.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-gray-900 mb-2">{tour.name}</h4>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {tour.artworks} artworks
                    </span>
                    <span>{tour.duration}</span>
                  </div>
                  <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Start Tour
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-gray-900">Recently Viewed</h3>
            <button className="text-purple-600 hover:underline">Clear History</button>
          </div>
          <div className="space-y-4">
            {viewHistory.map(artwork => (
              <div key={artwork.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">{artwork.title}</h4>
                  <p className="text-gray-600">{artwork.artist}</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-600">${artwork.price.toLocaleString()}</p>
                  <p className="text-gray-500">Viewed 2 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-yellow-500" />
            <h3 className="text-xl text-gray-900">Recommended For You</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map(artwork => (
              <div key={artwork.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-3 left-3 right-3">
                      <button className="w-full bg-white text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                <h4 className="text-gray-900 mb-1">{artwork.title}</h4>
                <p className="text-gray-600 mb-1">{artwork.artist}</p>
                <div className="flex items-center justify-between">
                  <p className="text-purple-600">${artwork.price.toLocaleString()}</p>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="flex items-start gap-4">
            <BookOpen className="w-12 h-12 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl mb-2">Explore Art History</h3>
              <p className="text-purple-100 mb-4">
                Dive deeper into the cultural significance and historical context of our artworks
              </p>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, color }: any) {
  const colorClasses: any = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl text-gray-900 mb-1">{value}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}
