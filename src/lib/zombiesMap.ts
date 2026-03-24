import { User } from "./user.ts";
import { Zombie } from "./zombie.ts";

export class ZombiesMap {
  private _zombies: Map<string, Zombie>;

  constructor(initialZombies: Zombie[]) {
    this._zombies = new Map();
    for (const zombie of initialZombies) {
      this._zombies.set(zombie.id, zombie);
    }
  }

  get length(): number {
    return this._zombies.size;
  }

  ids(): IterableIterator<string> {
    return this._zombies.keys();
  }

  values(): IterableIterator<Zombie> {
    return this._zombies.values();
  }

  add(zombie: User) {
    this._zombies.set(
      zombie.id,
      new Zombie(zombie.id, zombie.name, zombie.text, zombie.url),
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
