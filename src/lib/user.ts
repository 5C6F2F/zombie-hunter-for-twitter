import { tweetTextSelector, userNameIdSelector } from "../content/consts.ts";
import { noName } from "./consts.ts";

export class User {
  private _id: string;
  private _name: string;
  private _text: string;
  private _url: string;

  constructor(id: string, name: string, text: string, url: string) {
    this._id = id;

    if (name.length === 0) {
      this._name = noName;
    } else if (name === noName) {
      this._name = "";
    } else {
      this._name = name;
    }

    this._text = text;
    this._url = url;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get text(): string {
    return this._text;
  }

  get url(): string {
    return this._url;
  }
}

export function getUserFromTweet(tweet: Element): User | null {
  const [name, id, url] = getUserInfo(tweet);

  let text = tweet.querySelector(tweetTextSelector)?.textContent;
  if (!text) {
    text = "";
  }

  // 名前が記号のみの場合name.lengthは0になる
  if (id && name != null && url) {
    return new User(id, name, text, url);
  } else {
    return null;
  }
}

export function getUserInfo(
  tweet: Element,
): [
  string | null | undefined,
  string | null | undefined,
  string | null | undefined,
] {
  const name_id_element = tweet.querySelector(userNameIdSelector);

  const name = name_id_element?.children[0].getElementsByTagName("a")[0]
    .getElementsByTagName("span")[0].textContent;
  const id = name_id_element?.children[1].getElementsByTagName("a")[0]
    .getElementsByTagName("span")[0].textContent;

  const time_elements = tweet.getElementsByTagName("time");
  // 引用リツイートの際に引用元の要素を取得しないよう、最初の要素を取得する。
  const url_element = time_elements[0]?.parentElement;
  const url = (url_element as HTMLAnchorElement | null)?.href;

  return [name, id, url];
}
