# 📊 x402scan 注册指南

让您的支付端点在 x402 Bazaar 中被全球发现！

---

## 🎯 什么是 x402scan？

x402scan（也叫 x402 Bazaar）是一个**去中心化的 API 市场**，用户和 AI 代理可以发现和使用付费资源。

### 优势：

1. **增加曝光** - 在全球目录中展示
2. **AI 集成** - AI 助手自动发现您的 API
3. **增加收入** - 更多用户 = 更多支付
4. **信誉提升** - 在官方平台列出

---

## ✅ 注册您的端点

### 方法 1：在线注册

1. **访问 x402scan**
   ```
   https://x402scan.com 或 https://bazaar.x402.org
   ```

2. **点击 "Register Resource"**

3. **填写您的端点 URL**
   ```
   https://your-domain.com/protected
   https://your-domain.com/api/premium
   https://your-domain.com/api/weather
   ```

4. **提交**
   - x402scan 会自动验证您的端点
   - 检查是否符合 schema
   - 如果通过，您的端点会被列出

---

## 📋 Schema 要求

### x402scan 需要的响应格式：

```typescript
{
  x402Version: 1,
  error: "Payment Required",
  accepts: [
    {
      scheme: "exact",
      network: "base",
      maxAmountRequired: "10000",  // USDC amount in wei
      resource: "https://your-domain.com/endpoint",
      description: "Clear description of what this API does",
      mimeType: "application/json",
      payTo: "0xYourAddress",
      maxTimeoutSeconds: 60,
      asset: "USDC",
      
      outputSchema: {
        input: {
          type: "http",
          method: "GET",
          queryParams: {
            // 定义输入参数
          }
        },
        output: {
          // 定义输出格式
        }
      }
    }
  ]
}
```

---

## 🔧 更新您的中间件

### 使用兼容 x402scan 的中间件：

我已经为您创建了 `middleware-x402scan-compatible.ts`

#### 步骤 1：备份当前中间件

```powershell
Copy-Item middleware.ts middleware-mainnet.backup.ts
```

#### 步骤 2：使用新中间件

```powershell
Copy-Item middleware-x402scan-compatible.ts middleware.ts
```

#### 步骤 3：重启服务器

```powershell
npm run dev
```

---

## 🧪 验证您的端点

### 测试响应格式：

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/protected"
```

应该看到：
```json
{
  "x402Version": 1,
  "error": "Payment Required",
  "accepts": [
    {
      "scheme": "exact",
      "network": "base",
      "maxAmountRequired": "10000",
      "resource": "http://localhost:3000/protected",
      ...
    }
  ]
}
```

---

## 🌐 部署到公网

### 要在 x402scan 注册，您需要：

#### 选项 1：使用 Vercel（推荐）

1. **创建 Vercel 账户**
   ```
   https://vercel.com
   ```

2. **部署项目**
   ```powershell
   npm install -g vercel
   vercel
   ```

3. **获取公网 URL**
   ```
   https://your-project.vercel.app
   ```

#### 选项 2：使用其他托管

- Netlify
- Railway
- Heroku
- 自己的服务器

---

## 📝 注册步骤（完整）

### 1. 准备端点

确保您的端点：
- ✅ 部署到公网
- ✅ 返回正确的 x402 响应
- ✅ 包含完整的 schema
- ✅ HTTPS（生产环境）

### 2. 访问注册页面

```
https://x402scan.com/register
或
https://bazaar.x402.org/register
```

### 3. 填写信息

```
Resource URL: https://your-domain.com/api/weather
Name: Weather API
Description: Real-time weather data for any location
Category: Data / Weather
Tags: weather, api, data
```

### 4. 提交验证

x402scan 会：
- 检查 URL 是否可访问
- 验证 402 响应格式
- 确认 schema 完整性
- 测试支付流程

### 5. 上线！

通过后，您的端点会出现在：
```
https://x402scan.com/browse
https://bazaar.x402.org/marketplace
```

---

## 📊 价格转换

### USDC 金额计算：

x402scan 需要 **wei 单位**的金额（6 位小数）：

```
价格转换公式: maxAmountRequired = 价格(USD) * 10^6

