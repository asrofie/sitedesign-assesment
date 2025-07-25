export const register = async (data: any) => {

    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
    });

};


export const login = async (data: any) => {

    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
    });

};

export const googleLogin = async (data: any) => {

    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/v1/auth/google-login', {
        method: 'POST',
        body: JSON.stringify(data),
    });

};

export const fetchOrgDetails = async (slug: string) => {

    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/organization/details', {
        method: 'POST',
        body: JSON.stringify(slug),
    });

};


//This fn can be either removed or can be executed from the backend.. why verify an email on the frontend? TODO
export const verifyEmail = async (data: {} ) => {
    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/user/email-exists', {
        method: 'POST',
        body: JSON.stringify(data),
    });

};

export const verifySlug = async (data: any) => {
    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/organization/exists', {
        method: 'POST',
        body: JSON.stringify(data),
    });

};

export const fetchSubscriptions = async () => {
    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/subscription/get', {
        method: 'GET',
    });

};

export const fetchCountries = async () => {
    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/countries', {
        method: 'GET',
    });

};

export const fetchUtilities = async (data: any) => {
    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/organization/utilities', {
        method: 'POST',
        body: JSON.stringify(data),
    });

};

export const createOrg = async (data: any) => {
    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/organization/create', {
        method: 'POST',
        body: JSON.stringify(data),
    });

};

export const fetchUser = async (data: any) => {

    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/auth/fetchUser', {
        method: 'POST',
        body: JSON.stringify(data),
    });

};

export const findUser = async (data: any) => {

    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/user/search', {
        method: 'POST',
        body: JSON.stringify(data),
    });

};

export const fetchCurrentEmployeeSchedule = async (data: any) => {
    const {$customFetch} = useNuxtApp();

    return await $customFetch('/api/schedule/employee/schedule-now', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};
