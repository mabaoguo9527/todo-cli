# TODO CLI

一个现代化的终端任务管理命令行工具，采用蓝色主题设计。

## 功能特性

- ✅ 添加、查看、完成、删除任务
- 🎨 蓝色主题终端界面，美观现代
- 📊 表格形式展示任务列表
- 🏷️ 任务优先级管理（高/中/低）
- 💾 本地 JSON 数据存储
- 🔧 TypeScript 开发，类型安全

## 安装

### 全局安装（推荐）

```bash
npm install -g @mabaoguo/todo-cli
# 或
pnpm add -g @mabaoguo/todo-cli
# 或
yarn global add @mabaoguo/todo-cli
```

### 本地开发安装

```bash
git clone <repository-url>
cd todo-cli
pnpm install
pnpm build
```

## 使用方法

### 查看帮助

```bash
todo --help
```

### 添加任务

```bash
todo add "学习 TypeScript" --priority high
todo add "写文档" --priority medium
todo add "整理桌面" --priority low
```

### 查看任务列表

```bash
todo list
```

### 完成任务

```bash
todo done 1
```

### 删除任务

```bash
todo remove 2
```

### 清空所有任务

```bash
todo clear
```

## 命令选项

- `add <task>` - 添加新任务
  - `--priority <high|medium|low>` - 设置优先级（默认：medium）
- `list` - 显示所有任务
- `done <id>` - 完成任务
- `remove <id>` - 删除任务
- `clear` - 清空所有任务

## 技术栈

- **语言**: TypeScript
- **构建工具**: tsdown
- **命令行框架**: Commander.js
- **终端交互**: @clack/prompts
- **颜色输出**: chalk
- **表格显示**: cli-table3

## 开发

```bash
# 安装依赖
pnpm install

# 构建项目
pnpm build

# 开发模式（监听文件变化）
pnpm dev

# 运行测试
pnpm start
```

## 许可证

MIT License