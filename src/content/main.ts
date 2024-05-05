import { ZombiesSet } from "../lib/zombiesSet.ts";
import { zombieViewParam } from "../lib/consts.ts";
import { addHideZombieButtons } from "./hideZombieButtons.ts";
import { hideZombies } from "./hideZombies.ts";

const url = new URL(window.location.href);
const params = url.searchParams;

(async () => {
  const zombies = await new ZombiesSet().loadZombiesFromStorage();

  const remove = params.get(zombieViewParam);
  if (remove) {
    zombies.remove(remove);
  }

  setInterval(() => {
    addHideZombieButtons(zombies);
  }, 500);

  setInterval(() => {
    hideZombies(zombies);
  }, 500);
})();
