import React, { useState } from 'react';
import { artworks } from '../data/artworks';
import { 
  Users, Palette, Eye, DollarSign, TrendingUp, Settings, 
  BarChart3, UserPlus, AlertCircle, CheckCircle, Clock,
  ArrowUp, ArrowDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('week');

  // Calculate metrics
  const totalRevenue = artworks.filter(a => a.status === 'sold').reduce((sum, a) => sum + a.price, 0);
  const totalViews = artworks.reduce((sum, a) => sum + a.views, 0);
  const totalLikes = artworks.reduce((sum, a) => sum + a.likes, 0);
  const availableArtworks = artworks.filter(a => a.status === 'available').length;

  // Chart data
  const salesData = [
    { month: 'Jan', sales: 12 },
    { month: 'Feb', sales: 19 },
    { month: 'Mar', sales: 15 },
    { month: 'Apr', sales: 25 },
    { month: 'May', sales: 22 },
    { month: 'Jun', sales: 30 },
  ];

  const viewsData = [
    { day: 'Mon', views: 320 },
    { day: 'Tue', views: 450 },
    { day: 'Wed', views: 280 },
    { day: 'Thu', views: 520 },
    { day: 'Fri', views: 680 },
    { day: 'Sat', views: 890 },
    { day: 'Sun', views: 750 },
  ];

  const statusData = [
    { name: 'Available', value: artworks.filter(a => a.status === 'available').length, color: '#10b981' },
    { name: 'Sold', value: artworks.filter(a => a.status === 'sold').length, color: '#6b7280' },
    { name: 'Reserved', value: artworks.filter(a => a.status === 'reserved').length, color: '#f59e0b' },
  ];

  const topArtworks = [...artworks].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-red-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-white">Admin Dashboard</h1>
          <p className="text-gray-300">Manage platform content, users, and analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={DollarSign}
            label="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change="+12.5%"
            trend="up"
            color="green"
          />
          <MetricCard
            icon={Eye}
            label="Total Views"
            value={totalViews.toLocaleString()}
            change="+8.2%"
            trend="up"
            color="blue"
          />
          <MetricCard
            icon={Palette}
            label="Available Artworks"
            value={availableArtworks.toString()}
            change="+3"
            trend="up"
            color="purple"
          />
          <MetricCard
            icon={Users}
            label="Active Users"
            value="1,234"
            change="+15.3%"
            trend="up"
            color="orange"
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-white">Monthly Sales</h3>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-300"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="sales" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Views Chart */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-slate-700 p-6">
            <h3 className="text-xl text-white mb-6">Weekly Views</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Artwork Status */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-slate-700 p-6">
            <h3 className="text-xl text-white mb-6">Artwork Status</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Artworks */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-slate-700 p-6">
            <h3 className="text-xl text-white mb-6">Top Performing Artworks</h3>
            <div className="space-y-4">
              {topArtworks.map((artwork, index) => (
                <div key={artwork.id} className="flex items-center gap-4 p-3 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-600/50">
                  <div className="text-2xl text-gray-500 w-8">{index + 1}</div>
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-white">{artwork.title}</h4>
                    <p className="text-gray-400">{artwork.artist}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-gray-300">
                      <Eye className="w-4 h-4" />
                      <span>{artwork.views.toLocaleString()}</span>
                    </div>
                    <p className="text-purple-400">${artwork.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          <ActionButton icon={UserPlus} label="Add User" color="blue" />
          <ActionButton icon={Palette} label="Add Artwork" color="purple" />
          <ActionButton icon={Settings} label="Platform Settings" color="gray" />
          <ActionButton icon={BarChart3} label="Full Analytics" color="green" />
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-slate-700 p-6">
          <h3 className="text-xl text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <ActivityItem
              icon={CheckCircle}
              color="green"
              title="New artwork approved"
              description="'Celestial Dreams' by Maya Chen"
              time="2 hours ago"
            />
            <ActivityItem
              icon={UserPlus}
              color="blue"
              title="New artist registered"
              description="John Smith joined as an artist"
              time="5 hours ago"
            />
            <ActivityItem
              icon={AlertCircle}
              color="yellow"
              title="Artwork flagged for review"
              description="'Abstract Thoughts' needs moderation"
              time="1 day ago"
            />
            <ActivityItem
              icon={Clock}
              color="gray"
              title="Exhibition scheduled"
              description="'Modern Masters 2024' starts in 3 days"
              time="2 days ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, change, trend, color }: any) {
  const colorClasses: any = {
    green: 'bg-green-600 text-white',
    blue: 'bg-blue-600 text-white',
    purple: 'bg-purple-600 text-white',
    orange: 'bg-orange-600 text-white',
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-slate-700 p-6 hover:shadow-2xl transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-${trend === 'up' ? 'green' : 'red'}-400`}>
          {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>
      <p className="text-3xl text-white mb-1">{value}</p>
      <p className="text-gray-300">{label}</p>
    </div>
  );
}

function ActionButton({ icon: Icon, label, color }: any) {
  const colorClasses: any = {
    blue: 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-blue-500/50',
    purple: 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border-purple-500/50',
    gray: 'bg-slate-600/20 hover:bg-slate-600/30 text-gray-300 border-slate-500/50',
    green: 'bg-green-600/20 hover:bg-green-600/30 text-green-300 border-green-500/50',
  };

  return (
    <button className={`flex items-center gap-3 p-4 rounded-xl border ${colorClasses[color]} transition-colors backdrop-blur-lg`}>
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

function ActivityItem({ icon: Icon, color, title, description, time }: any) {
  const colorClasses: any = {
    green: 'bg-green-600/20 text-green-300 border-green-500/50',
    blue: 'bg-blue-600/20 text-blue-300 border-blue-500/50',
    yellow: 'bg-yellow-600/20 text-yellow-300 border-yellow-500/50',
    gray: 'bg-slate-600/20 text-gray-300 border-slate-500/50',
  };

  return (
    <div className="flex items-start gap-4 p-4 hover:bg-slate-700/30 rounded-lg transition-colors">
      <div className={`w-10 h-10 rounded-full border ${colorClasses[color]} flex items-center justify-center flex-shrink-0 backdrop-blur-lg`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className="text-white">{title}</h4>
        <p className="text-gray-400">{description}</p>
      </div>
      <span className="text-gray-500">{time}</span>
    </div>
  );
}