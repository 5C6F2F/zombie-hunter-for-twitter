import { importCompletedId, importFailedId } from "../consts.ts";

export function hideImportResultMessages() {
  const importCompleted = document.getElementById(importCompletedId);
  const importFailed = document.getElementById(importFailedId);

  if (!importCompleted || !importFailed) {
    return;
  }

  importCompleted.style.display = "none";
  importFailed.style.display = "none";
}

export function showCompleteMessage() {
  const importCompleted = document.getElementById(importCompletedId);

  if (!importCompleted) {
    return;
  }

  importCompleted.style.display = "block";
}

export function showFailMessage() {
  const importFailed = document.getElementById(importFailedId);

  if (!importFailed) {
    return;
  }

  importFailed.style.display = "block";
}
