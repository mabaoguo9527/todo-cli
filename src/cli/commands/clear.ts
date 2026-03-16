/**
 * todo clear — 清除任务
 *
 * 示例:
 *   todo clear         # 清除已完成的任务
 *   todo clear --all   # 清除所有任务
 */

import type { Command } from "commander";
import { clearTasks } from "../../store/json-store.js";
import { printSuccess, printInfo } from "../../utils/display.js";

export function registerClearCommand(program: Command): void {
  program
    .command("clear")
    .description("清除任务")
    .option("-a, --all", "清除所有任务（包括未完成的）")
    .action((opts: { all?: boolean }) => {
      const count = clearTasks(opts.all ?? false);
      if (count > 0) {
        const label = opts.all ? "所有" : "已完成的";
        printSuccess(`已清除 ${count} 个${label}任务`);
      } else {
        printInfo("没有需要清除的任务");
      }
    });
}
