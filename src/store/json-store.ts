/**
 * JSON 文件持久化存储
 *
 * 负责将 Task 数据读写到 ~/.todo-cli/tasks.json
 */

import fs from "node:fs";
import { DATA_DIR, TASKS_FILE } from "../utils/config.js";
import type { Task, TaskStore, Priority } from "../models/task.js";

/** 获取默认的空数据 */
function getDefaultStore(): TaskStore {
  return {
    nextId: 1,
    tasks: [],
  };
}

/** 确保数据目录存在 */
function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/** 读取任务数据 */
export function loadStore(): TaskStore {
  ensureDataDir();
  if (!fs.existsSync(TASKS_FILE)) {
    return getDefaultStore();
  }
  try {
    const raw = fs.readFileSync(TASKS_FILE, "utf-8");
    return JSON.parse(raw) as TaskStore;
  } catch {
    return getDefaultStore();
  }
}

/** 保存任务数据 */
export function saveStore(store: TaskStore): void {
  ensureDataDir();
  fs.writeFileSync(TASKS_FILE, JSON.stringify(store, null, 2), "utf-8");
}

/** 添加一个新任务，返回新任务 */
export function addTask(title: string, priority: Priority = "medium"): Task {
  const store = loadStore();
  const task: Task = {
    id: store.nextId++,
    title,
    done: false,
    priority,
    createdAt: new Date().toISOString(),
    completedAt: null,
  };
  store.tasks.push(task);
  saveStore(store);
  return task;
}

/** 获取所有任务 */
export function getAllTasks(): Task[] {
  return loadStore().tasks;
}

/** 标记任务完成 */
export function markDone(id: number): Task | null {
  const store = loadStore();
  const task = store.tasks.find((t) => t.id === id);
  if (!task) return null;
  task.done = true;
  task.completedAt = new Date().toISOString();
  saveStore(store);
  return task;
}

/** 删除任务 */
export function removeTask(id: number): Task | null {
  const store = loadStore();
  const index = store.tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const [removed] = store.tasks.splice(index, 1);
  saveStore(store);
  return removed;
}

/** 清除任务 */
export function clearTasks(all: boolean = false): number {
  const store = loadStore();
  const beforeCount = store.tasks.length;
  if (all) {
    store.tasks = [];
  } else {
    store.tasks = store.tasks.filter((t) => !t.done);
  }
  saveStore(store);
  return beforeCount - store.tasks.length;
}
