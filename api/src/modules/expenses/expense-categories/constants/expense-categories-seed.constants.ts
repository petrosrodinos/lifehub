interface ExpenseCategorySeed {
    readonly name: string;
    readonly icon: string;
    readonly color: string;
    readonly subcategories: readonly string[];
}

export const EXPENSE_CATEGORIES_SEED: readonly ExpenseCategorySeed[] = [
    {
        name: 'Food & Dining',
        icon: '🍔',
        color: '#ef4444',
        subcategories: ['Groceries', 'Restaurants', 'Coffee', 'Fast Food', 'Delivery', 'Snacks'],
    },
    {
        name: 'Transportation',
        icon: '🚗',
        color: '#3b82f6',
        subcategories: ['Fuel', 'Public Transit', 'Taxi & Ride Share', 'Parking', 'Car Maintenance', 'Insurance'],
    },
    {
        name: 'Housing',
        icon: '🏠',
        color: '#8b5cf6',
        subcategories: ['Rent', 'Mortgage', 'Utilities', 'Internet', 'Phone', 'Repairs', 'Furniture'],
    },
    {
        name: 'Entertainment',
        icon: '🎬',
        color: '#f59e0b',
        subcategories: ['Movies', 'Music', 'Games', 'Streaming', 'Events', 'Hobbies'],
    },
    {
        name: 'Shopping',
        icon: '🛒',
        color: '#ec4899',
        subcategories: ['Clothing', 'Electronics', 'Home Supplies', 'Gifts', 'Books', 'Personal Care'],
    },
    {
        name: 'Health & Fitness',
        icon: '💪',
        color: '#10b981',
        subcategories: ['Gym', 'Supplements', 'Doctor', 'Pharmacy', 'Dental', 'Vision'],
    },
    {
        name: 'Education',
        icon: '📚',
        color: '#6366f1',
        subcategories: ['Courses', 'Books', 'Tuition', 'Supplies', 'Certifications'],
    },
    {
        name: 'Bills & Subscriptions',
        icon: '📋',
        color: '#64748b',
        subcategories: ['Electricity', 'Water', 'Gas', 'Insurance', 'Subscriptions', 'Memberships'],
    },
    {
        name: 'Travel',
        icon: '✈️',
        color: '#0ea5e9',
        subcategories: ['Flights', 'Hotels', 'Car Rental', 'Activities', 'Travel Insurance', 'Food & Drinks'],
    },
    {
        name: 'Personal',
        icon: '👤',
        color: '#a855f7',
        subcategories: ['Haircut', 'Spa', 'Laundry', 'Donations', 'Gifts'],
    },
    {
        name: 'Savings & Investments',
        icon: '💰',
        color: '#22c55e',
        subcategories: ['Emergency Fund', 'Stocks', 'Crypto', 'Retirement', 'Savings Account'],
    },
    {
        name: 'Income',
        icon: '💵',
        color: '#16a34a',
        subcategories: ['Salary', 'Freelance', 'Bonus', 'Interest', 'Dividends', 'Side Hustle'],
    },
] as const;
