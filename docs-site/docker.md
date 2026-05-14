# Docker

> NoDeskClaw Docker 部署

## 镜像架构

所有 Docker 操作必须显式指定 `linux/amd64` 平台。

```bash
docker build --platform linux/amd64 -t my-image:latest .
```

## Docker Compose

```bash
# CE 版本
docker-compose up -d

# EE 版本
docker-compose -f docker-compose.ee.yml up -d
```

## 数据目录

Docker 实例数据统一存放在 `DOCKER_DATA_DIR`（默认 `~/.nodeskclaw/docker-instances`）。

| 变量 | 作用域 | 说明 |
|------|--------|------|
| `DOCKER_DATA_DIR` | 后端进程 | 容器内工作目录 |
| `DOCKER_HOST_DATA_DIR` | 后端进程 | 宿主机原始路径 |
| `NODESKCLAW_DATA_DIR` | docker-compose.yml | 宿主机数据目录（Windows 必填） |

## 本地开发

```bash
./dev.sh
```
