import { PinSettings } from './components/PinSettings';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SecuritySettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
            Security Settings
          </h1>
          <p className="text-slate-400">
            Manage your account security and PIN lock preferences
          </p>
        </div>

        <div className="space-y-6">
          <PinSettings />
        </div>
      </div>
    </div>
  );
}
