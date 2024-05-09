import { getUserInfo } from "../../lib/user.ts";
import { caretSelector, tweetSelector } from "../consts.ts";
import { block } from "./block.ts";
import { sleep } from "./lib.ts";
import { reportSpam } from "./report.ts";

export async function purge(id: string) {
  const zombieTweet = await getZombieTweet(id);

  if (!zombieTweet) {
    return;
  }

  let menuButton;
  while (!menuButton) {
    menuButton = zombieTweet.querySelector(caretSelector);
    await sleep(200);
  }

  await reportSpam(menuButton);

  await block(menuButton);
}

async function getZombieTweet(
  id: string,
  retry?: number
): Promise<Element | null> {
  if (!retry) {
    retry = 0;
  } else if (retry >= 10) {
    return null;
  }

  const tweets = document.querySelectorAll(tweetSelector);
  let zombieTweet: Element | undefined;

  for (const tweet of tweets) {
    const [_, tweetId] = getUserInfo(tweet);

    if (tweetId && tweetId == id) {
      zombieTweet = tweet;
      break;
    }
  }

  if (!zombieTweet) {
    await sleep(200);
    return getZombieTweet(id, retry + 1);
  }

  return zombieTweet;
}
