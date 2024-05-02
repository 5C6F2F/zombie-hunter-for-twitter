import { ZombiesSet } from "../lib/zombie.ts";
import { addHideZombieButtons } from "./hideZombieButtons.ts";
import { hideZombies } from "./hideZombies.ts";

(async () => {
  const zombies = await new ZombiesSet().loadZombiesFromStorage();

  setInterval(() => {
    addHideZombieButtons(zombies);
  }, 500);

  setInterval(() => {
    hideZombies(zombies);
  }, 500);
})();
