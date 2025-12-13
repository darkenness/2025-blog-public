# Markdown 格式测试文章

这是一篇包含各种 Markdown 格式的测试文章，用于查看代码块阴影效果和其他样式。

## 1. 标题样式

### 三级标题

#### 四级标题

##### 五级标题

## 2. 代码块示例

### JavaScript 代码块

```javascript
// 这是一个 JavaScript 代码块示例
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log('Fibonacci(10) =', result);
```

### Python 代码块

```python
# 这是一个 Python 代码块示例
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quick_sort(numbers)
print(f"排序结果: {sorted_numbers}")
```

### TypeScript 代码块

```typescript
// 这是一个 TypeScript 代码块示例
interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  findUserById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}

const userService = new UserService();
userService.addUser({ id: 1, name: 'Alice', email: 'alice@example.com' });
```

### CSS 代码块

```css
/* 这是一个 CSS 代码块示例 */
.code-block-wrapper {
  position: relative;
  margin: 1em 0 2em;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
}

.prose pre {
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 1rem 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
}
```

### Shell 命令示例

```bash
# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### JSON 配置示例

```json
{
  "name": "2025-blog",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev --turbopack -p 2025",
    "build": "next build"
  },
  "dependencies": {
    "next": "16.0.7",
    "react": "19.2.1"
  }
}
```

## 3. 行内代码

这是行内代码示例：`const x = 10` 和 `function test() {}`。

## 4. 列表

### 无序列表

- 第一项
- 第二项
  - 嵌套项 1
  - 嵌套项 2
- 第三项

### 有序列表

1. 第一步：安装依赖
2. 第二步：配置环境变量
3. 第三步：启动服务器
   1. 检查端口是否被占用
   2. 运行 `npm run dev`

### 任务列表

- [x] 完成代码块阴影样式
- [x] 创建测试文章
- [ ] 测试所有 Markdown 格式
- [ ] 优化样式细节

## 5. 引用块

> 这是一个引用块的示例。
> 
> 引用块可以包含多行内容，用于突出显示重要的信息或引用他人的话语。

> 嵌套引用：
> > 这是嵌套的引用块。

## 6. 表格

| 功能 | 状态 | 说明 |
|------|------|------|
| 代码块阴影 | ✅ 完成 | 已添加多层阴影效果 |
| 标题样式 | ✅ 完成 | 支持 H1-H5 标题 |
| 列表样式 | ✅ 完成 | 支持有序和无序列表 |
| 表格样式 | ✅ 完成 | 支持表格渲染 |
| 图片上传 | ⏳ 进行中 | 正在开发中 |

## 7. 链接和强调

这是一个[链接示例](https://example.com)。

**粗体文本** 和 *斜体文本*，以及 ***粗斜体文本***。

~~删除线文本~~

## 8. 水平分割线

---

## 9. 图片

（注意：实际使用时需要上传图片）

## 10. 代码块对比

### 单个代码块

```javascript
console.log('单个代码块示例');
```

### 多个连续代码块

```javascript
const a = 1;
```

```python
b = 2
```

```typescript
const c: number = 3;
```

## 11. 复杂代码示例

### React 组件示例

```tsx
import { useState, useEffect } from 'react';

interface CounterProps {
  initialValue?: number;
}

export function Counter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    document.title = `计数: ${count}`;
  }, [count]);

  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
    </div>
  );
}
```

### SQL 查询示例

```sql
-- 查询用户信息
SELECT 
  u.id,
  u.name,
  u.email,
  COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name, u.email
ORDER BY post_count DESC
LIMIT 10;
```

## 12. 混合内容

这是一个包含**粗体**、*斜体*、`行内代码`和[链接](https://example.com)的段落。

- 列表项 1 包含 `代码`
- 列表项 2 包含 **粗体**
- 列表项 3 包含 *斜体*

> 引用块中也可以包含 `代码`、**粗体**和*斜体*。

## 总结

这篇文章展示了各种 Markdown 格式，特别是代码块的阴影效果。你可以通过查看不同的代码块来验证阴影样式是否正确应用。

