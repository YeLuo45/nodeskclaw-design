# Backend

> NoDeskClaw 后端 — Python 3.12 + FastAPI

## Tech Stack

- Python 3.12
- FastAPI（异步）
- SQLAlchemy（async）
- PostgreSQL（Volcengine RDS）
- Alembic（数据库迁移）
- uv（包管理）

## 启动

```bash
cd nodeskclaw-backend
uv sync
uv run uvicorn app.main:app --reload --port 4510
```

## 数据库连接池

| 环境变量 | 默认值 | 说明 |
|----------|--------|------|
| `DB_POOL_SIZE` | 10 | 常驻连接数 |
| `DB_POOL_MAX_OVERFLOW` | 20 | 溢出连接数 |

总可用连接 = `DB_POOL_SIZE` + `DB_POOL_MAX_OVERFLOW`（默认 30）。

SSE 流式端点使用独立的短生命周期 session，不占用连接池配额。

## API 路由

### 核心路由

| 模块 | 路径前缀 | 说明 |
|------|---------|------|
| audit | /audit | 审计日志 |
| auth | /auth | 认证授权 |
| blackboard | /workspaces/{ws}/blackboard | 共享黑板 |
| clusters | /clusters | 集群管理 |
| engines | /engines | 引擎版本 |
| genes | /genes | 基因系统 |
| instances | /instances | 实例管理 |
| topology | /workspaces/{ws}/topology | 拓扑图 |

## 认证依赖

| 依赖函数 | 认证方式 | 适用场景 |
|---------|---------|---------|
| `get_current_user` | JWT only | 仅人类用户可访问 |
| `get_current_user_or_agent` | JWT + proxy_token | 人类和 AI 员工均可访问 |
| `get_current_org` | JWT + org 解析 | 需要组织上下文 |
| `get_current_org_or_agent` | JWT / proxy_token + org | AI 员工可访问的组织端点 |

## 持续工作循环

- **定时保底**：`WorkspaceSchedule` cron 定时器，每 4 小时发送"任务巡检"系统消息
- **事件即时**：任务状态变更时 SSE 广播
- **人类手动**：管理者在黑板创建/分配任务
