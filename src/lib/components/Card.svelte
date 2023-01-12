<script lang="ts">
	import CardStatsDisplay from "./CardStatsDisplay.svelte";

	export var entry: CompendiumEntry;

	const capitalize = (str: string) => (str ? `${str?.[0].toUpperCase()}${str?.slice(1)}` : str);

	const { id, description, image, name, category, ...stats } = entry;

	const getStatDisplayString: Record<string, (value: any) => string> = {
		common_locations: (commonLocations) => commonLocations?.join(", "),
		cooking_effect: (cookingEffect) => cookingEffect?.split(" ").map(capitalize).join(" "),
		drops: (drops) => drops?.map((drop) => drop.split(" ").map(capitalize).join(" ")).join(", ")
	};
</script>

<div class="card">
	<span class="badge">{id}</span>
	<header>
		<img src={image} alt={name} />
		<div>
			<h3>{name.split(" ").map(capitalize).join(" ")}</h3>
			<p>{description}</p>
		</div>
	</header>
	<CardStatsDisplay
		stats={Object.fromEntries(
			Object.entries(stats).map(([key, value]) => [
				key.split("_").map(capitalize).join(" "),
				getStatDisplayString[key]?.(value) ?? value
			])
		)}
		{category}
	/>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1.5em;
		width: 450px;
		min-height: 250px;
		background: var(--base-200);
		border-radius: var(--box-border-radius);
		padding: 1em;
		position: relative;
	}

	.card > header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2em;
	}

	.card > header > img {
		aspect-ratio: 1/1;
		width: 8em;
		border-radius: 9999px;
		object-fit: contain;
	}

	.card > header > div {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.card > header > div > h3 {
		margin: 0;
		font-weight: 600;
	}

	.card > header > div > p {
		margin: 0;
		font-size: 0.8em;
		color: var(--base-content-disabled);
	}

	.card .badge {
		color: var(--content);
		position: absolute;
		font-size: 0.66em;
		top: 1em;
		right: 1em;
	}
</style>
