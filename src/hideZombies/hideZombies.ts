import {
  zombieTweetSelector,
  tweetSelector,
  userIdClassName,
} from "../domSelectors.ts";
import { HideZombieIdsSet } from "./hideZombieIdSet.ts";

export const zombieIds = new HideZombieIdsSet<string>();
export const zombieIdsKeyForStorage = "zombieIdsKey";

export function initZombieIds() {
  chrome.storage.local.get(zombieIdsKeyForStorage, (ids) => {
    if (ids[zombieIdsKeyForStorage] != null) {
      zombieIds.fromStorage(ids[zombieIdsKeyForStorage]);
    }
  });
}

export function hideZombies() {
  const tweets = document.querySelectorAll(tweetSelector);

  for (const tweet of tweets) {
    const zombieId =
      tweet.getElementsByClassName(userIdClassName)[0].textContent;

    if (zombieId != null && zombieIds.has(zombieId)) {
      const zombieTweet = tweet.closest(zombieTweetSelector);

      if (zombieTweet != null) {
        (zombieTweet as HTMLElement).style.display = "none";
      }
    }
  }
}
