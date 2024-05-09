import { ZombiesMap } from "../lib/zombiesMap.ts";
import { purgeZombieParam, zombieViewParam } from "../lib/consts.ts";
import { addHideZombieButtons } from "./hideZombieButtons.ts";
import { hideZombies } from "./hideZombies.ts";
import { revivalUsers } from "./revivalUser.ts";
import { purge } from "./purge/purge.ts";

const url = new URL(window.location.href);
const params = url.searchParams;

(async () => {
  const zombies = await new ZombiesMap().loadZombiesFromStorage();

  const remove = params.get(zombieViewParam);
  if (remove) {
    zombies.remove(remove);
  }

  const zombieId = params.get(purgeZombieParam);
  if (zombieId) {
    await purge(zombieId);
    zombies.saveStorage();
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
