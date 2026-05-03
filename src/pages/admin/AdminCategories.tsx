import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Plus, CreditCard as Edit2, Trash2, ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Category } from '../../lib/supabase';

export function AdminCategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase.from('categories').select('*').order('sort_order');
    setCategories(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function deleteCategory(id: string) {
    if (!confirm('Delete this category?')) return;
    await supabase.from('categories').delete().eq('id', id);
    load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">{categories.length} total</p>
        </div>
        <Link to="/admin/categories/new" className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-xl hover:bg-sky-700 transition-colors">
          <Plus className="w-4 h-4" /> New category
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />)}</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-400">No categories yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Name</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden md:table-cell">Slug</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden md:table-cell">Sort</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map(cat => (
                <tr key={cat.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4 font-medium text-gray-900">{cat.name}</td>
                  <td className="px-5 py-4 text-gray-400 font-mono text-xs hidden md:table-cell">{cat.slug}</td>
                  <td className="px-5 py-4 text-gray-400 hidden md:table-cell">{cat.sort_order}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      <Link to={`/admin/categories/${cat.id}/edit`} className="p-2 rounded-lg hover:bg-sky-50 text-gray-400 hover:text-sky-600 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => deleteCategory(cat.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const BLANK: Partial<Category> = { name: '', slug: '', description: '', icon: '', sort_order: 0 };

export function AdminCategoryForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new' || !id;
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Category>>(BLANK);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      supabase.from('categories').select('*').eq('id', id).maybeSingle().then(({ data }) => { if (data) setForm(data); });
    }
  }, [id, isNew]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === 'name' && isNew) {
      setForm(f => ({ ...f, slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }));
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const { error: err } = isNew
      ? await supabase.from('categories').insert(form)
      : await supabase.from('categories').update(form).eq('id', id!);
    if (err) { setError(err.message); setSaving(false); return; }
    navigate('/admin/categories');
  }

  return (
    <div className="p-8 max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/categories" className="text-gray-400 hover:text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'New category' : 'Edit category'}</h1>
      </div>
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
          <input type="text" name="name" required value={form.name ?? ''} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug *</label>
          <input type="text" name="slug" required value={form.slug ?? ''} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea name="description" value={form.description ?? ''} onChange={handleChange} rows={3} className="input resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Icon (Lucide name)</label>
            <input type="text" name="icon" value={form.icon ?? ''} onChange={handleChange} className="input" placeholder="Shield" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Sort order</label>
            <input type="number" name="sort_order" value={form.sort_order ?? 0} onChange={handleChange} className="input" />
          </div>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-colors">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {isNew ? 'Create' : 'Save'}
          </button>
          <Link to="/admin/categories" className="px-6 py-3 text-gray-600 hover:text-gray-900 text-sm font-medium">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
