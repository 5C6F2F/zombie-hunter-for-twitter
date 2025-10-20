import { sleep } from "../../lib/lib.ts";
import { ZombiesMap } from "../../lib/zombiesMap.ts";
import { exportButtonId, exportFileName, importButtonId } from "../consts.ts";
import {
  hideImportResultMessages,
  showCompleteMessage as showImportCompletedMessage,
  showFailMessage as showImportFailedMessage,
} from "../others/importResultMessage.ts";

export function importExportListener(zombies: ZombiesMap) {
  const importButton = document.getElementById(importButtonId);
  const exportButton = document.getElementById(exportButtonId);

  if (!importButton || !exportButton) {
    return;
  }

  importButton.addEventListener(
    "change",
    (event) => importAction(event, zombies),
  );

  exportButton.addEventListener("click", () => exportAction(zombies));
}

function importAction(event: Event, zombies: ZombiesMap) {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = async (event) => {
    const content = event.target?.result;

    if (typeof content != "string") {
      showImportFailedMessage();
      return;
    }

    const success = zombies.importData(content);

    if (!success) {
      showImportFailedMessage();
      return;
    }

    hideImportResultMessages();
    showImportCompletedMessage();

    await zombies.saveStorage();
    await sleep(5000);
    location.reload();
  };

  reader.readAsText(file);
}

function exportAction(zombies: ZombiesMap) {
  const dataStr = zombies.getExportData();
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = exportFileName;
  a.click();

  URL.revokeObjectURL(url);
}
