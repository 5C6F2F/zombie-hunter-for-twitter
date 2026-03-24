import { sleep } from "../../../lib/lib.ts";
import { failure, Result, success } from "../../../lib/result.ts";
import {
  completeButtonSelector,
  selectSpamReportTypeSelector,
} from "../../consts.ts";
import { click } from "../../lib.ts";
import { goNextPage } from "../lib.ts";

export async function waitReportComplete(): Promise<Result<null, null>> {
  let completeButton = document.querySelector(completeButtonSelector);
  let waitCount = 0;

  while (!completeButton && waitCount < 30) {
    // 繰り返しの通報でストップがかかり、次の画面に遷移していないので待機
    if (document.querySelector(selectSpamReportTypeSelector)) {
      console.warn(
        "[Purge] Rate limited. Waiting 5 seconds before retry...",
      );
      await sleep(5000);
      await goNextPage();
    }
    await sleep(200);
    completeButton = document.querySelector(completeButtonSelector);
    waitCount++;
  }

  if (!completeButton) {
    return failure(null);
  }

  click(completeButton);
  return success(null);
}
