import { useState } from "react";
import { PinSettings } from "./components/PinSettings";
import { Settings as SettingsIcon, ShieldCheck, LogOut, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store";
import { ConfirmationModal } from "../../components/ui/ConfirmationModal";

export function SettingsPage() {
  const { full_name, email, logout } = useAuthStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-amber-400" />
            Settings
          </h1>
          <p className="text-slate-400">Manage your account preferences and security</p>
        </div>

        <div className="space-y-6">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-semibold text-white">Account</h2>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400">Full Name</label>
                  <p className="text-white font-medium">{full_name}</p>
                </div>
                <div className="pt-4 border-t border-slate-700/50">
                  <label className="text-sm text-slate-400">Email Address</label>
                  <p className="text-white font-medium">{email}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4">Profile editing will be available soon</p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-semibold text-white">Security</h2>
            </div>
            <PinSettings />
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <LogOut className="w-5 h-5 text-red-400" />
              <h2 className="text-xl font-semibold text-white">Account Actions</h2>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-xl bg-red-500/10">
                    <LogOut className="w-6 h-6 text-red-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Logout</h3>
                  <p className="text-sm text-slate-400 mb-4">Sign out of your account on this device</p>
                  <button onClick={handleLogoutClick} className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ConfirmationModal isOpen={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)} onConfirm={handleLogoutConfirm} title="Logout" description="Are you sure you want to logout? You will need to sign in again to access your account." confirmText="Logout" cancelText="Cancel" variant="warning" />
    </div>
  );
}
