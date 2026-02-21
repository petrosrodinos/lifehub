import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-40">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium text-violet-300">
            Your personal command center
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
          One place for
          <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-blue-400 bg-clip-text text-transparent">
            {" "}
            everything{" "}
          </span>
          that matters
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Track your habits, manage expenses, plan routines, and log workouts —
          all in one beautifully designed app built around your life.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/auth/sign-up"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/25 transition-all"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            to="/auth/sign-in"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800/60 hover:bg-slate-800 text-slate-200 rounded-xl font-semibold border border-slate-700/60 transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};
