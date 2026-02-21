import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="relative bg-gradient-to-br from-violet-600/20 via-slate-900/80 to-blue-600/20 rounded-3xl border border-violet-500/15 p-10 sm:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.15),transparent_60%)]" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to take control?
            </h2>

            <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
              Start building better habits, managing your finances, and hitting
              your fitness goals — all from one dashboard.
            </p>

            <Link
              to="/auth/sign-up"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/25 transition-all"
            >
              Create Your Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
