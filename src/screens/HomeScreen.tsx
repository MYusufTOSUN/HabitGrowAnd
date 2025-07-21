import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useHabitStore } from '@/store/habitStore';
import { FAB, Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import HabitCard from '@/components/HabitCard'; // Assuming this will be created
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
    const { habits } = useHabitStore();
    const { t } = useTranslation();
    const theme = useTheme();

    const renderItem = ({ item }: { item: Habit }) => {
        return <HabitCard habit={item} />;
    };

    const gradientColors = theme.dark
        ? [theme.colors.surface, '#1A1A2E']
        : theme.colors.primary ? [theme.colors.primary, theme.colors.background] : ['#FFFFFF', '#F7F7F7'];

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={gradientColors} style={styles.gradient}>
                <Text variant="headlineLarge" style={styles.header}>
                    {t('home.title')} 🌱
                </Text>
                <FlatList
                    data={habits}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                />
                <FAB
                    style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                    icon="plus"
                    onPress={() => navigation.navigate('CreateHabit')}
                />
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        fontWeight: 'bold',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 80, // To make space for the FAB
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default HomeScreen; 