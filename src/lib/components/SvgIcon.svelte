<script lang="ts">
	export var src: string;
</script>

{#await fetch(src).then((res) => res.text())}
	...
{:then data}
	{#if data?.startsWith("<svg")}
		{@html data}
	{/if}
{/await}
