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
    reportButton = document.querySelector(reportButtonSelector);
    await sleep(200);
  }

  click(reportButton);

  let reportType;

  while (!reportType) {
    reportType = document.querySelector(selectSpamReportTypeSelector);
    await sleep(200);
  }

  click(reportType);
  await goNextPage();

  let completeButton;

  while (!completeButton) {
    // 繰り返しの通報でストップがかかって次の画面に遷移していないので待機
    if (document.querySelector(selectSpamReportTypeSelector)) {
      await sleep(5000);
      await goNextPage();
    }

    completeButton = document.querySelector(completeButtonSelector);
    await sleep(200);
  }

  click(completeButton);
}
