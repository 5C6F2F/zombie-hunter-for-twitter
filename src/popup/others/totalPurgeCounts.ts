import {
  fetchTotalPurgeCounts,
  saveTotalPurgeCounts,
} from "../../storage/purgeCountStorage.ts";
import { totalPurgeCountsId } from "../consts.ts";

export async function plusOneToTotalPurgeCounts() {
  const newCounts = await fetchTotalPurgeCounts() + 1;

  await saveTotalPurgeCounts(newCounts);
  updateTotalCountInPopup(newCounts);
}

function updateTotalCountInPopup(newCounts: number) {
  const totalPurgeCountsElement = document.getElementById(totalPurgeCountsId);
  if (totalPurgeCountsElement) {
    totalPurgeCountsElement.textContent = newCounts.toString();
  }
}
