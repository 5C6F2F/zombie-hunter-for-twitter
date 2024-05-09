import { sleep } from "../content/purge/lib.ts";
import { purgeZombieParam } from "../lib/consts.ts";
import { ZombiesMap } from "../lib/zombiesMap.ts";
import {
  zombieClassNameSelector,
  zombieIdClassName,
  tweetURLClassName,
} from "./consts.ts";

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

  const url = new URL(href);
  url.searchParams.append(purgeZombieParam, zombieId);
  chrome.tabs.create({ url: url.toString() });

  // content/main.tsで処理後saveStorage()されたタイミングで処理終了
  let newZombies = await new ZombiesMap().loadZombiesFromStorage();

  while (newZombies.length === zombies.length) {
    await sleep(1000);
    newZombies = await new ZombiesMap().loadZombiesFromStorage();
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab.id) {
      chrome.tabs.remove(tab.id);
    }
  });

  zombies.remove(zombieId);
  zombieElement.remove();
}
