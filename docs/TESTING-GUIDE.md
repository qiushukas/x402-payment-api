# 🧪 x402 支付中间件测试指南

本指南将帮助您完整测试 x402 支付中间件的集成。

## 📋 测试前准备

### 1. 确认配置

✅ **检查 middleware.ts**
- 钱包地址: `0xc61cd7032925603c63b2eb658e2b56faac351d24`
- 网络: `base-sepolia` (测试网)
- Facilitator: `https://x402.org/facilitator`

✅ **确认路由配置**
- `/protected` - $0.01
- `/api/premium` - $0.05  
- `/api/weather` - $0.001

### 2. 启动开发服务器

```bash
npm run dev
```

等待服务器启动，默认在 `http://localhost:3000`

## 🔬 第一步：验证 402 响应

这是最基本的测试 - 确认中间件正确返回 HTTP 402 状态码。

### 方法 1: 使用自动化测试脚本（推荐）

```bash
node test-integration.js
```

测试脚本会：
- ✓ 测试所有受保护的端点
- ✓ 验证返回 402 状态码
- ✓ 检查支付说明是否存在
- ✓ 显示详细的测试结果

### 方法 2: 使用 curl 命令

#### 测试受保护页面

```bash
curl -i http://localhost:3000/protected
```

**期望响应:**
```
HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "error": "Payment Required",
  "price": "$0.01",
  "network": "base-sepolia",
  "paymentInstructions": {
    // ... 支付说明详情
  }
}
```

#### 测试高级 API

```bash
curl -i http://localhost:3000/api/premium
```

**期望响应:**
```
HTTP/1.1 402 Payment Required
...
{
  "price": "$0.05",
  ...
}
```

#### 测试天气 API（带参数）

```bash
curl -i "http://localhost:3000/api/weather?location=Beijing&units=celsius"
```

**期望响应:**
```
HTTP/1.1 402 Payment Required
...
{
  "price": "$0.001",
  ...
}
```

### 方法 3: 使用浏览器

1. 打开浏览器访问 `http://localhost:3000/protected`
2. 打开浏览器开发者工具 (F12)
3. 查看 Network 标签
4. 应该看到 402 状态码

## 💳 第二步：获取测试代币

要完成实际支付测试，您需要 Base Sepolia 测试代币。

### 获取 Base Sepolia ETH

1. **使用 Base Sepolia Faucet**
   - 访问: https://www.alchemy.com/faucets/base-sepolia
   - 或者: https://portal.cdp.coinbase.com/products/faucet
   
2. **输入您的钱包地址**
   ```
   0xc61cd7032925603c63b2eb658e2b56faac351d24
   ```

3. **获取测试 ETH**
   - 通常可以获得 0.1 - 1 测试 ETH
   - 足够进行多次测试

### 验证余额

使用区块链浏览器检查：
```
https://sepolia.basescan.org/address/0xc61cd7032925603c63b2eb658e2b56faac351d24
```

## 🔐 第三步：完成支付流程

### 使用兼容的客户端

x402 支付需要使用兼容的客户端或钱包来处理支付流程。

#### 选项 1: 使用 x402 客户端 SDK

安装客户端 SDK:
```bash
npm install x402-client
```

示例代码:
```typescript
import { X402Client } from 'x402-client';

const client = new X402Client({
  network: 'base-sepolia'
});

// 请求受保护资源
const response = await client.get('http://localhost:3000/protected');
// SDK 会自动处理 402 响应和支付流程
```

#### 选项 2: 手动测试流程

1. **发起请求并获取支付说明**
   ```bash
   curl http://localhost:3000/protected > payment-instructions.json
   ```

2. **检查支付说明**
   ```bash
   cat payment-instructions.json
   ```

3. **使用钱包签署支付**
   - 解析 `paymentInstructions` 中的支付数据
   - 使用兼容的 Web3 钱包签署

4. **重新请求并包含支付证明**
   ```bash
   curl -H "X-PAYMENT: <payment-payload>" http://localhost:3000/protected
   ```

## 📊 第四步：验证成功响应

支付完成后，应该收到实际内容而不是 402 错误。

### 成功的响应示例

#### /protected 端点
```json
{
  "content": "这是受保护的内容",
  "accessLevel": "premium",
  "timestamp": "2025-10-25T..."
}
```

#### /api/premium 端点
```json
{
  "data": {
    "message": "这是受保护的高级 API 数据",
    "premiumFeatures": [...]
  },
  "message": "成功访问高级 API 端点",
  "timestamp": "..."
}
```

#### /api/weather 端点
```json
{
  "temperature": 22,
  "conditions": "sunny",
  "humidity": 65,
  "location": "Beijing",
  "timestamp": "..."
}
```

