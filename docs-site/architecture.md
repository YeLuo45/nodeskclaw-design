# Architecture

> NoDeskClaw 系统架构

## 1. Overview

NoDeskClaw 是 DeskClaw 实例可视化管理系统，通过 Web 界面管理 K8s 集群上的 DeskClaw 实例。

## 2. 系统架构

```
┌─────────────────────────────────────────────────────────────────┐
│                      NoDeskClaw                                  │
│                                                                  │
│  ┌──────────────────────┐    ┌──────────────────────┐          │
│  │   nodeskclaw-portal  │    │  nodeskclaw-backend   │          │
│  │   (用户门户 CE+EE)   │    │   (Python FastAPI)    │          │
│  │   Vue 3 + Three.js   │    │   port: 4510          │          │
│  └──────────┬───────────┘    └──────────┬───────────┘          │
│             │                              │                     │
│             │         HTTP/REST           │                     │
│             │◄────────────────────────────►                     │
│             │                              │                     │
└─────────────┼──────────────────────────────┼────────────────────┘
              │                              │
              ▼                              ▼
  ┌──────────────────────┐    ┌──────────────────────┐
  │   K8s Cluster        │    │   PostgreSQL         │
  │   (DeskClaw Instances)│    │   (Volcengine RDS)   │
  │   Volcano VKE        │    │                      │
  └──────────────────────┘    └──────────────────────┘
```

## 3. 技术栈

| 组件 | 技术 | 可用版本 |
|------|------|---------|
| 后端 | Python 3.12 + FastAPI + SQLAlchemy + PostgreSQL | CE + EE |
| 管理前端 | Vue 3 + Vite + TypeScript + Tailwind CSS + shadcn-vue | EE-only |
| 用户门户 | Vue 3 + Vite + TypeScript + Tailwind CSS + Three.js | CE + EE |
| 部署 | Kubernetes (Volcengine VKE) | — |
| 数据库 | PostgreSQL (Volcengine RDS) | — |
| 包管理 | uv | — |

## 4. CE/EE 架构

### 4.1 FeatureGate

`app/core/feature_gate.py` 检测 `ee/` 目录是否存在决定 edition。

### 4.2 后端抽象层

4 个 Factory 模式抽象层：

| 抽象层 | CE 实现 | EE 实现 |
|--------|---------|---------|
| DeploymentAdapter | BasicK8sAdapter | FullK8sAdapter |
| EmailTransport | GlobalSmtpTransport | OrgSmtpTransport |
| OrgProvider | SingleOrgProvider | MultiOrgProvider |
| QuotaChecker | NoopQuotaChecker | PlanBasedQuotaChecker |

### 4.3 前端架构

- **Admin**（`ee/nodeskclaw-frontend/`）：完整独立 Vue 项目，EE-only
- **Portal**（`nodeskclaw-portal/`）：CE + EE 共用，Vite alias 机制切换 EE 路由

## 5. 目录结构

```
nodeskclaw/
├── nodeskclaw-backend/         # Python FastAPI 后端
│   ├── app/
│   │   ├── api/               # API 路由
│   │   ├── core/              # 核心模块（FeatureGate 等）
│   │   ├── models/            # SQLAlchemy 模型
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # 业务逻辑
│   │   └── main.py            # FastAPI 入口
│   ├── alembic/               # 数据库迁移
│   └── pyproject.toml
│
├── nodeskclaw-portal/          # 用户门户前端 (CE+EE)
│   └── src/
│
├── ee/                        # EE 私有仓库（需手动 clone）
│   ├── backend/               # EE 后端路由、Service、Model、Hook
│   └── nodeskclaw-frontend/   # Admin 管理后台（EE-only）
│
└── docs/                      # 文档
```

## 6. 核心 API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /workspaces/{ws}/blackboard | 获取黑板 |
| GET | /workspaces/{ws}/topology | 工作区拓扑图 |
| GET | /workspaces/{ws}/performance | 效能数据 |
| POST | /instances/{id}/regenerate-token | 重置访问令牌 |
