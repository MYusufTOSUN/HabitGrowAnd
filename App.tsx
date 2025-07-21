import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, { useCallback, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
    MD3LightTheme,
    MD3DarkTheme,
    Provider as PaperProvider,
    configureFonts,
} from 'react-native-paper';
import { useFonts, Urbanist_400Regular, Urbanist_600SemiBold, Urbanist_700Bold } from '@expo-google-fonts/urbanist';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from '@/screens/HomeScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import CreateHabitScreen from '@/screens/CreateHabitScreen';
import HabitDetailScreen from '@/screens/HabitDetailScreen';
import '@/i18n'; // initialize i18next
import * as Notifications from 'expo-notifications';
import { useUIStore } from '@/store/uiStore';
import { useTranslation } from 'react-i18next';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateHabit" component={CreateHabitScreen} />
            <Stack.Screen name="HabitDetail" component={HabitDetailScreen} />
        </Stack.Navigator>
    );
}

const fontConfig = {
    fontFamily: 'Urbanist_400Regular',
};

const baseFontConfig = {
    customVariant: {
        fontFamily: 'Urbanist_400Regular',
        fontWeight: 'normal',
        fontSize: 16
    }
};

const paperLightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#6A5AED',
        background: '#F7F7F7',
        surface: '#FFFFFF',
        text: '#1A1A1A',
    },
};

const paperDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#A097F7',
        background: '#121212',
        surface: '#1E1E1E',
        text: '#FFFFFF',
    },
};

const navLightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: paperLightTheme.colors.primary,
        background: paperLightTheme.colors.background,
        card: paperLightTheme.colors.surface,
        text: paperLightTheme.colors.text,
        border: 'transparent',
    },
};

const navDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: paperDarkTheme.colors.primary,
        background: paperDarkTheme.colors.background,
        card: paperDarkTheme.colors.surface,
        text: paperDarkTheme.colors.text,
        border: 'transparent',
    },
};

export default function App() {
    const themeMode = useUIStore((state) => state.theme);
    const { t } = useTranslation();

    const [fontsLoaded, fontError] = useFonts({
        Urbanist_400Regular,
        Urbanist_600SemiBold,
        Urbanist_700Bold,
    });

    useEffect(() => {
        const requestPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('You need to enable notifications in your settings.');
            }
        };

        requestPermissions();

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowBanner: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
                shouldShowList: true,
            }),
        });
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const paperTheme = themeMode === 'light' ? paperLightTheme : paperDarkTheme;
    const navTheme = themeMode === 'light' ? navLightTheme : navDarkTheme;

    return (
        <PaperProvider theme={paperTheme}>
            <NavigationContainer theme={navTheme} onReady={onLayoutRootView}>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: { backgroundColor: paperTheme.colors.surface, borderTopWidth: 0, elevation: 0 },
                    }}>
                    <Tab.Screen
                        name="HomeRoot"
                        component={HomeStack}
                        options={{
                            title: t('tabs.habits'),
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="leaf" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                            title: t('tabs.settings'),
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="cog" color={color} size={size} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
} 