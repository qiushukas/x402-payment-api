# 🌐 主网配置指南 - 接受真实 USDC 支付

本指南将帮您切换到 Base 主网，开始接受真实的 USDC 和 ETH 支付。

---

## ⚠️ 重要警告

**切换到主网意味着：**
- ❗ 涉及真实的加密货币
- ❗ 所有交易都在真实区块链上
- ❗ 需要承担法律和税务责任
- ❗ 必须保护好私钥和 API 密钥
- ❗ 建议先在测试网充分测试

**只有在测试网测试成功后才切换到主网！**

---

## 📋 前提条件检查

在开始前，确保您已经：

- [ ] ✅ 在测试网（Base Sepolia）完成所有测试
- [ ] ✅ 理解支付流程如何工作
- [ ] ✅ 有真实的主网钱包地址
- [ ] ✅ 了解相关的法律和税务要求
- [ ] ✅ 准备好监控和日志系统

---

## 🔑 第 1 步：获取 CDP API 密钥

### 1.1 注册 Coinbase Developer Platform

1. 访问：**https://portal.cdp.coinbase.com**
2. 使用 Coinbase 账户登录或注册
3. 完成身份验证（如果需要）

### 1.2 创建项目

1. 点击 **"Create Project"** 或 **"New Project"**
2. 输入项目信息：
   - **Project Name**: `x402-payment-middleware`
   - **Description**: `Micro-payment middleware for content monetization`
3. 点击 **"Create"**

### 1.3 生成 API 密钥

1. 在项目页面，找到 **"API Keys"** 部分
2. 点击 **"Create API Key"** 或 **"Generate New Key"**
3. 选择权限：
   - ✅ Read
   - ✅ Write（如果需要）
4. 点击 **"Generate"**

### 1.4 保存 API 凭证

**⚠️ 非常重要！**

您会看到：
```
API Key ID: cdp_api_key_abc123...
API Key Secret: cdp_secret_xyz789...
```

**立即保存这些信息！** API Key Secret 只显示一次。

---

## 💾 第 2 步：配置环境变量

### 2.1 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```powershell
# 在 PowerShell 中运行
Copy-Item env.local.template .env.local
```

### 2.2 编辑 .env.local

用文本编辑器打开 `.env.local`，填入您的实际值：

```bash
# CDP API 凭证
CDP_API_KEY_ID=cdp_api_key_abc123...
CDP_API_KEY_SECRET=cdp_secret_xyz789...

# 您的主网钱包地址
RECEIVER_WALLET_ADDRESS=0xYourMainnetAddress

# 主网配置
NETWORK=base-mainnet
ENVIRONMENT=production
FACILITATOR_NETWORK=mainnet
```

### 2.3 验证配置

确保：
- ✅ API Key ID 和 Secret 正确复制
- ✅ 钱包地址是主网地址（不是测试网）
- ✅ Network 设置为 `base-mainnet`

---

## 🔧 第 3 步：更新中间件配置

### 3.1 切换到主网中间件

```powershell
# 备份当前配置
Copy-Item middleware.ts middleware-testnet.ts.backup

# 使用主网配置
Copy-Item middleware-mainnet-with-cdp.ts middleware.ts
```

### 3.2 验证钱包地址

确保 `middleware.ts` 中的钱包地址是您的主网地址。

---

## 📦 第 4 步：安装环境变量支持

确保 Next.js 能读取环境变量：

```powershell
npm install dotenv --save --legacy-peer-deps
```

---

## 🚀 第 5 步：启动主网模式

### 5.1 重启服务器

```powershell
# 停止当前服务器（Ctrl+C）

