import { Heart, Users, Target, HandHeart, ArrowRight, Mail, Phone, MapPin, Menu, X, ChevronLeft, ChevronRight, Sparkles, TrendingUp, Award } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const heroSlides = [
    {
      title: "Restoring Humaity",
      highlight: "Through small acts of Kindness",
      description: "Unity, inclusivity, and empowerment for all communities.",
      badge: "Together for Change",
      image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1920"
    },
    {
      title: "Empowering Communities",
      highlight: "All For All",
      description: "Creating sustainable change through collaborative action.",
      badge: "Unity in Action",
      image: "https://images.pexels.com/photos/6647034/pexels-photo-6647034.jpeg?auto=compress&cs=tinysrgb&w=1920"
    },
    {
      title: "Creating Hope",
      highlight: "Building Impact",
      description: "Transforming lives and strengthening communities.",
      badge: "Stronger as One",
      image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1920"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-light z-50 transition-all duration-300 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-30"></div>
                <img src="/siso-official_colored.png" alt="Sisi Sote Foundation" className="relative h-14 w-14 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-white tracking-tight">Sisi Sote Foundation LTD</h1>
                <p className="text-xs text-gradient-gold tracking-widest uppercase font-bold">All For All</p>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden glass p-2 rounded-xl hover:scale-105 transition-all duration-300"
            >
              {isMenuOpen ? <X className="text-white" size={24} /> : <Menu className="text-white" size={24} />}
            </button>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-white/90 hover:text-white transition-all duration-300 font-bold relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#mission" className="text-white/90 hover:text-white transition-all duration-300 font-bold relative group">
                Mission
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#impact" className="text-white/90 hover:text-white transition-all duration-300 font-bold relative group">
                Impact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="btn-primary">
                <span className="relative z-10">Get Involved</span>
                <div className="absolute inset-0 shimmer"></div>
              </a>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'}`}>
            <div className="flex flex-col space-y-3 pt-2">
              <a href="#about" className="glass p-3 rounded-xl text-white hover:text-emerald-400 transition-all duration-300 font-bold">About</a>
              <a href="#mission" className="glass p-3 rounded-xl text-white hover:text-emerald-400 transition-all duration-300 font-bold">Mission</a>
              <a href="#impact" className="glass p-3 rounded-xl text-white hover:text-emerald-400 transition-all duration-300 font-bold">Impact</a>
              <a href="#contact" className="btn-primary">Get Involved</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/70 via-charcoal-800/60 to-charcoal-700/50"></div>
            </div>
          ))}

          {/* Animated overlay elements */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-gold-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Carousel content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="w-full">
            {/* Text content */}
            <div className="max-w-4xl space-y-8 z-10">
              <div className="inline-block transition-all duration-700">
                <span className="glass text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase shimmer">
                  <span className="relative z-10">{heroSlides[currentSlide].badge}</span>
                </span>
              </div>

              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] transition-all duration-700"
                key={`title-${currentSlide}`}
              >
                {heroSlides[currentSlide].title}
                <span className="text-gradient block mt-3"> {heroSlides[currentSlide].highlight}</span>
              </h2>

              <p
                className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed transition-all duration-700 max-w-3xl font-medium"
                key={`desc-${currentSlide}`}
              >
                {heroSlides[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="btn-primary group">
                  <span className="relative z-10 flex items-center justify-center">
                    Join Our Cause
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={20} />
                  </span>
                  <div className="absolute inset-0 shimmer"></div>
                </button>
                <button className="glass text-white px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 font-bold text-lg border-2 border-white/30 hover:border-white/50 hover:scale-105">
                  Learn More
                </button>
              </div>

              {/* Carousel indicators */}
              <div className="flex space-x-3 pt-6">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentSlide ? 'w-16 bg-gradient-to-r from-emerald-400 to-emerald-600 glow-emerald' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Carousel navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 glass p-3 rounded-2xl hover:scale-110 transition-all duration-300 z-20 group"
          >
            <ChevronLeft className="text-white group-hover:scale-110 transition-transform duration-300" size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 glass p-3 rounded-2xl hover:scale-110 transition-all duration-300 z-20 group"
          >
            <ChevronRight className="text-white group-hover:scale-110 transition-transform duration-300" size={24} />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1.5 h-3 bg-white/90 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-900 text-white fade-in-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-gold-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="text-emerald-400 w-6 h-6" />
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-gold-400 rounded-full"></div>
              <Sparkles className="text-gold-400 w-6 h-6" />
            </div>
            <h3 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">Our Core Values</h3>
            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto font-medium">The principles that guide everything we do</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, color: 'emerald', title: 'Unity', desc: 'Everyone is part of the cause. We stand stronger together.' },
              { icon: HandHeart, color: 'gold', title: 'Inclusivity', desc: 'No one is left behind. Every voice matters.' },
              { icon: Target, color: 'emerald', title: 'Empowerment', desc: 'Working together to improve lives and create opportunities.' },
              { icon: Heart, color: 'gold', title: 'Hope', desc: 'Building a better shared future for all communities.' }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="card-premium"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${value.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                  <div className={`relative bg-gradient-to-br from-${value.color}-500 to-${value.color}-600 w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-[0_0_40px] group-hover:shadow-${value.color}-500/50 group-hover:scale-110 transition-all duration-500 glow-${value.color}`}>
                    <Icon className="text-white" size={36} />
                  </div>
                  <h4 className="relative text-2xl font-extrabold mb-3 tracking-tight">{value.title}</h4>
                  <p className="relative text-white/70 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sand via-white to-emerald-50/30 fade-in-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-emerald-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="glass-dark p-12 rounded-[2rem] border-2 border-emerald-500/20 shadow-2xl">
                <div className="space-y-6">
                  {[
                    { num: 1, color: 'emerald', icon: Target, title: 'Community Development', desc: 'Supporting local initiatives that create sustainable growth and opportunity.' },
                    { num: 2, color: 'gold', icon: TrendingUp, title: 'Education & Skills', desc: 'Empowering individuals through knowledge and practical training.' },
                    { num: 3, color: 'emerald', icon: Award, title: 'Social Support', desc: 'Providing assistance to vulnerable populations and promoting equality.' }
                  ].map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4 group">
                        <div className={`bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                          <ItemIcon className="text-white" size={28} />
                        </div>
                        <div>
                          <h5 className="text-2xl font-extrabold text-charcoal-900 mb-2 tracking-tight">{item.title}</h5>
                          <p className="text-charcoal-700 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <span className="inline-flex items-center gap-2 glass-dark text-gold-500 px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
                <Sparkles size={16} />
                Our Mission
              </span>
              <h3 className="text-5xl lg:text-6xl font-extrabold text-charcoal-900 leading-[1.1] tracking-tight">
                Creating Lasting Impact Through <span className="text-gradient">Unity in Action</span>
              </h3>
              <p className="text-xl text-charcoal-700 leading-relaxed">
                We are committed to fostering inclusive communities where every individual has the opportunity to thrive. Through collaborative efforts and sustainable programs, we're building a future where no one is left behind.
              </p>
              <div className="pt-4">
                <button className="btn-primary group">
                  <span className="relative z-10 flex items-center justify-center">
                    Discover Our Programs
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={20} />
                  </span>
                  <div className="absolute inset-0 shimmer"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section id="impact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-600 text-white fade-in-section relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-white/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-gold-400/40 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-1 w-24 bg-gradient-to-r from-white to-gold-400 rounded-full"></div>
            </div>
            <h3 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">Our Impact So Far</h3>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-medium">Together, we're making a real difference</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { number: '1,500+', label: 'Lives Impacted', icon: Users },
              { number: '25+', label: 'Active Programs', icon: Target },
              { number: '50+', label: 'Community Partners', icon: HandHeart }
            ].map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={index}
                  className="relative group text-center p-10 glass rounded-[2rem] border-2 border-white/30 hover:bg-white/20 hover:border-gold-400 transition-all duration-500 hover:scale-110 impact-card overflow-hidden"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative mb-6 inline-flex">
                    <StatIcon className="text-gold-400 w-12 h-12 group-hover:scale-125 transition-transform duration-500" />
                  </div>
                  <div className="relative text-7xl font-extrabold mb-4 text-gradient-gold counter">{stat.number}</div>
                  <p className="relative text-xl font-bold tracking-wide">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sand/50 via-white to-emerald-50/30 fade-in-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-8">
            <Sparkles className="text-emerald-500 w-8 h-8" />
            <div className="h-1 w-32 bg-gradient-to-r from-emerald-500 to-gold-500 rounded-full"></div>
            <Sparkles className="text-gold-500 w-8 h-8" />
          </div>
          <h3 className="text-5xl lg:text-6xl font-extrabold text-charcoal-900 mb-8 tracking-tight">
            Be Part of Something Bigger
          </h3>
          <p className="text-xl lg:text-2xl text-charcoal-700 mb-12 leading-relaxed max-w-3xl mx-auto">
            Your support can transform lives. Join us in our mission to create inclusive communities where everyone thrives.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-primary group">
              <span className="relative z-10 flex items-center justify-center">
                Donate Now
                <Heart className="ml-2 group-hover:scale-125 transition-transform duration-300" size={20} />
              </span>
              <div className="absolute inset-0 shimmer"></div>
            </button>
            <button className="btn-secondary group">
              <span className="relative z-10 flex items-center justify-center">
                Become a Volunteer
                <Users className="ml-2 group-hover:scale-125 transition-transform duration-300" size={20} />
              </span>
              <div className="absolute inset-0 shimmer"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-900 text-white fade-in-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[40rem] h-[40rem] bg-gold-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-block mb-6">
                <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-gold-400 rounded-full"></div>
              </div>
              <h3 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">Get in Touch</h3>
              <p className="text-xl text-white/80 mb-12 leading-relaxed">
                Have questions or want to learn more about our work? We'd love to hear from you.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Mail, color: 'emerald', title: 'Email Us', info: 'info@sisisote.org' },
                  { icon: Phone, color: 'gold', title: 'Call Us', info: '+254 XXX XXX XXX' },
                  { icon: MapPin, color: 'emerald', title: 'Visit Us', info: 'Nairobi, Kenya' }
                ].map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4 group cursor-pointer">
                      <div className={`bg-gradient-to-br from-${contact.color}-500 to-${contact.color}-600 p-3 rounded-2xl shadow-xl group-hover:shadow-[0_0_30px] group-hover:shadow-${contact.color}-500/50 group-hover:scale-110 transition-all duration-300`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg mb-1">{contact.title}</h5>
                        <p className="text-white/70">{contact.info}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="glass rounded-[2rem] p-10 border-2 border-white/20 shadow-2xl">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Your Name</label>
                  <input
                    type="text"
                    className="w-full glass-dark text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Email Address</label>
                  <input
                    type="email"
                    className="w-full glass-dark text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Message</label>
                  <textarea
                    rows={4}
                    className="w-full glass-dark text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 resize-none"
                    placeholder="Your message here..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full group">
                  <span className="relative z-10 flex items-center justify-center">
                    Send Message
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={20} />
                  </span>
                  <div className="absolute inset-0 shimmer"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-900 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img src="/siso-official_colored.png" alt="Sisi Sote Foundation" className="h-12 w-12" />
            <div className="text-left">
              <h4 className="text-lg font-extrabold text-white">Sisi Sote Foundation</h4>
              <p className="text-xs text-gradient-gold tracking-widest uppercase font-bold">All For All</p>
            </div>
          </div>
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Sisi Sote Foundation. All rights reserved.
          </p>
          <p className="text-white/60 text-sm mt-2">
            All For All
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
