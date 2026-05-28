export function FlashCardGroupSkeleton() {
    return (
        <div className="bg-slate-900/80 border border-slate-800/50 rounded-2xl overflow-hidden animate-pulse">
            <div className="h-40 bg-slate-800" />
            <div className="p-4 space-y-3">
                <div className="h-4 w-2/3 bg-slate-800 rounded" />
                <div className="h-3 w-1/3 bg-slate-800/60 rounded" />
                <div className="flex gap-2 pt-1">
                    <div className="h-8 flex-1 bg-slate-800 rounded-lg" />
                    <div className="h-8 w-8 bg-slate-800 rounded-lg" />
                </div>
            </div>
        </div>
    );
}
