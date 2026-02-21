import { FEATURES } from "../constants/landing.constants";

export const FeaturesSection = () => {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything you need,{" "}
            <span className="text-violet-400">nothing you don't</span>
          </h2>

          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Four powerful modules designed to work together and help you take
            control of your daily life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`group relative bg-gradient-to-br ${feature.gradient} rounded-2xl border border-slate-800/60 p-8 hover:border-slate-700/80 transition-all`}
              >
                <div className="absolute inset-0 bg-slate-900/40 rounded-2xl" />

                <div className="relative">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800/80 ${feature.iconColor} mb-5`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
