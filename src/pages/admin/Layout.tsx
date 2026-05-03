import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, BookOpen, FolderOpen, Users, Star, FileText, Mail, Contact, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../lib/useAuth';

const NAV = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/courses', icon: BookOpen, label: 'Courses' },
  { to: '/admin/categories', icon: FolderOpen, label: 'Categories' },
  { to: '/admin/team', icon: Users, label: 'Team Members' },
  { to: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { to: '/admin/pages', icon: FileText, label: 'Pages' },
  { to: '/admin/enquiries', icon: Mail, label: 'Enquiries' },
  { to: '/admin/contacts', icon: Contact, label: 'Contacts' },
];

export default function AdminLayout() {
  const { isAdmin, loading, signOut, adminProfile } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">ELC Admin</p>
              <p className="text-xs text-gray-400">Content Manager</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group ${
                  isActive ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  {label}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-sky-400" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <div className="px-3 py-2 mb-1">
            <p className="text-xs font-medium text-gray-900 truncate">{adminProfile?.full_name || adminProfile?.email}</p>
            <p className="text-xs text-gray-400 truncate">{adminProfile?.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
