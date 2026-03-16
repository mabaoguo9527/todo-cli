/**
 * Task 数据模型
 *
 * 定义任务的类型和优先级
 */

export type Priority = "low" | "medium" | "high";

export interface Task {
  /** 任务唯一 ID */
  id: number;
  /** 任务标题 */
  title: string;
  /** 是否已完成 */
  done: boolean;
  /** 优先级 */
  priority: Priority;
  /** 创建时间（ISO 字符串） */
  createdAt: string;
  /** 完成时间（ISO 字符串），未完成为 null */
  completedAt: string | null;
}

export interface TaskStore {
  /** 下一个可用 ID（自增） */
  nextId: number;
  /** 所有任务列表 */
  tasks: Task[];
}
