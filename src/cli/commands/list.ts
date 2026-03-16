/**
 * todo list — 列出任务
 *
 * 示例:
 *   todo list          # 列出未完成的任务
 *   todo list --all    # 列出所有任务
 *   todo list --done   # 列出已完成的任务
 */

import type { Command } from "commander";
import { getAllTasks } from "../../store/json-store.js";
import { printTaskTable } from "../../utils/display.js";

export function registerListCommand(program: Command): void {
  program
    .command("list")
    .alias("ls")
    .description("列出任务")
    .option("-a, --all", "显示所有任务（包括已完成）")
    .option("-d, --done", "只显示已完成的任务")
    .action((opts: { all?: boolean; done?: boolean }) => {
      let tasks = getAllTasks();

      if (opts.done) {
        tasks = tasks.filter((t) => t.done);
      } else if (!opts.all) {
        tasks = tasks.filter((t) => !t.done);
      }

      const label = opts.done
        ? "已完成的任务"
        : opts.all
          ? "所有任务"
          : "待办任务";

      console.log(`\n  📋 ${label} (${tasks.length})`);
      printTaskTable(tasks);
    });
}
