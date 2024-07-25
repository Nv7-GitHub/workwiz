export const load = async ({ locals }) => {
    return {
        user: locals.user,
        teacher: locals.teacher,
    };
};