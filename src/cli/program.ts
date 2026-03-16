/**
 * CLI 程序构建与命令注册
 *
 * 参考 OpenCLAW 的 src/cli/program/build-program.ts + command-registry.ts
 * - 创建 Commander 实例
 * - 注册所有子命令
 * - 解析 argv 并执行
 */

import { Command } from "commander";
import { registerAddCommand } from "./commands/add.js";
import { registerListCommand } from "./commands/list.js";
import { registerDoneCommand } from "./commands/done.js";
import { registerRemoveCommand } from "./commands/remove.js";
import { registerClearCommand } from "./commands/clear.js";

function buildProgram(): Command {
  const program = new Command();

  program
    .name("todo")
    .description("📝 一个终端 TODO 任务管理器")
    .version("1.0.0", "-v, --version", "显示版本号");

  // 注册所有子命令
  registerAddCommand(program);
  registerListCommand(program);
  registerDoneCommand(program);
  registerRemoveCommand(program);
  registerClearCommand(program);

  return program;
}

export async function runCli(): Promise<void> {
  const program = buildProgram();
  await program.parseAsync(process.argv);
}
