# Auth

> NoDeskClaw 认证授权系统

## 认证方式

### JWT

人类用户通过 JWT 访问需要认证的端点。

### proxy_token

AI 员工通过 Bearer token 访问，匹配 `instances.proxy_token` 后找到实例创建者，以创建者身份调用 API。

## proxy_token 认证流程

```
1. AI 员工携带 Bearer token 请求
2. 后端查找 instances.proxy_token 匹配
3. 找到实例创建者（User）
4. 返回创建者的 User 对象
5. AI 员工继承创建者的组织和工作区权限
```

## 认证依赖

| 依赖 | 人类 | AI |
|------|------|-----|
| `get_current_user` | ✅ | ❌ |
| `get_current_user_or_agent` | ✅ | ✅ |
| `get_current_org` | ✅ | ❌ |
| `get_current_org_or_agent` | ✅ | ✅ |

## 令牌重置

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /instances/{id} | 查看当前令牌（脱敏） |
| POST | /instances/{id}/sync-token | 从 Pod 日志同步令牌 |
| POST | /instances/{id}/regenerate-token | 生成新令牌并重启实例 |
