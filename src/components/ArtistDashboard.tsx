import React, { useState } from 'react';
import { artworks } from '../data/artworks';
import { 
  Upload, Eye, Heart, DollarSign, TrendingUp, Package, 
  BarChart3, Plus, Edit, Trash2, MessageSquare
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ArtistDashboard() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Filter artworks for current artist (demo: using artist1)
  const myArtworks = artworks.filter(a => a.artistId === 'artist1');
  
  const totalViews = myArtworks.reduce((sum, a) => sum + a.views, 0);
  const totalLikes = myArtworks.reduce((sum, a) => sum + a.likes, 0);
  const totalEarnings = myArtworks.filter(a => a.status === 'sold').reduce((sum, a) => sum + a.price, 0);
  const activeListing = myArtworks.filter(a => a.status === 'available').length;

  const performanceData = [
    { week: 'Week 1', views: 120, likes: 45 },
    { week: 'Week 2', views: 180, likes: 67 },
    { week: 'Week 3', views: 250, likes: 89 },
    { week: 'Week 4', views: 320, likes: 112 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-gray-900">Artist Dashboard</h1>
            <p className="text-gray-600">Manage your artworks and track performance</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Upload Artwork
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Eye}
            label="Total Views"
            value={totalViews.toLocaleString()}
            subtext="+15% this month"
            color="blue"
          />
          <MetricCard
            icon={Heart}
            label="Total Likes"
            value={totalLikes.toLocaleString()}
            subtext="+12% this month"
            color="red"
          />
          <MetricCard
            icon={DollarSign}
            label="Total Earnings"
            value={`$${totalEarnings.toLocaleString()}`}
            subtext="From sold artworks"
            color="green"
          />
          <MetricCard
            icon={Package}
            label="Active Listings"
            value={activeListing.toString()}
            subtext={`${myArtworks.length} total artworks`}
            color="purple"
          />
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-gray-900">Performance Overview</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-gray-600">Views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-gray-600">Likes</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="likes" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* My Artworks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl text-gray-900 mb-6">My Artworks</h3>
          <div className="space-y-4">
            {myArtworks.map(artwork => (
              <div key={artwork.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-xl text-gray-900">{artwork.title}</h4>
                      <p className="text-gray-600">{artwork.year} • {artwork.medium}</p>
                    </div>
                    <StatusBadge status={artwork.status} />
                  </div>
                  <div className="flex items-center gap-6 text-gray-600">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {artwork.views.toLocaleString()} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {artwork.likes.toLocaleString()} likes
                    </span>
                    <span className="text-purple-600">${artwork.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl text-gray-900 mb-6">Recent Inquiries</h3>
            <div className="space-y-4">
              <MessageItem
                name="Sarah Johnson"
                message="Interested in purchasing 'Celestial Dreams'"
                time="2 hours ago"
              />
              <MessageItem
                name="Gallery Curator"
                message="Would like to feature your work in upcoming exhibition"
                time="1 day ago"
              />
              <MessageItem
                name="Art Collector"
                message="Question about the cultural history of your piece"
                time="3 days ago"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl text-gray-900 mb-6">Sales History</h3>
            <div className="space-y-4">
              <SaleItem
                artwork="Celestial Dreams"
                buyer="Anonymous Collector"
                price={15000}
                date="Jan 15, 2024"
                status="completed"
              />
              <SaleItem
                artwork="Morning Light"
                buyer="Sarah Chen"
                price={12000}
                date="Dec 28, 2023"
                status="completed"
              />
            </div>
          </div>
        </div>
      </div>

      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, subtext, color }: any) {
  const colorClasses: any = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-3xl text-gray-900 mb-1">{value}</p>
      <p className="text-gray-900 mb-1">{label}</p>
      <p className="text-gray-600">{subtext}</p>
    </div>
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

function MessageItem({ name, message, time }: any) {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
        <MessageSquare className="w-5 h-5 text-purple-600" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-gray-900">{name}</h4>
          <span className="text-gray-500">{time}</span>
        </div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

function SaleItem({ artwork, buyer, price, date, status }: any) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div>
        <h4 className="text-gray-900">{artwork}</h4>
        <p className="text-gray-600">{buyer}</p>
        <p className="text-gray-500">{date}</p>
      </div>
      <div className="text-right">
        <p className="text-green-600">${price.toLocaleString()}</p>
        <span className="text-green-600 bg-green-100 px-2 py-1 rounded">Completed</span>
      </div>
    </div>
  );
}

function UploadModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-gray-900">Upload New Artwork</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-purple-400 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Click to upload or drag and drop</p>
            <p className="text-gray-500">PNG, JPG up to 10MB</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Artwork Title"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Price (USD)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Medium"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Dimensions"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <textarea
            placeholder="Description"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            placeholder="Cultural History & Significance"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Upload Artwork
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
