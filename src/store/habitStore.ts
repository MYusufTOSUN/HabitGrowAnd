import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Habit = {
    id: string;
    name: string;
    streak: number;
    lastCompleted: Date | null;
    frequency: 'daily' | 'weekly';
    startDate: Date;
    reminderTime?: Date | null;
    // other properties
};

type HabitState = {
    habits: Habit[];
    addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'lastCompleted'>) => void;
    completeHabit: (id: string) => void;
};

export const useHabitStore = create<HabitState>()(
    persist(
        (set) => ({
            habits: [],
            addHabit: (habit) =>
                set((state) => ({
                    habits: [
                        ...state.habits,
                        {
                            ...habit,
                            id: Date.now().toString(),
                            streak: 0,
                            lastCompleted: null,
                        },
                    ],
                })),
            completeHabit: (id) =>
                set((state) => ({
                    habits: state.habits.map((habit) => {
                        if (habit.id === id) {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);

                            const lastCompleted = habit.lastCompleted;
                            let newStreak = habit.streak;

                            if (lastCompleted) {
                                const lastDate = new Date(lastCompleted);
                                lastDate.setHours(0, 0, 0, 0);

                                const diffTime = today.getTime() - lastDate.getTime();
                                const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

                                if (diffDays === 1) {
                                    newStreak++;
                                } else if (diffDays > 1) {
                                    newStreak = 1;
                                }
                                // if diffDays is 0 or less, do nothing.
                            } else {
                                newStreak = 1;
                            }

                            return { ...habit, streak: newStreak, lastCompleted: new Date() };
                        }
                        return habit;
                    }),
                })),
        }),
        {
            name: 'habit-storage',
            storage: createJSONStorage(() => AsyncStorage, {
                reviver: (key, value) => {
                    if (typeof value !== 'string') return value;

                    if (key === 'lastCompleted' && value) {
                        return new Date(value);
                    }
                    if (key === 'startDate' && value) {
                        return new Date(value);
                    }
                    if (key === 'reminderTime' && value) {
                        return new Date(value);
                    }
                    return value;
                },
            }),
        }
    )
); 