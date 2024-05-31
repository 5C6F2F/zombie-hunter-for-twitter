import {
  reportButtonSelector,
  selectSpamReportTypeSelector,
  completeButtonSelector,
} from "../consts.ts";
import { click, goNextPage, sleep } from "./lib.ts";

export async function reportSpam(menuButton: Element) {
  click(menuButton);

  let reportButton = document.querySelector(reportButtonSelector);

  while (!reportButton) {
    await sleep(50);
    reportButton = document.querySelector(reportButtonSelector);
  }

  click(reportButton);

  let reportType = document.querySelector(selectSpamReportTypeSelector);

  while (!reportType) {
    await sleep(50);
    reportType = document.querySelector(selectSpamReportTypeSelector);
  }

  click(reportType);
  await goNextPage();

  let completeButton = document.querySelector(completeButtonSelector);

  while (!completeButton) {
    // 繰り返しの通報でストップがかかって次の画面に遷移していないので待機
    if (document.querySelector(selectSpamReportTypeSelector)) {
      await sleep(5000);
      await goNextPage();
    }

    await sleep(50);
    completeButton = document.querySelector(completeButtonSelector);
  }

  click(completeButton);
}
