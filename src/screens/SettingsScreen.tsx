import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useUIStore } from '@/store/uiStore';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import { List, Switch, useTheme, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
    const { theme, toggleTheme } = useUIStore();
    const { t, i18n } = useTranslation();
    const paperTheme = useTheme();

    const isDarkTheme = theme === 'dark';

    const onLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: paperTheme.colors.background }]}>
            <Text variant="headlineLarge" style={styles.header}>
                {t('settings.title')}
            </Text>
            <List.Section>
                <List.Subheader>{t('settings.appearance')}</List.Subheader>
                <List.Item
                    title={t('settings.theme')}
                    left={props => <List.Icon {...props} icon="theme-light-dark" />}
                    right={() => (
                        <Switch
                            value={isDarkTheme}
                            onValueChange={toggleTheme}
                        />
                    )}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>{t('settings.preferences')}</List.Subheader>
                <List.Item
                    title={t('settings.language')}
                    left={props => <List.Icon {...props} icon="translate" />}
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={i18n.language}
                        onValueChange={onLanguageChange}
                        style={{ color: paperTheme.colors.onSurface }}
                        dropdownIconColor={paperTheme.colors.onSurface}
                    >
                        <Picker.Item label="English" value="en" />
                        <Picker.Item label="Türkçe" value="tr" />
                    </Picker>
                </View>
            </List.Section>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        fontWeight: 'bold',
    },
    pickerContainer: {
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
    }
});

export default SettingsScreen; 