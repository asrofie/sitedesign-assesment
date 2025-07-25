export const fetchUsers = async () => {
    const {$customFetch} = useNuxtApp();
    return await $customFetch('/api/admin/user', {
        method: 'GET',
    });
};

export const deleteUser = async (data: any) => {
    const {$customFetch} = useNuxtApp();
    return await $customFetch('/api/admin/user/delete-user', {
        method: 'POST',
        body: JSON.stringify(data)
    });
};
export const updateUser = async (data: any) => {
    const {$customFetch} = useNuxtApp();
    return await $customFetch('/api/admin/user', {
        method: 'PUT',
        body: JSON.stringify(data)
    });
};
export const addUser = async (data: any) => {
    const {$customFetch} = useNuxtApp();
    return await $customFetch('/api/admin/user', {
        method: 'POST',
        body: JSON.stringify(data)
    });
};