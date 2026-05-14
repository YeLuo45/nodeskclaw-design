# Blackboard API

> 共享黑板 API

## Endpoints

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /workspaces/{ws}/blackboard | 获取黑板（含 tasks + objectives） |
| GET | /workspaces/{ws}/blackboard/tasks | 任务列表（支持 ?status= 筛选） |
| POST | /workspaces/{ws}/blackboard/tasks | 创建任务 |
| PUT | /workspaces/{ws}/blackboard/tasks/{id} | 更新任务 |
| POST | /workspaces/{ws}/blackboard/tasks/{id}/archive | 归档任务 |
| GET | /workspaces/{ws}/blackboard/objectives | 目标列表 |
| POST | /workspaces/{ws}/blackboard/objectives | 创建目标 |
| PUT | /workspaces/{ws}/blackboard/objectives/{id} | 更新目标 |

## Task Status

```
pending -> in_progress -> done / blocked
blocked -> pending / in_progress
done -> archived
```

## Task Priority

- `low`
- `medium`
- `high`
- `urgent`
