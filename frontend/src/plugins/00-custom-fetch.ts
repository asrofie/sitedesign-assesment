import {defineNuxtPlugin} from 'nuxt/app';


export default defineNuxtPlugin(async (nuxtApp) => {

    // const authStore = useAuthStore();
    
    const customFetch = async (url: string, options: any = {}) => {
        
        const authExcludedRoutes = [
            '/auth/login',
        ];
        const requiresAuth = !authExcludedRoutes.includes(url);

        const tokenCookie = useCookie<string | null>('auth_token');
        options.method ? options.method.toUpperCase() : 'GET';


        options.headers = {
            ...options.headers,
        };

        if (requiresAuth && tokenCookie.value) {
            options.headers.Authorization = `Bearer ${tokenCookie.value}`;
        }
        
        let response;
        try {
            response = await $fetch(url, options);
        } catch (err: any) {
            console.error("Error!", err)
            response = err.data || {error: 'Network Error'};
        }

        if (response.code === 1302) {
            // await authStore.logout();
        }

        
        return response;
    };

    // Inject into Nuxt app as $secureFetch
    nuxtApp.provide('customFetch', customFetch);
});
