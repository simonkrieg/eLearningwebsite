import { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', organisation: '', message: '', interest: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: enquiryErr } = await supabase.from('enquiries').insert({
        name: form.name,
        email: form.email,
        organisation: form.organisation,
        interest: form.interest,
        message: form.message,
      });
      if (enquiryErr) throw enquiryErr;
      // Auto-create contact as Lead; upsert by email so re-submissions don't duplicate
      const parts = form.name.trim().split(/\s+/);
      await supabase.from('contacts').upsert({
        first_name: parts[0] ?? form.name,
        last_name: parts.slice(1).join(' '),
        email: form.email,
        organisation: form.organisation,
        source: 'enquiry',
        notes: form.message,
        is_active: true,
      }, { onConflict: 'email', ignoreDuplicates: true });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-sky-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Let's start a conversation</h1>
            <p className="text-lg text-gray-300">Tell us about your training needs and we'll tailor a solution that works for your organisation.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Get in touch</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Email</p>
                      <a href="mailto:info@elearningcreations.com.au" className="text-sky-600 text-sm hover:underline">info@elearningcreations.com.au</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Location</p>
                      <p className="text-gray-500 text-sm">Adelaide, South Australia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Response time</p>
                      <p className="text-gray-500 text-sm">Within 1 business day</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-sky-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Not sure where to start?</h3>
                <p className="text-sky-100 text-sm leading-relaxed">We offer a free 30-minute discovery call to understand your needs before proposing any solution.</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Thanks for reaching out!</h3>
                  <p className="text-gray-500">We've received your message and will get back to you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name *</label>
                      <input
                        type="text" name="name" required value={form.name} onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address *</label>
                      <input
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                        placeholder="jane@company.com.au"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisation</label>
                    <input
                      type="text" name="organisation" value={form.organisation} onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                      placeholder="Your company or organisation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">I'm interested in</label>
                    <select
                      name="interest" value={form.interest} onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition bg-white"
                    >
                      <option value="">Select an option...</option>
                      <option>Custom eLearning Content Development</option>
                      <option>Learning Management System Setup</option>
                      <option>Existing Course Catalogue</option>
                      <option>Training Consultancy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tell us about your project *</label>
                    <textarea
                      name="message" required value={form.message} onChange={handleChange} rows={5}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition resize-none"
                      placeholder="Describe your training needs, audience size, timeline, or any questions you have..."
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
                  )}
                  <button
                    type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-colors"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Send className="w-4 h-4" /> Send message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
