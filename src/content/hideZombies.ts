import { ZombiesSet } from "../lib/zombiesSet.ts";
import { zombieTweetSelector, tweetSelector } from "./consts.ts";
import { getUserInfo } from "../lib/user.ts";

export function hideZombies(zombies: ZombiesSet) {
  const tweets = document.querySelectorAll(tweetSelector);

  for (const tweet of tweets) {
    const [, id] = getUserInfo(tweet);

    if (id && zombies.has(id)) {
      const zombieTweet = tweet.closest(zombieTweetSelector);

      if (zombieTweet) {
        (zombieTweet as HTMLElement).style.display = "none";
      }
    }
  }
}
