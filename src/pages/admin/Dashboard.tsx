import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FolderOpen, Users, Star, Mail, Contact, ArrowRight, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Stats = { courses: number; categories: number; team: number; testimonials: number; enquiries: number; contacts: number };

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ courses: 0, categories: 0, team: 0, testimonials: 0, enquiries: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from('courses').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('team_members').select('*', { count: 'exact', head: true }),
      supabase.from('testimonials').select('*', { count: 'exact', head: true }),
      supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
    ]).then(([c, cat, t, test, enq, con]) => {
      setStats({ courses: c.count ?? 0, categories: cat.count ?? 0, team: t.count ?? 0, testimonials: test.count ?? 0, enquiries: enq.count ?? 0, contacts: con.count ?? 0 });
    }).catch(() => {
      // stats remain at 0 on error
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const STAT_CARDS = [
    { label: 'Courses', value: stats.courses, icon: BookOpen, to: '/admin/courses', color: 'bg-sky-50 text-sky-600' },
    { label: 'Categories', value: stats.categories, icon: FolderOpen, to: '/admin/categories', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Team Members', value: stats.team, icon: Users, to: '/admin/team', color: 'bg-amber-50 text-amber-600' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, to: '/admin/testimonials', color: 'bg-amber-50 text-amber-600' },
    { label: 'New Enquiries', value: stats.enquiries, icon: Mail, to: '/admin/enquiries', color: 'bg-rose-50 text-rose-600' },
    { label: 'Contacts', value: stats.contacts, icon: Contact, to: '/admin/contacts', color: 'bg-violet-50 text-violet-600' },
  ];

  const QUICK_ACTIONS = [
    { to: '/admin/courses/new', label: 'Add a new course', desc: 'Create and publish a new course to the catalogue' },
    { to: '/admin/categories/new', label: 'Create a category', desc: 'Organise courses into a new category' },
    { to: '/admin/team/new', label: 'Add a team member', desc: 'Add a new person to the About page' },
    { to: '/admin/testimonials/new', label: 'Add a testimonial', desc: 'Add a client testimonial to the homepage' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your E-Learning Creations website content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {STAT_CARDS.map(({ label, value, icon: Icon, to, color }) => (
          <Link key={label} to={to} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {loading ? <span className="inline-block w-8 h-7 bg-gray-100 rounded animate-pulse" /> : value}
            </div>
            <p className="text-sm text-gray-500">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-sky-600" />
          <h2 className="font-bold text-gray-900">Quick actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUICK_ACTIONS.map(({ to, label, desc }) => (
            <Link
              key={to} to={to}
              className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-sky-200 hover:bg-sky-50/50 transition-all group"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm group-hover:text-sky-700 transition-colors">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-sky-500 shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
