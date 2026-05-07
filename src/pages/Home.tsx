import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Star, Monitor, Users, Shield,
  Briefcase, FileCheck, Play, ChevronRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Course, Testimonial, Category } from '../lib/supabase';
import { mapSections, pageText, type PageSections } from '../lib/pages';
import { CourseCard } from './Courses';

const ICON_MAP: Record<string, React.ElementType> = {
  Shield, Users, Star, FileCheck, Monitor, Briefcase,
};

const STAT_ITEMS = [
  { value: '200+', label: 'Courses Delivered' },
  { value: '200K+', label: 'Learners Trained' },
  { value: 'High', label: 'Completion Rate' },
  { value: '20+', label: 'Years Experience' },
];

const WHY_ITEMS = [
  {
    icon: Monitor,
    title: 'Learn Everywhere',
    desc: 'Mobile-first courses accessible on any device, anytime. Take professional development outside the classroom and apply it directly on the job.',
  },
  {
    icon: Users,
    title: 'Expert Instruction',
    desc: 'Use your own expert facilitators or access our nationally accredited teachers and assessors. Real expertise, real outcomes.',
  },
  {
    icon: Briefcase,
    title: 'Relevant Courses',
    desc: 'We work with you to ensure context and a targeted approach. Every course is tailored to your industry and your expected outcomes.',
  },
  {
    icon: CheckCircle,
    title: 'Proven Results',
    desc: 'Our clients see measurable improvements in compliance, engagement, and skills transfer — not just course completions.',
  },
];

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sections, setSections] = useState<PageSections>({});

  useEffect(() => {
    supabase.from('pages').select('*').eq('page', 'home').then(({ data }) => setSections(mapSections(data)));
    supabase.from('courses').select('*, category:categories(*)').eq('is_published', true).eq('is_featured', true).order('sort_order').limit(3).then(({ data }) => { if (data) setFeaturedCourses(data); });
    supabase.from('testimonials').select('*').eq('is_published', true).order('sort_order').limit(3).then(({ data }) => { if (data) setTestimonials(data); });
    supabase.from('categories').select('*').order('sort_order').limit(6).then(({ data }) => { if (data) setCategories(data); });
  }, []);

  const hero = sections.hero;
  const whyUs = sections.why_us;
  const cta = sections.cta;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-sky-950 to-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pb-32">
          {/* Cat mascot — decorative, right side of hero */}
          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none">
            <img src="/logoimage1.png" alt="" className="w-72 h-72 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-500/30 text-sky-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              {pageText(hero, 'subtitle', 'Based in Adelaide, South Australia')}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              <span className="block text-sky-400">E-Learning Creations</span>
              <span className="block mt-2">{pageText(hero, 'title', 'Online Learning That Actually Works for Your Organisation')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
              {pageText(hero, 'body', 'A fresh and affordable approach to online learning and development. We build contextualised eLearning content and learning management systems tailored to your industry, your people, and your outcomes.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={pageText(hero, 'cta_url', '/courses')} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-sky-600/30 group">
                {pageText(hero, 'cta_label', 'Browse Ideas')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all backdrop-blur-sm">
                <Play className="w-4 h-4" />
                Talk to Us
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STAT_ITEMS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-3">{pageText(whyUs, 'subtitle', 'Why E-Learning Creations')}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{pageText(whyUs, 'title', 'The smarter way to train your team')}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">{pageText(whyUs, 'body', 'We combine instructional design expertise with deep industry knowledge to deliver training that sticks.')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_ITEMS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-6 rounded-2xl border border-gray-100 hover:border-sky-100 hover:shadow-lg hover:shadow-sky-50 transition-all">
                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-sky-100 transition-colors">
                  <Icon className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-2">Course Categories</p>
                <h2 className="text-3xl font-bold text-gray-900">Find training for your industry</h2>
              </div>
              <Link to="/courses" className="hidden sm:flex items-center gap-1.5 text-sky-600 font-semibold text-sm hover:underline">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map(cat => {
                const Icon = ICON_MAP[cat.icon] ?? Briefcase;
                return (
                  <Link
                    key={cat.id}
                    to={`/courses?category=${cat.slug}`}
                    className="group flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-sky-200 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-sky-100 transition-colors">
                      <Icon className="w-5 h-5 text-sky-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{cat.name}</p>
                      <p className="text-xs text-gray-500 truncate">{cat.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sky-400 ml-auto shrink-0 transition-colors" />
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link to="/courses" className="inline-flex items-center gap-1 text-sky-600 font-semibold text-sm">View all courses <ChevronRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured courses */}
      {featuredCourses.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-2">Featured Courses</p>
                <h2 className="text-3xl font-bold text-gray-900">Popular right now</h2>
              </div>
              <Link to="/courses" className="hidden sm:flex items-center gap-1.5 text-sky-600 font-semibold text-sm hover:underline">
                All courses <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 lg:py-28 bg-sky-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-3">Client Stories</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Trusted by Australian organisations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(t => (
                <div key={t.id} className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-200 text-sm leading-relaxed mb-6">"{t.content}"</blockquote>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}{t.company ? `, ${t.company}` : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clients */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">Trusted by organisations across Australia</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {['Centre for People Development', 'SA Tourism Commission', 'HSE Australia', 'CPD Arts Biz', 'PRAXIS Australia', 'Baukraft Pty. Ltd.', 'No Strings Attached Theatre'].map(name => (
              <div key={name} className="px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm text-sm font-medium text-gray-600">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">{pageText(cta, 'title', 'Ready to transform your training?')}</h2>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            {pageText(cta, 'body', "Whether you need a single course or a complete learning system, we'll build something that fits your organisation perfectly.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={pageText(cta, 'cta_url', '/contact')} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg group">
              {pageText(cta, 'cta_label', 'Start a conversation')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/courses" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 hover:border-sky-200 text-gray-700 hover:text-sky-700 font-semibold rounded-xl transition-all">
              Browse our courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
