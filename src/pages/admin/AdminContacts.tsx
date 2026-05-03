import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Save, ChevronRight, Search, Mail, Phone, Building2, Tag, UserCheck, UserX, Trash2, CreditCard as Edit2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Contact } from '../../lib/supabase';

const SOURCE_LABELS: Record<Contact['source'], string> = {
  enquiry: 'Enquiry',
  manual: 'Manual',
  referral: 'Referral',
  other: 'Other',
};

const SOURCE_COLORS: Record<Contact['source'], string> = {
  enquiry: 'bg-sky-50 text-sky-700',
  manual: 'bg-gray-100 text-gray-600',
  referral: 'bg-emerald-50 text-emerald-700',
  other: 'bg-amber-50 text-amber-700',
};

export function AdminContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  async function load() {
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    setContacts(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleActive(id: string, current: boolean) {
    await supabase.from('contacts').update({ is_active: !current }).eq('id', id);
    load();
  }

  async function deleteContact(id: string) {
    if (!confirm('Delete this contact? This cannot be undone.')) return;
    await supabase.from('contacts').delete().eq('id', id);
    load();
  }

  const filtered = contacts.filter(c => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.first_name.toLowerCase().includes(q) ||
      c.last_name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.organisation ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-500 text-sm mt-1">{contacts.length} total · {contacts.filter(c => c.is_active).length} active</p>
        </div>
        <Link to="/admin/contacts/new" className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-xl hover:bg-sky-700 transition-colors">
          <Plus className="w-4 h-4" /> Add contact
        </Link>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text" placeholder="Search by name, email or organisation..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 text-gray-400">
          {search ? 'No contacts match your search.' : 'No contacts yet. Convert an enquiry or add one manually.'}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Name</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden md:table-cell">Organisation</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden lg:table-cell">Source</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden lg:table-cell">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className={`hover:bg-gray-50/50 transition-colors ${!c.is_active ? 'opacity-50' : ''}`}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{c.first_name} {c.last_name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      {c.email && <a href={`mailto:${c.email}`} className="text-xs text-sky-600 hover:underline flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</a>}
                      {c.phone && <span className="text-xs text-gray-400 flex items-center gap-1"><Phone className="w-3 h-3" />{c.phone}</span>}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden md:table-cell">
                    {c.organisation ? (
                      <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-gray-300" />{c.organisation}</span>
                    ) : '—'}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${SOURCE_COLORS[c.source]}`}>
                      {SOURCE_LABELS[c.source]}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${c.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {c.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => toggleActive(c.id, c.is_active)} title={c.is_active ? 'Deactivate' : 'Activate'} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        {c.is_active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </button>
                      <Link to={`/admin/contacts/${c.id}/edit`} className="p-2 rounded-lg hover:bg-sky-50 text-gray-400 hover:text-sky-600 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => deleteContact(c.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
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

const BLANK: Partial<Contact> = {
  first_name: '', last_name: '', email: '', phone: '', organisation: '',
  role: '', source: 'manual', notes: '', tags: [], is_active: true,
};

export function AdminContactForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new' || !id;
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Contact>>(BLANK);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      supabase.from('contacts').select('*').eq('id', id).maybeSingle().then(({ data }) => {
        if (data) setForm(data);
      });
    }
  }, [id, isNew]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(f => ({ ...f, [name]: val }));
  }

  function addTag(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      if (!(form.tags ?? []).includes(tag)) {
        setForm(f => ({ ...f, tags: [...(f.tags ?? []), tag] }));
      }
      setTagInput('');
    }
  }

  function removeTag(tag: string) {
    setForm(f => ({ ...f, tags: (f.tags ?? []).filter(t => t !== tag) }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = { ...form, updated_at: new Date().toISOString() };
    const { error: err } = isNew
      ? await supabase.from('contacts').insert(payload)
      : await supabase.from('contacts').update(payload).eq('id', id!);
    if (err) { setError(err.message); setSaving(false); return; }
    navigate('/admin/contacts');
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/admin/contacts" className="hover:text-gray-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Contacts
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-600 font-medium">{isNew ? 'New contact' : `${form.first_name} ${form.last_name}`}</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">{isNew ? 'Add contact' : 'Edit contact'}</h1>

      <form onSubmit={handleSave} className="space-y-5">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Personal details</h2>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First name *</label>
              <input type="text" name="first_name" required value={form.first_name ?? ''} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
              <input type="text" name="last_name" value={form.last_name ?? ''} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" name="email" value={form.email ?? ''} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <input type="tel" name="phone" value={form.phone ?? ''} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisation</label>
              <input type="text" name="organisation" value={form.organisation ?? ''} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Role / Title</label>
              <input type="text" name="role" value={form.role ?? ''} onChange={handleChange} className="input" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Details</h2>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Source</label>
              <select name="source" value={form.source ?? 'manual'} onChange={handleChange} className="input">
                <option value="manual">Manual</option>
                <option value="enquiry">Enquiry</option>
                <option value="referral">Referral</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex items-end pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_active" checked={!!form.is_active} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                <span className="text-sm text-gray-700">Active contact</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(form.tags ?? []).map(tag => (
                <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-sky-50 text-sky-700 text-xs rounded-full font-medium">
                  <Tag className="w-3 h-3" />{tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-0.5 hover:text-sky-900">×</button>
                </span>
              ))}
            </div>
            <input
              type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag}
              className="input" placeholder="Type a tag and press Enter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
            <textarea name="notes" value={form.notes ?? ''} onChange={handleChange} rows={4} className="input resize-none" placeholder="Any relevant background, interests, or context..." />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-colors">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {isNew ? 'Add contact' : 'Save changes'}
          </button>
          <Link to="/admin/contacts" className="px-6 py-3 text-gray-600 hover:text-gray-900 text-sm font-medium">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
