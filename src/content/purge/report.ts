import {
  reportButtonSelector,
  selectSpamReportTypeSelector,
  completeButtonSelector,
} from "../consts.ts";
import { click, goNextPage, sleep } from "./lib.ts";

export async function reportSpam(menuButton: Element) {
  click(menuButton);

  const reportButton = document.querySelector(reportButtonSelector);

  if (!reportButton) {
    return;
  }

  click(reportButton);

  let reportType;

  while (!reportType) {
    reportType = document.querySelector(selectSpamReportTypeSelector);
    await sleep(200);
  }

  click(reportType);
  goNextPage();

  let completeButton;

  while (!completeButton) {
    // 繰り返しの通報でストップがかかって次の画面に遷移していないので待機
    if (document.querySelector(selectSpamReportTypeSelector)) {
      await sleep(1000);
      goNextPage();
    }

    completeButton = document.querySelector(completeButtonSelector);
    await sleep(200);
  }

  click(completeButton);

  return true;
}
