
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Home, Calendar, Star, User, Settings, Camera, Grid2X2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const navItems: NavItem[] = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Calendar', path: '/calendar', icon: <Calendar size={20} /> },
    { name: 'Favorites', path: '/favorites', icon: <Star size={20} /> },
    { name: 'Memories', path: '/memories', icon: <Camera size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    toast({
      description: `${newMode ? 'Dark' : 'Light'} mode activated`,
      duration: 1500,
    });
  };

  const handleNavigation = (path: string) => {
    // Allow navigation to implemented pages
    if (path === '/' || path === '/calendar' || path === '/favorites') {
      navigate(path);
    } else {
      // For unimplemented pages
      toast({
        description: "This feature will be available soon!",
        duration: 3000
      });
    }
  };

  return (
    <div className={cn("min-h-screen flex flex-col")}>
      {/* Header */}
      <header className="border-b py-3 px-4 flex items-center justify-between bg-background">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-memora-purple flex items-center justify-center">
            <Camera size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">Memora</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => toast({ description: "Layout view changed to grid", duration: 1500 })}
            className="p-2 rounded-full hover:bg-secondary"
          >
            <Grid2X2 size={20} />
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-secondary"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation - hidden on mobile */}
        {!isMobile && (
          <aside className="w-60 p-4 border-r bg-background">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "nav-link w-full text-left",
                    location.pathname === item.path && "active"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <nav className="border-t p-2 flex justify-around bg-background">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "p-2 rounded-md flex flex-col items-center",
                location.pathname === item.path && "text-primary"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Layout;
