import React, { useState } from 'react';
import { Artwork } from '../data/artworks';
import { X, Heart, Eye, MapPin, Calendar, Palette, Ruler, DollarSign, ShoppingCart, Info } from 'lucide-react';

type UserRole = 'visitor' | 'artist' | 'curator' | 'admin';

interface ArtworkDetailProps {
  artwork: Artwork;
  userRole: UserRole;
  onClose: () => void;
}

export function ArtworkDetail({ artwork, userRole, onClose }: ArtworkDetailProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'history' | 'significance'>('details');
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = () => {
    setIsPurchasing(true);
    setTimeout(() => {
      alert(`Purchase initiated for "${artwork.title}"! In a production app, this would connect to a payment processor.`);
      setIsPurchasing(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-6xl w-full my-8 shadow-2xl border border-slate-700">
        <div className="sticky top-0 bg-gradient-to-r from-purple-900 to-blue-900 border-b border-slate-700 rounded-t-2xl px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl text-white">{artwork.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Image Section */}
          <div>
            <div className="relative rounded-xl overflow-hidden mb-4 border-2 border-purple-500/50">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-auto"
              />
              <div className="absolute top-4 right-4">
                <StatusBadge status={artwork.status} />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard icon={Eye} label="Views" value={artwork.views.toLocaleString()} />
              <StatCard icon={Heart} label="Likes" value={artwork.likes.toLocaleString()} />
              <StatCard icon={DollarSign} label="Price" value={`$${artwork.price.toLocaleString()}`} />
            </div>
          </div>

          {/* Details Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-3xl text-white mb-2">{artwork.title}</h3>
              <p className="text-xl text-gray-300 mb-4">by {artwork.artist}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <DetailItem icon={Calendar} label="Year" value={artwork.year.toString()} />
                <DetailItem icon={Palette} label="Medium" value={artwork.medium} />
                <DetailItem icon={Ruler} label="Size" value={artwork.dimensions} />
                <DetailItem icon={MapPin} label="Origin" value={artwork.origin} />
              </div>

              {artwork.exhibition && (
                <div className="bg-purple-900/50 border border-purple-500/50 rounded-lg p-4 mb-6 backdrop-blur-lg">
                  <p className="text-purple-200">
                    <Info className="w-4 h-4 inline mr-2" />
                    Currently featured in: <strong className="text-white">{artwork.exhibition}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-700 mb-6">
              <div className="flex gap-4">
                <TabButton
                  label="Details"
                  active={activeTab === 'details'}
                  onClick={() => setActiveTab('details')}
                />
                <TabButton
                  label="Cultural History"
                  active={activeTab === 'history'}
                  onClick={() => setActiveTab('history')}
                />
                <TabButton
                  label="Significance"
                  active={activeTab === 'significance'}
                  onClick={() => setActiveTab('significance')}
                />
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-6 max-h-64 overflow-y-auto">
              {activeTab === 'details' && (
                <div>
                  <h4 className="text-white mb-3">Description</h4>
                  <p className="text-gray-300 leading-relaxed mb-4">{artwork.description}</p>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <p className="text-gray-300"><strong className="text-white">Period:</strong> {artwork.period}</p>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  <h4 className="text-white mb-3">Cultural & Historical Context</h4>
                  <p className="text-gray-300 leading-relaxed">{artwork.culturalHistory}</p>
                </div>
              )}

              {activeTab === 'significance' && (
                <div>
                  <h4 className="text-white mb-3">Cultural Significance</h4>
                  <p className="text-gray-300 leading-relaxed">{artwork.significance}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {userRole === 'visitor' && artwork.status === 'available' && (
              <div className="flex gap-3">
                <button
                  onClick={handlePurchase}
                  disabled={isPurchasing}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isPurchasing ? 'Processing...' : 'Purchase Artwork'}
                </button>
                <button className="px-6 py-3 border border-slate-600 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors text-white">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            )}

            {userRole === 'artist' && artwork.artistId === 'artist1' && (
              <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 backdrop-blur-lg">
                <p className="text-blue-200 mb-2">This is your artwork</p>
                <button className="text-blue-400 hover:text-blue-300">Edit Listing</button>
              </div>
            )}

            {userRole === 'curator' && (
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
                  Add to Exhibition
                </button>
                <button className="px-6 py-3 border border-slate-600 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors text-white">
                  Request Info
                </button>
              </div>
            )}

            {userRole === 'admin' && (
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                  Edit Details
                </button>
                <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg">
                  Feature Artwork
                </button>
                <button className="border border-slate-600 bg-slate-800/50 px-4 py-3 rounded-lg hover:bg-slate-700/50 transition-colors text-white">
                  View Analytics
                </button>
                <button className="border border-red-500/50 bg-red-900/30 text-red-300 px-4 py-3 rounded-lg hover:bg-red-800/50 transition-colors">
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: any = {
    available: { bg: 'bg-green-500', text: 'text-white', label: 'Available' },
    sold: { bg: 'bg-gray-500', text: 'text-white', label: 'Sold' },
    reserved: { bg: 'bg-yellow-500', text: 'text-white', label: 'Reserved' },
  };

  const config = statusConfig[status];
  return (
    <span className={`px-4 py-2 rounded-full ${config.bg} ${config.text} shadow-lg`}>
      {config.label}
    </span>
  );
}

function StatCard({ icon: Icon, label, value }: any) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center backdrop-blur-lg">
      <Icon className="w-5 h-5 text-purple-400 mx-auto mb-1" />
      <p className="text-white">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-5 h-5 text-purple-400 mt-0.5" />
      <div>
        <p className="text-gray-400">{label}</p>
        <p className="text-white">{value}</p>
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 px-1 border-b-2 transition-colors ${
        active
          ? 'border-purple-500 text-purple-400'
          : 'border-transparent text-gray-400 hover:text-gray-300'
      }`}
    >
      {label}
    </button>
  );
}