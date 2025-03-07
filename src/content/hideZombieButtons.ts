import { sleep } from "../lib/lib.ts";
import { userFromTweet } from "../lib/user.ts";
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
} from "./consts.ts";
import { hideZombies } from "./hideZombies.ts";
import { click, querySelectorLoop } from "./lib.ts";
import { block } from "./purge/block.ts";

export function addHideZombieButtons(zombies: ZombiesMap) {
  const tweets = document.querySelectorAll(tweetSelector);

  for (const tweet of tweets) {
    if (tweet.getElementsByClassName(hideButtonClassName).length > 0) {
      continue;
    }

    const hideButtonDom =
      tweet.querySelector(menuButtonSelector)?.parentElement;

    if (!hideButtonDom) {
      continue;
    }

    // hideButtonがabsoluteなので親のhideButtonDomはrelativeに。
    hideButtonDom.style.position = "relative";

    const hideButton = createButton(zombies, tweet);

    hideButtonDom.prepend(hideButton);
  }
}

function createButton(zombies: ZombiesMap, tweet: Element): HTMLDivElement {
  const hideButton = document.createElement("img");

  setAttribute(hideButton);
  setStyle(hideButton);
  setEventListener(hideButton, zombies, tweet);

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
  tweet: Element
) {
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#fcdcde";
    button.style.transition = "background-color 0.3s";
  });

  button.addEventListener("mouseleave", () => {
    button.style.background = "none";
  });

  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const zombie = userFromTweet(tweet);

    if (!zombie) {
      return;
    }

    // フォロー中の人をブロックするとzombiesに追加する前にリロードされてしまうので、
    // 事前に追加したうえでキャンセルした際に削除する。
    zombies.add(zombie);
    await zombies.saveStorage();

    if ((await isFollowingUser()) && (await cancelToBlockFollowingUser())) {
      zombies.remove(zombie.id);
      await zombies.saveStorage();
      return;
    }

    // ブロック確認画面とその周りのマスクを非表示
    // jsで削除すると間に合わず、画面が点滅するので追加のスタイルを適用する。
    // block関数内で実行しても良いが、まれにスタイル適用が遅れるためここで実行している
    const styleElement = hideConfirmBlockElements();
    styleElement.innerHTML = removeMaskStyle;
    document.head.appendChild(styleElement);

    const menuButton = await querySelectorLoop(tweet, menuButtonSelector);
    click(menuButton);

    block(menuButton, styleElement);
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
