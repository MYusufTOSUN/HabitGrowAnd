import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v4',
        lng: 'tr',
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    greeting: 'Hello!',
                    'tabs.habits': 'Habits',
                    'tabs.settings': 'Settings',
                    'home.title': 'Let\'s grow good habits',
                    'settings.title': 'Settings',
                    'settings.appearance': 'Appearance',
                    'settings.theme': 'Theme',
                    'settings.preferences': 'Preferences',
                    'settings.language': 'Language',
                    Light: 'Light',
                    Dark: 'Dark',
                    'create.title': 'Create New Habit',
                    'create.name': 'Habit Name',
                    'create.name_placeholder': 'e.g., Drink water',
                    'create.frequency': 'Frequency',
                    'create.daily': 'Daily',
                    'create.weekly': 'Weekly',
                    'create.start_date': 'Start Date',
                    'create.reminder': 'Reminder Time (Optional)',
                    'create.select_time': 'Select a time',
                    'create.save': 'Save',
                    'create.error.empty_name': 'Habit name cannot be empty.',
                    'create.error.title': 'Error',
                    'notification.title': "Don't forget your habit!",
                    'notification.body': "It's time for: {{habitName}}",
                    'habit.streak': '{{count}} day streak',
                },
            },
            tr: {
                translation: {
                    greeting: 'Merhaba!',
                    'tabs.habits': 'Alışkanlıklar',
                    'tabs.settings': 'Ayarlar',
                    'home.title': 'İyi alışkanlıklar edinelim',
                    'settings.title': 'Ayarlar',
                    'settings.appearance': 'Görünüm',
                    'settings.theme': 'Tema',
                    'settings.preferences': 'Tercihler',
                    'settings.language': 'Dil',
                    Light: 'Açık',
                    Dark: 'Karanlık',
                    'create.title': 'Yeni Alışkanlık Oluştur',
                    'create.name': 'Alışkanlık Adı',
                    'create.name_placeholder': 'ör., Su iç',
                    'create.frequency': 'Sıklık',
                    'create.daily': 'Günlük',
                    'create.weekly': 'Haftalık',
                    'create.start_date': 'Başlangıç Tarihi',
                    'create.reminder': 'Hatırlatma Zamanı (İsteğe Bağlı)',
                    'create.select_time': 'Bir zaman seç',
                    'create.save': 'Kaydet',
                    'create.error.empty_name': 'Alışkanlık adı boş olamaz.',
                    'create.error.title': 'Hata',
                    'notification.title': 'Alışkanlığını unutma!',
                    'notification.body': 'Şunun zamanı geldi: {{habitName}}',
                    'habit.streak': '{{count}} günlük seri',
                },
            },
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n; 