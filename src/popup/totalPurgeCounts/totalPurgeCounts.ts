import {
  totalPurgeCountsId,
  totalPurgeCountsKeyForStorage,
} from "../consts.ts";

export async function getTotalPurgeCounts(): Promise<number> {
  let counts = 0;

  const result = await chrome.storage.local.get(totalPurgeCountsKeyForStorage);
  if (result[totalPurgeCountsKeyForStorage]) {
    counts = Number(result[totalPurgeCountsKeyForStorage]);
  }

  return counts;
}

export async function plusOneToTotalPurgeCounts() {
  const newCounts = await getTotalPurgeCounts() + 1;

  await saveNewCountToStorage(newCounts);
  updateTotalCountInPopup(newCounts);
}

async function saveNewCountToStorage(newCounts: number) {
  await chrome.storage.local.set({
    [totalPurgeCountsKeyForStorage]: newCounts,
  });
}

function updateTotalCountInPopup(newCounts: number) {
  const totalPurgeCountsElement = document.getElementById(totalPurgeCountsId);
  if (totalPurgeCountsElement) {
    totalPurgeCountsElement.textContent = newCounts.toString();
  }
}
