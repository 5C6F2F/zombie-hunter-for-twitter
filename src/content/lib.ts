import { sleep } from "../lib/lib.ts";
import { getUserInfo } from "../lib/user.ts";
import { tweetSelector } from "./consts.ts";

export function click(element: Element) {
  const clickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  element.dispatchEvent(clickEvent);
}

export async function getUserTweet(
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
    return getUserTweet(id, retry + 1);
  }

  return zombieTweet;
}

export async function querySelectorLoop(
  parentElement: ParentNode,
  selector: string
): Promise<Element> {
  let element = parentElement.querySelector(selector);
  while (!element) {
    await sleep(50);
    element = parentElement.querySelector(selector);
  }
  return element;
}
