import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Building2, ChevronRight, UserPlus, MessageSquare, Clock, CheckCheck, Send } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Enquiry } from '../../lib/supabase';

const STATUS_STYLES: Record<Enquiry['status'], string> = {
  new: 'bg-sky-50 text-sky-700 border border-sky-200',
  read: 'bg-gray-100 text-gray-600',
  replied: 'bg-emerald-50 text-emerald-700',
  converted: 'bg-amber-50 text-amber-700',
};

const STATUS_ICONS: Record<Enquiry['status'], React.ElementType> = {
  new: Mail,
  read: MessageSquare,
  replied: Send,
  converted: CheckCheck,
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}

export function AdminEnquiriesList() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Enquiry['status'] | 'all'>('all');

  async function load() {
    const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    setEnquiries(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function markStatus(id: string, status: Enquiry['status']) {
    await supabase.from('enquiries').update({ status }).eq('id', id);
    load();
  }

  async function deleteEnquiry(id: string) {
    if (!confirm('Delete this enquiry?')) return;
    await supabase.from('enquiries').delete().eq('id', id);
    load();
  }

  const filtered = filter === 'all' ? enquiries : enquiries.filter(e => e.status === filter);
  const newCount = enquiries.filter(e => e.status === 'new').length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Enquiries
            {newCount > 0 && (
              <span className="text-sm font-semibold bg-sky-600 text-white px-2.5 py-0.5 rounded-full">{newCount} new</span>
            )}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{enquiries.length} total submissions from the contact form</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
        {(['all', 'new', 'read', 'replied', 'converted'] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === s ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {s}
            {s !== 'all' && (
              <span className="ml-1.5 text-xs text-gray-400">
                ({enquiries.filter(e => e.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 text-gray-400">
          No {filter === 'all' ? '' : filter} enquiries yet.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(enq => {
            const StatusIcon = STATUS_ICONS[enq.status];
            return (
              <div key={enq.id} className={`bg-white rounded-xl border overflow-hidden transition-colors ${enq.status === 'new' ? 'border-sky-200' : 'border-gray-100'}`}>
                <div className="flex items-start gap-4 p-5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold uppercase ${enq.status === 'new' ? 'bg-sky-100 text-sky-700' : 'bg-gray-100 text-gray-500'}`}>
                    {enq.name.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <span className="font-semibold text-gray-900 text-sm">{enq.name}</span>
                        <span className="text-gray-400 text-xs ml-2">{enq.email}</span>
                        {enq.organisation && (
                          <span className="text-gray-400 text-xs ml-2 flex-inline items-center gap-1">
                            · {enq.organisation}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${STATUS_STYLES[enq.status]}`}>
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                          {enq.status}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />{timeAgo(enq.created_at)}
                        </span>
                      </div>
                    </div>
                    {enq.interest && (
                      <p className="text-xs text-sky-600 font-medium mb-1">{enq.interest}</p>
                    )}
                    <p className="text-sm text-gray-500 line-clamp-2">{enq.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-t border-gray-100">
                  <Link
                    to={`/admin/enquiries/${enq.id}`}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                  >
                    View full <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-gray-200">|</span>
                  {enq.status === 'new' && (
                    <button onClick={() => markStatus(enq.id, 'read')} className="text-xs text-gray-500 hover:text-gray-700 font-medium">
                      Mark read
                    </button>
                  )}
                  {enq.status !== 'replied' && enq.status !== 'converted' && (
                    <button onClick={() => markStatus(enq.id, 'replied')} className="text-xs text-gray-500 hover:text-gray-700 font-medium">
                      Mark replied
                    </button>
                  )}
                  {enq.status !== 'converted' && (
                    <Link
                      to={`/admin/enquiries/${enq.id}/convert`}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 ml-auto"
                    >
                      <UserPlus className="w-3.5 h-3.5" /> Convert to contact
                    </Link>
                  )}
                  <button onClick={() => deleteEnquiry(enq.id)} className="text-xs text-red-400 hover:text-red-600 font-medium ml-2">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function AdminEnquiryView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase.from('enquiries').select('*').eq('id', id).maybeSingle().then(({ data }) => {
      if (data) {
        setEnquiry(data);
        setNotes(data.notes ?? '');
        if (data.status === 'new') {
          supabase.from('enquiries').update({ status: 'read' }).eq('id', id).then(() => {
            setEnquiry(prev => prev ? { ...prev, status: 'read' } : prev);
          });
        }
      }
    });
  }, [id]);

  async function saveNotes() {
    if (!id) return;
    setSaving(true);
    await supabase.from('enquiries').update({ notes }).eq('id', id);
    setSaving(false);
  }

  async function setStatus(status: Enquiry['status']) {
    if (!id) return;
    await supabase.from('enquiries').update({ status }).eq('id', id);
    setEnquiry(prev => prev ? { ...prev, status } : prev);
  }

  if (!enquiry) {
    return <div className="p-8 flex items-center justify-center"><div className="w-6 h-6 border-2 border-sky-200 border-t-sky-600 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/admin/enquiries" className="hover:text-gray-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Enquiries
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-600 font-medium">{enquiry.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{enquiry.name}</h2>
                <a href={`mailto:${enquiry.email}`} className="text-sky-600 text-sm hover:underline flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />{enquiry.email}
                </a>
                {enquiry.organisation && (
                  <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />{enquiry.organisation}
                  </p>
                )}
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${STATUS_STYLES[enquiry.status]}`}>
                {enquiry.status}
              </span>
            </div>
            {enquiry.interest && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Interested in</p>
                <p className="text-sm text-sky-700 font-medium bg-sky-50 rounded-lg px-3 py-2">{enquiry.interest}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Message</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4">{enquiry.message}</p>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-3">Internal notes</h3>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={4}
              className="input resize-none mb-3"
              placeholder="Add notes about this enquiry..."
            />
            <button
              onClick={saveNotes} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {saving ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
              Save notes
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Status</p>
            <div className="space-y-1.5">
              {(['new', 'read', 'replied', 'converted'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors font-medium ${
                    enquiry.status === s ? STATUS_STYLES[s] + ' font-semibold' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Details</p>
            <p className="text-xs text-gray-500">Received</p>
            <p className="text-sm font-medium text-gray-900 mb-3">
              {new Date(enquiry.created_at).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {enquiry.status !== 'converted' && (
            <Link
              to={`/admin/enquiries/${enquiry.id}/convert`}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <UserPlus className="w-4 h-4" /> Convert to contact
            </Link>
          )}
          <button
            onClick={() => navigate('/admin/enquiries')}
            className="w-full px-4 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-xl transition-colors"
          >
            Back to enquiries
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminEnquiryConvert() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '', organisation: '', role: '', notes: '', source: 'enquiry' as const,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    supabase.from('enquiries').select('*').eq('id', id).maybeSingle().then(({ data }) => {
      if (!data) return;
      setEnquiry(data);
      const parts = data.name.trim().split(/\s+/);
      setForm(f => ({
        ...f,
        first_name: parts[0] ?? '',
        last_name: parts.slice(1).join(' '),
        email: data.email,
        organisation: data.organisation,
        notes: data.message,
      }));
    });
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setError('');
    const { error: err } = await supabase.from('contacts').insert({
      ...form,
      enquiry_id: id,
      source: 'enquiry',
    });
    if (err) { setError(err.message); setSaving(false); return; }
    await supabase.from('enquiries').update({ status: 'converted' }).eq('id', id);
    navigate('/admin/contacts');
  }

  if (!enquiry) {
    return <div className="p-8 flex items-center justify-center"><div className="w-6 h-6 border-2 border-sky-200 border-t-sky-600 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to={`/admin/enquiries/${id}`} className="hover:text-gray-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Enquiry
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-600 font-medium">Convert to contact</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">Convert to contact</h1>
      <p className="text-gray-500 text-sm mb-8">Review and edit the details before saving as a contact.</p>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">First name *</label>
            <input type="text" name="first_name" required value={form.first_name} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
            <input type="text" name="last_name" value={form.last_name} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisation</label>
            <input type="text" name="organisation" value={form.organisation} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role / Title</label>
            <input type="text" name="role" value={form.role} onChange={handleChange} className="input" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} className="input resize-none" />
          </div>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-colors">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <UserPlus className="w-4 h-4" />}
            Save as contact
          </button>
          <Link to={`/admin/enquiries/${id}`} className="px-6 py-3 text-gray-600 hover:text-gray-900 text-sm font-medium">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
