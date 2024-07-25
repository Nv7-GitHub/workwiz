<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData } from "./$types";

    export let data: PageData;

    let createTopicLoading = false;
    let delTopicLoading = new Array(data.topics?.length).fill(false);

    function confirm(e: Event, text: string) {
        if (window.confirm(`Are you sure you want to delete "${text}"?`)) {
            return;
        }
        e.preventDefault();
    }
</script>

<svelte:head>
    <title>New Set - WorkWiz</title>
</svelte:head>

<h1>Topics</h1>
<form
    method="POST"
    class="input-group mb-3"
    use:enhance={() => {
        createTopicLoading = true;

        return async ({ update }) => {
            createTopicLoading = false;
            update();
        };
    }}
>
    <input
        type="text"
        class="form-control"
        placeholder="New topic name..."
        name="name"
    />
    <button
        class="btn btn-success"
        formaction="?/newtopic"
        disabled={createTopicLoading}>Create Topic</button
    >
</form>

<div class="list-group">
    {#each data.topics ?? [] as topic, i}
        <a
            href={`/topic/${topic.id}`}
            type="button"
            class="list-group-item list-group-item-action fs-4"
        >
            {topic.name}

            <div class="btn-group float-end">
                <form
                    method="POST"
                    use:enhance={() => {
                        delTopicLoading[i] = true;

                        return async ({ update }) => {
                            delTopicLoading[i] = false;
                            update();
                        };
                    }}
                >
                    <input type="hidden" name="id" value={topic.id} />
                    <button
                        class="btn btn-danger"
                        type="submit"
                        formaction="?/deltopic"
                        disabled={delTopicLoading[i]}
                        on:click={(e) => {
                            e.stopPropagation();
                            confirm(e, topic.name);
                        }}><i class="bi bi-trash"></i></button
                    >
                </form>
            </div>
        </a>
    {/each}
</div>

{#if data.topics?.length == 0}
    <p>No topics. Create a topic for a subject you teach!</p>
{/if}
