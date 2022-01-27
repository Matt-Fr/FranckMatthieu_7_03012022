import { DropdownManager } from "./dropDown.js";
import data from "./data.js";
import { RecipesManager } from "./displayRecipes.js";
import { MainSearchbar } from "./mainSearchbar.js";
import { ButtonListFactory } from "./btnManager.js";

new DropdownManager();

new RecipesManager(data);

new MainSearchbar();

new ButtonListFactory("appliances");
