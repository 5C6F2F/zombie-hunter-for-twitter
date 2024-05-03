import { User } from "./user.ts";
import { zombiesKeyForStorage } from "../content/consts.ts";
import { separator, zombieViewParam } from "./consts.ts";

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

  toStorage(): string {
    let result = "";
    for (const zombie of this._zombies) {
      result += `${zombie.id}${separator}${zombie.name}${separator}${zombie.text}${separator}${zombie.url}${separator}`;
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

export class Zombie extends User {
  toHTML(): HTMLElement {
    const element = document.createElement("div");

    element.innerHTML = `
      <div class="zombie">
        <div class="tweet-content">
          <div class="zombie-profile">
            <div class="zombie-name">
              <p>${this.name}</p>
            </div>
            <div class="zombie-id">
              <p>${this.id}</p>
            </div>
          </div>
          <div class="tweet-text">
            <p>${this.trimmedText}</p>
          </div>
        </div>
        <div class="options">
          <div class="tweet-url-wrapper buttons">
            <a href="${this.noHideURL}" class="tweet-url">
              <svg class="tweet-url-button" width="100%" height="100%" viewBox="0 0 800 800" version="1.1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
                xmlns:serif="http://www.serif.com/"
                style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1;">
                <g transform="matrix(1,0,0,1,-235,-1950)">
                  <g transform="matrix(2.02015,0,0,2.02017,-51.8034,1393.69)">
                    <rect x="142.327" y="275.741" width="396.011" height="396.011" style="fill:none;" />
                    <g transform="matrix(0.495014,0,0,0.495007,3.15989,-102.548)">
                      <path d="M687.28,980.293L406.378,980.293L406.378,1438.97L865.059,1438.97L865.059,1159.34"
                        style="fill:none;stroke:black;stroke-width:22.22px;" />
                    </g>
                    <g transform="matrix(0.145129,0.145127,-0.145129,0.145127,656.851,-26.082)">
                      <path
                        d="M519.133,2352.46L519.133,2855.01L744,2855.01L744,2352.46L1108.68,2352.46L631.567,1875.35L154.455,2352.46L519.133,2352.46Z"
                        style="fill:none;stroke:black;stroke-width:53.6px;" />
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>`;

    return element;
  }

  private get trimmedText(): string {
    // tweetが200文字以上の場合は...で省略する
    if (this.text.length > 200) {
      return this.text.substring(0, 200).concat("...");
    } else {
      return this.text;
    }
  }

  private get noHideURL(): string {
    const url = new URL(this.url);
    url.searchParams.append(zombieViewParam, this.id);
    return url.toString();
  }
}
