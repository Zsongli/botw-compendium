<script lang="ts">
	import { onMount } from "svelte";
	import Card from "./Card.svelte";
	import CompendiumDisplayControls from "./CompendiumDisplayControls.svelte";

	export var data: Compendium;
	const entries = [
		...data.creatures.food,
		...data.creatures.non_food,
		...data.equipment,
		...data.materials,
		...data.monsters,
		...data.treasure
	];

	var displayedAmount = 10;
	var searchedEntries = entries;
	var filteredEntries = entries;
	var sortPredicate = (a, b) => a.id - b.id;

	$: displayedEntries = searchedEntries
		.filter((entry) => filteredEntries.includes(entry))
		.sort(sortPredicate)
		.slice(0, displayedAmount);

	function lazyload(node: HTMLDivElement) {
		let lastOf = displayedAmount;
		new IntersectionObserver(([entry])=>{
			if(displayedAmount != lastOf) return;
			if(entry.isIntersecting) displayedAmount += 10;
			console.log(displayedAmount)
		}, {threshold: 0}).observe(node);
	}

	function search(query: string) {
		query = query.toLowerCase().trim();
		if (query === "") searchedEntries = entries;

		if (Number(query) > 0 && entries.length + 1 > Number(query))
			searchedEntries = entries.filter((entry) => entry.id === Number(query));
		else searchedEntries = entries.filter((entry) => entry.name.toLowerCase().includes(query));

		displayedAmount = 10;
	}

	function sort(predicate: (a: CompendiumEntry, b: CompendiumEntry) => number) {
		sortPredicate = predicate;
		displayedAmount = 10;
	}

	function filter(allowedCategories: string[]) {
		filteredEntries = entries.filter((entry) => allowedCategories.includes(entry.category));
		displayedAmount = 10;
	}
</script>

<div class="container">
	<header>
		<CompendiumDisplayControls {search} {sort} {filter} />
	</header>
	<div class="content">
		{#each displayedEntries as entry (entry.id)}
			{#if entry.id === displayedEntries.at(-1).id}
				<div use:lazyload>
					<Card {entry} />
				</div>
			{:else}
				<Card {entry} />
			{/if}
		{:else}
			<h2>😴 There's nothing here</h2>
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 3em;
		width: 100%;
		max-width: 1000px;
		margin: auto;
		background: var(--base-100);
		color: var(--base-content);
		border-radius: var(--box-border-radius);
		padding: 1em;
	}

	.container > .content {
		width: 100%;
		height: fit-content;
		display: flex;
		gap: 1em;
		align-items: center;
		place-content: center;
		flex-wrap: wrap;
		min-height: 800px;
	}
</style>
