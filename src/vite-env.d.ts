/// <reference types="svelte" />
/// <reference types="vite/client" />

type CompendiumEntryCategory = "creatures" | "equipment" | "materials" | "monsters" | "treasure";

interface CompendiumEntry {
	id: number;
	name: string;
	description: string;
	category: CompendiumEntryCategory;
	image: string;
	common_locations: string[] | null;
}

interface FoodCompendiumEntry extends CompendiumEntry {
	cooking_effect: string;
	hearts_recovered: number;
}

interface FoodCreatureCompendiumEntry extends FoodCompendiumEntry {
	category: "creatures";
}

interface DroppingCompendiumEntry extends CompendiumEntry {
	drops: string[] | null;
}

interface NonFoodCreatureCompendiumEntry extends DroppingCompendiumEntry {
	category: "creatures";
}

interface EquipmentCompendiumEntry extends CompendiumEntry {
	category: "equipment";
	attack: number;
	defense: number;
}

interface ShieldEquipmentCompendiumEntry extends EquipmentCompendiumEntry {
	attack: 0;
}

interface WeaponEquipmentCompendiumEntry extends EquipmentCompendiumEntry {
	defense: 0;
}

interface MaterialCompendiumEntry extends FoodCompendiumEntry {
	category: "materials";
}

interface MonsterCompendiumEntry extends DroppingCompendiumEntry {
	category: "monsters";
}

interface TreasureCompendiumEntry extends DroppingCompendiumEntry {
	category: "treasure";
}

type Compendium = {
	creatures: {
		food: FoodCreatureCompendiumEntry[];
		non_food: NonFoodCreatureCompendiumEntry[];
	};
	equipment: EquipmentCompendiumEntry[];
	materials: MaterialCompendiumEntry[];
	monsters: MonsterCompendiumEntry[];
	treasure: TreasureCompendiumEntry[];
};

type CompendiumAPIResponse = {
	data: Compendium;
};
