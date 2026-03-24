import { failure, Result, success } from "../../../lib/result.ts";
import { menuButtonSelector } from "../../consts.ts";
import { click, querySelectorLoop } from "../../lib.ts";

export async function openMenuForReport(
  tweetElement: Element,
): Promise<Result<Element, null>> {
  const result = await querySelectorLoop(
    tweetElement,
    menuButtonSelector,
  );

  // メニューボタン取得失敗時はツイート取得からやり直し
  if (!result.isSuccess) {
    return failure(null);
  }

  const menuButtonElement = result.value;
  click(menuButtonElement);
  return success(menuButtonElement);
}
