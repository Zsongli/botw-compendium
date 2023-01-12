import App from "./App.svelte";
import "./style.css";

export default new App({
	target: document.getElementById("app"),
	props: {
		apiBase: "https://botw-compendium.herokuapp.com/api/v2"
	}
});
