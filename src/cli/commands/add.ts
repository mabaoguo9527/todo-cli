/**
 * todo add <title> — 添加新任务
 *
 * 示例:
 *   todo add "买菜"
 *   todo add "写作业" -p high
 */

import type { Command } from "commander";
import type { Priority } from "../../models/task.js";
import { addTask } from "../../store/json-store.js";
import { printSuccess } from "../../utils/display.js";

export function registerAddCommand(program: Command): void {
  program
    .command("add")
    .description("添加一个新任务")
    .argument("<title>", "任务标题")
    .option("-p, --priority <level>", "优先级: low / medium / high", "medium")
    .action((title: string, opts: { priority: string }) => {
      const priority = opts.priority as Priority;
      if (!["low", "medium", "high"].includes(priority)) {
        console.error(`无效的优先级: ${priority}，可选值: low / medium / high`);
        process.exit(1);
      }
      const task = addTask(title, priority);
      printSuccess(`任务已添加: #${task.id} ${task.title}`);
    });
}
