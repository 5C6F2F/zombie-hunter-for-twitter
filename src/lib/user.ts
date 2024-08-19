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

export function userFromTweet(tweet: Element): User | null {
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
  tweet: Element
): [
  string | null | undefined,
  string | null | undefined,
  string | null | undefined
] {
  const name_id_element = tweet.querySelector(userNameIdSelector);

  // name_id_element?.children[0]?.textContent とするとタイムライン中ではツイート日時ごと取得してしまう。
  // しかし良い感じのセレクターもないためこんなことに。
  const name =
    name_id_element?.children[0].firstChild?.firstChild?.firstChild?.firstChild
      ?.firstChild?.textContent;
  const id =
    name_id_element?.children[1].firstChild?.firstChild?.firstChild?.firstChild
      ?.firstChild?.textContent;

  const time_elements = tweet.getElementsByTagName("time");
  // 引用リツイートの際に引用元の要素を取得しないよう、最後の要素を取得する。
  const url_element = time_elements[time_elements.length - 1]?.parentElement;
  const url = (url_element as HTMLAnchorElement | null)?.href;

  return [name, id, url];
}
