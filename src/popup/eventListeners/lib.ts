import { purgeZombieParam, removeZombieParam } from "../../lib/consts.ts";
import { sleep } from "../../lib/lib.ts";
import {
  tweetURLClassName,
  zombieClassNameSelector,
  zombieIdClassName,
  zombiesNumId,
} from "../consts.ts";

export function hide(element: HTMLElement) {
  element.style.display = "none";
}

export function showFlex(element: HTMLElement) {
  element.style.display = "flex";
}

export function showBlock(element: HTMLElement) {
  element.style.display = "block";
}

export function getZombieElement(element: Element): Element | null {
  return element.closest(zombieClassNameSelector);
}

export function getZombieId(
  zombieElement: Element | null | undefined,
): string | null | undefined {
  const zombieId = zombieElement?.getElementsByClassName(zombieIdClassName)[0]
    .textContent;
  return zombieId;
}

export function getZombieTweetURL(
  zombieElement: Element | null | undefined,
): string | null | undefined {
  const href = zombieElement
    ?.getElementsByClassName(tweetURLClassName)[0]
    ?.getAttribute("href");
  return href;
}

export function setZombiesNum(num: number) {
  const zombiesNum = document.getElementById(zombiesNumId);
  if (zombiesNum) {
    zombiesNum.textContent = num.toString();
  }
}

export function closeTab() {
  chrome.tabs.query({}, async (tabs) => {
    for (const tab of tabs) {
      if (tab.url === undefined || tab.id === undefined) {
        continue;
      }

      const params = new URL(tab.url).searchParams;

      if (params.get(removeZombieParam) || params.get(purgeZombieParam)) {
        chrome.tabs.remove(tab.id);
        return;
      }
    }

    await sleep(500);
    closeTab();
  });
}
