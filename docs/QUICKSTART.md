# 🚀 x402 支付中间件快速开始指南

## ✅ 已完成的配置

### 1. 已安装的包
- ✅ `x402-next` - Next.js 支付中间件
- ✅ `@coinbase/x402` - Coinbase 主网 facilitator

### 2. 已创建的文件

#### 核心文件
- **`middleware.ts`** - 支付中间件主配置文件
  - 配置了两个受保护的路由示例
  - 使用 Base Sepolia 测试网
  - 集成了测试 facilitator

#### 示例页面和 API
- **`app/page.tsx`** - 主页（展示配置信息和导航）
- **`app/protected/page.tsx`** - 受保护的示例页面（$0.01）
- **`app/api/premium/route.ts`** - 受保护的 API 端点（$0.05）

#### 文档和示例
- **`README-X402.md`** - 完整配置文档
- **`middleware.config.example.ts`** - 配置示例（包含测试网和主网）
- **`types/x402.d.ts`** - TypeScript 类型定义

## 📝 下一步操作

### 第 1 步：配置钱包地址 ⚠️ 重要

打开 `middleware.ts`，找到这一行：

```typescript
export const middleware = paymentMiddleware(
  "0xYourAddress", // 👈 在这里替换为您的钱包地址
```

**替换为您的实际钱包地址**

- 测试环境：使用 Base Sepolia 测试网地址
- 生产环境：使用真实的主网地址

### 第 2 步：启动开发服务器

```bash
# 确保在项目目录中
cd c:\Users\Administrator\Desktop\新建文件夹

# 启动开发服务器
npm run dev
```

### 第 3 步：测试支付流程

访问以下 URL 测试：

1. **主页**: http://localhost:3000
   - 查看配置信息和说明

2. **受保护页面**: http://localhost:3000/protected
   - 需要支付 $0.01
   - 使用 Base Sepolia 测试网

3. **高级 API**: http://localhost:3000/api/premium
   - 需要支付 $0.05
   - 返回 JSON 数据

### 第 4 步：获取测试代币

为了在测试网进行测试，您需要：

1. **Base Sepolia 测试币**
   - 访问 Base Sepolia faucet
   - 获取免费的测试 ETH

2. **Solana Devnet 代币**（如果使用 Solana）
   - 使用 Solana CLI: `solana airdrop 1`
   - 或访问 Solana devnet faucet

### 第 5 步：自定义配置

编辑 `middleware.ts` 来：

- ✏️ 修改价格
- ✏️ 添加更多受保护的路由
- ✏️ 自定义描述和 schema
- ✏️ 调整超时设置

参考 `middleware.config.example.ts` 查看更多配置选项。

## 🌐 切换到生产环境（主网）

准备好接受真实支付时：

### 步骤 1：更新 middleware.ts

```typescript
import { paymentMiddleware } from 'x402-next';
import { facilitator } from "@coinbase/x402"; // 取消注释

export const middleware = paymentMiddleware(
  "0xc61cd7032925603c63b2eb658e2b56faac351d24", // 主网地址
  {
    '/protected': {
      price: '$0.01',
      network: "base-mainnet", // 改为主网
      config: {
        description: 'Access to protected content',
      }
    },
  },
  facilitator({ network: 'mainnet' }) // 使用主网 facilitator
);
```

### 步骤 2：测试检查清单

- [ ] 确认钱包地址正确（主网地址）
- [ ] 所有路由都使用主网网络
- [ ] Facilitator 配置为主网
- [ ] 在测试网充分测试
- [ ] 价格设置合理
- [ ] 安全地存储私钥

## 📊 工作原理

### 支付流程

1. **用户访问受保护路由**
   ```
   GET /protected
   ```

2. **中间件拦截请求**
   - 检查是否有有效的支付凭证
   - 如果没有，返回 HTTP 402

3. **返回支付说明**
   ```json
   {
     "error": "Payment Required",
     "price": "$0.01",
     "network": "base-sepolia",
     "paymentInstructions": { ... }
   }
   ```

4. **用户完成支付**
   - 通过钱包支付
   - Facilitator 验证交易

5. **访问授权**
   - 支付验证后，中间件放行请求
   - 用户获得内容访问权限

### HTTP 402 响应

当用户未支付时，会收到：
- **状态码**: 402 Payment Required
- **响应体**: 包含支付说明和价格信息

## 🔍 调试技巧

### 查看中间件日志

在 `middleware.ts` 中添加日志：

```typescript
export const middleware = paymentMiddleware(
  "0xYourAddress",
  routeConfigs,
  facilitatorConfig
);

// 添加日志包装
export default function wrappedMiddleware(request: NextRequest) {
  console.log('🔒 Payment middleware triggered:', request.url);
  return middleware(request);
}
```

### 检查支付状态

在浏览器控制台查看：
- 402 响应
- 支付说明
- 交易状态

### 常见问题

**Q: 收到 402 错误但已经支付**
A: 检查支付凭证是否正确传递，查看网络配置是否匹配

**Q: 中间件不生效**
A: 检查 `config.matcher` 是否包含您的路由

**Q: facilitator 连接失败**
A: 验证 URL 或网络配置，检查网络连接

## 📚 相关资源

- **完整文档**: 查看 `README-X402.md`
- **配置示例**: 查看 `middleware.config.example.ts`
- **类型定义**: 查看 `types/x402.d.ts`
- **官方文档**: https://x402.org

## 💡 使用场景示例

### 1. 内容付费墙
```typescript
'/article/:id': {
  price: '$0.05',
  network: "base-sepolia",
  config: {
    description: '访问付费文章',
  }
}
```

### 2. API 调用限制
```typescript
'/api/ai-service': {
  price: '$0.10',
  network: "base-sepolia",
  config: {
    description: 'AI 服务调用（每次请求）',
    maxTimeoutSeconds: 120,
  }
}
```

### 3. 下载保护
```typescript
'/downloads/premium/:file': {
  price: '$1.00',
  network: "base-sepolia",
  config: {
    description: '下载高级资源',
  }
}
```

## 🎉 开始赚取加密货币！

配置完成后，您就可以开始：
- 🚀 接受加密货币微支付
- 💰 保护有价值的内容和 API
- 🌍 服务全球用户（无需传统支付网关）
- ⚡ 享受快速、低费用的交易

---

**需要帮助？** 查看完整文档 `README-X402.md` 或访问 x402.org

