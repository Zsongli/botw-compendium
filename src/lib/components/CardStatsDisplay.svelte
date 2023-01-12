<script lang="ts">
	export var stats: Record<string, any>;
	export var category: CompendiumEntryCategory;

	const iconUrls = {
		"Common Locations": {
			default: "/icons/stats/common-locations.png"
		},
		"Cooking Effect": {
			default: "/icons/stats/cooking-effect.png"
		},
		"Hearts Recovered": {
			default: "/icons/stats/hearts-recovered.png"
		},
		Drops: {
			default: "/icons/stats/drops-treasure.png",
			treasure: "/icons/stats/drops-treasure.png",
			monsters: "/icons/stats/drops-monsters.png",
			creatures: "/icons/stats/drops-creatures.png"
		},
		Attack: {
			default: "/icons/stats/attack.png"
		},
		Defense: {
			default: "/icons/stats/defense.png"
		}
	};
</script>

<div class="stats-container">
	{#each Object.entries(stats).filter(([, value]) => !!value) as [key, value]}
		<div class="stat">
			<div class="key" title={key}>
				<img src={iconUrls[key]?.[category] ?? iconUrls[key]?.default} alt={key} />
			</div>
			<div class="value">{value}</div>
		</div>
	{:else}
		<i>(no data available)</i>
	{/each}
</div>

<style>
	.stats-container {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		column-gap: 1em;
	}

	.stats-container > i {
		margin: auto;
		color: var(--base-content-disabled);
		font-size: 0.6em;
	}

	.stats-container > .stat {
		display: grid;
		max-width: calc(50% - 1em);
		grid-template-columns: 1fr 3.5fr;
		height: 3em;
	}

	.stats-container > .stat > .key {
		display: flex;
		align-items: center;
		place-content: center;
		height: 100%;
	}

	.stats-container > .stat > .value {
		max-height: 100%;
		display: flex;
		align-items: center;
		padding: 0 1em;
		border-left: 2px solid var(--border);
		overflow-x: scroll;
		overflow-y: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.stats-container > .stat > .value::-webkit-scrollbar {
		height: 4px;
		width: 4px;
	}

	.stats-container > .stat > .value::-webkit-scrollbar-thumb {
		background: var(--primary);
	}

	.stats-container > .stat > .key > img {
		display: block;
		width: 66.6666%;
		height: 66.6666%;
		object-fit: contain;
	}
</style>
