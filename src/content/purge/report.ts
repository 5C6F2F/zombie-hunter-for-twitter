import { sleep } from "../../lib/lib.ts";
import {
  reportButtonSelector,
  selectSpamReportTypeSelector,
  completeButtonSelector,
} from "../consts.ts";
import { click, querySelectorLoop } from "../lib.ts";
import { goNextPage } from "./lib.ts";

export async function reportSpam(menuButton: Element) {
  click(menuButton);

  const reportButton = await querySelectorLoop(document, reportButtonSelector);
  click(reportButton);

  const reportType = await querySelectorLoop(document, selectSpamReportTypeSelector);
  click(reportType);

  await goNextPage();

  let completeButton = document.querySelector(completeButtonSelector);

  while (!completeButton) {
    // 繰り返しの通報でストップがかかり、次の画面に遷移していないので待機
    if (document.querySelector(selectSpamReportTypeSelector)) {
      await sleep(5000);
      await goNextPage();
    }

    await sleep(50);
    completeButton = document.querySelector(completeButtonSelector);
  }

  click(completeButton);
}
