export const load = async ({ locals }) => {
    return {
        user: locals.user,
        teacher: locals.pb?.authStore.model?.collectionName == "teachers",
    };
};