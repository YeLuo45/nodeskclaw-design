# Deployment

> NoDeskClaw K8s 部署

## 集群

- Kubernetes（Volcengine VKE）
- 部署地区：火山云

## Docker 镜像

所有镜像必须指定 `linux/amd64` 平台构建。

```bash
docker build --platform linux/amd64 -t registry.example.com/nodeskclaw:latest .
```

## 环境变量

### 后端

| 变量 | 说明 |
|------|------|
| `DB_POOL_SIZE` | 数据库连接池大小 |
| `DB_POOL_MAX_OVERFLOW` | 溢出连接数 |
| `DOCKER_DATA_DIR` | Docker 数据目录 |
| `DOCKER_HOST_DATA_DIR` | 宿主机 Docker 数据目录 |

### 数据库

PostgreSQL（Volcengine RDS）

## 健康检查

拓扑健康检查端点：`GET /workspaces/{ws}/topology/health`

返回：
- 孤岛检测
- 单点故障检测
