import { sleep, unreachable } from "../../../lib/lib.ts";
import { failure, Result, success } from "../../../lib/result.ts";
import {
  completeButtonSelector,
  rateLimitNotificationId,
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
      const waitSeconds = 10;

      console.warn(
        `Rate limited. Waiting ${waitSeconds} seconds before retry...`,
      );

      for (let sec = waitSeconds; sec > 0; sec--) {
        showNotification(sec);
        await sleep(1000);
      }

      removeNotification();
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

function showNotification(restWaitSeconds: number) {
  const message = `レート制限待機中... ${restWaitSeconds}秒後にリトライします`;
  let notification = document.getElementById(rateLimitNotificationId);

  if (notification) {
    removeNotification();
  }

  notification = document.createElement("div");

  notification.textContent = message;
  notification.id = rateLimitNotificationId;

  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.backgroundColor = "#F59E0B";
  notification.style.color = "white";
  notification.style.padding = "12px 24px";
  notification.style.borderRadius = "8px";
  notification.style.zIndex = "10000";
  notification.style.fontWeight = "bold";
  notification.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  notification.style.pointerEvents = "none";

  document.body.appendChild(notification);
}

function removeNotification() {
  const notification = document.getElementById(rateLimitNotificationId);
  if (!notification) {
    unreachable();
  }
  notification.remove();
}
