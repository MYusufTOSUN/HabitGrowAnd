import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar, IconButton, useTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { useHabitStore, Habit } from '@/store/habitStore';
import { useTranslation } from 'react-i18next';

type Props = {
    habit: Habit;
};

const HabitCard = ({ habit }: Props) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const { completeHabit } = useHabitStore();

    const goal = 30; // Example goal
    const progress = Math.min(habit.streak / goal, 1);

    const isCompletedToday = () => {
        if (!habit.lastCompleted) return false;
        const today = new Date();
        const lastCompletedDate = new Date(habit.lastCompleted);
        return today.toDateString() === lastCompletedDate.toDateString();
    };

    const completed = isCompletedToday();

    return (
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={4}>
            <View style={styles.content}>
                <View style={styles.lottieContainer}>
                    <LottieView
                        source={require('@/assets/animations/plant-growth.json')}
                        progress={progress}
                        style={styles.lottie}
                    />
                </View>
                <View style={styles.habitInfo}>
                    <Text variant="titleMedium" style={styles.habitName}>{habit.name}</Text>
                    <Text variant="bodyMedium" style={styles.streakText}>
                        {`🔥 ${t('habit.streak', { count: habit.streak })}`}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <IconButton
                        icon={completed ? "check-decagram" : "check"}
                        size={30}
                        onPress={() => completeHabit(habit.id)}
                        disabled={completed}
                        iconColor={completed ? theme.colors.primary : theme.colors.onSurface}
                        style={[styles.iconButton, { backgroundColor: completed ? theme.colors.surfaceVariant : 'transparent' }]}
                    />
                </View>
            </View>
            <ProgressBar progress={progress} color={theme.colors.primary} style={styles.progressBar} />
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginVertical: 8,
        overflow: 'hidden',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    lottieContainer: {
        width: 60,
        height: 60,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: '100%',
        height: '100%',
    },
    habitInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    habitName: {
        fontWeight: 'bold',
    },
    streakText: {
        opacity: 0.7,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBar: {
        height: 6,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
});

export default HabitCard; 