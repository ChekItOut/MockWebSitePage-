
import React from 'react';
import { Box, Cpu, Github, Layout } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg">
          <Cpu className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-extrabold tracking-tighter uppercase">Lumina.AI</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <a href="#" className="hover:text-white transition-colors">Experience</a>
        <a href="#" className="hover:text-white transition-colors">Technology</a>
        <a href="#" className="hover:text-white transition-colors">Showcase</a>
        <a href="#" className="hover:text-white transition-colors">Docs</a>
      </nav>

      <div className="flex items-center gap-4">
        <button className="hidden sm:block text-sm font-semibold hover:text-cyan-400 transition-colors">
          Sign In
        </button>
        <button className="px-5 py-2 text-sm font-bold bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
