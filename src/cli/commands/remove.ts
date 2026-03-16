/**
 * todo remove <id> — 删除任务
 *
 * 示例:
 *   todo remove 1
 *   todo remove 3
 */

import type { Command } from "commander";
import { removeTask } from "../../store/json-store.js";
import { printSuccess, printError } from "../../utils/display.js";

export function registerRemoveCommand(program: Command): void {
  program
    .command("remove")
    .alias("rm")
    .description("删除一个任务")
    .argument("<id>", "任务 ID")
    .action((idStr: string) => {
      const id = Number(idStr);
      if (isNaN(id)) {
        printError(`无效的任务 ID: ${idStr}`);
        process.exit(1);
      }

      const task = removeTask(id);
      if (task) {
        printSuccess(`任务已删除: #${task.id} ${task.title}`);
      } else {
        printError(`找不到任务 #${id}`);
      }
    });
}
