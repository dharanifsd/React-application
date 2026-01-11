import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SEARCH_KEY = 'SEARCH_TEXT_KEY';

export const usePersistentSearch = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const loadSearchText = async () => {
            try {
                const savedText = await AsyncStorage.getItem(SEARCH_KEY);
                if (savedText !== null) {
                    setSearchText(savedText);
                }
            } catch (error) {
                console.error('Failed to load search text', error);
            } finally {
                setIsLoaded(true);
            }
        };

        loadSearchText();
    }, []);

    const updateSearchText = async (text: string) => {
        setSearchText(text);
        try {
            await AsyncStorage.setItem(SEARCH_KEY, text);
        } catch (error) {
            console.error('Failed to save search text', error);
        }
    };

    return { searchText, updateSearchText, isLoaded };
};
