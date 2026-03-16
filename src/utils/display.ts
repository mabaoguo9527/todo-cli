/**
 * 终端显示工具
 *
 * 使用 chalk 着色 + cli-table3 表格输出
 */

import chalk from "chalk";
import Table from "cli-table3";
import type { Task, Priority } from "../models/task.js";

/** 优先级颜色映射 */
const priorityColors: Record<Priority, (text: string) => string> = {
  high: chalk.red.bold,
  medium: chalk.yellow,
  low: chalk.gray,
};

/** 优先级标签 */
const priorityLabels: Record<Priority, string> = {
  high: "🔴 高",
  medium: "🟡 中",
  low: "⚪ 低",
};

/** 格式化日期 */
function formatDate(isoStr: string): string {
  const d = new Date(isoStr);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

/** 将任务列表渲染为表格并打印 */
export function printTaskTable(tasks: Task[]): void {
  if (tasks.length === 0) {
    console.log(chalk.dim("\n  📭 没有任务\n"));
    return;
  }

  const table = new Table({
    head: [
      chalk.bold("#"),
      chalk.bold("状态"),
      chalk.bold("任务"),
      chalk.bold("优先级"),
      chalk.bold("创建时间"),
    ],
    style: {
      head: [],
      border: [],
    },
  });

  for (const task of tasks) {
    const status = task.done ? chalk.green("✅") : chalk.dim("⬜");
    const title = task.done
      ? chalk.strikethrough.dim(task.title)
      : priorityColors[task.priority](task.title);
    const priority = priorityLabels[task.priority];
    const date = formatDate(task.createdAt);

    table.push([
      chalk.dim(String(task.id)),
      status,
      title,
      priority,
      chalk.dim(date),
    ]);
  }

  console.log("");
  console.log(table.toString());
  console.log("");
}

/** 打印成功消息 */
export function printSuccess(message: string): void {
  console.log(chalk.green(`\n  ✅ ${message}\n`));
}

/** 打印错误消息 */
export function printError(message: string): void {
  console.log(chalk.red(`\n  ❌ ${message}\n`));
}

/** 打印信息消息 */
export function printInfo(message: string): void {
  console.log(chalk.blue(`\n  ℹ️  ${message}\n`));
}
