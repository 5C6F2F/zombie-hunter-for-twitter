import { ZombiesMap } from "../lib/zombiesMap.ts";
import {
  allPurgeParam,
  purgeZombieParam,
  zombieViewParam,
} from "../lib/consts.ts";
import { addHideZombieButtons } from "./hideZombieButtons.ts";
import { hideZombies } from "./hideZombies.ts";
import { revivalUsers } from "./revivalUser.ts";
import { purge } from "./purge/purge.ts";
import { timeLineSelector } from "./consts.ts";
import { sleep } from "./purge/lib.ts";

const url = new URL(window.location.href);
const params = url.searchParams;

(async () => {
  const zombies = await new ZombiesMap().loadZombiesFromStorage();
  await waitWhileTimeLineShown();

  const removeZombieId = params.get(zombieViewParam);
  if (removeZombieId) {
    zombies.remove(removeZombieId);
  }

  // 必ずallPurgeより先に判定する
  const purgeZombieId = params.get(purgeZombieParam);
  if (purgeZombieId) {
    await purge(purgeZombieId);
    zombies.remove(purgeZombieId);
    await zombies.saveStorage();
  }

  const allPurge = params.get(allPurgeParam);
  if (allPurge) {
    const nextTarget = zombies.ids().next();

    if (nextTarget.done === false) {
      const nextUrlStr = zombies.get(nextTarget.value)?.url;

      if (nextUrlStr) {
        const nextUrl = new URL(nextUrlStr);
        nextUrl.searchParams.append(purgeZombieParam, nextTarget.value);
        nextUrl.searchParams.append(allPurgeParam, "true"); // 値は空白以外なら何でも良い
        globalThis.location.href = nextUrl.toString();
      }
    }
  }

  setInterval(() => {
    addHideZombieButtons(zombies);
  }, 500);

  setInterval(() => {
    hideZombies(zombies);
  }, 50);

  setInterval(() => {
    revivalUsers(zombies);
  }, 500);
})();

// 繰り返しのアクセスによってロードが停止されることがあるのでその場合は待機
// 該当ツイートが消されている場合もあるのでタイムラインを対象とした
async function waitWhileTimeLineShown() {
  let count = 0;
  while (!document.querySelector(timeLineSelector)) {
    await sleep(200);
    count += 1;

    // 20秒以上止まっている場合、リロードして再アクセスを試みる
    if (count > 100) {
      globalThis.location.reload();
    }
  }
}
