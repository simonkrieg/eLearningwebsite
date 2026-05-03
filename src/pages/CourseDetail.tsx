import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, ArrowLeft, CheckCircle, Monitor, Download, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Course, Category } from '../lib/supabase';

const DIFFICULTY_COLORS = {
  beginner: 'border-emerald-400 text-emerald-300',
  intermediate: 'border-amber-400 text-amber-300',
  advanced: 'border-rose-400 text-rose-300',
};

const CATEGORY_ACCENT: Record<string, { text: string }> = {
  'aged-care-disability':           { text: 'text-rose-400' },
  'health-nursing-allied':          { text: 'text-sky-400' },
  'early-childhood-education':      { text: 'text-amber-400' },
  'construction-building':          { text: 'text-orange-400' },
  'electrotechnology-clean-energy': { text: 'text-yellow-400' },
  'digital-it-cyber':               { text: 'text-cyan-400' },
  'training-assessment-vet':        { text: 'text-teal-400' },
  'hospitality-tourism':            { text: 'text-lime-400' },
  'transport-logistics':            { text: 'text-slate-400' },
  'manufacturing-defence':          { text: 'text-zinc-400' },
};

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from('courses')
      .select('*, category:categories(*)')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle()
      .then(({ data }) => setCourse(data));
  }, [slug]);

  if (course === undefined) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (course === null) return <Navigate to="/courses" replace />;

  const category = course.category as Category | undefined;
  const diffColor = DIFFICULTY_COLORS[course.difficulty_level];
  const catAccent = category ? (CATEGORY_ACCENT[category.slug] ?? { text: 'text-sky-400' }) : { text: 'text-sky-400' };
  const tags = course.tags ?? [];
  const outcomes = course.learning_outcomes ?? [];
  const audience = course.audience ?? [];
  const modules = course.modules ?? [];

  return (
    <div className="pt-16 bg-[#f5f5f0] min-h-screen">
      {/* Full-width hero with image */}
      <section className="relative overflow-hidden bg-gray-900 min-h-[400px] flex items-end">
        {/* Background image */}
        {course.image_url && (
          <div className="absolute inset-0">
            <img
              src={course.image_url}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30" />
          </div>
        )}
        {!course.image_url && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-slate-800" />
        )}

        {/* Hero content */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/courses" className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white text-sm transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to courses
          </Link>

          {/* Feature tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map(tag => (
                <span key={tag} className="text-[11px] font-semibold uppercase tracking-wide border border-white/40 text-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Course code */}
          {course.course_code && (
            <div className="mb-3">
              <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
                {course.course_code}
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight max-w-3xl">{course.title}</h1>

          {course.short_description && (
            <p className={`text-base mb-8 max-w-xl leading-relaxed ${catAccent.text}`}>{course.short_description}</p>
          )}

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              Enquire to Enrol <ArrowRight className="w-4 h-4" />
            </Link>
            {course.flyer_url ? (
              <a
                href={course.flyer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-xl transition-colors duration-200"
              >
                <Download className="w-4 h-4" /> Download Flyer
              </a>
            ) : (
              <button disabled className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 bg-white/5 text-white/40 font-semibold rounded-xl cursor-not-allowed">
                <Download className="w-4 h-4" /> Download Flyer
              </button>
            )}
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-3 mt-6">
            {course.duration_hours > 0 && (
              <span className="flex items-center gap-1.5 text-sm text-gray-300 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5" /> {course.duration_hours} hours
              </span>
            )}
            <span className={`text-sm border px-3 py-1.5 rounded-full capitalize backdrop-blur-sm bg-white/10 ${diffColor}`}>
              {course.difficulty_level}
            </span>
            {category && (
              <span className="text-sm text-gray-300 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {category.name}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Body content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About & outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${catAccent.text}`}>About This Course</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                {course.description ? (
                  <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">{course.description}</div>
                ) : (
                  <p className="text-gray-500 text-sm leading-relaxed">
                    This course provides practical, industry-aligned skills and knowledge. Content is designed by subject-matter experts and contextualised for Australian workplaces.
                  </p>
                )}

                {outcomes.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {outcomes.map(item => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${catAccent.text}`} />
                        <span className="text-sm text-gray-700 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Who is this for */}
              {audience.length > 0 && (
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${catAccent.text}`}>Audience</p>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Is This For?</h2>
                  <ol className="space-y-3">
                    {audience.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 bg-rose-500">{i + 1}</span>
                        <span className="text-sm text-gray-700 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Modules */}
            {modules.length > 0 && (
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${catAccent.text}`}>Course Content</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Covered</h2>
                <div className="space-y-3">
                  {modules.map((mod, i) => (
                    <div key={i} className="bg-white rounded-xl px-5 py-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 text-sm font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <div>
                          <p className={`text-sm font-semibold ${catAccent.text}`}>{mod.title}</p>
                          {mod.body && <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{mod.body}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: sticky enrol card */}
          <div>
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <Link
                  to="/contact"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl transition-colors duration-200"
                >
                  Enquire to Enrol <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-center text-xs text-gray-400 mt-3">We'll get back to you within 1 business day</p>
              </div>

              <div className="p-6 space-y-3">
                {course.duration_hours > 0 && (
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-gray-600">{course.duration_hours} hours of content</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Monitor className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-gray-600">Access on any device</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-gray-600">Certificate of completion</span>
                </div>
                {course.course_code && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-4 h-4 flex items-center justify-center text-gray-400 shrink-0 font-bold text-xs">ID</span>
                    <span className="text-gray-600 font-mono">{course.course_code}</span>
                  </div>
                )}
              </div>

              {/* Tags on sidebar */}
              {tags.length > 0 && (
                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map(tag => (
                      <span key={tag} className="text-[10px] font-semibold uppercase tracking-wide border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
