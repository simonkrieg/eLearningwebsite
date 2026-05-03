import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ChevronRight, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Page } from '../../lib/supabase';
import { PAGE_LABELS, SECTION_LABELS } from '../../lib/supabase';

// Group pages by page slug
type PageGroup = { page: string; sections: Page[] };

export function AdminPagesList() {
  const [groups, setGroups] = useState<PageGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('pages').select('*').order('page').order('sort_order').then(({ data }) => {
      if (!data) { setLoading(false); return; }
      const map: Record<string, Page[]> = {};
      data.forEach(row => {
        if (!map[row.page]) map[row.page] = [];
        map[row.page].push(row);
      });
      const order = ['home', 'about', 'courses', 'contact'];
      const sorted = Object.keys(map).sort((a, b) => {
        const ai = order.indexOf(a), bi = order.indexOf(b);
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });
      setGroups(sorted.map(p => ({ page: p, sections: map[p] })));
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
        <p className="text-gray-500 text-sm mt-1">Edit the content shown on each public page of the website.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-5">
          {groups.map(({ page, sections }) => (
            <div key={page} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
                <FileText className="w-4 h-4 text-sky-500" />
                <h2 className="font-bold text-gray-900">{PAGE_LABELS[page] ?? page} Page</h2>
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">/{page === 'home' ? '' : page}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {sections.map(section => (
                  <Link
                    key={section.id}
                    to={`/admin/pages/${section.id}/edit`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-sky-50/40 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">
                        {SECTION_LABELS[section.section] ?? section.section}
                      </p>
                      {section.title && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{section.title}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {section.updated_at && (
                        <span className="text-xs text-gray-400 hidden sm:block">
                          Updated {new Date(section.updated_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                      <span className="text-xs font-medium text-sky-600 bg-sky-50 px-3 py-1 rounded-full group-hover:bg-sky-100 transition-colors">
                        Edit
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sky-400 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function AdminPageEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Page> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    supabase.from('pages').select('*').eq('id', id).maybeSingle().then(({ data }) => {
      if (data) setForm(data);
      else navigate('/admin/pages', { replace: true });
    });
  }, [id, navigate]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => f ? { ...f, [e.target.name]: e.target.value } : f);
    setSaved(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form || !id) return;
    setSaving(true);
    setError('');
    const { error: err } = await supabase
      .from('pages')
      .update({ ...form, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (err) { setError(err.message); setSaving(false); return; }
    setSaving(false);
    setSaved(true);
  }

  if (!form) {
    return (
      <div className="p-8 flex items-center justify-center min-h-64">
        <div className="w-6 h-6 border-2 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
      </div>
    );
  }

  const pageLabel = PAGE_LABELS[form.page ?? ''] ?? form.page;
  const sectionLabel = SECTION_LABELS[form.section ?? ''] ?? form.section;

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/admin/pages" className="hover:text-gray-600 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Pages
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-600 font-medium">{pageLabel} — {sectionLabel}</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">{pageLabel}: {sectionLabel}</h1>

      <form onSubmit={handleSave} className="space-y-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Content</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Title
              <span className="ml-2 text-xs text-gray-400 font-normal">Main heading shown in this section</span>
            </label>
            <input
              type="text" name="title" value={form.title ?? ''} onChange={handleChange}
              className="input" placeholder="e.g. Online Learning That Actually Works"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Subtitle / Label
              <span className="ml-2 text-xs text-gray-400 font-normal">Small text shown above the title</span>
            </label>
            <input
              type="text" name="subtitle" value={form.subtitle ?? ''} onChange={handleChange}
              className="input" placeholder="e.g. Based in Adelaide, South Australia"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Body text
              <span className="ml-2 text-xs text-gray-400 font-normal">Supporting paragraph(s)</span>
            </label>
            <textarea
              name="body" value={form.body ?? ''} onChange={handleChange}
              rows={6} className="input resize-y"
              placeholder="Describe this section in a few sentences..."
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Call to Action</h2>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Button label</label>
              <input
                type="text" name="cta_label" value={form.cta_label ?? ''} onChange={handleChange}
                className="input" placeholder="e.g. Browse Courses"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Button URL</label>
              <input
                type="text" name="cta_url" value={form.cta_url ?? ''} onChange={handleChange}
                className="input" placeholder="e.g. /courses"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Image</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
            <input
              type="url" name="image_url" value={form.image_url ?? ''} onChange={handleChange}
              className="input" placeholder="https://images.pexels.com/..."
            />
            {form.image_url && (
              <img src={form.image_url} alt="Preview" className="mt-3 h-32 w-full object-cover rounded-lg border border-gray-100" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-colors"
          >
            {saving
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <Save className="w-4 h-4" />
            }
            Save changes
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Saved
            </span>
          )}
          <Link to="/admin/pages" className="ml-auto px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Back to pages
          </Link>
        </div>
      </form>
    </div>
  );
}
