#!/usr/bin/env node

/**
 * todo-cli 入口脚本
 *
 * 参考 OpenCLAW 的 openclaw.mjs 入口设计：
 * 1. 检查 Node.js 版本
 * 2. 导入编译后的 entry 模块
 */

// 检查 Node.js 版本 >= 18
const [major] = process.versions.node.split(".").map(Number);
if (major < 18) {
  console.error(
    `\x1b[31mError: todo-cli requires Node.js >= 18, but you are running ${process.version}\x1b[0m`
  );
  process.exit(1);
}

// 导入编译后的入口模块
async function main() {
  try {
    await import("../dist/entry.js");
  } catch (err) {
    // 如果 dist 不存在，尝试直接使用 tsx 加载源码（开发模式）
    try {
      await import("../src/entry.ts");
    } catch {
      console.error(
        "\x1b[31mError: Could not load todo-cli. Run `pnpm build` first.\x1b[0m"
      );
      console.error(err);
      process.exit(1);
    }
  }
}

main();
