# Topology API

> 工作区拓扑图 API

## Endpoints

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /workspaces/{ws}/topology | 工作区拓扑图 |
| GET | /workspaces/{ws}/topology/reachable | 从指定实例 BFS 可达节点 |
| GET | /workspaces/{ws}/topology/health | 拓扑健康检查 |
| GET | /workspaces/{ws}/topology/message-flow | 消息流量统计 |

## Health Check

返回拓扑健康状态：
- **孤岛**：某节点无法到达其他节点
- **单点故障**：某节点是唯一连接点
