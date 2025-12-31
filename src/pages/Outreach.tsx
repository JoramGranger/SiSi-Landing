import { useState, useEffect } from 'react';
import { Grid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OutreachHero } from '../components/outreach/OutreachHero';
import { OutreachFilter } from '../components/outreach/OutreachFilter';
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

export const Outreach = () => {
  const [outreachItems, setOutreachItems] = useState<Outreach[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOutreach = async () => {
      try {
        const query = `*[_type == "outreach"] | order(_createdAt desc) {
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
        
        const data = await client.fetch(query);
        setOutreachItems(data);
      } catch (error) {
        console.error('Error fetching outreach:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOutreach();
  }, []);

  const categories = ['All', ...Array.from(new Set(outreachItems.map(o => o.category)))];
  
  const filteredOutreach = activeCategory === 'All' 
    ? outreachItems 
    : outreachItems.filter(o => o.category === activeCategory);

  const totalPages = Math.ceil(filteredOutreach.length / itemsPerPage);
  const paginatedOutreach = filteredOutreach.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      <OutreachHero
        title="Our Outreach"
        subtitle="Creating Real Change"
        description="Discover the initiatives transforming lives and building stronger communities across Uganda."
      />

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sand/50 via-white to-emerald-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <OutreachFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <div className="flex gap-2 bg-white rounded-xl p-1 shadow-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-semibold ${
                  viewMode === 'grid' 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'text-charcoal-700 hover:bg-emerald-50'
                }`}
              >
                <Grid size={18} />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-semibold ${
                  viewMode === 'list' 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'text-charcoal-700 hover:bg-emerald-50'
                }`}
              >
                <List size={18} />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-charcoal-700 font-bold">Loading outreach...</p>
            </div>
          ) : filteredOutreach.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-bold text-charcoal-700">No outreach found</p>
              <p className="text-charcoal-600 mt-2">Check back soon for new initiatives</p>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px] md:auto-rows-[250px]">
                  {paginatedOutreach.map((item, index) => {
                    const imageUrl = item.images?.[0]?.asset?.url || 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800';
                    const spanClass = index % 7 === 0 ? 'col-span-2 row-span-2' : index % 5 === 0 ? 'row-span-2' : index % 3 === 0 ? 'col-span-2' : '';
                    
                    return (
                      <div
                        key={item._id}
                        onClick={() => navigate(`/outreach/${item._id}`)}
                        className={`relative group overflow-hidden rounded-2xl cursor-pointer ${spanClass}`}
                      >
                        <img
                          src={imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                          <span className="inline-block px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg mb-2 shadow-lg">
                            {item.category}
                          </span>
                          <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 mb-1">{item.title}</h3>
                          {item.location && (
                            <p className="text-white/80 text-xs">{item.location}</p>
                          )}
                        </div>
                        <div className="absolute inset-0 ring-2 ring-emerald-500 opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-300 pointer-events-none" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-6">
                  {paginatedOutreach.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => navigate(`/outreach/${item._id}`)}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                          <img
                            src={item.images?.[0]?.asset?.url || 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800'}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-bold rounded-lg">
                              {item.category}
                            </span>
                            {item.date && (
                              <span className="text-charcoal-600 text-sm">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-charcoal-900 mb-2 group-hover:text-emerald-600 transition-colors">
                            {item.title}
                          </h3>
                          {item.location && (
                            <p className="text-charcoal-600 text-sm mb-3">{item.location}</p>
                          )}
                          <p className="text-charcoal-700 leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                          <div className="flex items-center text-emerald-600 font-bold group-hover:translate-x-2 transition-transform">
                            Read More →
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl bg-white text-charcoal-700 font-bold hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-xl font-bold transition-all ${
                        currentPage === page
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white text-charcoal-700 hover:bg-emerald-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl bg-white text-charcoal-700 font-bold hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};
