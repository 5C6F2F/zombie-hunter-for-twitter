import { ZombiesMap } from "../lib/zombiesMap.ts";
import { tweetSelector, zombieTweetSelector } from "./consts.ts";
import { getUserInfo } from "../lib/user.ts";

export function hideZombies(zombies: ZombiesMap) {
  const tweets = document.querySelectorAll(tweetSelector);

  for (const tweet of tweets) {
    const [_, id] = getUserInfo(tweet);

    if (id && zombies.has(id)) {
      const zombieTweet = tweet.closest(zombieTweetSelector);

      if (zombieTweet) {
        (zombieTweet as HTMLElement).style.display = "none";
      }
    }
  }
}
