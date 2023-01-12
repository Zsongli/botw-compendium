<script lang="ts">
	import { onMount } from "svelte";
	import SvgIcon from "./SvgIcon.svelte";

	export var filter: (allowedCategories: string[]) => void;
	export var search: (query: string) => void;
	export var sort: (predicate: (a: any, b: any) => number) => void;

	var ascendingSort = true;
	const sortPredicates = {
		id: {
			asc: (a, b) => a.id - b.id,
			desc: (a, b) => b.id - a.id
		},
		name: {
			asc: (a, b) => a.name.localeCompare(b.name),
			desc: (a, b) => b.name.localeCompare(a.name)
		}
	};

	var allowedCategories = {
		creatures: true,
		equipment: true,
		materials: true,
		monsters: true,
		treasure: true
	};

	var sortBySelect: HTMLSelectElement;

	function getSelectWidth(parent, text) {
		const select = document.createElement("select");
		select.innerHTML = `<option name="dummy">${text}</option>`;
		select.style.visibility = "hidden";
		select.style.fontSize = "inherit";
		select.style.fontFamily = "inherit";
		select.style.appearance = "none";
		parent.appendChild(select);
		const width = select.clientWidth;
		parent.removeChild(select);
		return width;
	}

	function updateSelectWidth() {
		sortBySelect.style.width = `${getSelectWidth(
			sortBySelect.parentElement,
			sortBySelect.selectedOptions[0].innerText
		)}px`;
	}

	onMount(() => updateSelectWidth());
</script>

<div class="controls">
	<div class="search icon-box">
		<SvgIcon src="/icons/search.svg" />
		<input
			type="text"
			placeholder="Search for name or id..."
			id="search"
			on:input={(e) => search(e.target["value"])}
		/>
	</div>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div class="filter icon-box" tabindex="0">
		<SvgIcon src="/icons/filter.svg" />
		Filters
		<div class="options">
			<div class="option">
				<span>Creatures</span>
				<input
					class="checkbox"
					name="creatures"
					type="checkbox"
					bind:checked={allowedCategories.creatures}
					on:change={() =>
						filter(Object.keys(allowedCategories).filter((key) => allowedCategories[key]))}
				/>
			</div>
			<div class="option">
				<span>Monsters</span>
				<input
					class="checkbox"
					name="monsters"
					type="checkbox"
					bind:checked={allowedCategories.monsters}
					on:change={() =>
						filter(Object.keys(allowedCategories).filter((key) => allowedCategories[key]))}
				/>
			</div>
			<div class="option">
				<span>Materials</span>
				<input
					class="checkbox"
					name="materials"
					type="checkbox"
					bind:checked={allowedCategories.materials}
					on:change={() =>
						filter(Object.keys(allowedCategories).filter((key) => allowedCategories[key]))}
				/>
			</div>
			<div class="option">
				<span>Equipment</span>
				<input
					class="checkbox"
					name="equipment"
					type="checkbox"
					bind:checked={allowedCategories.equipment}
					on:change={() =>
						filter(Object.keys(allowedCategories).filter((key) => allowedCategories[key]))}
				/>
			</div>
			<div class="option">
				<span>Treasure</span>
				<input
					class="checkbox"
					name="treasure"
					type="checkbox"
					bind:checked={allowedCategories.treasure}
					on:change={() =>
						filter(Object.keys(allowedCategories).filter((key) => allowedCategories[key]))}
				/>
			</div>
		</div>
	</div>
	<div class="sort icon-box">
		<SvgIcon src="/icons/sort.svg" />
		Sort by
		<select
			bind:this={sortBySelect}
			on:change={() => {
				updateSelectWidth();
				sort(sortPredicates[sortBySelect.value][ascendingSort ? "asc" : "desc"]);
			}}
		>
			<option value="id">id</option>
			<option value="name">alphabetical order</option>
		</select>
        <div>
            <input
                type="checkbox"
                bind:checked={ascendingSort}
                on:change={() => sort(sortPredicates[sortBySelect.value][ascendingSort ? "asc" : "desc"])}
            >
            {#if ascendingSort}
                <SvgIcon src="/icons/asc.svg" />
            {:else}
                <SvgIcon src="/icons/desc.svg" />
            {/if}
        </div>
	</div>
</div>

<style>
	.controls {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 2em;
		padding-left: 1em;
        flex-wrap: wrap;
	}

	.icon-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1em;
		outline-color: var(--border);
		outline-style: solid;
		outline-width: 1px;
		padding: 0.5em 0.75em 0.5em 0.75em;
		border-radius: var(--box-border-radius);
	}

	.icon-box > * {
		transition: all 0.2s ease-in-out;
	}

	.icon-box > :global(svg) {
		width: 1.25em;
		height: 1.25em;
	}

	.search {
		width: 12.5em;
		padding-right: 0.25em;
	}

	.search > :global(svg) {
		fill: none;
		stroke: var(--neutral-content);
		stroke-width: 48;
	}

	.search > input {
		border: none;
		width: 100%;
		height: 100%;
		background: transparent;
		color: var(--base-content);
		font-family: inherit;
	}

	.search > input::placeholder {
		color: var(--base-content-disabled);
	}

	.search > input:focus {
		outline: none;
	}

	.search:has(input:focus) {
		outline-width: 2px;
		background: var(--base-100);
	}

	.search:has(input:focus) > :global(svg) {
		stroke: var(--primary);
	}

	.filter {
		position: relative;
		user-select: none;
		cursor: pointer;
	}

	.filter:focus,
	.filter:has(input[type="checkbox"]:active),
	.filter:has(input[type="checkbox"]:focus) {
		outline-width: 2px;
	}

	.filter > :global(svg) {
		fill: var(--base-content);
	}

	.filter:hover > :global(svg),
	.filter:focus > :global(svg) {
		fill: var(--primary);
	}

	.filter > .options {
		display: none;
		position: absolute;
		z-index: 1;
		top: 80%;
		left: 50%;
		translate: -50% 0;
		background: var(--base-100);
		border-radius: var(--box-border-radius);
		border: 1px solid var(--border);
		padding: 0.75em;
		cursor: default;
	}

	.filter > .options > .option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5em;
		padding-block: 0.25em;
		font-size: 0.75em;
	}

	.filter:focus > .options,
	.filter:has(input[type="checkbox"]:active) > .options,
	.filter:has(input[type="checkbox"]:focus) > .options {
		display: block;
	}

	.sort {
		gap: 0.35em;
	}

	.sort > select {
		appearance: none;
		background: transparent;
		border: none;
		color: var(--base-content);
		font-family: inherit;
		font-size: inherit;
		text-decoration: underline;
	}

	.sort > select:focus {
		outline: none;
	}

	.sort > select option {
		background: var(--base-100);
		color: var(--base-content);
	}

	.sort > :global(svg) {
		fill: var(--base-content);
	}

    .sort > div{
        position: relative;
        display: flex;
        align-items: center;
    }

    .sort > div > input[type="checkbox"] {
        margin: 0;
        opacity: 0;
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .sort > div > :global(svg) {
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1.5;
    }

    .sort > div:has(input[type="checkbox"]:hover) > :global(svg) {
        stroke: var(--primary);
    }
</style>
