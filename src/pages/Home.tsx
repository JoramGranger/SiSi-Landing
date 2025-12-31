import { Heart, Users, Target, HandHeart, ArrowRight, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Sparkles, TrendingUp, Award } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSanityContent } from '../hooks/useSanityContent';

interface HeroSlide {
  _id?: string;
  title: string;
  highlight: string;
  description: string;
  badge: string;
  image: {
    asset?: {
      url: string;
    };
  } | string;
}

interface CoreValue {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface Mission {
  _id?: string;
  title: string;
  description: string;
  image: {
    asset?: {
      url: string;
    };
  } | string;
}

interface ImpactStat {
  _id?: string;
  number: string;
  label: string;
  icon: string;
}

interface ContactInfo {
  _id?: string;
  title: string;
  info: string;
  icon: string;
  color: string;
}

interface ContactCategory {
  _id?: string;
  value: string;
  label: string;
}

const defaultHeroSlides: HeroSlide[] = [
  {
    title: "Restoring Humanity",
    highlight: "Through small acts of Kindness",
    description: "Unity, inclusivity, and empowerment for all communities.",
    badge: "Together for Change",
    image: "/images/sise_images/20251115_174947.jpg"
  },
  {
    title: "Empowering Communities",
    highlight: "All For All",
    description: "Creating sustainable change through collaborative action.",
    badge: "Unity in Action",
    image: "/images/hut-277229.jpg"
  },
  {
    title: "Creating Hope",
    highlight: "Building Impact",
    description: "Transforming lives and strengthening communities.",
    badge: "Stronger as One",
    image: "/images/sise_images/20251115_154331.jpg"
  }
];

const defaultCoreValues: CoreValue[] = [
  { title: 'Unity', description: 'Everyone is part of the cause. We stand stronger together.', icon: 'Users', color: 'emerald' },
  { title: 'Inclusivity', description: 'No one is left behind. Every voice matters.', icon: 'HandHeart', color: 'gold' },
  { title: 'Empowerment', description: 'Working together to improve lives and create opportunities.', icon: 'Target', color: 'emerald' },
  { title: 'Hope', description: 'Building a better shared future for all communities.', icon: 'Heart', color: 'gold' }
];

const defaultMissions: Mission[] = [
  { title: 'Community Development', description: 'Supporting local initiatives that create sustainable growth and opportunity.', image: '/images/sise_images/20251115_151747.jpg' },
  { title: 'Education & Skills', description: 'Empowering individuals through knowledge and practical training.', image: '/images/sise_images/20251115_152131.jpg' },
  { title: 'Social Support', description: 'Providing assistance to vulnerable populations and promoting equality.', image: '/images/sise_images/20251115_153335.jpg' }
];

const defaultImpactStats: ImpactStat[] = [
  { number: '1,000+', label: 'Lives Impacted', icon: 'Users' },
  { number: '3', label: 'Active Programs', icon: 'Target' },
  { number: '5', label: 'Community Partners', icon: 'HandHeart' }
];

const defaultContactInfo: ContactInfo[] = [
  { title: 'Email Us', info: 'info@sisisote.org', icon: 'Mail', color: 'emerald' },
  { title: 'Call Us', info: '+256 750 022 2284', icon: 'Phone', color: 'gold' },
  { title: 'Visit Us', info: 'Kampala, Uganda', icon: 'MapPin', color: 'emerald' }
];

const defaultContactCategories: ContactCategory[] = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'volunteer', label: 'Become a Volunteer' },
  { value: 'donation', label: 'Donation Inquiry' },
  { value: 'outreach', label: 'Outreach Inquiry' },
  { value: 'partnership', label: 'Partnership Opportunity' }
];

