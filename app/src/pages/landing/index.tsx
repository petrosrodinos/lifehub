import { LandingNav } from "./components/LandingNav";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { StatsSection } from "./components/StatsSection";
import { CTASection } from "./components/CTASection";
import { LandingFooter } from "./components/LandingFooter";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.1),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.08),transparent_40%)] -z-10" />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwIDYuNjI3LTUuMzczIDEyLTEyIDEycy0xMi01LjM3My0xMi0xMiA1LjM3My0xMiAxMi0xMiAxMiA1LjM3MyAxMiAxMnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-20 -z-10" />

      <LandingNav />

      <main>
        <HeroSection />

        <FeaturesSection />

        <StatsSection />

        <CTASection />
      </main>

      <LandingFooter />
    </div>
  );
};
