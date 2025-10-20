import { ZombiesMap } from "../lib/zombiesMap.ts";
import { allPurgeListener } from "./eventListeners/allPurge.ts";
import {
  purgeZombieListener,
  removeUserListener,
} from "./eventListeners/removeAndPurge.ts";
import { showZombieTweetListener } from "./eventListeners/showZombieTweet.ts";

export function popupEventListener(zombies: ZombiesMap) {
  if (zombies.length === 0) {
    return;
  }

  allPurgeListener();

  showZombieTweetListener(zombies);
  removeUserListener(zombies);
  purgeZombieListener(zombies);
}
