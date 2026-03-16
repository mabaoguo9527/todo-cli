/**
 * todo-cli 入口
 *
 * 参考 OpenCLAW 的 src/entry.ts 设计：
 * - 设置 process title
 * - 启动 CLI program
 */

process.title = "todo";

import { runCli } from "./cli/program.js";

runCli();
