interface OutreachFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const OutreachFilter = ({ categories, activeCategory, onCategoryChange }: OutreachFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-2xl font-bold tracking-wide transition-all duration-300 ${
            activeCategory === category
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl glow-emerald'
              : 'glass-dark text-charcoal-700 hover:text-emerald-600'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
