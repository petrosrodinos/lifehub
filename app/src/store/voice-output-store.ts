import { create } from "zustand";

interface VoiceOutputStore {
    speakingId: string | null;
    setSpeakingId: (id: string | null) => void;
}

export const useVoiceOutputStore = create<VoiceOutputStore>((set) => ({
    speakingId: null,
    setSpeakingId: (id) => set({ speakingId: id }),
}));
