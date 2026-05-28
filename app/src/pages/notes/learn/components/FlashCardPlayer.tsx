import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { FlashCardPlayerCard } from './FlashCardPlayerCard';
import type { FlashCard } from '../../../../features/flash-cards/interfaces/flash-cards.interface';

interface Props {
    cards: FlashCard[];
    onClose: () => void;
}

type Direction = 'next' | 'prev';

const variants = {
    enter: (dir: Direction) => ({
        x: dir === 'next' ? '100%' : '-100%',
        opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: Direction) => ({
        x: dir === 'next' ? '-100%' : '100%',
        opacity: 0,
    }),
};

export function FlashCardPlayer({ cards, onClose }: Props) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<Direction>('next');
    const dragStart = useRef<number | null>(null);

    const total = cards.length;
    const card = cards[index];

    function goNext() {
        if (index < total - 1) {
            setDirection('next');
            setIndex((i) => i + 1);
        }
    }

    function goPrev() {
        if (index > 0) {
            setDirection('prev');
            setIndex((i) => i - 1);
        }
    }

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'ArrowRight') goNext();
            else if (e.key === 'ArrowLeft') goPrev();
            else if (e.key === 'Escape') onClose();
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [index, total]);

    function handlePointerDown(e: React.PointerEvent) {
        dragStart.current = e.clientX;
    }

    function handlePointerUp(e: React.PointerEvent) {
        if (dragStart.current === null) return;
        const delta = e.clientX - dragStart.current;
        dragStart.current = null;
        if (Math.abs(delta) < 50) return;
        if (delta < 0) goNext();
        else goPrev();
    }

    return createPortal(
        <div
            className="fixed inset-0 z-[10000] bg-slate-950 flex flex-col"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        >
            {/* Progress bar */}
            <div className="h-1 bg-slate-800 flex-shrink-0">
                <motion.div
                    className="h-full bg-violet-500"
                    animate={{ width: `${((index + 1) / total) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
                <span className="text-sm text-slate-400 tabular-nums">
                    {index + 1} / {total}
                </span>
                <button
                    onClick={onClose}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Card area */}
            <div className="flex-1 flex items-center justify-center px-4 pb-4 relative overflow-hidden">
                <button
                    onClick={goPrev}
                    disabled={index === 0}
                    className="absolute left-2 z-10 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="w-full max-w-lg h-full max-h-[560px]">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={index}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="w-full h-full"
                        >
                            <FlashCardPlayerCard card={card} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button
                    onClick={goNext}
                    disabled={index === total - 1}
                    className="absolute right-2 z-10 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 transition-colors"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>,
        document.body,
    );
}