## 🐛 调试和故障排除

### 常见问题

#### 1. 没有返回 402 状态码

**可能原因:**
- 中间件配置错误
- matcher 路径不匹配
- 中间件未正确加载

**解决方法:**
```bash
# 检查中间件文件
cat middleware.ts

# 确认 matcher 配置包含您的路由
# 重启开发服务器
npm run dev
```

#### 2. 返回 404 Not Found

**可能原因:**
- 路由文件不存在
- API 路由路径错误

**解决方法:**
```bash
# 检查路由文件是否存在
ls app/protected/page.tsx
ls app/api/premium/route.ts
ls app/api/weather/route.ts
```

#### 3. 支付验证失败

**可能原因:**
- 支付签名无效
- 网络配置不匹配
- Facilitator 连接问题

**解决方法:**
- 确认使用正确的网络 (base-sepolia)
- 检查钱包地址正确
- 验证 facilitator URL 可访问

### 启用调试日志

在 `middleware.ts` 中添加日志:

```typescript
import { NextRequest } from 'next/server';

export default function debugMiddleware(request: NextRequest) {
  console.log('🔒 Payment middleware triggered');
  console.log('📍 URL:', request.url);
  console.log('📋 Method:', request.method);
  console.log('🔑 Headers:', Object.fromEntries(request.headers));
  
  return middleware(request);
}

export { config };
```

### 查看详细响应

使用 curl 的详细模式:
```bash
curl -v http://localhost:3000/protected
```

## ✅ 测试检查清单

完成以下检查以确保集成正确：

### 基础集成
- [ ] 开发服务器成功启动
- [ ] 所有受保护路由返回 402 状态码
- [ ] 402 响应包含支付说明
- [ ] 支付说明包含正确的价格
- [ ] 网络配置正确 (base-sepolia)

### 元数据验证
- [ ] 每个端点都有清晰的 description
- [ ] inputSchema 正确定义（如适用）
- [ ] outputSchema 正确定义
- [ ] 必需参数被标记为 required

### 支付流程
- [ ] 获得测试代币
- [ ] 能够签署支付
- [ ] 支付后能访问内容
- [ ] 支付凭证正确传递

### 发现增强
- [ ] 描述清晰且有帮助
- [ ] Schema 完整且准确
- [ ] 价格合理设置
- [ ] 超时配置适当

## 📈 测试不同场景

### 场景 1: 不同价格点
测试三个不同价格的端点：
- $0.001 (天气 API) - 微支付
- $0.01 (受保护页面) - 低价内容
- $0.05 (高级 API) - 中等价格

### 场景 2: 带参数的请求

GET 请求:
```bash
curl "http://localhost:3000/api/weather?location=Shanghai&units=celsius"
```

POST 请求:
```bash
curl -X POST http://localhost:3000/api/premium \
  -H "Content-Type: application/json" \
  -d '{"query":"test","limit":5}'
```

### 场景 3: 并发请求

测试多个同时请求:
```bash
for i in {1..5}; do
  curl -s http://localhost:3000/protected &
done
wait
```

## 🎯 高级测试

### 性能测试

使用 Apache Bench:
```bash
ab -n 100 -c 10 http://localhost:3000/protected
```

### 负载测试

使用 wrk:
```bash
wrk -t4 -c100 -d30s http://localhost:3000/api/premium
```

### 安全测试

1. **测试无效支付凭证**
   ```bash
   curl -H "X-PAYMENT: invalid" http://localhost:3000/protected
   ```

2. **测试过期凭证**
3. **测试重放攻击**

## 📝 测试报告模板

完成测试后，记录结果：

```
测试日期: 2025-10-25
测试环境: Base Sepolia 测试网
钱包地址: 0xc61cd7032925603c63b2eb658e2b56faac351d24

测试结果:
✓ 基础 402 响应: 通过
✓ 支付说明正确: 通过
✓ 所有端点可访问: 通过
✓ 元数据完整: 通过
✓ 支付流程: 通过

问题和注意事项:
- 无

结论: 集成测试成功完成 ✅
```

## 🚀 准备生产环境

测试通过后，准备切换到主网：

1. [ ] 所有测试网测试通过
2. [ ] 文档已更新
3. [ ] 监控已配置
4. [ ] 备份钱包私钥
5. [ ] 更新为主网配置
6. [ ] 在主网进行小额测试
7. [ ] 正式上线

---

**需要帮助？** 
- 查看 README-X402.md 了解详细配置
- 访问 https://x402.org 查看官方文档
- 检查 middleware.ts 确认配置正确

