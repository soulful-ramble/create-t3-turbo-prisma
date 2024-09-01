/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
export const getBaseUrl = () => {
    return `http://${process.env.PLASMO_PUBLIC_HOST_DOMAIN}:3000`;
};
