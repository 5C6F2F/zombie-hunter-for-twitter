import { sleep } from "../../lib/lib.ts";
import {
  completeButtonSelector,
  reportButtonSelector,
  selectSpamReportTypeSelector,
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

  const completeButton = await waitWhileReportRateLimited();
  click(completeButton);
}

async function waitWhileReportRateLimited(): Promise<Element> {
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

  return completeButton;
}
