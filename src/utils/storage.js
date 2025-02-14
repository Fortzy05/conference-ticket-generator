

import localforage from "localforage";

export const saveToStorage = async (key, data) => {
  try {
    await localforage.setItem(key, data);
  } catch (error) {
    console.error("Error Saving to Storage:", error);
  }
};

export const getFromStorage = async (key) => {
  try {
    return await localforage.getItem(key); // No need for 'await' here
  } catch (error) {
    console.error("Error Retrieving from Storage:", error);
    return null; // Handle failure case
  }
};
