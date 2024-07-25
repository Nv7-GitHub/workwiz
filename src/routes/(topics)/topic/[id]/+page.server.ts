export async function load({ locals, params }) {
    if (locals.teacher != true) {
        return {
            status: 403,
            error: new Error("You are not a teacher")
        }
    }

    let topic = await locals.pb?.collection("topics").getOne(params.id, {
        expand: "sets",
    });

    return {
        topic,
    }
}


export const actions = {
    newset: async ({ locals, request, params }) => {
        const data = await request.formData();
        const name = data.get("name") as string;
        const set = await locals.pb?.collection("sets").create({
            name,
            teacher: locals.user?.id,
            topic: params.id,
        })
        await locals.pb?.collection("topics").update(params.id, {
            "sets+": set?.id,
        });
        return { success: true };
    },
    delset: async ({ locals, request }) => {
        const data = await request.formData();
        const id = data.get("id") as string;
        await locals.pb?.collection("sets").delete(id);
        return { success: true };
    }
}
