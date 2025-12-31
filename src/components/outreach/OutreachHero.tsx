import { Sparkles } from 'lucide-react';

interface OutreachHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export const OutreachHero = ({ title, subtitle, description }: OutreachHeroProps) => {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-emerald-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-gold-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-8">
          <Sparkles className="text-emerald-400 w-6 h-6" />
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-gold-400 rounded-full"></div>
          <Sparkles className="text-gold-400 w-6 h-6" />
        </div>

        <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight">
          {title}
          <span className="text-gradient block mt-3">{subtitle}</span>
        </h1>

        <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};
