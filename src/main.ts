import { addHideButtons } from "./addHideButtons.ts";
import { hideZombies, initZombieIds } from "./hideZombies/hideZombies.ts";

initZombieIds();

setInterval(addHideButtons, 500);
setInterval(hideZombies, 500);
