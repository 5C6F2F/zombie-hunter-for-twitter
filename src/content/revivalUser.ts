import { getUserInfo } from "../lib/user.ts";
import { ZombiesMap } from "../lib/zombiesMap.ts";
import { tweetSelector, zombieTweetSelector } from "./consts.ts";

const revivalIds = new Set<string>();

export async function revivalUsers(zombies: ZombiesMap) {
  const newZombies = await new ZombiesMap().loadZombiesFromStorage();
  extractReAddedZombies(zombies, newZombies);
  extractRevival(zombies, newZombies);
  enVisible();
}

function extractReAddedZombies(zombies: ZombiesMap, newZombies: ZombiesMap) {
  // 復活した人が再び追加されたのでrevivalIdsとzombiesとnewZombies全てにあるが、revivalIdsからは消す

  for (const zombieId of revivalIds) {
    if (zombies.has(zombieId) && newZombies.has(zombieId)) {
      revivalIds.delete(zombieId);
    }
  }
}

function extractRevival(
  zombies: ZombiesMap,
  newZombies: ZombiesMap
): ZombiesMap | null {
  let result = false;

  // もともとzombiesにはあったが、ポップアップで削除されてnewZombiesにはないものは復活とされる
  for (const zombieId of zombies.ids()) {
    if (!newZombies.has(zombieId)) {
      revivalIds.add(zombieId);
      zombies.remove(zombieId);
      result = true;
    }
  }

  if (result) {
    return newZombies;
  } else {
    return null;
  }
}

function enVisible() {
  const tweets = document.querySelectorAll(tweetSelector);

  for (const tweet of tweets) {
    const [_, id] = getUserInfo(tweet);
    if (id && revivalIds.has(id)) {
      const zombieTweet = tweet.closest(zombieTweetSelector);

      if (zombieTweet) {
        (zombieTweet as HTMLElement).style.display = "block";
      }
    }
  }
}
