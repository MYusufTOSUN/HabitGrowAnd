import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useHabitStore } from '@/store/habitStore';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { useTranslation } from 'react-i18next';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

const CreateHabitScreen = ({ navigation }: { navigation: any }) => {
    const { t } = useTranslation();
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme);

    const addHabit = useHabitStore((state) => state.addHabit);
    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
    const [startDate, setStartDate] = useState(new Date());
    const [reminderTime, setReminderTime] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const scheduleNotification = async (habitName: string, time: Date) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: t('notification.title'),
                body: t('notification.body', { habitName }),
            },
            trigger: {
                channelId: 'default',
                hour: time.getHours(),
                minute: time.getMinutes(),
                repeats: true,
            },
        });
    };

    const handleSave = () => {
        if (!name.trim()) {
            Alert.alert(t('create.error.title'), t('create.error.empty_name'));
            return;
        }
        addHabit({ name, frequency, startDate, reminderTime });
        if (reminderTime) {
            scheduleNotification(name, reminderTime);
        }
        navigation.goBack();
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || startDate;
        setShowDatePicker(Platform.OS === 'ios');
        setStartDate(currentDate);
    };

    const onTimeChange = (event: any, selectedTime?: Date) => {
        const currentTime = selectedTime || reminderTime || new Date();
        setShowTimePicker(Platform.OS === 'ios');
        setReminderTime(currentTime);
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.label}>{t('create.name')}</ThemedText>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t('create.name_placeholder')}
                placeholderTextColor={Colors[colorScheme ?? 'light'].text}
            />

            <ThemedText style={styles.label}>{t('create.frequency')}</ThemedText>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={frequency}
                    onValueChange={(itemValue) => setFrequency(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                >
                    <Picker.Item label={t('create.daily')} value="daily" />
                    <Picker.Item label={t('create.weekly')} value="weekly" />
                </Picker>
            </View>

            <ThemedText style={styles.label}>{t('create.start_date')}</ThemedText>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <ThemedText style={styles.dateText}>{startDate.toDateString()}</ThemedText>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                    themeVariant={colorScheme ?? 'light'}
                />
            )}

            <ThemedText style={styles.label}>{t('create.reminder')}</ThemedText>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <ThemedText style={styles.dateText}>
                    {reminderTime ? reminderTime.toLocaleTimeString() : t('create.select_time')}
                </ThemedText>
            </TouchableOpacity>

            {showTimePicker && (
                <DateTimePicker
                    value={reminderTime || new Date()}
                    mode="time"
                    display="default"
                    onChange={onTimeChange}
                    themeVariant={colorScheme ?? 'light'}
                />
            )}

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <ThemedText style={styles.buttonText}>{t('create.save')}</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
};

const getStyles = (colorScheme: 'light' | 'dark' | null | undefined) => {
    const theme = colorScheme ?? 'light';
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: Colors[theme].background,
        },
        label: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5,
            color: Colors[theme].text,
        },
        input: {
            backgroundColor: Colors[theme].background,
            color: Colors[theme].text,
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: Colors[theme].icon,
        },
        pickerContainer: {
            borderRadius: 10,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: Colors[theme].icon,
            overflow: 'hidden', // to ensure picker respects border radius
        },
        picker: {
            backgroundColor: 'transparent',
            color: Colors[theme].text,
        },
        pickerItem: { // For iOS picker item styling
            color: Colors[theme].text,
        },
        dateText: {
            backgroundColor: Colors[theme].background,
            color: Colors[theme].text,
            padding: 15,
            borderRadius: 10,
            textAlign: 'center',
            marginBottom: 15,
            borderWidth: 1,
            borderColor: Colors[theme].icon,
            overflow: 'hidden',
        },
        saveButton: {
            backgroundColor: Colors[theme].tint,
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 20,
        },
        buttonText: {
            color: Colors[theme].background,
            fontWeight: 'bold',
            fontSize: 16,
        }
    });
}
export default CreateHabitScreen; 