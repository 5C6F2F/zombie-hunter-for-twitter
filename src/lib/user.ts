import { tweetTextSelector } from "../content/consts.ts";
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
  const elements = tweet.getElementsByTagName("a");

  const name = elements[1].textContent;
  const id = elements[2].textContent;
  const url = elements[3].href;

  let text = tweet.querySelector(tweetTextSelector)?.textContent;
  if (!text) {
    text = "";
  }

  if (id && name && url) {
    return new User(id, name, text, url);
  } else {
    return null;
  }
}
