import { ZombiesSet } from "../lib/zombie.ts";
import { zombieViewParam } from "../lib/consts.ts";
import { addHideZombieButtons } from "./hideZombieButtons.ts";
import { hideZombies } from "./hideZombies.ts";

const url = new URL(window.location.href);
const params = url.searchParams;

(async () => {
  const zombies = await new ZombiesSet().loadZombiesFromStorage();

  setInterval(() => {
    addHideZombieButtons(zombies);
  }, 500);

  if (!params.has(zombieViewParam)) {
    setInterval(() => {
      hideZombies(zombies);
    }, 500);
  }
})();
