import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react';
import { client } from '../lib/sanity';

interface Outreach {
  _id: string;
  title: string;
  description: string;
  category: string;
  impact: string;
  date?: string;
  location?: string;
  images: Array<{
    asset: {
      _id: string;
      url: string;
    };
  }>;
}

export const OutreachDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [outreach, setOutreach] = useState<Outreach | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchOutreach = async () => {
      try {
        const query = `*[_type == "outreach" && _id == $id][0] {
          _id,
          title,
          description,
          category,
          impact,
          date,
          location,
          images[] {
            asset-> {
              _id,
              url
            }
          }
        }`;
        
        const data = await client.fetch(query, { id });
        setOutreach(data);
      } catch (error) {
        console.error('Error fetching outreach:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOutreach();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-charcoal-700 font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!outreach) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-charcoal-900 mb-4">Outreach not found</h2>
          <button
            onClick={() => navigate('/outreach')}
            className="btn-primary"
          >
            <span className="relative z-10">Back to Outreach</span>
          </button>
        </div>
      </div>
    );
  }

  const images = outreach.images?.map(img => img.asset?.url).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand/30 via-white to-emerald-50/20">
      <button
        onClick={() => navigate('/outreach')}
        className="fixed top-24 left-8 z-50 glass p-3 rounded-xl hover:bg-white/80 transition-all duration-300 group shadow-lg"
      >
        <ArrowLeft className="text-charcoal-900 group-hover:scale-110 transition-transform" size={24} />
      </button>

      <div className="grid lg:grid-cols-2 min-h-screen pt-20">
        <div className="bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 p-8 md:p-12 lg:p-16 flex flex-col justify-start lg:pt-24 order-2 lg:order-1">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-xl mb-6">
              {outreach.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              {outreach.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/90 mb-8">
              {outreach.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>{outreach.location}</span>
                </div>
              )}
              {outreach.date && (
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>{new Date(outreach.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-3">About This Outreach</h2>
              <p className="text-base text-white/80 leading-relaxed whitespace-pre-line">
                {outreach.description}
              </p>
            </div>

            {outreach.impact && (
              <div className="glass-dark rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-2xl flex-shrink-0">
                    <Users className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Impact</h3>
                    <p className="text-white/80 leading-relaxed">{outreach.impact}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <Link
                to="/outreach"
                className="text-emerald-400 hover:text-emerald-300 font-bold text-lg inline-flex items-center gap-2 transition-colors duration-300"
              >
                ← View All Outreach
              </Link>
            </div>
          </div>
        </div>

        <div className="relative bg-charcoal-900 order-1 lg:order-2 min-h-[50vh] lg:min-h-screen lg:sticky lg:top-20 flex items-start justify-center p-8 pt-24">
          <div className="w-full max-w-2xl">
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide justify-center mb-6">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedImage === index ? 'ring-4 ring-emerald-500 scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${outreach.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            
            <div className="relative w-full h-[400px] lg:h-[600px] overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={images[selectedImage] || 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1920'}
                alt={outreach.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
