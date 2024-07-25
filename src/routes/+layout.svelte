<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>WorkWiz</title>
</svelte:head>

<nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">
            <img
                src="/favicon/favicon.svg"
                alt="Bootstrap"
                width="30"
                height="24"
            />
            WorkWiz
        </a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#dropdown"
            aria-controls="dropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="dropdown">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/about">About</a>
                </li>
                {#if data.user}
                    <li class="nav-item dropdown">
                        <button
                            class="nav-link dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {data.user.username}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            {#if data.teacher}
                                <li>
                                    <a class="dropdown-item" href="/newset"
                                        >New Set</a
                                    >
                                </li>
                            {:else}
                                <li>
                                    <a class="dropdown-item" href="/">TODO</a>
                                </li>
                            {/if}

                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li>
                                <a class="dropdown-item" href="/logout"
                                    >Logout</a
                                >
                            </li>
                        </ul>
                    </li>
                {:else}
                    <li class="nav-item dropdown">
                        <button
                            class="nav-link dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Login
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <a class="dropdown-item" href="/loginteacher"
                                    >Teacher</a
                                >
                            </li>
                            <li>
                                <a class="dropdown-item" href="/loginstudent"
                                    >Student</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <button
                            class="nav-link dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Register
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <a class="dropdown-item" href="/registerteacher"
                                    >Teacher</a
                                >
                            </li>
                            <li>
                                <a class="dropdown-item" href="/registerstudent"
                                    >Student</a
                                >
                            </li>
                        </ul>
                    </li>
                {/if}
            </ul>
        </div>
    </div>
</nav>

<div class="container mt-3 mb-4">
    <slot />
</div>
