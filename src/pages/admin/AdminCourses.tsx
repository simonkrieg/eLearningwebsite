import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Plus, CreditCard as Edit2, Trash2, Eye, EyeOff, ArrowLeft, Save, X, Upload, FileText, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Course, Category } from '../../lib/supabase';

export function AdminCoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase.from('courses').select('*, category:categories(name)').order('sort_order');
    setCourses(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('courses').update({ is_published: !current }).eq('id', id);
    load();
  }

  async function deleteCourse(id: string) {
    if (!confirm('Delete this course? This cannot be undone.')) return;
    await supabase.from('courses').delete().eq('id', id);
    load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 text-sm mt-1">{courses.length} total</p>
        </div>
        <Link to="/admin/courses/new" className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-xl hover:bg-sky-700 transition-colors">
          <Plus className="w-4 h-4" /> New course
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-400">No courses yet.</p>
          <Link to="/admin/courses/new" className="mt-4 inline-flex items-center gap-1.5 text-sky-600 text-sm font-semibold">
            <Plus className="w-4 h-4" /> Create your first course
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Title</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden lg:table-cell">Price</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {courses.map(course => (
                <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900 truncate max-w-xs">{course.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 capitalize">{course.difficulty_level}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden md:table-cell">
                    {(course.category as { name: string } | undefined)?.name ?? '—'}
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden lg:table-cell">
                    {course.price > 0 ? `$${course.price.toFixed(0)}` : 'Free'}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${course.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {course.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => togglePublish(course.id, course.is_published)} title={course.is_published ? 'Unpublish' : 'Publish'} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        {course.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <Link to={`/admin/courses/${course.id}/edit`} className="p-2 rounded-lg hover:bg-sky-50 text-gray-400 hover:text-sky-600 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => deleteCourse(course.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
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

// ── Reusable list editor for string arrays ──────────────────────────────────

function StringListEditor({
  label,
  hint,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  items: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState('');

  function add() {
    const v = draft.trim();
    if (!v) return;
    onChange([...items, v]);
    setDraft('');
  }

  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  function update(i: number, val: string) {
    const next = [...items];
    next[i] = val;
    onChange(next);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      <div className="space-y-2 mb-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={e => update(i, e.target.value)}
              className="input flex-1 text-sm"
            />
            <button type="button" onClick={() => remove(i)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder={placeholder ?? 'Add item and press Enter'}
          className="input flex-1 text-sm"
        />
        <button type="button" onClick={add} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
          Add
        </button>
      </div>
    </div>
  );
}

// ── Module editor ────────────────────────────────────────────────────────────

type Module = { title: string; body: string };

function ModuleEditor({ modules, onChange }: { modules: Module[]; onChange: (next: Module[]) => void }) {
  function add() {
    onChange([...modules, { title: '', body: '' }]);
  }

  function remove(i: number) {
    onChange(modules.filter((_, idx) => idx !== i));
  }

  function update(i: number, field: keyof Module, val: string) {
    const next = [...modules];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">Course modules</label>
      <p className="text-xs text-gray-400 mb-2">Each module appears as a numbered section on the course page.</p>
      <div className="space-y-3 mb-2">
        {modules.map((m, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-2 relative">
            <button type="button" onClick={() => remove(i)} className="absolute top-3 right-3 p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="pr-8">
              <label className="block text-xs font-medium text-gray-500 mb-1">Module {i + 1} title</label>
              <input type="text" value={m.title} onChange={e => update(i, 'title', e.target.value)} className="input text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
              <textarea value={m.body} onChange={e => update(i, 'body', e.target.value)} rows={2} className="input resize-none text-sm" />
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors">
        <Plus className="w-4 h-4" /> Add module
      </button>
    </div>
  );
}

// ── Tag editor (pill-style) ──────────────────────────────────────────────────

function TagEditor({ tags, onChange }: { tags: string[]; onChange: (next: string[]) => void }) {
  const [draft, setDraft] = useState('');

  function add() {
    const v = draft.trim();
    if (!v || tags.includes(v)) return;
    onChange([...tags, v]);
    setDraft('');
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
      <p className="text-xs text-gray-400 mb-2">Shown as pills in the course hero banner.</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 text-xs font-semibold border border-gray-300 text-gray-600 px-2.5 py-1 rounded-full">
            {tag}
            <button type="button" onClick={() => onChange(tags.filter(t => t !== tag))} className="hover:text-red-500 transition-colors ml-0.5">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="e.g. Nationally Recognised"
          className="input flex-1 text-sm"
        />
        <button type="button" onClick={add} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
          Add
        </button>
      </div>
    </div>
  );
}

// ── Main form ────────────────────────────────────────────────────────────────

// ── Flyer upload widget ──────────────────────────────────────────────────────

function FlyerUpload({
  courseSlug,
  flyerUrl,
  onChange,
}: {
  courseSlug: string;
  flyerUrl: string | null;
  onChange: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!courseSlug) { setUploadError('Save the course with a slug first.'); return; }
    setUploading(true);
    setUploadError('');

    const path = `${courseSlug}.pdf`;
    const { error: upErr } = await supabase.storage
      .from('course-flyers')
      .upload(path, file, { contentType: 'application/pdf', upsert: true });

    if (upErr) {
      setUploadError(upErr.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('course-flyers').getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  async function handleDelete() {
    if (!courseSlug) return;
    if (!confirm('Remove this flyer from the course?')) return;
    await supabase.storage.from('course-flyers').remove([`${courseSlug}.pdf`]);
    onChange(null);
  }

  const filename = flyerUrl ? flyerUrl.split('/').pop() : null;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Flyer (PDF)</label>
      {flyerUrl ? (
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          <FileText className="w-5 h-5 text-sky-600 flex-shrink-0" />
          <span className="text-sm text-gray-700 truncate flex-1">{filename}</span>
          <a href={flyerUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded hover:bg-sky-50 text-gray-400 hover:text-sky-600 transition-colors" title="View flyer">
            <ExternalLink className="w-4 h-4" />
          </a>
          <button type="button" onClick={() => inputRef.current?.click()} className="p-1.5 rounded hover:bg-sky-50 text-gray-400 hover:text-sky-600 transition-colors" title="Replace flyer">
            <Upload className="w-4 h-4" />
          </button>
          <button type="button" onClick={handleDelete} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Remove flyer">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading || !courseSlug}
          className="flex items-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-200 hover:border-sky-400 hover:bg-sky-50/50 rounded-lg text-sm text-gray-500 hover:text-sky-600 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading
            ? <><span className="w-4 h-4 border-2 border-sky-300 border-t-sky-600 rounded-full animate-spin" /> Uploading…</>
            : <><Upload className="w-4 h-4" /> Upload PDF flyer</>
          }
        </button>
      )}
      <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFile} />
      {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
      {!courseSlug && <p className="text-xs text-gray-400 mt-1">Enter a slug above before uploading a flyer.</p>}
    </div>
  );
}

// ── Main form ────────────────────────────────────────────────────────────────

const BLANK: Partial<Course> = {
  title: '', slug: '', short_description: '', description: '',
  price: 0, currency: 'AUD', duration_hours: 0, difficulty_level: 'beginner',
  image_url: '', flyer_url: null, is_published: false, is_featured: false, sort_order: 0,
  meta_title: '', meta_description: '', category_id: undefined,
  course_code: '', tags: [], learning_outcomes: [], audience: [], modules: [],
};

export function AdminCourseForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new' || !id;
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Course>>(BLANK);
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.from('categories').select('*').order('sort_order').then(({ data }) => setCategories(data ?? []));
    if (!isNew) {
      supabase.from('courses').select('*').eq('id', id).maybeSingle().then(({ data }) => {
        if (data) setForm({ ...BLANK, ...data });
      });
    }
  }, [id, isNew]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(f => ({ ...f, [name]: val }));
    if (name === 'title' && isNew) {
      setForm(f => ({
        ...f,
        title: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }));
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = { ...form, updated_at: new Date().toISOString() };
    const { error: err } = isNew
      ? await supabase.from('courses').insert(payload)
      : await supabase.from('courses').update(payload).eq('id', id!);
    if (err) { setError(err.message); setSaving(false); return; }
    navigate('/admin/courses');
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/courses" className="text-gray-400 hover:text-gray-600 transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'New course' : 'Edit course'}</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}

        {/* Basic info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-bold text-gray-900">Basic info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
              <input type="text" name="title" required value={form.title ?? ''} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug *</label>
              <input type="text" name="slug" required value={form.slug ?? ''} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Course code</label>
              <input type="text" name="course_code" value={form.course_code ?? ''} onChange={handleChange} className="input" placeholder="e.g. HLTAID011" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select name="category_id" value={form.category_id ?? ''} onChange={handleChange} className="input">
                <option value="">No category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Difficulty</label>
              <select name="difficulty_level" value={form.difficulty_level ?? 'beginner'} onChange={handleChange} className="input">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (AUD)</label>
              <input type="number" name="price" min="0" step="0.01" value={form.price ?? 0} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration (hours)</label>
              <input type="number" name="duration_hours" min="0" step="0.5" value={form.duration_hours ?? 0} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Sort order</label>
              <input type="number" name="sort_order" value={form.sort_order ?? 0} onChange={handleChange} className="input" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Short description</label>
              <input type="text" name="short_description" value={form.short_description ?? ''} onChange={handleChange} className="input" maxLength={200} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full description</label>
              <textarea name="description" value={form.description ?? ''} onChange={handleChange} rows={5} className="input resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
              <input type="url" name="image_url" value={form.image_url ?? ''} onChange={handleChange} className="input" placeholder="https://..." />
              {form.image_url && (
                <img src={form.image_url} alt="preview" className="mt-2 h-24 w-full object-cover rounded-lg" onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
            <div>
              <FlyerUpload
                courseSlug={form.slug ?? ''}
                flyerUrl={form.flyer_url ?? null}
                onChange={url => setForm(f => ({ ...f, flyer_url: url }))}
              />
            </div>
          </div>
          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_published" checked={!!form.is_published} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
              <span className="text-sm text-gray-700">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_featured" checked={!!form.is_featured} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
              <span className="text-sm text-gray-700">Featured on homepage</span>
            </label>
          </div>
        </div>

        {/* Course content */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
          <h2 className="font-bold text-gray-900">Course content</h2>

          <TagEditor
            tags={form.tags ?? []}
            onChange={tags => setForm(f => ({ ...f, tags }))}
          />

          <StringListEditor
            label="Learning outcomes"
            hint="Shown as a checklist on the course page."
            items={form.learning_outcomes ?? []}
            onChange={learning_outcomes => setForm(f => ({ ...f, learning_outcomes }))}
            placeholder="e.g. Identify key workplace hazards"
          />

          <StringListEditor
            label="Who is this for?"
            hint="Each item appears as a numbered card on the course page."
            items={form.audience ?? []}
            onChange={audience => setForm(f => ({ ...f, audience }))}
            placeholder="e.g. Frontline healthcare workers"
          />

          <ModuleEditor
            modules={form.modules ?? []}
            onChange={modules => setForm(f => ({ ...f, modules }))}
          />
        </div>

        {/* SEO */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-bold text-gray-900">SEO</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta title</label>
            <input type="text" name="meta_title" value={form.meta_title ?? ''} onChange={handleChange} className="input" maxLength={70} />
            <p className="text-xs text-gray-400 mt-1">{(form.meta_title ?? '').length}/70 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta description</label>
            <textarea name="meta_description" value={form.meta_description ?? ''} onChange={handleChange} rows={3} className="input resize-none" maxLength={160} />
            <p className="text-xs text-gray-400 mt-1">{(form.meta_description ?? '').length}/160 characters</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-colors">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {isNew ? 'Create course' : 'Save changes'}
          </button>
          <Link to="/admin/courses" className="px-6 py-3 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
