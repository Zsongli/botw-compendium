<script lang="ts">
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

	var searchedEntries = entries;
	var filteredEntries = entries;
	var sortPredicate = (a, b) => a.id - b.id;

	$: displayedEntries = searchedEntries
		.filter((entry) => filteredEntries.includes(entry))
		.sort(sortPredicate);

	function search(query: string) {
		query = query.toLowerCase().trim();
		if (query === "") searchedEntries = entries;

		if (Number(query) > 0 && entries.length + 1 > Number(query))
			searchedEntries = entries.filter((entry) => entry.id === Number(query));
		else searchedEntries = entries.filter((entry) => entry.name.toLowerCase().includes(query));
	}

	function sort(predicate: (a: CompendiumEntry, b: CompendiumEntry) => number) {
		sortPredicate = predicate;
	}

	function filter(allowedCategories: string[]) {
		filteredEntries = entries.filter((entry) => allowedCategories.includes(entry.category));
	}
</script>

<div class="container">
	<header>
		<CompendiumDisplayControls {search} {sort} {filter} />
	</header>
	<div class="content">
		{#each displayedEntries as entry (entry.id)}
			<Card {entry} />
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
