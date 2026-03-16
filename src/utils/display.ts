/**
 * 终端显示工具
 *
 * 使用 chalk 着色 + cli-table3 表格输出
 */

import chalk from "chalk";
import Table from "cli-table3";
import type { Task, Priority } from "../models/task.js";

/** 优先级颜色映射 - 蓝色主题 */
const priorityColors: Record<Priority, (text: string) => string> = {
  high: chalk.hex('#FF6B6B').bold, // 珊瑚红
  medium: chalk.hex('#4ECDC4'),    // 青蓝色
  low: chalk.hex('#95E1D3'),       // 浅青色
};

/** 优先级标签 - 蓝色主题 */
const priorityLabels: Record<Priority, string> = {
  high: "🔴 高",
  medium: "🔵 中",
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
    console.log(chalk.hex('#1E90FF')("\n  📭 没有任务\n"));
    return;
  }

  const table = new Table({
    head: [
      chalk.hex('#1E90FF').bold("#"),
      chalk.hex('#1E90FF').bold("状态"),
      chalk.hex('#1E90FF').bold("任务"),
      chalk.hex('#1E90FF').bold("优先级"),
      chalk.hex('#1E90FF').bold("创建时间"),
    ],
    style: {
      head: ['cyan'],
      border: ['blue'],
    },
    colAligns: ['center', 'center', 'left', 'center', 'center'],
  });

  for (const task of tasks) {
    const status = task.done ? chalk.hex('#00C851')("✅") : chalk.hex('#1E90FF')("⬜");
    const title = task.done
      ? chalk.hex('#888').strikethrough(task.title)
      : priorityColors[task.priority](task.title);
    const priority = priorityLabels[task.priority];
    const date = formatDate(task.createdAt);

    table.push([
      chalk.hex('#4169E1').bold(String(task.id)),
      status,
      title,
      priority,
      chalk.hex('#708090')(date),
    ]);
  }

  console.log("");
  console.log(table.toString());
  console.log("");
}

/** 打印成功消息 */
export function printSuccess(message: string): void {
  console.log(chalk.hex('#00C851')(`\n  ✅ ${message}\n`));
}

/** 打印错误消息 */
export function printError(message: string): void {
  console.log(chalk.hex('#FF3547')(`\n  ❌ ${message}\n`));
}

/** 打印信息消息 */
export function printInfo(message: string): void {
  console.log(chalk.hex('#1E90FF').bold(`\n  ℹ️  ${message}\n`));
}
