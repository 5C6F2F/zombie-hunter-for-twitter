import { zombiesKeyForStorage } from "./consts.ts";
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
