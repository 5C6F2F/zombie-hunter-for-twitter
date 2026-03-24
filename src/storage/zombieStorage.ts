import { noName, zombiesKeyForStorage } from "./consts.ts";
import { Zombie } from "../lib/zombie.ts";
import { separator } from "./consts.ts";

export async function fetchZombiesFromStorage(): Promise<Zombie[]> {
  const result = await chrome.storage.local.get(zombiesKeyForStorage);
  const value = result[zombiesKeyForStorage];

  if (!value) {
    return [];
  }

  return parseStorageValue(value);
}

export async function saveZombiesToStorage(
  zombies: IterableIterator<Zombie>,
): Promise<void> {
  let result = "";
  for (const zombie of zombies) {
    // 名前が記号のみの場合、name.lengthは0になる
    let name = zombie.name;
    if (name.length === 0) {
      name = noName;
    } else if (name === noName) {
      name = "";
    }

    // ツイート本文の中に区切り文字と同じ文字列が含まれている場合、それを空文字列に変換
    let text = zombie.text;
    while (text.includes(separator)) {
      text = text.replace(separator, "");
    }

    result +=
      `${zombie.id}${separator}${zombie.name}${separator}${zombie.text}${separator}${zombie.url}${separator}`;
  }

  await chrome.storage.local.set({
    [zombiesKeyForStorage]: result,
  });
}

function parseStorageValue(value: string): Zombie[] {
  let zombieElements: string[] = [];
  const parsedZombies: Zombie[] = [];

  for (const elem of value.split(separator)) {
    zombieElements.push(elem);

    if (zombieElements.length < 4) {
      continue;
    }

    parsedZombies.push(
      new Zombie(
        zombieElements[0],
        zombieElements[1],
        zombieElements[2],
        zombieElements[3],
      ),
    );

    zombieElements = [];
  }
  return parsedZombies;
}
