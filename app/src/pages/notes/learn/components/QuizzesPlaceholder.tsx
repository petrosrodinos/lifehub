import { Lock } from 'lucide-react';

export function QuizzesPlaceholder() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/50 flex items-center justify-center mb-4">
                <Lock className="w-7 h-7 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-300 mb-2">Quizzes coming soon</h3>
            <p className="text-sm text-slate-500 max-w-xs">
                Quiz mode will let you test your knowledge with multiple choice and open-ended questions.
            </p>
        </div>
    );
}
