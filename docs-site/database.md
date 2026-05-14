# Database

> NoDeskClaw 数据库规范

## 软删除

所有数据删除必须使用逻辑删除：

```python
# 禁止
db.delete(model)

# 正确
model.deleted_at = func.now()
```

查询时必须过滤：

```python
query.filter(Model.deleted_at.is_(None))
```

## Alembic 迁移

新增或修改数据模型后，必须通过 `alembic revision --autogenerate` 生成迁移文件。

```bash
# 生成迁移
uv run alembic revision --autogenerate -m "add xxx field"

# 执行迁移
uv run alembic upgrade head
```

规则：
- 禁止手写 revision ID
- 禁止只加 Model 不加迁移
- Partial Unique Index 需确认
