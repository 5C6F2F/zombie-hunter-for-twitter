import { failure, Result, success } from "../../lib/result.ts";
import { click, DOMError, querySelectorLoop } from "../lib.ts";
import {
  blockButtonSelector,
  blockKeyWord,
  confirmBlockButtonSelector,
} from "../consts.ts";

export async function block(
  menuButton: Element,
): Promise<Result<null, DOMError>> {
  const blockButtonResult = await querySelectorLoop(
    document,
    blockButtonSelector,
  );

  if (!blockButtonResult.isSuccess) {
    click(menuButton);
    return failure("ElementNotFound");
  }

  const blockButton = blockButtonResult.value;

  // 既にブロック済みの場合はメニューを閉じて正常終了とする
  if (!blockButton.textContent?.includes(blockKeyWord)) {
    click(menuButton);
    return success(null);
  }

  click(blockButton);

  const confirmResult = await querySelectorLoop(
    document,
    confirmBlockButtonSelector,
  );

  if (!confirmResult.isSuccess) {
    return failure("ElementNotFound");
  }

  click(confirmResult.value);
  return success(null);
}
