import { User } from "./user.ts";
import { zombiesKeyForStorage } from "../content/consts.ts";
import { separator } from "./consts.ts";
import { Zombie } from "./zombie.ts";

export class ZombiesSet {
  private _ids: Set<string>;
  private _zombies: Zombie[];

  constructor() {
    this._ids = new Set<string>();
    this._zombies = [];
  }

  async loadZombiesFromStorage(): Promise<this> {
    await new Promise<void>((resolve) => {
      chrome.storage.local.get(zombiesKeyForStorage, (ids) => {
        if (ids[zombiesKeyForStorage]) {
          this.parseFromStorage(ids[zombiesKeyForStorage]);
        }
        resolve();
      });
    });

    return this;
  }

  private parseFromStorage(value: string): this {
    let zombieElements: string[] = [];

    for (const elem of value.split(separator)) {
      zombieElements.push(elem);

      if (zombieElements.length === 4) {
        this.add(
          new Zombie(
            zombieElements[0],
            zombieElements[1],
            zombieElements[2],
            zombieElements[3]
          )
        );
        zombieElements = [];
      }
    }
    return this;
  }

  get zombies(): Zombie[] {
    return this._zombies;
  }

  add(zombie: User) {
    this._ids.add(zombie.id);

    let text = zombie.text;

    // ツイート本文の中に区切り文字と同じ文字列が含まれている場合、それを空文字列に変換
    while (text.includes(separator)) {
      text = text.replace(separator, "");
    }

    this._zombies.push(new Zombie(zombie.id, zombie.name, text, zombie.url));
  }

  remove(id: string) {
    this._ids.delete(id);
  }

  has(id: string): boolean {
    return this._ids.has(id);
  }

  // 多分awaitいらない
  saveStorage() {
    chrome.storage.local.set({
      [zombiesKeyForStorage]: this.toStorage(),
    });
  }

  private toStorage(): string {
    let result = "";
    for (const zombie of this._zombies) {
      // ポップアップから削除されている場合は保存しない
      if (this.has(zombie.id)) {
        result += `${zombie.id}${separator}${zombie.name}${separator}${zombie.text}${separator}${zombie.url}${separator}`;
      }
    }
    return result;
  }

  parseToHTML(): HTMLElement | null {
    if (this.zombies.length === 0) {
      return null;
    }

    const html = document.createElement("div");

    // add()では末尾に追加されるので追加順に表示するため逆順にする
    for (let i = this.zombies.length - 1; i >= 0; i--) {
      html.appendChild(this.zombies[i].toHTML());
    }

    return html;
  }
}
