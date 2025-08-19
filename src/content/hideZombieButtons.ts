import { sleep } from "../lib/lib.ts";
import { ColorMode, Settings } from "../lib/settings.ts";
import { getUserFromTweet, getUserInfo } from "../lib/user.ts";
import { ZombiesMap } from "../lib/zombiesMap.ts";
import {
  blockButtonSelector,
  confirmBlockButtonSelector,
  dropDownSelector,
  followingKeyWord,
  hideButtonClassName,
  iconPath,
  menuButtonSelector,
  removeMaskStyle,
  tweetSelector,
  zombieTweetSelector,
} from "./consts.ts";
import { hideZombies } from "./hideZombies.ts";
import { click, querySelectorLoop } from "./lib.ts";
import { block } from "./purge/block.ts";

export function addHideZombieButtons(zombies: ZombiesMap, settings: Settings) {
  const tweets = document.querySelectorAll(tweetSelector);

  for (const tweet of tweets) {
    if (tweet.getElementsByClassName(hideButtonClassName).length > 0) {
      continue;
    }

    const hideButtonDom = tweet.querySelector(menuButtonSelector)
      ?.parentElement;

    if (!hideButtonDom) {
      continue;
    }

    // hideButtonがabsoluteなので親のhideButtonDomはrelativeに。
    hideButtonDom.style.position = "relative";

    const hideButton = createButton(zombies, tweet, settings);

    hideButtonDom.prepend(hideButton);
  }
}

function createButton(
  zombies: ZombiesMap,
  tweet: Element,
  settings: Settings,
): HTMLDivElement {
  const hideButton = document.createElement("img");

  setAttribute(hideButton);
  setStyle(hideButton);
  setEventListener(hideButton, zombies, tweet, settings);

  const container = document.createElement("div");
  container.style.display = "flex";

  // ボタンはabsoluteなので左の要素と被らないように幅を確保
  const allocateWidthElement = document.createElement("div");
  allocateWidthElement.style.width = "35px";

  container.appendChild(hideButton);
  container.appendChild(allocateWidthElement);

  return container;
}

function setAttribute(button: HTMLImageElement) {
  button.src = iconPath;
  button.className = hideButtonClassName;
  button.title = "非表示";
}

function setStyle(button: HTMLImageElement) {
  button.style.transform = "translateY(-2px)";
  button.style.borderRadius = "16px";
  button.style.height = "29px";
  button.style.padding = "2px";
  button.style.marginRight = "6px";
  button.style.cursor = "pointer";
  button.style.opacity = "0.60";
  button.style.position = "absolute";
  button.style.right = "16px";
  button.style.top = "-6px";
}

function setEventListener(
  button: HTMLImageElement,
  zombies: ZombiesMap,
  tweet: Element,
  settings: Settings,
) {
  button.addEventListener("mouseover", () => {
    if (settings.getColorMode === ColorMode.Light) {
      button.style.backgroundColor = "#fcdcde";
    } else {
      button.style.backgroundColor = "#f4212f59";
    }
    button.style.transition = "background-color 0.3s";
  });

  button.addEventListener("mouseleave", () => {
    button.style.background = "none";
  });

  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const zombie = getUserFromTweet(tweet);

    if (!zombie) {
      return;
    }

    // フォロー中の人をブロックするとzombiesに追加する前にリロードされてしまうので、
    // 事前に追加したうえでキャンセルした際に削除する。
    zombies.add(zombie);
    await zombies.saveStorage();

    const menuButton = await querySelectorLoop(tweet, menuButtonSelector);
    click(menuButton);

    // フォロー中のユーザーかつ、ブロックをキャンセルした場合、
    // 誤クリックだと判定しリストから削除、ツイートを再表示。
    if ((await isFollowingUser()) && (await cancelToBlockFollowingUser())) {
      zombies.remove(zombie.id);
      await zombies.saveStorage();
      restoreFollowingUserTweet(zombie.id);

      // メニューが残るのでもう一度メニューボタンを押して消す。
      click(menuButton);
      return;
    }

    // ブロック確認画面とその周りのマスクを非表示
    // jsで削除すると間に合わず、画面が点滅するので追加のスタイルを適用する。
    // block関数内で実行しても良いが、まれにスタイル適用が遅れるためここで実行している
    const styleElement = hideConfirmBlockElements();
    styleElement.innerHTML = removeMaskStyle;
    document.head.appendChild(styleElement);

    await block(menuButton);

    if (styleElement) {
      // ブロック確認ダイアログとマスクのスタイルは元に戻しておく。
      styleElement.remove();
    }

    hideZombies(zombies);
  });
}

function hideConfirmBlockElements(): HTMLStyleElement {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = removeMaskStyle;
  document.head.appendChild(styleElement);
  return styleElement;
}

async function isFollowingUser() {
  const dropDown = await querySelectorLoop(document, dropDownSelector);
  return dropDown.textContent?.includes(followingKeyWord);
}

async function cancelToBlockFollowingUser(): Promise<boolean> {
  const blockButton = await querySelectorLoop(document, blockButtonSelector);
  click(blockButton);

  // ブロックボタンを押したら返る前にリロードされてしまう。
  // ブロックボタンが消えたらキャンセルしたとしてtrueを返す。
  while (true) {
    await sleep(50);

    if (!document.querySelector(confirmBlockButtonSelector)) {
      return true;
    }
  }
}

function restoreFollowingUserTweet(restoreId: string) {
  const tweets = document.querySelectorAll(tweetSelector);

  for (const tweet of tweets) {
    const [_, id] = getUserInfo(tweet);
    if (id === restoreId) {
      const zombieTweet = tweet.closest(zombieTweetSelector);

      if (zombieTweet) {
        (zombieTweet as HTMLElement).style.display = "block";
      }
    }
  }
}
