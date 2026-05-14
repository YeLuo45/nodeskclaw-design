# Data Models

> NoDeskClaw 核心数据模型

## 软删除规则

所有数据删除必须使用逻辑删除（设置 `deleted_at`），严禁物理删除。

## workspace_tasks（工作区任务）

| 列名 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) PK | UUID |
| workspace_id | VARCHAR(36) FK | 所属工作区 |
| title | VARCHAR(256) | 任务标题 |
| description | TEXT | 任务描述 |
| status | VARCHAR(20) | pending / in_progress / done / blocked / archived |
| priority | VARCHAR(16) | low / medium / high / urgent |
| assignee_instance_id | VARCHAR(36) FK | 负责 Agent 实例 |
| estimated_value | DOUBLE PRECISION | 预估价值（元） |
| actual_value | DOUBLE PRECISION | 实际价值（元） |
| token_cost | INTEGER | 消耗 token 数 |
| blocker_reason | TEXT | 阻塞原因 |
| created_at | TIMESTAMPTZ | 创建时间 |
| updated_at | TIMESTAMPTZ | 更新时间 |
| deleted_at | TIMESTAMPTZ | 软删除时间 |

## workspace_objectives（工作区目标）

| 列名 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) PK | UUID |
| workspace_id | VARCHAR(36) FK | 所属工作区 |
| title | VARCHAR(256) | 目标标题 |
| description | TEXT | 目标描述 |
| progress | DOUBLE PRECISION | 进度 0.0 ~ 1.0 |
| obj_type | VARCHAR(20) | objective（O） / key_result（KR） |
| parent_id | VARCHAR(36) FK | 父级 Objective ID |
| created_by | VARCHAR(36) FK | 创建者用户 |
| created_at | TIMESTAMPTZ | 创建时间 |
| deleted_at | TIMESTAMPTZ | 软删除时间 |

## instances（实例）

| 列名 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) PK | UUID |
| name | VARCHAR(256) | 实例名称 |
| proxy_token | VARCHAR(64) | 访问令牌 |
| status | VARCHAR(20) | running / stopped / error |
| env_vars | JSONB | 环境变量 |
| created_at | TIMESTAMPTZ | 创建时间 |
| deleted_at | TIMESTAMPTZ | 软删除时间 |

## 状态流转（tasks）

```
pending -> in_progress（Agent 接取）
in_progress -> done / blocked
blocked -> pending / in_progress
done -> archived（人类管理者手动归档）
任何状态 -> archived
```
