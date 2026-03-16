/**
 * CLI 程序构建与命令注册
 *
 * 参考 OpenCLAW 的 src/cli/program/build-program.ts + command-registry.ts
 * - 创建 Commander 实例
 * - 注册所有子命令
 * - 解析 argv 并执行
 */

import { Command } from "commander";
import chalk from "chalk";
import { registerAddCommand } from "./commands/add.js";
import { registerListCommand } from "./commands/list.js";
import { registerDoneCommand } from "./commands/done.js";
import { registerRemoveCommand } from "./commands/remove.js";
import { registerClearCommand } from "./commands/clear.js";

function buildProgram(): Command {
  const program = new Command();

  program
    .name("todo")
    .description(chalk.hex('#1E90FF').bold("📝 一个终端 TODO 任务管理器"))
    .version("1.0.1", "-v, --version", chalk.hex('#4169E1')("显示版本号"))
    .configureHelp({
      subcommandTerm: (cmd) => chalk.hex('#1E90FF').bold(cmd.name()),
      commandUsage: (cmd) => chalk.hex('#00C851')(cmd.usage()),
      optionTerm: (option) => chalk.hex('#4ECDC4')(option.flags),
      argumentTerm: (arg) => chalk.hex('#95E1D3')(`<${arg.name}>`),
    })
    .addHelpText('after', chalk.hex('#708090')(`
示例:
  ${chalk.hex('#1E90FF').bold('todo add')} "学习 TypeScript" --priority high
  ${chalk.hex('#1E90FF').bold('todo list')} --all
  ${chalk.hex('#1E90FF').bold('todo done')} 1
  ${chalk.hex('#1E90FF').bold('todo remove')} 2

更多帮助请访问: ${chalk.hex('#1E90FF').underline('https://github.com/mabaoguo9527/todo-cli')}
    `));

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
