export function getProxyUrl(env: 'development' | 'production') {
    const baseUrls = {
        development: {
            API_BASE_URL: 'http://localhost:5000/api/**',
        },
        production: {
            API_BASE_URL: 'http://localhost:5000/api/**',
        },
    };

    return baseUrls[env];
}
