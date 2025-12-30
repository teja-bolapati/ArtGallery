import React from 'react';
import { Home, LayoutDashboard, Eye, Palette, Users, Menu, X, LogOut } from 'lucide-react';

type UserRole = 'visitor' | 'artist' | 'curator' | 'admin';
type View = 'home' | 'gallery' | 'tour' | 'dashboard';

interface NavigationProps {
  currentView: View;
  currentRole: UserRole;
  onNavigate: (view: View) => void;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
}

export function Navigation({ currentView, currentRole, onNavigate, onRoleChange, onLogout }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const roleLabels: Record<UserRole, string> = {
    visitor: 'Visitor',
    artist: 'Artist',
    curator: 'Curator',
    admin: 'Admin',
  };

  const roleIcons: Record<UserRole, any> = {
    visitor: Users,
    artist: Palette,
    curator: Eye,
    admin: LayoutDashboard,
  };

  const roleColors: Record<UserRole, string> = {
    visitor: 'from-blue-600 to-cyan-600',
    artist: 'from-purple-600 to-pink-600',
    curator: 'from-emerald-600 to-teal-600',
    admin: 'from-red-600 to-orange-600',
  };

  const RoleIcon = roleIcons[currentRole];

  return (
    <nav className={`bg-gradient-to-r ${roleColors[currentRole]} border-b border-white/20 sticky top-0 z-50 shadow-lg`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Palette className="w-8 h-8 text-white" />
              <span className="text-xl text-white">ArtGallery</span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              <NavButton
                icon={Home}
                label="Gallery"
                active={currentView === 'gallery'}
                onClick={() => onNavigate('gallery')}
              />
              <NavButton
                icon={Eye}
                label="Virtual Tour"
                active={currentView === 'tour'}
                onClick={() => onNavigate('tour')}
              />
              <NavButton
                icon={LayoutDashboard}
                label="Dashboard"
                active={currentView === 'dashboard'}
                onClick={() => onNavigate('dashboard')}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <select
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="appearance-none bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg pl-10 pr-8 py-2 text-white cursor-pointer hover:bg-white/30 transition-colors"
              >
                <option value="visitor">Visitor</option>
                <option value="artist">Artist</option>
                <option value="curator">Curator</option>
                <option value="admin">Admin</option>
              </select>
              <RoleIcon className="w-5 h-5 text-white absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          <button
            className="md:hidden p-2 hover:bg-white/20 rounded-lg text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col gap-2">
              <MobileNavButton
                icon={Home}
                label="Gallery"
                active={currentView === 'gallery'}
                onClick={() => {
                  onNavigate('gallery');
                  setMobileMenuOpen(false);
                }}
              />
              <MobileNavButton
                icon={Eye}
                label="Virtual Tour"
                active={currentView === 'tour'}
                onClick={() => {
                  onNavigate('tour');
                  setMobileMenuOpen(false);
                }}
              />
              <MobileNavButton
                icon={LayoutDashboard}
                label="Dashboard"
                active={currentView === 'dashboard'}
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileMenuOpen(false);
                }}
              />
              <div className="mt-4 pt-4 border-t border-white/20">
                <select
                  value={currentRole}
                  onChange={(e) => onRoleChange(e.target.value as UserRole)}
                  className="w-full appearance-none bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg px-4 py-2 text-white mb-2"
                >
                  <option value="visitor">Visitor</option>
                  <option value="artist">Artist</option>
                  <option value="curator">Curator</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavButton({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-white/30 text-white'
          : 'text-white/80 hover:bg-white/20 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

function MobileNavButton({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? 'bg-white/30 text-white'
          : 'text-white/80 hover:bg-white/20 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}