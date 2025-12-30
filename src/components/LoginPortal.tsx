import React, { useState } from 'react';
import { Users, Palette, Eye, Shield, ArrowRight, Lock, Mail } from 'lucide-react';

type UserRole = 'visitor' | 'artist' | 'curator' | 'admin';

interface LoginPortalProps {
  onLogin: (role: UserRole) => void;
}

const loginCredentials = {
  visitor: { email: 'visitor@gallery.com', password: 'visitor123' },
  artist: { email: 'artist@gallery.com', password: 'artist123' },
  curator: { email: 'curator@gallery.com', password: 'curator123' },
  admin: { email: 'admin@gallery.com', password: 'admin123' },
};

export function LoginPortal({ onLogin }: LoginPortalProps) {
  const [selectedPortal, setSelectedPortal] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPortal) return;
    
    const credentials = loginCredentials[selectedPortal];
    
    if (email === credentials.email && password === credentials.password) {
      onLogin(selectedPortal);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const portals = [
    {
      role: 'visitor' as UserRole,
      icon: Users,
      title: 'Visitor Portal',
      description: 'Explore artworks and virtual tours',
      gradient: 'from-blue-600 to-cyan-600',
      shadowColor: 'shadow-blue-500/50',
    },
    {
      role: 'artist' as UserRole,
      icon: Palette,
      title: 'Artist Portal',
      description: 'Manage your artwork collection',
      gradient: 'from-purple-600 to-pink-600',
      shadowColor: 'shadow-purple-500/50',
    },
    {
      role: 'curator' as UserRole,
      icon: Eye,
      title: 'Curator Portal',
      description: 'Organize exhibitions and curate',
      gradient: 'from-emerald-600 to-teal-600',
      shadowColor: 'shadow-emerald-500/50',
    },
    {
      role: 'admin' as UserRole,
      icon: Shield,
      title: 'Admin Portal',
      description: 'Manage platform and users',
      gradient: 'from-red-600 to-orange-600',
      shadowColor: 'shadow-red-500/50',
    },
  ];

  if (!selectedPortal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-6xl mb-4 text-white">Virtual Art Gallery</h1>
            <p className="text-xl text-gray-300">Select your portal to continue</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portals.map(({ role, icon: Icon, title, description, gradient, shadowColor }) => (
              <button
                key={role}
                onClick={() => setSelectedPortal(role)}
                className={`bg-gradient-to-br ${gradient} p-8 rounded-2xl shadow-2xl ${shadowColor} hover:scale-105 transition-all duration-300 text-left group`}
              >
                <Icon className="w-16 h-16 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl text-white mb-2">{title}</h3>
                <p className="text-gray-200 mb-4">{description}</p>
                <div className="flex items-center text-white">
                  <span className="mr-2">Enter</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl text-white mb-4">Demo Credentials</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-300">
              <div>
                <p className="text-blue-400">Visitor:</p>
                <p className="text-sm">visitor@gallery.com</p>
                <p className="text-sm">visitor123</p>
              </div>
              <div>
                <p className="text-purple-400">Artist:</p>
                <p className="text-sm">artist@gallery.com</p>
                <p className="text-sm">artist123</p>
              </div>
              <div>
                <p className="text-emerald-400">Curator:</p>
                <p className="text-sm">curator@gallery.com</p>
                <p className="text-sm">curator123</p>
              </div>
              <div>
                <p className="text-red-400">Admin:</p>
                <p className="text-sm">admin@gallery.com</p>
                <p className="text-sm">admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentPortal = portals.find(p => p.role === selectedPortal)!;
  const Icon = currentPortal.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentPortal.gradient} flex items-center justify-center p-4`}>
      <div className="max-w-md w-full">
        <button
          onClick={() => {
            setSelectedPortal(null);
            setEmail('');
            setPassword('');
            setError('');
          }}
          className="mb-6 text-white hover:text-gray-200 transition-colors flex items-center gap-2"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
          Back to portal selection
        </button>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <Icon className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-3xl text-white text-center mb-2">{currentPortal.title}</h2>
          <p className="text-gray-300 text-center mb-8">{currentPortal.description}</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-white text-gray-900 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-gray-300 text-center">Demo Credentials:</p>
            <p className="text-white text-center">{loginCredentials[selectedPortal].email}</p>
            <p className="text-white text-center">{loginCredentials[selectedPortal].password}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
