import React, { useState } from 'react';
import { artworks } from '../data/artworks';
import { 
  Calendar, Eye, Users, Award, Plus, Edit, Trash2, 
  Image as ImageIcon, TrendingUp, CheckCircle, Clock
} from 'lucide-react';

export function CuratorDashboard() {
  const [showExhibitionModal, setShowExhibitionModal] = useState(false);

  const exhibitions = [
    {
      id: '1',
      name: 'Modern Masters 2024',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      artworks: 12,
      visitors: 2450,
      status: 'active'
    },
    {
      id: '2',
      name: 'Cultural Crossroads',
      startDate: '2024-03-20',
      endDate: '2024-04-30',
      artworks: 15,
      visitors: 0,
      status: 'upcoming'
    },
    {
      id: '3',
      name: 'African Heritage Today',
      startDate: '2023-12-01',
      endDate: '2024-01-15',
      artworks: 10,
      visitors: 3890,
      status: 'completed'
    }
  ];

  const featuredArtworks = artworks.filter(a => a.exhibition);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-gray-900">Curator Dashboard</h1>
            <p className="text-gray-600">Organize exhibitions and curate collections</p>
          </div>
          <button
            onClick={() => setShowExhibitionModal(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Exhibition
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Calendar}
            label="Active Exhibitions"
            value="1"
            subtext="2 upcoming"
            color="purple"
          />
          <MetricCard
            icon={ImageIcon}
            label="Curated Artworks"
            value="37"
            subtext="Across all exhibitions"
            color="blue"
          />
          <MetricCard
            icon={Users}
            label="Total Visitors"
            value="6,340"
            subtext="+12% this month"
            color="green"
          />
          <MetricCard
            icon={Award}
            label="Featured Artists"
            value="8"
            subtext="From 6 countries"
            color="orange"
          />
        </div>

        {/* Exhibitions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl text-gray-900 mb-6">Exhibitions</h3>
          <div className="space-y-4">
            {exhibitions.map(exhibition => (
              <div key={exhibition.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-2xl text-gray-900">{exhibition.name}</h4>
                      <ExhibitionStatusBadge status={exhibition.status} />
                    </div>
                    <p className="text-gray-600">
                      {new Date(exhibition.startDate).toLocaleDateString()} - {new Date(exhibition.endDate).toLocaleDateString()}
                    </p>
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

                <div className="grid md:grid-cols-3 gap-6 mb-4">
                  <StatItem icon={ImageIcon} label="Artworks" value={exhibition.artworks.toString()} />
                  <StatItem icon={Users} label="Visitors" value={exhibition.visitors.toLocaleString()} />
                  <StatItem icon={TrendingUp} label="Engagement" value={exhibition.status === 'active' ? 'High' : 'N/A'} />
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                    Manage Artworks
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                  {exhibition.status === 'active' && (
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      View Virtual Tour
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Artwork Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-gray-900">Available Artworks for Curation</h3>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>All Artworks</option>
              <option>Contemporary</option>
              <option>Traditional</option>
              <option>Mixed Media</option>
            </select>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {artworks.slice(0, 6).map(artwork => (
              <div key={artwork.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-gray-900 mb-1">{artwork.title}</h4>
                  <p className="text-gray-600 mb-3">{artwork.artist}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Add to Exhibition
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights & Notes */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl text-gray-900 mb-6">Curatorial Notes</h3>
            <div className="space-y-4">
              <NoteItem
                artwork="Celestial Dreams"
                note="Perfect centerpiece for Modern Masters exhibition. Strong cultural narrative."
                date="2 days ago"
              />
              <NoteItem
                artwork="Sahara Sunset"
                note="Consider pairing with other African heritage pieces for thematic coherence."
                date="5 days ago"
              />
              <NoteItem
                artwork="Digital Lotus"
                note="Innovative blend of tradition and technology. Great for digital art section."
                date="1 week ago"
              />
            </div>
            <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              View All Notes
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <ActivityItem
                icon={CheckCircle}
                color="green"
                title="Exhibition approved"
                description="'Modern Masters 2024' is now live"
                time="2 hours ago"
              />
              <ActivityItem
                icon={Plus}
                color="blue"
                title="Artwork added"
                description="'Urban Rhythms' added to Cultural Crossroads"
                time="1 day ago"
              />
              <ActivityItem
                icon={Edit}
                color="purple"
                title="Exhibition updated"
                description="Updated dates for upcoming exhibition"
                time="3 days ago"
              />
              <ActivityItem
                icon={Clock}
                color="orange"
                title="Review pending"
                description="2 artworks need curatorial review"
                time="5 days ago"
              />
            </div>
          </div>
        </div>
      </div>

      {showExhibitionModal && <ExhibitionModal onClose={() => setShowExhibitionModal(false)} />}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, subtext, color }: any) {
  const colorClasses: any = {
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
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

function ExhibitionStatusBadge({ status }: { status: string }) {
  const statusConfig: any = {
    active: { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' },
    upcoming: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Upcoming' },
    completed: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Completed' },
  };

  const config = statusConfig[status];
  return (
    <span className={`px-3 py-1 rounded-full ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

function StatItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div>
        <p className="text-gray-600">{label}</p>
        <p className="text-xl text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function NoteItem({ artwork, note, date }: any) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-gray-900">{artwork}</h4>
        <span className="text-gray-500">{date}</span>
      </div>
      <p className="text-gray-600">{note}</p>
    </div>
  );
}

function ActivityItem({ icon: Icon, color, title, description, time }: any) {
  const colorClasses: any = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`w-10 h-10 rounded-full ${colorClasses[color]} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-gray-900">{title}</h4>
          <span className="text-gray-500">{time}</span>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function ExhibitionModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-gray-900">Create New Exhibition</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Exhibition Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <textarea
            placeholder="Exhibition Description"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Select Theme</option>
            <option>Contemporary Art</option>
            <option>Cultural Heritage</option>
            <option>Modern Masters</option>
            <option>Digital Art</option>
          </select>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Create Exhibition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
