import React, { useState } from 'react';
import { Gallery } from './components/Gallery';
import { AdminDashboard } from './components/AdminDashboard';
import { ArtistDashboard } from './components/ArtistDashboard';
import { VisitorDashboard } from './components/VisitorDashboard';
import { CuratorDashboard } from './components/CuratorDashboard';
import { VirtualTour } from './components/VirtualTour';
import { Navigation } from './components/Navigation';
import { LoginPortal } from './components/LoginPortal';
import { Home, LayoutDashboard, Palette, Users, Eye } from 'lucide-react';

type UserRole = 'visitor' | 'artist' | 'curator' | 'admin';
type View = 'home' | 'gallery' | 'tour' | 'dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('visitor');
  const [currentView, setCurrentView] = useState<View>('home');

  const handleLogin = (role: UserRole) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  if (!isAuthenticated) {
    return <LoginPortal onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (currentRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'artist':
        return <ArtistDashboard />;
      case 'curator':
        return <CuratorDashboard />;
      case 'visitor':
        return <VisitorDashboard />;
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-20">
              <div className="text-center mb-16">
                <h1 className="text-6xl mb-6 text-white">Virtual Art Gallery</h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Experience world-class art from anywhere. Explore cultural heritage, 
                  discover emerging artists, and immerse yourself in virtual exhibitions.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <button
                  onClick={() => setCurrentView('gallery')}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105"
                >
                  <Home className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                  <h3 className="text-2xl mb-3 text-white">Browse Gallery</h3>
                  <p className="text-gray-300">Explore our curated collection of artworks</p>
                </button>

                <button
                  onClick={() => setCurrentView('tour')}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105"
                >
                  <Eye className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                  <h3 className="text-2xl mb-3 text-white">Virtual Tour</h3>
                  <p className="text-gray-300">Take a guided tour through our exhibitions</p>
                </button>

                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105"
                >
                  <LayoutDashboard className="w-12 h-12 text-green-300 mx-auto mb-4" />
                  <h3 className="text-2xl mb-3 text-white">Dashboard</h3>
                  <p className="text-gray-300">Manage your gallery experience</p>
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { role: 'visitor' as UserRole, icon: Users, label: 'Visitor', color: 'blue' },
                  { role: 'artist' as UserRole, icon: Palette, label: 'Artist', color: 'purple' },
                  { role: 'curator' as UserRole, icon: Eye, label: 'Curator', color: 'green' },
                  { role: 'admin' as UserRole, icon: LayoutDashboard, label: 'Admin', color: 'red' },
                ].map(({ role, icon: Icon, label, color }) => (
                  <button
                    key={role}
                    onClick={() => setCurrentRole(role)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      currentRole === role
                        ? `bg-${color}-500/30 border-${color}-400`
                        : 'bg-white/5 border-white/20 hover:border-white/40'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${currentRole === role ? `text-${color}-300` : 'text-gray-400'}`} />
                    <p className={currentRole === role ? 'text-white' : 'text-gray-400'}>{label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'gallery':
        return <Gallery userRole={currentRole} />;
      case 'tour':
        return <VirtualTour />;
      case 'dashboard':
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {currentView !== 'home' && (
        <Navigation 
          currentView={currentView} 
          currentRole={currentRole}
          onNavigate={setCurrentView}
          onRoleChange={setCurrentRole}
          onLogout={handleLogout}
        />
      )}
      {renderContent()}
    </div>
  );
}