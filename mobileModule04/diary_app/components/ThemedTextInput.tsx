import React from 'react';
import { TextInput, type TextInputProps, StyleSheet, Keyboard} from 'react-native';
import { useWeatherContext } from '@/hooks/useWeatherContext';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedTextInput({
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const { inputLocation, setinputLocation, saveText } = useWeatherContext();

    const handleEnterPress = () => {
        saveText();
        Keyboard.dismiss();
    };

    return (
        <TextInput maxLength={85}
            style={[
                { color, height: 40},
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                style,
            ]}
            value={inputLocation}
            onChangeText={setinputLocation}
            placeholder="Search a location..."
            returnKeyType="done"
            onSubmitEditing={handleEnterPress}
            {...rest}
        />
    );

}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
    },
});
