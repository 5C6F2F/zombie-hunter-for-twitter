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
  zombieElement: Element | null | undefined
): string | null | undefined {
  const zombieId =
    zombieElement?.getElementsByClassName(zombieIdClassName)[0].textContent;
  return zombieId;
}

export function getZombieTweetURL(
  zombieElement: Element | null | undefined
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
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs.at(0)?.id;
    if (tab) {
      chrome.tabs.remove(tab);
    } else {
      await sleep(500);
      closeTab();
    }
  });
}
