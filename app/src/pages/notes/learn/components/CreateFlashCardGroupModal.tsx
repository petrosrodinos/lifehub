import { useState } from 'react';
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { Modal } from '../../../../components/ui/Modal';
import { useCreateFlashCardGroup } from '../../../../features/flash-cards/hooks/use-flash-cards';
import { NoteSelector } from './NoteSelector';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

type Step = 'select' | 'configure';

const CARDS_OPTIONS = [3, 5, 8, 10, 15, 20];

export function CreateFlashCardGroupModal({ isOpen, onClose }: Props) {
    const [step, setStep] = useState<Step>('select');
    const [selectedUuids, setSelectedUuids] = useState<string[]>([]);
    const [userTitle, setUserTitle] = useState('');
    const [cardsPerNote, setCardsPerNote] = useState(5);
    const createGroup = useCreateFlashCardGroup();

    function toggleNote(uuid: string) {
        setSelectedUuids((prev) =>
            prev.includes(uuid) ? prev.filter((u) => u !== uuid) : [...prev, uuid],
        );
    }

    function handleClose() {
        setStep('select');
        setSelectedUuids([]);
        setUserTitle('');
        setCardsPerNote(5);
        onClose();
    }

    function handleCreate() {
        createGroup.mutate(
            {
                note_uuids: selectedUuids,
                user_title: userTitle.trim() || undefined,
                cards_per_note: cardsPerNote,
            },
            { onSuccess: handleClose },
        );
    }

    const estimatedCards = selectedUuids.length * cardsPerNote;

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="New Flash Cards" size="md" scrollable>
            {step === 'select' ? (
                <div className="flex flex-col gap-4">
                    <NoteSelector selectedUuids={selectedUuids} onToggle={toggleNote} />

                    {/* Cards per note — visible on step 1 */}
                    <div>
                        <label className="text-xs text-slate-400 font-medium mb-2 block">
                            Cards per note
                        </label>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5 flex-wrap flex-1">
                                {CARDS_OPTIONS.map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        onClick={() => setCardsPerNote(n)}
                                        className={`w-10 h-9 text-sm font-medium rounded-lg border transition-colors ${
                                            cardsPerNote === n
                                                ? 'bg-violet-600 border-violet-500 text-white'
                                                : 'bg-slate-800 border-slate-700/50 text-slate-300 hover:border-slate-600'
                                        }`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="number"
                                min={1}
                                max={20}
                                value={cardsPerNote}
                                onChange={(e) => {
                                    const v = Math.min(20, Math.max(1, Number(e.target.value)));
                                    setCardsPerNote(v);
                                }}
                                className="w-16 px-2 py-2 bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-100 text-center focus:outline-none focus:border-violet-500"
                            />
                        </div>
                        {selectedUuids.length > 0 && (
                            <p className="text-xs text-slate-500 mt-1.5">
                                ~{estimatedCards} cards from {selectedUuids.length} note{selectedUuids.length !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={() => setStep('configure')}
                        disabled={selectedUuids.length === 0}
                        className="w-full py-2.5 text-sm font-medium rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                    >
                        Next — {selectedUuids.length} note{selectedUuids.length !== 1 ? 's' : ''} selected
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    <button
                        onClick={() => setStep('select')}
                        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors w-fit"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to selection
                    </button>

                    <div>
                        <p className="text-sm text-slate-400 mb-4">
                            Generating{' '}
                            <span className="text-violet-400 font-medium">~{estimatedCards} cards</span>
                            {' '}from{' '}
                            <span className="text-violet-400 font-medium">{selectedUuids.length} notes</span>.
                            Add an optional title or let AI generate one.
                        </p>
                        <label className="text-xs text-slate-400 font-medium mb-1.5 block">
                            Custom title (optional)
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. JavaScript Fundamentals"
                            value={userTitle}
                            onChange={(e) => setUserTitle(e.target.value)}
                            maxLength={200}
                            className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700/50 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                        />
                    </div>

                    <button
                        onClick={handleCreate}
                        disabled={createGroup.isPending}
                        className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
                    >
                        {createGroup.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Sparkles className="w-4 h-4" />
                        )}
                        {createGroup.isPending ? 'Creating…' : `Generate ~${estimatedCards} flash cards`}
                    </button>
                </div>
            )}
        </Modal>
    );
}
