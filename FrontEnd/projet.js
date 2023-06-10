// Import des fonctions
import { cleanElements } from "./functions/cleanElement.js";
import { filterCreation } from "./functions/filterCreation.js";
import { firstGenerationElements } from "./functions/generationFigureElements.js";
import { clicFilter } from "./functions/clicFilter.js";
import { logout } from "./functions/logout.js";

filterCreation();

cleanElements();

firstGenerationElements();

clicFilter();
