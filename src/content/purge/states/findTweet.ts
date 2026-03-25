import { getUserTweet } from "../../lib.ts";
import { failure, Result, success } from "../../../lib/result.ts";

export async function findTweet(
  zombieId: string,
): Promise<Result<Element, null>> {
  const result = await getUserTweet(zombieId);

  // タイムラインが表示された後に取得しているので
  // ツイートが削除されたりアカウントが凍結・削除・ID変更等されたりしている場合のみreturnされるはず
  if (!result.isSuccess) {
    console.error(
      `Tweet not found for ID: ${zombieId}`,
    );
    return failure(null);
  }

  const tweetElement = result.value;
  return success(tweetElement);
}
