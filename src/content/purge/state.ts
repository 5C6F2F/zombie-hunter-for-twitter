export type PurgeState =
  | "Init"
  | "FindTweet"
  | "OpenMenuForReport"
  | "ClickReportButton"
  | "SelectReportType"
  | "WaitReportComplete"
  | "OpenMenuForBlock"
  | "ClickBlockButton"
  | "ConfirmBlock"
  | "Completed"
  | "Failed";

export interface PurgeContext {
  zombieId: string;
  tweetElement: Element | null;
  menuButtonElement: Element | null;
  rollbackCount: number; // 状態が後退した回数
  maxRollbacks: number; // 許容する最大後退回数
}
