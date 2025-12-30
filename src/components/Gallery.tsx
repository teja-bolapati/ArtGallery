import React, { useState } from 'react';
import { artworks, Artwork } from '../data/artworks';
import { ArtworkDetail } from './ArtworkDetail';
import { Search, Filter, Grid3x3, LayoutGrid, Heart, Eye, DollarSign } from 'lucide-react';

type UserRole = 'visitor' | 'artist' | 'curator' | 'admin';

interface GalleryProps {
  userRole: UserRole;
}

export function Gallery({ userRole }: GalleryProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || artwork.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-white">Art Gallery</h1>
          <p className="text-gray-300">Explore our curated collection of contemporary artworks</p>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            icon={LayoutGrid}
            label="Total Artworks"
            value={artworks.length.toString()}
            color="purple"
          />
          <MetricCard
            icon={Eye}
            label="Total Views"
            value={artworks.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
            color="blue"
          />
          <MetricCard
            icon={Heart}
            label="Total Likes"
            value={artworks.reduce((sum, a) => sum + a.likes, 0).toLocaleString()}
            color="red"
          />
          <MetricCard
            icon={DollarSign}
            label="Available"
            value={artworks.filter(a => a.status === 'available').length.toString()}
            color="green"
          />
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-slate-700 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search artworks, artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="reserved">Reserved</option>
              </select>

              <div className="flex gap-1 border border-slate-600 rounded-lg p-1 bg-slate-700/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-gray-300'}`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-gray-300'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'flex flex-col gap-4'
        }>
          {filteredArtworks.map(artwork => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              viewMode={viewMode}
              onClick={() => setSelectedArtwork(artwork)}
            />
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">No artworks found matching your criteria</p>
          </div>
        )}
      </div>

      {selectedArtwork && (
        <ArtworkDetail
          artwork={selectedArtwork}
          userRole={userRole}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, color }: any) {
  const colorClasses: any = {
    purple: 'bg-purple-600 text-white',
    blue: 'bg-blue-600 text-white',
    red: 'bg-red-600 text-white',
    green: 'bg-green-600 text-white',
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-slate-700 p-4 hover:shadow-2xl transition-shadow cursor-pointer">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-2xl text-white">{value}</p>
          <p className="text-gray-300">{label}</p>
        </div>
      </div>
    </div>
  );
}

function ArtworkCard({ artwork, viewMode, onClick }: { artwork: Artwork; viewMode: 'grid' | 'list'; onClick: () => void }) {
  if (viewMode === 'list') {
    return (
      <button
        onClick={onClick}
        className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-slate-700 p-4 hover:shadow-2xl hover:border-purple-500 transition-all text-left flex gap-4"
      >
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-32 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl text-white mb-1">{artwork.title}</h3>
              <p className="text-gray-300">by {artwork.artist}</p>
            </div>
            <StatusBadge status={artwork.status} />
          </div>
          <p className="text-gray-400 mb-3 line-clamp-2">{artwork.description}</p>
          <div className="flex items-center gap-4 text-gray-300">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {artwork.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {artwork.likes.toLocaleString()}
            </span>
            <span className="text-purple-400">${artwork.price.toLocaleString()}</span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-slate-700 overflow-hidden hover:shadow-2xl hover:border-purple-500 transition-all text-left group"
    >
      <div className="relative overflow-hidden">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <StatusBadge status={artwork.status} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl text-white mb-1">{artwork.title}</h3>
        <p className="text-gray-300 mb-2">by {artwork.artist}</p>
        <p className="text-gray-400 mb-3 line-clamp-2">{artwork.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-300">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {artwork.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {artwork.likes.toLocaleString()}
            </span>
          </div>
          <span className="text-purple-400">${artwork.price.toLocaleString()}</span>
        </div>
      </div>
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: any = {
    available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Available' },
    sold: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Sold' },
    reserved: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Reserved' },
  };

  const config = statusConfig[status];
  return (
    <span className={`px-3 py-1 rounded-full ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}