例如：
$0.001 → 1000
$0.01  → 10000
$0.05  → 50000
$0.10  → 100000
$1.00  → 1000000
$10.00 → 10000000
```

---

## 🎯 优化您的列表

### 让您的端点更吸引人：

#### 1. 清晰的描述

❌ 差：`"API endpoint"`
✅ 好：`"Get real-time weather data including temperature, conditions, and humidity for any location worldwide"`

#### 2. 完整的 Schema

```typescript
outputSchema: {
  input: {
    type: "http",
    method: "GET",
    queryParams: {
      location: {
        type: "string",
        required: true,
        description: "City name or coordinates"
      }
    }
  },
  output: {
    type: "object",
    properties: {
      temperature: { type: "number" },
      conditions: { type: "string" }
    }
  }
}
```

#### 3. 有用的标签

```typescript
extra: {
  provider: "Your Company Name",
  tags: ["weather", "data", "real-time", "global"],
  examples: [
    {
      description: "Get weather for San Francisco",
      url: "https://your-domain.com/api/weather?location=San Francisco"
    }
  ]
}
```

---

## 🤖 AI 代理发现

### 让 AI 能使用您的 API：

当您在 x402scan 注册后，AI 代理（如 ChatGPT、Claude 等）可以：

1. **自动发现您的 API**
2. **理解如何使用**（通过 schema）
3. **处理支付**（通过 x402）
4. **调用您的端点**
5. **向用户返回结果**

### 示例流程：

```
用户: "帮我查一下北京的天气"
AI: [搜索 x402scan]
    [找到您的 weather API]
    [读取 inputSchema]
    [知道需要 location 参数]
    [处理 $0.001 支付]
    [调用 API]
    [返回天气信息给用户]
```

---

## 📈 监控和分析

### x402scan 提供的统计：

- 📊 调用次数
- 💰 总收入
- 🌍 地理分布
- ⭐ 用户评分
- 🤖 AI 代理使用情况

---

## 🎯 最佳实践

### 1. 保持端点稳定

- ✅ 高可用性（99%+）
- ✅ 快速响应（< 1秒）
- ✅ 错误处理完善

### 2. 更新文档

- ✅ 保持 schema 最新
- ✅ 添加使用示例
- ✅ 说明限制和要求

### 3. 合理定价

- ✅ 测试市场价格
- ✅ 考虑竞争对手
- ✅ 提供不同价格层级

### 4. 响应用户反馈

- ✅ 监控评分
- ✅ 回复评论
- ✅ 改进服务

---

## 📋 注册检查清单

### 准备阶段

- [ ] ✅ 端点已部署到公网
- [ ] ✅ 返回正确的 x402 响应
- [ ] ✅ Schema 完整且准确
- [ ] ✅ HTTPS 已配置
- [ ] ✅ 描述清晰有用

### 注册阶段

- [ ] ✅ 在 x402scan 创建账户
- [ ] ✅ 提交端点 URL
- [ ] ✅ 填写元数据
- [ ] ✅ 通过验证

### 上线后

- [ ] ✅ 监控使用情况
- [ ] ✅ 响应用户反馈
- [ ] ✅ 优化性能
- [ ] ✅ 更新文档

---

## 🆘 故障排除

### 常见问题：

#### 1. 验证失败

**原因**：响应格式不符合 schema

**解决**：使用 `middleware-x402scan-compatible.ts`

#### 2. 无法访问

**原因**：端点不是公网 URL

**解决**：部署到 Vercel 或其他托管服务

#### 3. Schema 错误

**原因**：inputSchema 或 outputSchema 格式错误

**解决**：参考示例，确保格式正确

---

## 🎊 完成！

注册成功后，您的端点将：

- ✅ 在 x402scan 上展示
- ✅ 被 AI 代理发现
- ✅ 获得更多用户
- ✅ 增加收入

---

## 📞 资源

- **x402scan**: https://x402scan.com
- **x402 文档**: https://x402.org
- **Vercel**: https://vercel.com
- **示例中间件**: `middleware-x402scan-compatible.ts`

---

**准备好注册了吗？** 🚀

1. 更新中间件 → `middleware-x402scan-compatible.ts`
2. 部署到公网 → Vercel
3. 注册到 x402scan → 增加曝光

**让全世界发现您的 API！**

