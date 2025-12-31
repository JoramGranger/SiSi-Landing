import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSanityContent } from '../hooks/useSanityContent';

interface SocialMedia {
  _id?: string;
  platform: string;
  url: string;
  enabled: boolean;
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { data: socialMedia } = useSanityContent<SocialMedia[]>(
    `*[_type == "socialMedia" && enabled == true] {
      _id,
      platform,
      url,
      enabled
    }`,
    [{ platform: 'instagram', url: 'https://instagram.com/sisi_sote_uganda', enabled: true }]
  );

  const instagramUrl = socialMedia.find(s => s.platform === 'instagram')?.url || 'https://instagram.com/sisi_sote_uganda';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const isHomePage = location.pathname === '/';
  const navBg = scrolled || !isHomePage ? 'bg-charcoal-900/95 backdrop-blur-lg' : 'glass-light';
  const textColor = 'text-white';
  const textHoverColor = 'hover:text-emerald-400';

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled || !isHomePage ? 'border-white/10' : 'border-charcoal-200/20'} ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-30"></div>
                <img src="/images/icons/siso-official_white.svg" alt="Sisi Sote Foundation" className="relative h-16 w-16 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
              </div>
              <div>
                <h1 className={`text-xl font-extrabold tracking-tight transition-colors duration-300 ${textColor}`}>Sisi Sote Foundation LTD</h1>
                <p className="text-xs text-gradient-gold tracking-widest uppercase font-bold">All For All</p>
              </div>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden glass p-2 rounded-xl hover:scale-105 transition-all duration-300`}
            >
              {isMenuOpen ? <X className={textColor} size={24} /> : <Menu className={textColor} size={24} />}
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="/#about" 
                onClick={(e) => handleHashClick(e, '#about')}
                className={`${textColor} ${textHoverColor} transition-all duration-300 font-bold relative group`}
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="/#mission" 
                onClick={(e) => handleHashClick(e, '#mission')}
                className={`${textColor} ${textHoverColor} transition-all duration-300 font-bold relative group`}
              >
                Mission
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="/#impact" 
                onClick={(e) => handleHashClick(e, '#impact')}
                className={`${textColor} ${textHoverColor} transition-all duration-300 font-bold relative group`}
              >
                Impact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <Link 
                to="/outreach" 
                className={`${textColor} ${textHoverColor} transition-all duration-300 font-bold relative group ${location.pathname === '/outreach' ? 'text-emerald-500' : ''}`}
              >
                Outreach
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300 ${location.pathname === '/outreach' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
              <a 
                href="/#contact" 
                onClick={(e) => handleHashClick(e, '#contact')}
                className="btn-primary"
              >
                <span className="relative z-10">Get Involved</span>
                <div className="absolute inset-0 shimmer"></div>
              </a>
            </div>
          </div>

          <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
            <div className="flex flex-col space-y-3 pt-2">
              <a 
                href="/#about" 
                onClick={(e) => handleHashClick(e, '#about')}
                className={`glass p-3 rounded-xl ${textColor} ${textHoverColor} transition-all duration-300 font-bold`}
              >
                About
              </a>
              <a 
                href="/#mission" 
                onClick={(e) => handleHashClick(e, '#mission')}
                className={`glass p-3 rounded-xl ${textColor} ${textHoverColor} transition-all duration-300 font-bold`}
              >
                Mission
              </a>
              <a 
                href="/#impact" 
                onClick={(e) => handleHashClick(e, '#impact')}
                className={`glass p-3 rounded-xl ${textColor} ${textHoverColor} transition-all duration-300 font-bold`}
              >
                Impact
              </a>
              <Link 
                to="/outreach" 
                onClick={() => setIsMenuOpen(false)}
                className={`glass p-3 rounded-xl ${textColor} ${textHoverColor} transition-all duration-300 font-bold`}
              >
                Outreach
              </Link>
              <a 
                href="/#contact" 
                onClick={(e) => handleHashClick(e, '#contact')}
                className="btn-primary"
              >
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {children}
      </main>

      <footer className="bg-charcoal-900 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              <img src="/images/icons/siso-official_colored.png" alt="Sisi Sote Foundation" className="h-20 w-auto" />
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-white/70 uppercase tracking-wider font-semibold">Follow Us</span>
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass p-3 rounded-xl hover:bg-emerald-500 transition-all duration-300 group"
                aria-label="Follow us on Instagram"
              >
                <img 
                  src="/images/instagram.svg" 
                  alt="Instagram" 
                  className="w-6 h-6 brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                />
              </a>
            </div>
          </div>

          <div className="mt-8 space-y-1">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Sisi Sote Foundation. All rights reserved.
            </p>
            <p className="text-emerald-400/60 text-xs italic font-medium">
              Est. August 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
