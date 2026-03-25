import { sleep, unreachable } from "../../lib/lib.ts";
import {
  confirmBlockButtonSelector,
  menuButtonSelector,
  reportButtonSelector,
  selectSpamReportTypeSelector,
} from "../consts.ts";
import { click, querySelectorLoop } from "../lib.ts";
import { goNextPage } from "./lib.ts";
import { PurgeContext, PurgeState } from "./state.ts";
import { clickBlockButton } from "./states/clickBlockButton.ts";
import { findTweet } from "./states/findTweet.ts";
import { openMenuForReport } from "./states/openMenuForReport.ts";
import { waitReportComplete } from "./states/waitReportComplete.ts";

export class PurgeStateMachine {
  private state: PurgeState = "Init";
  private context: PurgeContext;

  private readonly stateOrder: PurgeState[] = [
    "Init",
    "FindTweet",
    "OpenMenuForReport",
    "ClickReportButton",
    "SelectReportType",
    "WaitReportComplete",
    "OpenMenuForBlock",
    "ClickBlockButton",
    "ConfirmBlock",
    "Completed",
    "Failed",
  ];

  constructor(zombieId: string) {
    this.context = {
      zombieId,
      tweetElement: null,
      menuButtonElement: null,
      rollbackCount: 0,
      maxRollbacks: 5, // ステートの後退は5回まで
    };
  }

  public async run(): Promise<boolean> {
    while (this.state !== "Completed" && this.state !== "Failed") {
      const nextState = await this.step();

      // ステートが後退したかどうかの判定
      if (this.isRollback(this.state, nextState)) {
        this.context.rollbackCount++;
        console.warn(
          `State rollback: ${this.state} -> ${nextState}. Rollback count: ${this.context.rollbackCount}/${this.context.maxRollbacks}`,
        );

        if (this.context.rollbackCount > this.context.maxRollbacks) {
          console.error(
            `Max rollbacks exceeded at state: ${this.state}. Aborting.`,
          );
          this.state = "Failed";
          continue;
        }
      } else if (this.state !== nextState) {
        // 正常に次のステートへ進んだ場合はカウントをリセット
        this.context.rollbackCount = 0;
      }

      this.state = nextState;
    }

    return this.state === "Completed";
  }

  private isRollback(currentState: PurgeState, nextState: PurgeState): boolean {
    return this.stateOrder.indexOf(nextState) <
      this.stateOrder.indexOf(currentState);
  }

  private async step(): Promise<PurgeState> {
    switch (this.state) {
      case "Init":
        return "FindTweet";

      case "FindTweet": {
        const result = await findTweet(
          this.context.zombieId,
        );

        if (!result.isSuccess) {
          return "Failed";
        }

        this.context.tweetElement = result.value;
        return "OpenMenuForReport";
      }

      case "OpenMenuForReport": {
        if (!this.context.tweetElement) {
          unreachable();
        }

        const result = await openMenuForReport(
          this.context.tweetElement,
        );

        if (!result.isSuccess) {
          return "FindTweet";
        }

        this.context.menuButtonElement = result.value;
        return "ClickReportButton";
      }

      case "ClickReportButton": {
        const result = await querySelectorLoop(
          document,
          reportButtonSelector,
        );

        // 以前に通報したことのあるツイートの場合、若干遅延が入ってから
        // 「報告しました 表示する」という表示になり、メニューボタンを押すことができなくなっていた
        // そのため、報告ボタンが見つからなければツイートを再度探す動作に変更
        if (!result.isSuccess) {
          await sleep(100);
          return "FindTweet";
        }

        click(result.value);
        return "SelectReportType";
      }

      case "SelectReportType": {
        const result = await querySelectorLoop(
          document,
          selectSpamReportTypeSelector,
        );

        if (!result.isSuccess) {
          return "ClickReportButton";
        }

        click(result.value);

        const nextResult = await goNextPage();
        if (!nextResult.isSuccess) {
          return "SelectReportType";
        }

        return "WaitReportComplete";
      }

      case "WaitReportComplete": {
        const result = await waitReportComplete();

        // 完了ボタンがいつまでも出ない場合はスパム種別選択からやり直し
        if (!result.isSuccess) {
          return "SelectReportType";
        }

        return "OpenMenuForBlock";
      }

      case "OpenMenuForBlock": {
        if (!this.context.tweetElement) {
          return "FindTweet";
        }

        const result = await querySelectorLoop(
          this.context.tweetElement,
          menuButtonSelector,
        );
        if (!result.isSuccess) {
          return "FindTweet";
        }

        this.context.menuButtonElement = result.value;
        click(result.value);
        return "ClickBlockButton";
      }

      case "ClickBlockButton": {
        if (!this.context.menuButtonElement) {
          unreachable();
        }

        const result = await clickBlockButton();

        if (!result.isSuccess) {
          return "OpenMenuForBlock";
        }

        if (result.value) {
          return "ConfirmBlock";
        } else {
          return "Completed";
        }
      }

      case "ConfirmBlock": {
        const result = await querySelectorLoop(
          document,
          confirmBlockButtonSelector,
        );

        // 確認画面が出なければブロックボタンクリックからやり直す
        if (!result.isSuccess) {
          return "ClickBlockButton";
        }

        click(result.value);
        return "Completed";
      }

      default:
        return "Failed";
    }
  }
}
