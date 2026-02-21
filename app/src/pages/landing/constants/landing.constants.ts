import {
    Calendar,
    Target,
    Wallet,
    Dumbbell,
    type LucideIcon,
} from "lucide-react";

interface FeatureItem {
    readonly icon: LucideIcon;
    readonly title: string;
    readonly description: string;
    readonly gradient: string;
    readonly iconColor: string;
}

interface StatItem {
    readonly value: string;
    readonly label: string;
}

export const FEATURES: readonly FeatureItem[] = [
    {
        icon: Calendar,
        title: "Daily Routine",
        description:
            "Structure your day with customizable time blocks and smart scheduling that adapts to your lifestyle.",
        gradient: "from-violet-500/20 to-violet-600/5",
        iconColor: "text-violet-400",
    },
    {
        icon: Target,
        title: "Habit Tracking",
        description:
            "Build lasting habits with streak tracking, progress analytics, and gentle reminders to keep you on course.",
        gradient: "from-emerald-500/20 to-emerald-600/5",
        iconColor: "text-emerald-400",
    },
    {
        icon: Wallet,
        title: "Expense Manager",
        description:
            "Track spending across multiple accounts, categorize transactions, and visualize where your money goes.",
        gradient: "from-blue-500/20 to-blue-600/5",
        iconColor: "text-blue-400",
    },
    {
        icon: Dumbbell,
        title: "Gym & Workouts",
        description:
            "Log workouts, track sets and reps, monitor progress per muscle group, and crush your fitness goals.",
        gradient: "from-amber-500/20 to-amber-600/5",
        iconColor: "text-amber-400",
    },
] as const;

export const STATS: readonly StatItem[] = [
    { value: "4", label: "Life Modules" },
    { value: "∞", label: "Habits to Build" },
    { value: "24/7", label: "Access" },
    { value: "100%", label: "Privacy-First" },
] as const;