const iconMap: { [key: string]: any } = {
  Users,
  HandHeart,
  Target,
  Heart,
  TrendingUp,
  Award,
  Mail,
  Phone,
  MapPin
};

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMissionCard, setCurrentMissionCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', category: 'general', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { data: heroSlides } = useSanityContent<HeroSlide[]>(
    `*[_type == "heroSlide"] | order(order asc) {
      _id,
      title,
      highlight,
      description,
      badge,
      image {
        asset-> {
          url
        }
      }
    }`,
    defaultHeroSlides
  );

  const { data: coreValues } = useSanityContent<CoreValue[]>(
    `*[_type == "coreValue"] | order(order asc) {
      _id,
      title,
      description,
      icon,
      color
    }`,
    defaultCoreValues
  );

  const { data: missions } = useSanityContent<Mission[]>(
    `*[_type == "mission"] | order(order asc) {
      _id,
      title,
      description,
      image {
        asset-> {
          url
        }
      }
    }`,
    defaultMissions
  );

  const { data: impactStats } = useSanityContent<ImpactStat[]>(
    `*[_type == "impactStat"] | order(order asc) {
      _id,
      number,
      label,
      icon
    }`,
    defaultImpactStats
  );

  const { data: contactInfo } = useSanityContent<ContactInfo[]>(
    `*[_type == "contactInfo"] | order(order asc) {
      _id,
      title,
      info,
      icon,
      color
    }`,
    defaultContactInfo
  );

  const { data: contactCategories } = useSanityContent<ContactCategory[]>(
    `*[_type == "contactCategory"] | order(order asc) {
      _id,
      value,
      label
    }`,
    defaultContactCategories
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMissionCard((prev) => (prev + 1) % missions.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [missions.length]);

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

  const getImageUrl = (image: HeroSlide['image']) => {
    if (typeof image === 'string') return image;
    return image?.asset?.url || 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1920';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { writeClient } = await import('../lib/sanity');
      
      await writeClient.create({
        _type: 'contactSubmission',
        name: formData.name,
        email: formData.email,
        category: formData.category,
        message: formData.message,
        submittedAt: new Date().toISOString(),
        status: 'new',
      });
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', category: 'general', message: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={getImageUrl(slide.image)}
                alt={slide.title}
                className="w-full h-full object-cover blur-[2px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/70 via-charcoal-800/60 to-charcoal-700/50"></div>
            </div>
          ))}

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

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="w-full">
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
                <Link to="/outreach">
                  <button className="glass text-white px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 font-bold text-lg border-2 border-white/30 hover:border-white/50 hover:scale-105">
                    View Outreach
                  </button>
                </Link>
              </div>

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

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1.5 h-3 bg-white/90 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

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
            {coreValues.map((value, index) => {
              const Icon = iconMap[value.icon] || Users;
              return (
                <div
                  key={value._id || index}
                  className="card-premium"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${value.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                  <div className={`relative bg-gradient-to-br from-${value.color}-500 to-${value.color}-600 w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-[0_0_40px] group-hover:shadow-${value.color}-500/50 group-hover:scale-110 transition-all duration-500 glow-${value.color}`}>
                    <Icon className="text-white" size={36} />
                  </div>
                  <h4 className="relative text-2xl font-extrabold mb-3 tracking-tight">{value.title}</h4>
                  <p className="relative text-white/70 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="mission" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sand via-white to-emerald-50/30 fade-in-section relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-emerald-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative h-[500px] overflow-hidden">
                {missions.map((item, index) => {
                  const imageUrl = typeof item.image === 'string' ? item.image : item.image?.asset?.url || '/images/sise_images/20251115_151747.jpg';
                  return (
                    <div 
                      key={item._id || index}
                      className={`absolute inset-0 transition-all duration-700 ${
                        index === currentMissionCard 
                          ? 'translate-x-0 lg:translate-y-0 opacity-100' 
                          : index < currentMissionCard 
                            ? '-translate-x-full lg:-translate-x-0 lg:-translate-y-full opacity-0' 
                            : 'translate-x-full lg:translate-x-0 lg:translate-y-full opacity-0'
                      }`}
                    >
                      <div className="card-premium h-full">
                        <div className="relative h-64 w-full overflow-hidden rounded-2xl mb-6">
                          <img 
                            src={imageUrl} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="px-6">
                          <h5 className="text-3xl font-extrabold text-charcoal-900 mb-4 tracking-tight">{item.title}</h5>
                          <p className="text-lg text-charcoal-700 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {missions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMissionCard(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentMissionCard 
                          ? 'w-12 bg-emerald-600' 
                          : 'w-2 bg-charcoal-300 hover:bg-emerald-400'
                      }`}
                    />
                  ))}
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
                <Link to="/outreach">
                  <button className="btn-primary group">
                    <span className="relative z-10 flex items-center justify-center">
                      Discover Our Programs
                      <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={20} />
                    </span>
                    <div className="absolute inset-0 shimmer"></div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            {impactStats.map((stat, index) => {
              const StatIcon = iconMap[stat.icon] || Users;
              return (
                <div
                  key={stat._id || index}
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
            <button 
              onClick={() => {
                const contactForm = document.querySelector('#contact');
                if (contactForm) {
                  contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setTimeout(() => {
                    const categorySelect = document.querySelector('select[name="category"]') as HTMLSelectElement;
                    if (categorySelect) categorySelect.value = 'donation';
                  }, 500);
                }
              }}
              className="btn-primary group"
            >
              <span className="relative z-10 flex items-center justify-center">
                Donate Now
                <Heart className="ml-2 group-hover:scale-125 transition-transform duration-300" size={20} />
              </span>
              <div className="absolute inset-0 shimmer"></div>
            </button>
            <button 
              onClick={() => {
                const contactForm = document.querySelector('#contact');
                if (contactForm) {
                  contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setTimeout(() => {
                    const categorySelect = document.querySelector('select[name="category"]') as HTMLSelectElement;
                    if (categorySelect) categorySelect.value = 'volunteer';
                  }, 500);
                }
              }}
              className="btn-secondary group"
            >
              <span className="relative z-10 flex items-center justify-center">
                Become a Volunteer
                <Users className="ml-2 group-hover:scale-125 transition-transform duration-300" size={20} />
              </span>
              <div className="absolute inset-0 shimmer"></div>
            </button>
          </div>
        </div>
      </section>

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
                {contactInfo.map((contact, index) => {
                  const Icon = iconMap[contact.icon] || Mail;
                  return (
                    <div key={contact._id || index} className="flex items-start space-x-4 group cursor-pointer">
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full glass-dark text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 bg-charcoal-800/50 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1.5em',
                      paddingRight: '3rem'
                    }}
                  >
                    {contactCategories.map((cat) => (
                      <option key={cat._id || cat.value} value={cat.value} className="bg-charcoal-800 text-white py-2">
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full glass-dark text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full glass-dark text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/90">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full glass-dark text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 resize-none"
                    placeholder="Your message here..."
                  />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="relative z-10 flex items-center justify-center">
                    {submitting ? 'Sending...' : 'Send Message'}
                    {!submitting && <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={20} />}
                  </span>
                  <div className="absolute inset-0 shimmer"></div>
                </button>
                
                {submitStatus === 'success' && (
                  <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-100 px-4 py-3 rounded-xl">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-xl">
                    Oops! Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
