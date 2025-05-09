import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import logo from '../assets/logo.svg';
import { ModeToggle } from '@/components/ModeToggle';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  sticky?: boolean;
}

const Header: React.FC<HeaderProps> = ({ sticky = false }) => {
  return (
    <header className={`w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 text-primary-foreground z-50 transition-all ${sticky ? 'sticky top-0 shadow-md backdrop-blur-sm bg-primary/95' : 'fixed top-0 shadow-lg backdrop-blur-sm bg-primary/80'}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={logo} alt="Logo" className={`h-12 w-12 rounded-xl shadow-lg ${sticky ? '' : 'animate-pulse'}`} />
            <div className="absolute -top-1 -right-1 bg-yellow-400 dark:bg-yellow-500 rounded-full p-1 shadow-lg">
              <Sparkles className="h-3 w-3 text-yellow-900" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-2xl font-bold tracking-tight">Smart Job Match</h1>
              <Badge variant="outline" className="bg-white/20 text-white text-[10px] px-1.5 py-0 border-white/30 uppercase tracking-wider">Beta</Badge>
            </div>
            <p className="text-xs text-white/90">Powered by AI • Find the perfect consultant</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-1.5 shadow-inner hover:bg-white/30 transition-colors cursor-pointer">
            <Search className="h-4 w-4" />
            <span className="text-sm font-medium">AI Evaluator</span>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
    </header>
  );
};

export default Header;