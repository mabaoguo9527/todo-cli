/**
 * todo done <id> — 标记任务为完成
 *
 * 示例:
 *   todo done 1
 *   todo done 3
 */

import type { Command } from "commander";
import { markDone } from "../../store/json-store.js";
import { printSuccess, printError } from "../../utils/display.js";

export function registerDoneCommand(program: Command): void {
  program
    .command("done")
    .description("标记任务为已完成")
    .argument("<id>", "任务 ID")
    .action((idStr: string) => {
      const id = Number(idStr);
      if (isNaN(id)) {
        printError(`无效的任务 ID: ${idStr}`);
        process.exit(1);
      }

      const task = markDone(id);
      if (task) {
        printSuccess(`任务已完成: #${task.id} ${task.title}`);
      } else {
        printError(`找不到任务 #${id}`);
      }
    });
}
