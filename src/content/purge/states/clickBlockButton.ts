import { failure, Result, success } from "../../../lib/result.ts";
import { blockButtonSelector, blockKeyWord } from "../../consts.ts";
import { click, querySelectorLoop } from "../../lib.ts";

export async function clickBlockButton(): Promise<Result<boolean, null>> {
  const result = await querySelectorLoop(
    document,
    blockButtonSelector,
  );

  if (!result.isSuccess) {
    return failure(null);
  }

  const blockButton = result.value;

  // メニューボタン中に「ブロック」というキーワードが含まれている、つまり未ブロックの場合はブロックをする
  if (blockButton.textContent?.includes(blockKeyWord)) {
    click(blockButton);
    return success(true);
  } else {
    // 「ブロック」というキーワードが含まれていない（＝既にブロック済み等の状態）場合は終了
    // click(menuButtonElement); // メニューを閉じて完了扱いにする
    return success(false);
  }
}
