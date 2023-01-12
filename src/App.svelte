<script lang="ts">
  import CompendiumDisplay from "./lib/components/CompendiumDisplay.svelte";
  import SvgIcon from "./lib/components/SvgIcon.svelte";

  export var apiBase: string;

  const fetchPromise: Promise<CompendiumAPIResponse> = fetch(
    `${apiBase}/all`
  ).then((res) => res.json());
</script>

<header>
  <h1>The Legend of Zelda: Breath of the Wild Compendium</h1>
</header>
<main>
  {#await fetchPromise}
    <center><SvgIcon src="/icons/spinner.svg" /></center>
  {:then data}
    <CompendiumDisplay data={data.data} />
  {/await}
</main>
<footer>
  <strong>2022 - SZENT LÁSZLÓ GIMNÁZIUM</strong>
  <i
    >All assets used belong to their rightful creators, the site's creator does
    not claim ownership over any of them.</i
  >
</footer>

<style>
  header,
  main,
  footer {
    backdrop-filter: blur(3px) sepia(0.5);
  }

  header,
  footer {
    background-color: var(--neutral);
    color: var(--neutral-content);
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header {
    border-bottom: 2px solid var(--border);
    min-height: 4em;
  }

  header > h1 {
    text-transform: uppercase;
    font-weight: 900;
    margin: auto;
    text-align: center;
    text-shadow: -2px -1px var(--primary);
  }

  main {
    flex-grow: 1;
  }

  footer {
    border-top: 2px solid var(--border);
    min-height: 2em;
  }

  footer > i {
    font-size: 0.8em;
    color: var(--neutral-content-disabled);
  }

  center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
