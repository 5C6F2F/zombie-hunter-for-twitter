import { ZombiesSet } from "../lib/zombie.ts";
import { zombieTweetSelector, tweetSelector } from "./consts.ts";

export function hideZombies(zombies: ZombiesSet) {
  const tweets = document.querySelectorAll(tweetSelector);

  for (const tweet of tweets) {
    const id = tweet.querySelectorAll("a")[2].textContent;

    if (id && zombies.has(id)) {
      const zombieTweet = tweet.closest(zombieTweetSelector);

      if (zombieTweet) {
        (zombieTweet as HTMLElement).style.display = "none";
      }
    }
  }
}
