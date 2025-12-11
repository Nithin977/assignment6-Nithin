// Course: F2025 MAD201-01 Cross Platform Mobile Apps
// Assignment: 6 – News Reader App
// Student Name: Nithin Amin
// Student ID: A00194332
// File: FavoritesContext.js
// Description: Context API for managing favorite articles with AsyncStorage.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const FavoritesContext = createContext();

const STORAGE_KEY = '@favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load favorites from AsyncStorage on app start
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoaded(true);
      }
    };
    loadFavorites();
  }, []);

  // Save favorites to AsyncStorage
  const saveFavorites = async (updated) => {
    try {
      setFavorites(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addToFavorites = async (article) => {
    // Avoid duplicates by title
    const exists = favorites.some((a) => a.title === article.title);
    if (exists) return;
    const updated = [...favorites, article];
    await saveFavorites(updated);
  };

  const removeFromFavorites = async (title) => {
    const updated = favorites.filter((a) => a.title !== title);
    await saveFavorites(updated);
  };

  const isFavorite = (title) => {
    return favorites.some((a) => a.title === title);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, loaded }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
