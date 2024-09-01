import { Storage } from "@plasmohq/storage"

const storage = new Storage()
const key = "session_token";
export const getToken = async () => storage.get(key);
export const deleteToken = async () => storage.remove(key);
export const setToken = async (v: string) => storage.set(key, v);
