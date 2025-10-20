import { ZombiesMap } from "../lib/zombiesMap.ts";
import { allPurgeListener } from "./eventListeners/allPurge.ts";
import { importExportListener } from "./eventListeners/importExport.ts";
import {
  purgeZombieListener,
  removeUserListener,
} from "./eventListeners/removeAndPurge.ts";
import { showZombieTweetListener } from "./eventListeners/showZombieTweet.ts";

// 引数がnullのときはzombies以外の要素(openButton, closeButtonなど)を初期化する。
export function popupEventListener(zombies: ZombiesMap) {
  if (zombies.length === 0) {
    return;
  }
  // 以下は対象が1人以上存在するとき

  allPurgeListener();

  showZombieTweetListener(zombies);
  removeUserListener(zombies);
  purgeZombieListener(zombies);
  importExportListener(zombies);
}
