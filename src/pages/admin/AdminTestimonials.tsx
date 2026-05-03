import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Plus, CreditCard as Edit2, Trash2, ArrowLeft, Save, Eye, EyeOff, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Testimonial } from '../../lib/supabase';

export function AdminTestimonialsList() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase.from('testimonials').select('*').order('sort_order');
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('testimonials').update({ is_published: !current }).eq('id', id);
    load();
  }

  async function deleteItem(id: string) {
    if (!confirm('Delete this testimonial?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} total</p>
        </div>
        <Link to="/admin/testimonials/new" className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-xl hover:bg-sky-700 transition-colors">
          <Plus className="w-4 h-4" /> Add testimonial
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400">No testimonials yet.</div>
          ) : (
            items.map(t => (
              <div key={t.id} className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    {t.company && <span className="text-gray-400 text-xs">— {t.company}</span>}
                    <div className="flex gap-0.5 ml-1">
                      {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{t.content}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                    {t.is_published ? 'Published' : 'Hidden'}
                  </span>
                  <button onClick={() => togglePublish(t.id, t.is_published)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    {t.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <Link to={`/admin/testimonials/${t.id}/edit`} className="p-2 rounded-lg hover:bg-sky-50 text-gray-400 hover:text-sky-600 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button onClick={() => deleteItem(t.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const BLANK: Partial<Testimonial> = { name: '', role: '', company: '', content: '', rating: 5, avatar_url: '', is_published: true, sort_order: 0 };

export function AdminTestimonialForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new' || !id;
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Testimonial>>(BLANK);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      supabase.from('testimonials').select('*').eq('id', id).maybeSingle().then(({ data }) => { if (data) setForm(data); });
    }
  }, [id, isNew]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(f => ({ ...f, [name]: val }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error: err } = isNew
      ? await supabase.from('testimonials').insert(form)
      : await supabase.from('testimonials').update(form).eq('id', id!);
    if (err) { setError(err.message); setSaving(false); return; }
    navigate('/admin/testimonials');
  }

  return (
    <div className="p-8 max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/testimonials" className="text-gray-400 hover:text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Add testimonial' : 'Edit testimonial'}</h1>
      </div>
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
            <input type="text" name="name" required value={form.name ?? ''} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
            <input type="text" name="role" value={form.role ?? ''} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
            <input type="text" name="company" value={form.company ?? ''} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating (1–5)</label>
            <input type="number" name="rating" min="1" max="5" value={form.rating ?? 5} onChange={handleChange} className="input" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Testimonial *</label>
            <textarea name="content" required value={form.content ?? ''} onChange={handleChange} rows={4} className="input resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Sort order</label>
            <input type="number" name="sort_order" value={form.sort_order ?? 0} onChange={handleChange} className="input" />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_published" checked={!!form.is_published} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
          <span className="text-sm text-gray-700">Published on website</span>
        </label>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-colors">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {isNew ? 'Add testimonial' : 'Save changes'}
          </button>
          <Link to="/admin/testimonials" className="px-6 py-3 text-gray-600 hover:text-gray-900 text-sm font-medium">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
