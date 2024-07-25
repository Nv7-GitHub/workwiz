export async function load({ locals }) {
    if (locals.teacher != true) {
        return {
            status: 403,
            error: new Error("You are not a teacher")
        }
    }

    let topics = await locals.pb?.collection("topics").getFullList({
        filter: `teacher="${locals.user?.id}"`
    })

    return {
        topics,
    }
}

export const actions = {
    newtopic: async ({ locals, request }) => {
        const data = await request.formData();
        const name = data.get("name") as string;
        await locals.pb?.collection("topics").create({
            name,
            teacher: locals.user?.id,
        })
        return { success: true };
    },
    deltopic: async ({ locals, request }) => {
        const data = await request.formData();
        const id = data.get("id") as string;
        await locals.pb?.collection("topics").delete(id);
        return { success: true };
    }
}