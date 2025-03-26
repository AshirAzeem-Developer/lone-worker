// storageService.ts - Provides secure storage get/set/remove functions
import EncryptedStorage from 'react-native-encrypted-storage';

// Save a value securely under a given key
export async function setSecureItem(key: string, value: string): Promise<void> {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (error) {
    console.error('Failed to save item in secure storage:', error);
  }
}

// Retrieve a value by key from secure storage
export async function getSecureItem(key: string): Promise<string | null> {
  try {
    const value = await EncryptedStorage.getItem(key);
    return value ?? null; // Return the value if found, otherwise null
  } catch (error) {
    console.error('Failed to retrieve item from secure storage:', error);
    return null;
  }
}

// Remove a specific item from secure storage
export async function removeSecureItem(key: string): Promise<void> {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove item from secure storage:', error);
  }
}

// Clear all data from secure storage (use with caution)
export async function clearSecureStorage(): Promise<void> {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    console.error('Failed to clear secure storage:', error);
  }
}
