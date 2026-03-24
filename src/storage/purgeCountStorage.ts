import { colorModeSettingKeyForStorage, totalPurgeCountsKeyForStorage } from "./consts.ts";

export async function fetchTotalPurgeCounts(): Promise<number> {
  let counts = 0;

  const result = await chrome.storage.local.get(totalPurgeCountsKeyForStorage);
  if (result[totalPurgeCountsKeyForStorage]) {
    counts = Number(result[totalPurgeCountsKeyForStorage]);
  }

  return counts;
}

export async function saveTotalPurgeCounts(newCounts: number) {
  await chrome.storage.local.set({
    [colorModeSettingKeyForStorage]: newCounts,
  });
}
