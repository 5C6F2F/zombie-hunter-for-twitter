import { User } from "./user.ts";
import { zombiesKeyForStorage } from "../lib/consts.ts";
import { separator } from "./consts.ts";
import { Zombie } from "./zombie.ts";

export class ZombiesMap {
  private _zombies: Map<string, Zombie>;

  constructor() {
    this._zombies = new Map();
  }

  async loadZombiesFromStorage(): Promise<this> {
    const ids = await chrome.storage.local.get(zombiesKeyForStorage);
    if (ids[zombiesKeyForStorage]) {
      this.parseFromStorage(ids[zombiesKeyForStorage]);
    }
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
            zombieElements[3],
          ),
        );
        zombieElements = [];
      }
    }
    return this;
  }

  get length(): number {
    return this._zombies.size;
  }

  ids(): IterableIterator<string> {
    return this._zombies.keys();
  }

  add(zombie: User) {
    let text = zombie.text;

    // ツイート本文の中に区切り文字と同じ文字列が含まれている場合、それを空文字列に変換
    while (text.includes(separator)) {
      text = text.replace(separator, "");
    }

    this._zombies.set(
      zombie.id,
      new Zombie(zombie.id, zombie.name, text, zombie.url),
    );
  }

  remove(id: string) {
    this._zombies.delete(id);
  }

  has(id: string): boolean {
    return this._zombies.has(id);
  }

  get(id: string): Zombie | undefined {
    return this._zombies.get(id);
  }

  async saveStorage() {
    await chrome.storage.local.set({
      [zombiesKeyForStorage]: this.toStorage(),
    });
  }

  private toStorage(): string {
    let result = "";
    for (const [_, zombie] of this._zombies) {
      result +=
        `${zombie.id}${separator}${zombie.name}${separator}${zombie.text}${separator}${zombie.url}${separator}`;
    }
    return result;
  }

  parseToHTML(): HTMLElement | null {
    if (this.length === 0) {
      return null;
    }

    const html = document.createElement("div");

    // add()では末尾に追加されるので追加順に表示するため逆順にする
    for (const [_, zombie] of [...this._zombies].reverse()) {
      html.appendChild(zombie.toHTML());
    }

    return html;
  }

  getExportData(): string {
    const data = Array.from(this._zombies.values()).map((zombie) => ({
      id: zombie.id,
      name: zombie.name,
      text: zombie.text,
      url: zombie.url,
    }));
    return JSON.stringify(data, null, 2);
  }

  importData(jsonString: string): boolean {
    let data: Zombie[];
    try {
      data = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to import data:", e);
      alert("インポートに失敗しました。ファイルの形式が正しくありません。");
      return false;
    }

    for (const item of data) {
      // 既に存在するIDは無視し、新しいデータのみ追加する
      if (item.id && !this.has(item.id)) {
        this.add(new Zombie(item.id, item.name, item.text, item.url));
      }
    }

    return true;
  }
}

// import { User } from "./user.ts";
// import { zombiesKeyForStorage } from "../lib/consts.ts";
// import { separator } from "./consts.ts";
// import { Zombie } from "./zombie.ts";

// export class ZombiesMap {
//   private _zombies: Map<string, Zombie>;

//   constructor() {
//     this._zombies = new Map();
//   }

//   async loadZombiesFromStorage(): Promise<this> {
//     const ids = await chrome.storage.local.get(zombiesKeyForStorage);
//     if (ids[zombiesKeyForStorage]) {
//       this.parseFromStorage(ids[zombiesKeyForStorage]);
//     }
//     return this;
//   }

//   // private parseFromStorage(value: string): this {
//   //   let zombieElements: string[] = [];

//   //   for (const elem of value.split(separator)) {
//   //     zombieElements.push(elem);

//   //     if (zombieElements.length === 4) {
//   //       this.add(
//   //         new Zombie(
//   //           zombieElements[0],
//   //           zombieElements[1],
//   //           zombieElements[2],
//   //           zombieElements[3],
//   //         ),
//   //       );
//   //       zombieElements = [];
//   //     }
//   //   }
//   //   return this;
//   // }

//   private parseFromStorage(value: string): this {
//     const parsedArray: [string, Zombie][] = JSON.parse(value);

//     for (const [_, zombie] of parsedArray) {
//       this.add(zombie);
//     }
//     return this;
//   }

//   get length(): number {
//     return this._zombies.size;
//   }

//   ids(): IterableIterator<string> {
//     return this._zombies.keys();
//   }

//   add(zombie: User) {
//     this._zombies.set(
//       zombie.id,
//       new Zombie(zombie.id, zombie.name, zombie.text, zombie.url),
//     );
//   }

//   remove(id: string) {
//     this._zombies.delete(id);
//   }

//   has(id: string): boolean {
//     return this._zombies.has(id);
//   }

//   get(id: string): Zombie | undefined {
//     return this._zombies.get(id);
//   }

//   async saveStorage() {
//     await chrome.storage.local.set({
//       [zombiesKeyForStorage]: this.toStorage(),
//     });
//   }

//   private toStorage(): string {
//     return JSON.stringify(Object.fromEntries(this._zombies));
//   }

//   parseToHTML(): HTMLElement | null {
//     if (this.length === 0) {
//       return null;
//     }

//     const html = document.createElement("div");

//     // add()では末尾に追加されるので追加順に表示するため逆順にする
//     for (const [_, zombie] of [...this._zombies].reverse()) {
//       html.appendChild(zombie.toHTML());
//     }

//     return html;
//   }
// }
