import { pageText } from '../lib/pages';
import type { Page } from '../lib/supabase';

type PageHeroProps = {
  section: Page | undefined;
  subtitleFallback: string;
  titleFallback: string;
  bodyFallback: string;
  imageFallback: string;
  className?: string;
};

export function PageHero({
  section,
  subtitleFallback,
  titleFallback,
  bodyFallback,
  imageFallback,
  className = '',
}: PageHeroProps) {
  const imageUrl = pageText(section, 'image_url', imageFallback);

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-gray-900 via-sky-950 to-gray-900 py-24 lg:py-32 ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-sky-950/50" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-900/30 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none">
          <img
            src="/logoimage1.png"
            alt=""
            className="w-64 h-64 object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
        <div className="max-w-3xl">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-4">
            {pageText(section, 'subtitle', subtitleFallback)}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            {pageText(section, 'title', titleFallback)}
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            {pageText(section, 'body', bodyFallback)}
          </p>
        </div>
      </div>
    </section>
  );
}
