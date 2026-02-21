import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

export const LandingNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Calendar className="w-5 h-5 text-white" />
          </div>

          <span className="text-lg font-bold text-white">LifeHub</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/auth/sign-in"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>

          <Link
            to="/auth/sign-up"
            className="px-4 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors shadow-sm shadow-violet-600/20"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};
