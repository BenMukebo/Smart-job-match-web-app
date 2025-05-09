import React from 'react';
import { Heart, Github, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';
import logo from '../assets/logo.svg';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-indigo-200 dark:border-indigo-950/30 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-indigo-950/20 dark:to-violet-950/20 py-8 mt-auto backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="Logo" className="h-8 w-8 rounded-lg" />
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-700 to-violet-700 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">Smart Job Match</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered job matching platform helping clients find the perfect consultants for their projects.
            </p>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Worldwide • Remote First</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-indigo-800 dark:text-indigo-300">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-indigo-800 dark:text-indigo-300">Connect with us</h3>
            <div className="flex gap-3">
              <a href="https://github.com/benMukebo/" className="group flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://twitter.com/BenMukebo" className="group flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/in/kasongo-mukebo-ben/" className="group flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://benmukebo.vercel.app/" className="group flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <div className="mt-4">
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors font-medium">Subscribe to Updates</button>
            </div>
          </div>
        </div>
        
        <Separator className="my-4 bg-indigo-200/50 dark:bg-indigo-800/30" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Smart Job Match. All rights reserved.</span>
          <div className="flex items-center gap-1 mt-2 md:mt-0">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-pink-500 fill-pink-500" />
            <span>using</span>
            <a href="https://react.dev/" className="underline hover:text-indigo-700 dark:hover:text-indigo-400 font-medium" target="_blank" rel="noopener noreferrer">React</a>
            <span>&</span>
            <a href="https://ui.shadcn.com/" className="underline hover:text-indigo-700 dark:hover:text-indigo-400 font-medium" target="_blank" rel="noopener noreferrer">shadcn/ui</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;