<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData } from "./$types";

    export let data: PageData;

    let createSetLoading = false;
    let delSetLoading = new Array(data.topic?.sets.length).fill(false);

    function confirm(e: Event, text: string) {
        if (window.confirm(`Are you sure you want to delete "${text}"?`)) {
            return;
        }
        e.preventDefault();
    }
</script>

<svelte:head>
    <title>{data.topic?.name} - WorkWiz</title>
</svelte:head>

<h1>{data.topic?.name}</h1>

<form
    method="POST"
    class="input-group mb-3"
    use:enhance={() => {
        createSetLoading = true;

        return async ({ update }) => {
            createSetLoading = false;
            update();
        };
    }}
>
    <input
        type="text"
        class="form-control"
        placeholder="New set name..."
        name="name"
    />
    <button
        class="btn btn-success"
        formaction="?/newset"
        disabled={createSetLoading}>Create Set</button
    >
</form>

{#if data.topic?.sets.length == 0}
    <p>No sets found! Try making one.</p>
{:else}
    <div class="list-group">
        {#each data.topic?.expand?.sets as set, i}
            <a
                href={`/set/${set.id}`}
                type="button"
                class="list-group-item list-group-item-action fs-4"
            >
                {set.name}

                <div class="btn-group float-end">
                    <form
                        method="POST"
                        use:enhance={() => {
                            delSetLoading[i] = true;

                            return async ({ update }) => {
                                delSetLoading[i] = false;
                                update();
                            };
                        }}
                    >
                        <input type="hidden" name="id" value={set.id} />
                        <button
                            class="btn btn-danger"
                            type="submit"
                            formaction="?/delset"
                            disabled={delSetLoading[i]}
                            on:click={(e) => {
                                e.stopPropagation();
                                confirm(e, set.name);
                            }}><i class="bi bi-trash"></i></button
                        >
                    </form>
                </div>
            </a>
        {/each}
    </div>
{/if}
