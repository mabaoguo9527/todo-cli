/**
 * 配置常量
 *
 * 数据文件存储在 ~/.todo-cli/ 目录下
 */

import path from "node:path";
import os from "node:os";

/** 数据目录路径 */
export const DATA_DIR = path.join(os.homedir(), ".todo-cli");

/** 任务数据文件路径 */
export const TASKS_FILE = path.join(DATA_DIR, "tasks.json");
