import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Plus, CreditCard as Edit2, Trash2, ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { TeamMember } from '../../lib/supabase';

export function AdminTeamList() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase.from('team_members').select('*').order('sort_order');
    setMembers(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('team_members').update({ is_published: !current }).eq('id', id);
    load();
  }

  async function deleteMember(id: string) {
    if (!confirm('Delete this team member?')) return;
    await supabase.from('team_members').delete().eq('id', id);
    load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-500 text-sm mt-1">{members.length} total</p>
        </div>
        <Link to="/admin/team/new" className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-xl hover:bg-sky-700 transition-colors">
          <Plus className="w-4 h-4" /> Add member
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {members.length === 0 ? (
            <div className="text-center py-16 text-gray-400">No team members yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Name</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden md:table-cell">Role</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {members.map(m => (
                  <tr key={m.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-4 font-medium text-gray-900">{m.name}</td>
                    <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{m.role}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${m.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                        {m.is_published ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => togglePublish(m.id, m.is_published)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                          {m.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <Link to={`/admin/team/${m.id}/edit`} className="p-2 rounded-lg hover:bg-sky-50 text-gray-400 hover:text-sky-600 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button onClick={() => deleteMember(m.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

const BLANK: Partial<TeamMember> = { name: '', role: '', bio: '', image_url: '', linkedin_url: '', sort_order: 0, is_published: true };

export function AdminTeamForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new' || !id;
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<TeamMember>>(BLANK);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      supabase.from('team_members').select('*').eq('id', id).maybeSingle().then(({ data }) => { if (data) setForm(data); });
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
      ? await supabase.from('team_members').insert(form)
      : await supabase.from('team_members').update(form).eq('id', id!);
    if (err) { setError(err.message); setSaving(false); return; }
    navigate('/admin/team');
  }

  return (
    <div className="p-8 max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/team" className="text-gray-400 hover:text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Add team member' : 'Edit team member'}</h1>
      </div>
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
            <input type="text" name="name" required value={form.name ?? ''} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
            <input type="text" name="role" value={form.role ?? ''} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Sort order</label>
            <input type="number" name="sort_order" value={form.sort_order ?? 0} onChange={handleChange} className="input" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
            <textarea name="bio" value={form.bio ?? ''} onChange={handleChange} rows={4} className="input resize-none" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
            <input type="url" name="image_url" value={form.image_url ?? ''} onChange={handleChange} className="input" placeholder="https://..." />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn URL</label>
            <input type="url" name="linkedin_url" value={form.linkedin_url ?? ''} onChange={handleChange} className="input" placeholder="https://linkedin.com/in/..." />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_published" checked={!!form.is_published} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
          <span className="text-sm text-gray-700">Visible on About page</span>
        </label>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-colors">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {isNew ? 'Add member' : 'Save changes'}
          </button>
          <Link to="/admin/team" className="px-6 py-3 text-gray-600 hover:text-gray-900 text-sm font-medium">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
