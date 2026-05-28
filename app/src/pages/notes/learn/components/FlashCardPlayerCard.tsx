import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';
import type { FlashCard } from '../../../../features/flash-cards/interfaces/flash-cards.interface';

interface Props {
    card: FlashCard;
}

export function FlashCardPlayerCard({ card }: Props) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-full h-full cursor-pointer select-none"
            style={{ perspective: '1200px' }}
            onClick={() => setIsFlipped((f) => !f)}
        >
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-slate-900 rounded-3xl border border-slate-700/50"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {card.image?.url && (
                        <div className="w-full max-w-sm mb-6 rounded-2xl overflow-hidden">
                            <img
                                src={card.image.url}
                                alt={card.front}
                                className="w-full object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                                }}
                            />
                        </div>
                    )}
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 text-center leading-tight">
                        {card.front}
                    </h2>
                    {card.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
                            {card.keywords.map((kw) => (
                                <span
                                    key={kw}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-violet-900/40 text-violet-300 border border-violet-700/40"
                                >
                                    <Tag className="w-2.5 h-2.5" />
                                    {kw}
                                </span>
                            ))}
                        </div>
                    )}
                    <p className="mt-6 text-xs text-slate-600">Tap to reveal</p>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-slate-800 rounded-3xl border border-slate-700/50"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <p className="text-lg sm:text-xl text-slate-200 text-center leading-relaxed">
                        {card.back}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
