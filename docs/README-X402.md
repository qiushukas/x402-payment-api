# x402 支付中间件配置指南

这个项目已经配置了 x402 支付中间件，用于在 Next.js 应用中实现基于加密货币的微支付功能。

## 📦 已安装的包

- `x402-next` - Next.js 支付中间件
- `@coinbase/x402` - Coinbase 主网 facilitator（用于生产环境）

## 🚀 快速开始

### 1. 配置钱包地址

在 `middleware.ts` 文件中，将 `0xYourAddress` 替换为您的实际钱包地址：

```typescript
export const middleware = paymentMiddleware(
  "0xYourActualWalletAddress", // 替换这里
  // ... 其他配置
);
```

### 2. 测试配置（当前设置）

当前配置使用测试网环境：
- **网络**: Base Sepolia 和 Solana Devnet
- **Facilitator**: `https://x402.org/facilitator`
- **用途**: 开发和测试

### 3. 运行应用

```bash
npm run dev
```

访问：
- 主页: `http://localhost:3000`
- 受保护页面: `http://localhost:3000/protected` (需支付 $0.01)
- 高级 API: `http://localhost:3000/api/premium` (需支付 $0.05)

## 🔧 配置说明

### 路由配置结构

```typescript
{
  '/your-route': {
    price: '$0.01',           // 访问价格
    network: "base-sepolia",  // 区块链网络
    config: {
      description: '内容描述',
      maxTimeoutSeconds: 60,  // 支付超时时间
      inputSchema: { ... },   // 输入数据 schema
      outputSchema: { ... }   // 输出数据 schema
    }
  }
}
```

### 支持的网络

测试网：
- `base-sepolia` - Base 测试网
- `solana-devnet` - Solana 开发网

主网（生产环境）：
- `base-mainnet` - Base 主网
- `solana-mainnet` - Solana 主网

### Matcher 配置

在 `middleware.ts` 的 `config.matcher` 中定义哪些路径应该受到保护：

```typescript
export const config = {
  matcher: [
    '/protected/:path*',      // 保护所有 /protected 路径
    '/api/premium/:path*',    // 保护所有 /api/premium 路径
  ]
};
```

## 🌐 切换到主网（生产环境）

当您准备好接受真实支付时：

### 1. 更新 middleware.ts

```typescript
import { paymentMiddleware } from 'x402-next';
import { facilitator } from "@coinbase/x402"; // 取消注释

export const middleware = paymentMiddleware(
  "0xYourMainnetAddress",
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

### 2. 关键变更点

- ✅ 将钱包地址改为主网地址
- ✅ 将 `network` 从 `base-sepolia` 改为 `base-mainnet`
- ✅ 使用 `facilitator({ network: 'mainnet' })` 替代测试 URL
- ✅ 取消 `import { facilitator } from "@coinbase/x402"` 的注释

## 📝 高级配置选项

### 自定义付费墙

```typescript
{
  '/custom': {
    price: '$0.10',
    network: "base-sepolia",
    config: {
      customPaywallHtml: `
        <h1>需要支付</h1>
        <p>访问此内容需要支付 $0.10</p>
      `
    }
  }
}
```

### 输出 Schema

为 API 响应定义 schema，便于客户端集成：

```typescript
{
  '/api/data': {
    price: '$0.05',
    network: "base-sepolia",
    config: {
      outputSchema: {
        type: "object",
        properties: {
          data: { type: "array" },
          count: { type: "number" },
          timestamp: { type: "string" }
        }
      }
    }
  }
}
```

## 🔒 安全最佳实践

1. **钱包安全**: 确保接收地址的私钥安全存储
2. **价格设置**: 合理设置价格，避免过高导致用户流失
3. **超时配置**: 根据支付网络调整 `maxTimeoutSeconds`
4. **环境隔离**: 开发环境使用测试网，生产环境使用主网

## 📊 监控和调试

### HTTP 402 响应

未支付的请求会收到 HTTP 402 状态码和支付说明：

```json
{
  "error": "Payment Required",
  "price": "$0.01",
  "network": "base-sepolia",
  "paymentInstructions": { ... }
}
```

### 日志

监控服务器日志以跟踪：
- 支付请求
- 支付验证
- 访问授权

## 🆘 故障排除

### 常见问题

1. **依赖冲突**: 使用 `--legacy-peer-deps` 安装
2. **钱包地址无效**: 确保地址格式正确（0x 开头）
3. **网络配置错误**: 检查 network 值是否匹配可用选项
4. **Facilitator 连接失败**: 验证 facilitator URL 或配置

## 📚 更多资源

- [x402 官方文档](https://x402.org)
- [Next.js 中间件文档](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Base 网络文档](https://base.org)
- [Solana 文档](https://solana.com)

## 💡 示例用例

- 💰 内容付费墙
- 🎯 API 访问控制
- 📄 文档按需购买
- 🎮 游戏功能解锁
- 📊 数据访问收费

---

**注意**: 在测试网充分测试后再切换到主网，确保一切正常运行。

