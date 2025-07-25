export const login = async (data: any) => {

    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
    });

};