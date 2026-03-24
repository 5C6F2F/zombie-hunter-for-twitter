import { failure, Result, success } from "../lib/result.ts";
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

export type DOMError = "ElementNotFound" | "Timeout";
export async function getUserTweet(
  id: string,
  retry = 0,
): Promise<Result<Element, DOMError>> {
  if (retry >= 10) {
    return failure("Timeout");
  }

  const tweets = document.querySelectorAll(tweetSelector);
  let zombieTweet: Element | undefined;

  for (const tweet of tweets) {
    const [_, tweetId] = getUserInfo(tweet);

    if (tweetId && tweetId === id) {
      zombieTweet = tweet;
      break;
    }
  }

  if (!zombieTweet) {
    await sleep(200);
    return getUserTweet(id, retry + 1);
  }
  return success(zombieTweet);
}

export async function querySelectorLoop(
  parentElement: ParentNode | Document,
  selector: string,
  maxRetries = 20,
): Promise<Result<Element, DOMError>> {
  let count = 0;
  while (count < maxRetries) {
    const element = parentElement.querySelector(selector);
    if (element) {
      return success(element);
    }
    await sleep(50);
    count++;
  }
  return failure("Timeout");
}
