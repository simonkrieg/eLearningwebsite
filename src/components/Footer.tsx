import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {year} E-Learning Creations Pty Ltd. All rights reserved. ABN based in Adelaide, SA.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-sky-400 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <Link to="/admin/login" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
