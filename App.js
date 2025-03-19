import 'react-native-gesture-handler'; // 👈 This must be the FIRST import
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
    return (
        <SafeAreaProvider>
            <AppNavigator />
        </SafeAreaProvider>
    );
}
