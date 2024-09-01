/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
export const getBaseUrl = () => {
    return `http://${import.meta.env.VITE_HOST_DOMAIN}:3000`;
};
