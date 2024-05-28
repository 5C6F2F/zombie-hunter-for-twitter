import { sleep } from "../../content/purge/lib.ts";
import { purgeZombieParam } from "../../lib/consts.ts";
import { ZombiesMap } from "../../lib/zombiesMap.ts";
import {
  zombieClassNameSelector,
  zombieIdClassName,
  tweetURLClassName,
  purgeZombieClassName,
} from "../consts.ts";

export function purgeZombieListener(zombies: ZombiesMap) {
  const elements = document.getElementsByClassName(purgeZombieClassName);
  for (const element of elements) {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      purgePre(element, zombies);
    });
  }
}

export async function purgePre(element: Element, zombies: ZombiesMap) {
  const zombieElement = element.closest(zombieClassNameSelector);
  const zombieId =
    zombieElement?.getElementsByClassName(zombieIdClassName)[0].textContent;

  const href = zombieElement
    ?.getElementsByClassName(tweetURLClassName)[0]
    ?.getAttribute("href");

  if (!(zombieId && href)) {
    return;
  }

  const url = purgeZombieURL(href, zombieId);
  chrome.tabs.create({ url: url.toString() });

  // content/main.tsで処理後saveStorage()されたのを確認して処理終了
  let newZombies = await new ZombiesMap().loadZombiesFromStorage();

  // 処理後はnewZombiesのlengthが1減る
  while (newZombies.length === zombies.length) {
    await sleep(1000);
    newZombies = await new ZombiesMap().loadZombiesFromStorage();
  }

  closeTab();

  zombies.remove(zombieId);
  zombieElement.remove();
}

function purgeZombieURL(href: string, zombieId: string): string {
  const url = new URL(href);
  url.searchParams.append(purgeZombieParam, zombieId);
  return url.toString();
}

function closeTab() {
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
