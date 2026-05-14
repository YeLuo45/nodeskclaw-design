# Instance API

> 实例管理 API

## Endpoints

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /instances/{instance_id} | 获取实例详情（含脱敏令牌） |
| POST | /instances/{instance_id}/sync-token | 从 Pod 日志同步令牌 |
| POST | /instances/{instance_id}/regenerate-token | 重置令牌并重启实例 |

## Instance Status

- `running`
- `stopped`
- `error`
- `restarting`

## Token 字段

| 字段 | 说明 |
|------|------|
| `proxy_token` | OpenClaw gateway 认证令牌 |
| `env_vars.OPENCLAW_GATEWAY_TOKEN` | 前端展示用访问令牌 |
| `env_vars.NODESKCLAW_TOKEN` | 实例侧 Agent 通信令牌 |
