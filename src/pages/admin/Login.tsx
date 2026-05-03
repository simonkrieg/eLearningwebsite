import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../lib/useAuth';

export default function AdminLogin() {
  const { isAdmin, loading, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAdmin) return <Navigate to="/admin" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error, isAdmin } = await signIn(email, password);
    if (error) {
      setError(error.message === 'This account is not configured as an admin.'
        ? error.message
        : 'Invalid email or password. Please try again.');
      setSubmitting(false);
      return;
    }
    if (!isAdmin) setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Sign In</h1>
          <p className="text-gray-500 text-sm mt-1">E-Learning Creations</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="admin@elearningcreations.com.au"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit" disabled={submitting || loading}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
