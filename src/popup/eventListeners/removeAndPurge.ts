import { purgeZombieParam, removeZombieParam } from "../../lib/consts.ts";
import { sleep } from "../../lib/lib.ts";
import { ZombiesMap } from "../../lib/zombiesMap.ts";
import { purgeZombieClassName, removeUserClassName } from "../consts.ts";
import {
  closeTab,
  getZombieElement,
  getZombieId,
  getZombieTweetURL,
  setZombiesNum,
} from "./lib.ts";

// ----- イベントリスナー -----

export function removeUserListener(zombies: ZombiesMap) {
  const elements = document.getElementsByClassName(removeUserClassName);

  for (const element of elements) {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      purgeOrRemove(element, zombies, getRemoveZombieURL);
    });
  }
}

export function purgeZombieListener(zombies: ZombiesMap) {
  const elements = document.getElementsByClassName(purgeZombieClassName);

  for (const element of elements) {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      purgeOrRemove(element, zombies, getPurgeZombieURL);
    });
  }
}

// ----- 以下はcontentへの引き継ぎと終了処理 -----

type GetURLType = (href: string, zombieId: string) => string;

async function purgeOrRemove(
  element: Element,
  zombies: ZombiesMap,
  getURL: GetURLType,
) {
  const zombieElement = getZombieElement(element);
  const zombieId = getZombieId(zombieElement);
  const href = getZombieTweetURL(zombieElement);

  if (!zombieElement || !zombieId || !href) {
    return;
  }

  // removeの場合はremoveZombieUrl()
  // purgeの場合はpurgeZombieUrl()
  const url = getURL(href, zombieId);
  chrome.tabs.create({ url: url });

  // content/main.tsで処理後saveStorage()されたのを確認して処理終了
  let newZombies = await new ZombiesMap().loadZombiesFromStorage();

  // 処理後はnewZombiesのlengthが1減るのでそれまで待機
  while (newZombies.length === zombies.length) {
    await sleep(1000);
    newZombies = await new ZombiesMap().loadZombiesFromStorage();
  }

  closeTab();

  zombies.remove(zombieId);
  zombieElement.remove();
  setZombiesNum(newZombies.length);
}

function getRemoveZombieURL(href: string, zombieId: string): string {
  const url = new URL(href);
  url.searchParams.append(removeZombieParam, zombieId);
  return url.toString();
}

function getPurgeZombieURL(href: string, zombieId: string): string {
  const url = new URL(href);
  url.searchParams.append(purgeZombieParam, zombieId);
  return url.toString();
}
