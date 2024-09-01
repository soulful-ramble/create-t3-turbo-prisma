import { storage } from "wxt/storage"

const key = "local:session_token";
export const getToken = async () => storage.getItem(key);
export const deleteToken = async () => storage.removeItem(key);
export const setToken = async (v: string) => storage.setItem(key, v);
