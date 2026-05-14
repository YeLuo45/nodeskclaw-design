# Frontend

> NoDeskClaw 前端 — Vue 3 + Vite + TypeScript

## 组件

### nodeskclaw-portal（用户门户）

CE + EE 共用，Vue 3 + Vite + TypeScript + Tailwind CSS + Three.js

```bash
cd nodeskclaw-portal
npm install
npm run dev
npm run build
vue-tsc -b
```

### ee/nodeskclaw-frontend（Admin 管理后台）

EE-only，Vue 3 + Vite + TypeScript + Tailwind CSS + shadcn-vue

## 命名约定

| 类型 | 规则 |
|------|------|
| 组件文件 | PascalCase（`UserProfile.vue`） |
| 工具函数 | camelCase（`useAuth.ts`） |
| 类型/接口 | PascalCase（`UserInfo`） |
| 常量 | UPPER_SNAKE_CASE |
| 布尔变量 | `is_`、`has_`、`can_` 前缀 |

## 图标

使用 `lucide-vue-next`，禁止 emoji。

```vue
<!-- 禁止 -->
<span>🔍 搜索</span>
<!-- 正确 -->
<Search class="w-4 h-4" />
```

## i18n

新增用户可见文案必须接入 i18n，不允许硬编码中文 UI 文案。

- 统一使用小写点分级：`errors.auth.token_invalid`
- 一律使用命名参数：`t('errors.instance.not_found', { name })`
