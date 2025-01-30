import { getUserInfo } from "../../lib/user.ts";
import { ZombiesMap } from "../../lib/zombiesMap.ts";
import { tweetSelector, zombieTweetSelector } from "../consts.ts";

const restoreIds = new Set<string>();

export async function restoreUsers(zombies: ZombiesMap) {
  const newZombies = await new ZombiesMap().loadZombiesFromStorage();
  extractReAddedZombies(zombies, newZombies);
  extractRestore(zombies, newZombies);
  enVisible();
}

function extractReAddedZombies(zombies: ZombiesMap, newZombies: ZombiesMap) {
  // 復活した人が再び追加されたのでrestoreIdsとzombiesとnewZombies全てにあるが、restoreIdsからは消す

  for (const zombieId of restoreIds) {
    if (zombies.has(zombieId) && newZombies.has(zombieId)) {
      restoreIds.delete(zombieId);
    }
  }
}

function extractRestore(
  zombies: ZombiesMap,
  newZombies: ZombiesMap
): ZombiesMap | null {
  let result = false;

  // もともとzombiesにはあったが、ポップアップで削除されてnewZombiesにはないものは復活とされる
  for (const zombieId of zombies.ids()) {
    if (!newZombies.has(zombieId)) {
      restoreIds.add(zombieId);
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
    if (id && restoreIds.has(id)) {
      const zombieTweet = tweet.closest(zombieTweetSelector);

      if (zombieTweet) {
        (zombieTweet as HTMLElement).style.display = "block";
      }
    }
  }
}