# 启动主网模式
npm run dev
```

### 5.2 验证主网配置

启动后，检查控制台输出：

```
✓ Ready in 3s
🔒 Running in MAINNET mode
📍 Network: base-mainnet
💰 Receiver: 0xYourMainnetAddress
```

---

## 🧪 第 6 步：测试主网配置

### 6.1 检查 402 响应

访问：
```
http://localhost:3000/protected
```

应该看到：
```json
{
  "network": "base-mainnet",
  "facilitator": {
    "type": "cdp",
    "network": "mainnet"
  },
  "paymentInstructions": {
    "acceptedTokens": ["ETH", "USDC"],
    "chainId": 8453
  }
}
```

### 6.2 验证关键信息

确认：
- ✅ `network` 是 `base-mainnet`
- ✅ `receiverAddress` 是您的主网地址
- ✅ `chainId` 是 8453（Base mainnet）
- ✅ `acceptedTokens` 包含 `USDC`

---

## 💳 第 7 步：准备接受支付

### 7.1 确保钱包配置

您的接收钱包需要：
- ✅ 在 Base 主网上
- ✅ 能接收 USDC 和 ETH
- ✅ 您控制私钥
- ✅ 已备份助记词/私钥

### 7.2 配置钱包网络

如果使用 MetaMask：

**添加 Base 主网：**
```
Network Name: Base Mainnet
RPC URL: https://mainnet.base.org
Chain ID: 8453
Currency Symbol: ETH
Block Explorer: https://basescan.org
```

---

## 🔍 第 8 步：监控和日志

### 8.1 启用详细日志

在 `middleware.ts` 中添加：

```typescript
console.log('💰 Payment received:', {
  amount: price,
  from: senderAddress,
  token: paymentToken,
  timestamp: new Date().toISOString()
});
```

### 8.2 设置监控

建议监控：
- 📊 每日收入
- 📈 支付成功率
- ❌ 失败的支付
- 🚨 异常活动

---

## 📊 第 9 步：价格配置

### 9.1 设置合理价格

考虑：
- 💰 内容价值
- 🌍 目标受众
- 💸 Gas 费用
- 📉 市场竞争

### 9.2 价格建议

| 内容类型 | 建议价格 |
|---------|---------|
| 文章/博客 | $0.01 - $0.10 |
| API 调用 | $0.001 - $0.05 |
| 视频内容 | $0.10 - $1.00 |
| 高级功能 | $1.00+ |

---

## 🔐 安全最佳实践

### 10.1 保护 API 密钥

- ✅ 永远不要提交 `.env.local` 到 Git
- ✅ 添加到 `.gitignore`
- ✅ 使用环境变量管理系统
- ✅ 定期轮换密钥

### 10.2 保护钱包

- ✅ 使用硬件钱包（推荐）
- ✅ 备份助记词/私钥
- ✅ 不要分享私钥
- ✅ 定期转出收入

### 10.3 监控异常

注意：
- ❗ 异常大量的小额支付
- ❗ 来自同一地址的重复支付
- ❗ 支付但不访问内容
- ❗ Gas 价格异常波动

---

## 📈 第 10 步：上线后监控

### 10.1 首日检查清单

- [ ] ✅ 收到第一笔支付
- [ ] ✅ 支付正确到账
- [ ] ✅ 用户能访问内容
- [ ] ✅ 日志正常记录
- [ ] ✅ 无错误报告

### 10.2 定期检查

**每日：**
- 📊 检查收入
- 🔍 查看日志
- ❌ 处理错误

**每周：**
- 📈 分析趋势
- 💡 优化价格
- 🔧 改进功能

---

## 🆘 故障排除

### 问题 1：API 密钥无效

**错误信息：**
```
CDP API authentication failed
```

**解决方案：**
- 检查 API Key ID 和 Secret 是否正确
- 确认密钥没有过期
- 验证项目权限

---

### 问题 2：支付未到账

**可能原因：**
- 钱包地址错误
- 网络配置错误
- Gas 费用不足
- 交易失败

**解决方案：**
- 在 Basescan 查看交易：https://basescan.org
- 验证钱包地址
- 检查网络配置

---

### 问题 3：用户无法支付

**可能原因：**
- 用户钱包未连接主网
- 余额不足
- Gas 费用不足
- 浏览器不兼容

**解决方案：**
- 提供清晰的说明
- 显示所需余额
- 推荐兼容钱包

---

## 📚 相关资源

- **CDP 文档**: https://docs.cdp.coinbase.com
- **Base 文档**: https://docs.base.org
- **x402 文档**: https://x402.org
- **Basescan**: https://basescan.org

---

## ✅ 主网上线检查清单

### 配置检查

- [ ] ✅ CDP API 密钥已配置
- [ ] ✅ 主网钱包地址正确
- [ ] ✅ 环境变量已设置
- [ ] ✅ Network 设置为 `base-mainnet`
- [ ] ✅ 价格设置合理

### 安全检查

- [ ] ✅ `.env.local` 已添加到 `.gitignore`
- [ ] ✅ API 密钥安全存储
- [ ] ✅ 钱包私钥已备份
- [ ] ✅ 只授予必要的权限

### 功能检查

- [ ] ✅ 402 响应正确
- [ ] ✅ 支付说明完整
- [ ] ✅ 接受 USDC 和 ETH
- [ ] ✅ Chain ID 正确 (8453)

### 测试检查

- [ ] ✅ 在测试网充分测试
- [ ] ✅ 支付流程验证
- [ ] ✅ 错误处理测试
- [ ] ✅ 性能测试

### 监控检查

- [ ] ✅ 日志系统就位
- [ ] ✅ 错误监控配置
- [ ] ✅ 收入追踪设置
- [ ] ✅ 告警系统准备

---

## 🎉 完成！

恭喜！您现在可以在 Base 主网上接受真实的 USDC 和 ETH 支付了！

**记住：**
- 💰 这是真实的钱
- 🔐 保护好您的密钥
- 📊 定期监控
- 📝 遵守法律法规

---

**需要帮助？**
- 查看官方文档
- 联系 CDP 支持
- 访问 x402 社区

**祝您成功！** 🚀

