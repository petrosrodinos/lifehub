export const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} LifeHub. All rights reserved.
          </p>

          <p className="text-sm text-slate-600">
            Built for people who take life seriously.
          </p>
        </div>
      </div>
    </footer>
  );
};
