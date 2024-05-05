import { ZombiesMap } from "../lib/zombiesMap.ts";
import { zombieViewParam } from "../lib/consts.ts";
import { addHideZombieButtons } from "./hideZombieButtons.ts";
import { hideZombies } from "./hideZombies.ts";
import { revivalUsers } from "./revivalUser.ts";

const url = new URL(window.location.href);
const params = url.searchParams;

(async () => {
  const zombies = await new ZombiesMap().loadZombiesFromStorage();

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

  setInterval(() => {
    revivalUsers(zombies);
  }, 500);
})();
