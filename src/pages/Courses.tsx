import { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search, Monitor, Filter, X, CheckCircle, ArrowRight,
  Heart, Stethoscope, Baby, HardHat, Zap, Shield, GraduationCap,
  ChefHat, Truck, Factory,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Course, Category } from '../lib/supabase';
import { mapSections, pageText, type PageSections } from '../lib/pages';

const CATEGORY_ACCENT: Record<string, { bg: string; text: string }> = {
  'aged-care-disability':           { bg: 'bg-rose-50',   text: 'text-rose-600' },
  'health-nursing-allied':          { bg: 'bg-sky-50',    text: 'text-sky-600' },
  'early-childhood-education':      { bg: 'bg-amber-50',  text: 'text-amber-600' },
  'construction-building':          { bg: 'bg-orange-50', text: 'text-orange-600' },
  'electrotechnology-clean-energy': { bg: 'bg-yellow-50', text: 'text-yellow-600' },
  'digital-it-cyber':               { bg: 'bg-cyan-50',   text: 'text-cyan-600' },
  'training-assessment-vet':        { bg: 'bg-teal-50',   text: 'text-teal-600' },
  'hospitality-tourism':            { bg: 'bg-lime-50',   text: 'text-lime-600' },
  'transport-logistics':            { bg: 'bg-slate-50',  text: 'text-slate-600' },
  'manufacturing-defence':          { bg: 'bg-zinc-50',   text: 'text-zinc-600' },
};

const DEFAULT_ACCENT = { bg: 'bg-sky-50', text: 'text-sky-600' };

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Heart, Stethoscope, Baby, HardHat, Zap, Shield, GraduationCap, ChefHat, Truck, Factory,
};

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sections, setSections] = useState<PageSections>({});

  const activeCategory = searchParams.get('category') ?? '';

  useEffect(() => {
    Promise.all([
      supabase.from('pages').select('*').eq('page', 'courses'),
      supabase.from('courses').select('*, category:categories(*)').eq('is_published', true).order('sort_order'),
      supabase.from('categories').select('*').order('sort_order'),
    ]).then(([pagesRes, coursesRes, catsRes]) => {
      setSections(mapSections(pagesRes.data));
      setCourses(coursesRes.data ?? []);
      setCategories(catsRes.data ?? []);
    }).catch(() => {
      // silently fail — empty state already handles no results
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.short_description.toLowerCase().includes(search.toLowerCase());
      const matchCat = !activeCategory || (c.category as Category | undefined)?.slug === activeCategory;
      return matchSearch && matchCat;
    });
  }, [courses, search, activeCategory]);

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    setSearchParams(next);
  }

  function clearAll() {
    setSearch('');
    setSearchParams({});
  }

  const hasFilters = search || activeCategory;
  const hero = sections.hero;

  return (
    <div className="pt-16 bg-[#f5f5f0] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-4">{pageText(hero, 'subtitle', 'Course Catalogue')}</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{pageText(hero, 'title', 'Find the right course for your team')}</h1>
            <p className="text-lg text-gray-300">{pageText(hero, 'body', "Browse our catalogue of professionally developed eLearning courses, aligned with Australia's most in-demand industries and national priority training areas.")}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-colors sm:hidden ${showFilters ? 'border-sky-500 text-sky-600 bg-sky-50' : 'border-gray-200 text-gray-600 bg-white'}`}
          >
            <Filter className="w-4 h-4" /> Filters {hasFilters && <span className="w-2 h-2 rounded-full bg-sky-500" />}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} sm:block w-full sm:w-56 shrink-0`}>
            <div className="sticky top-24 space-y-6">
              {hasFilters && (
                <button onClick={clearAll} className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium">
                  <X className="w-3.5 h-3.5" /> Clear all filters
                </button>
              )}

              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Industry</h3>
                <div className="space-y-0.5">
                  <button
                    onClick={() => setParam('category', '')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!activeCategory ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-gray-600 hover:bg-white'}`}
                  >
                    All industries
                  </button>
                  {categories.map(cat => {
                    const accent = CATEGORY_ACCENT[cat.slug] ?? DEFAULT_ACCENT;
                    const Icon = CATEGORY_ICONS[cat.icon ?? ''];
                    const isActive = activeCategory === cat.slug;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setParam('category', cat.slug)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${isActive ? `${accent.bg} ${accent.text} font-semibold` : 'text-gray-600 hover:bg-white'}`}
                      >
                        {Icon && <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? accent.text : 'text-gray-400'}`} />}
                        <span className="leading-tight">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </aside>

          {/* Course grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {loading ? 'Loading...' : `${filtered.length} course${filtered.length !== 1 ? 's' : ''} found`}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <Monitor className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No courses found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                {hasFilters && (
                  <button onClick={clearAll} className="mt-4 text-sky-600 text-sm font-semibold hover:underline">Clear filters</button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CourseCard({ course }: { course: Course }) {
  const cat = course.category as Category | undefined;
  const accent = cat ? (CATEGORY_ACCENT[cat.slug] ?? DEFAULT_ACCENT) : DEFAULT_ACCENT;
  const outcomes = course.learning_outcomes?.slice(0, 3) ?? [];
  const tags = course.tags?.slice(0, 3) ?? [];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
        )}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-gray-900 text-[15px] leading-snug mb-1.5">{course.title}</h3>
        {course.short_description && (
          <p className={`text-sm leading-relaxed line-clamp-2 ${accent.text} ${tags.length > 0 || outcomes.length > 0 ? 'mb-4' : 'mb-0'}`}>
            {course.short_description}
          </p>
        )}

        {/* Feature tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
            {tags.map(tag => (
              <span key={tag} className="text-[10px] font-semibold uppercase tracking-wide border border-gray-300 text-gray-600 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Learning outcomes */}
        <div className="flex-1">
          {outcomes.length > 0 && (
            <ul className="space-y-2 mt-4">
              {outcomes.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${accent.text}`} />
                  <span className="text-sm text-gray-600 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          to={`/courses/${course.slug}`}
          className="mt-5 flex items-center justify-center gap-2 w-full py-3 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
        >
          Learn More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
