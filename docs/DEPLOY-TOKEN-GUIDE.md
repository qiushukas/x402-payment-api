# 🪙 部署代币和销售合约指南

本指南将帮您在 Base Mainnet 上部署自己的代币，并创建 USDC 销售系统。

---

## 📋 概述

### 您将部署：

1. **您的代币合约（ERC-20）**
   - 可自定义名称、符号、供应量
   - 标准 ERC-20 代币

2. **代币销售合约**
   - 用户用 USDC 购买您的代币
   - 自动处理兑换和转账
   - 您控制价格和供应

---

## 🛠️ 方案 1：使用 Remix（最简单）

### 第 1 步：准备工作

需要：
- ✅ MetaMask 钱包
- ✅ Base Mainnet 网络已配置
- ✅ 少量 ETH（用于 Gas 费，约 $5-10）

### 第 2 步：使用 Remix IDE

1. **访问 Remix**
   ```
   https://remix.ethereum.org
   ```

2. **创建文件**
   - 创建 `MyToken.sol`
   - 复制 `contracts/MyToken.sol` 的内容

3. **安装 OpenZeppelin**
   - 在 Remix 中，文件会自动导入依赖

4. **编译合约**
   - 选择 Solidity 版本：0.8.20
   - 点击 "Compile"

5. **部署代币**
   - 切换到 "Deploy & Run" 标签
   - Environment 选择 "Injected Provider - MetaMask"
   - 确认 MetaMask 连接到 Base Mainnet
   - 填写构造函数参数：
     - name: `"MyToken"`（您的代币名称）
     - symbol: `"MTK"`（您的代币符号，3-5个字母）
     - initialSupply: `1000000`（100万个代币）
     - tokenDecimals: `18`（标准）
   - 点击 "Deploy"
   - 在 MetaMask 中确认交易

6. **保存代币地址**
   ```
   您的代币地址: 0x...（从 Remix 复制）
   ```

### 第 3 步：部署销售合约

1. **创建销售合约文件**
   - 创建 `TokenSale.sol`
   - 复制 `contracts/TokenSale.sol` 的内容

2. **编译**

3. **部署**
   - 填写构造函数参数：
     - _token: `您的代币地址`
     - _usdc: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`（Base USDC）
     - _price: `10000`（示例：$0.01 每个代币）
     - _minPurchase: `1000000000000000000`（1 个代币，18位小数）
     - _maxPurchase: `1000000000000000000000`（1000 个代币）
   - 点击 "Deploy"
   - 确认交易

4. **保存销售合约地址**
   ```
   销售合约地址: 0x...
   ```

### 第 4 步：配置销售合约

1. **批准代币**
   - 在 MyToken 合约中，调用 `approve`
   - spender: `销售合约地址`
   - amount: `要销售的代币数量`（如 100000 * 10^18）

2. **存入代币到销售合约**
   - 在 TokenSale 合约中，调用 `depositTokens`
   - amount: `要销售的代币数量`

---

## 🎯 方案 2：使用 Hardhat/Foundry（开发者）

### 设置项目

```bash
# 创建 Hardhat 项目
npm install --save-dev hardhat
npx hardhat init

# 安装依赖
npm install @openzeppelin/contracts
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

### 配置 hardhat.config.js

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    baseMainnet: {
      url: "https://mainnet.base.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 8453
    }
  }
};
```

### 部署脚本

创建 `scripts/deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {
  // 部署代币
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(
    "MyToken",
    "MTK",
    1000000,
    18
  );
  await token.waitForDeployment();
  console.log("Token deployed to:", await token.getAddress());

  // 部署销售合约
  const TokenSale = await hre.ethers.getContractFactory("TokenSale");
  const sale = await TokenSale.deploy(
    await token.getAddress(),
    "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
    10000, // $0.01 per token
    ethers.parseEther("1"), // min 1 token
    ethers.parseEther("1000") // max 1000 tokens
  );
  await sale.waitForDeployment();
  console.log("Sale deployed to:", await sale.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### 部署

```bash
npx hardhat run scripts/deploy.js --network baseMainnet
```

---

## 💰 定价说明

### 价格计算

**price 参数**是以 USDC 的小数（6 位）表示的：

```
如果您想要：
- 1 个代币 = $0.01  → price = 10000
- 1 个代币 = $0.10  → price = 100000
- 1 个代币 = $1.00  → price = 1000000
- 1 个代币 = $10.00 → price = 10000000

公式: price = (美元价格) * 10^6
```

---

## 🔗 集成到 x402 系统

### 创建购买端点

```typescript
// app/api/buy-token/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { tokenAmount, userAddress } = await request.json();
  
  // 这里处理购买逻辑
  // 用户通过 x402 支付 USDC
  // 然后从销售合约购买代币
  
  return NextResponse.json({
    success: true,
    tokenAmount,
    txHash: '0x...'
  });
}
```

### 在 middleware 中添加

```typescript
'/api/buy-token': {
  price: '$0.01', // 根据您的代币价格
  network: "base-mainnet",
  config: {
    description: '购买代币 - 用 USDC 兑换代币',
  }
}
```

---

## 📊 示例：完整流程

### 1. 用户访问购买页面

```
http://localhost:3000/buy-token
```

### 2. 选择购买数量

```
用户想买 100 个代币
价格: $0.01 每个
总计: $1.00 USDC
```

### 3. x402 处理支付

```
用户支付 $1 USDC → 您的钱包
```

### 4. 发送代币给用户

```
从销售合约发送 100 个代币 → 用户钱包
```

---

## 🔐 安全建议

1. **审计合约**
   - 在主网部署前，让专业团队审计
   - 或使用已审计的模板

2. **限制供应**
   - 设置合理的销售上限
   - 不要一次性存入所有代币

3. **测试**
   - 先在测试网部署
   - 用小额在主网测试

4. **监控**
   - 监控销售合约余额
   - 定期检查交易

---

## 📈 Gas 费用估算

在 Base Mainnet 上：

| 操作 | Gas 费用（约） |
|------|---------------|
| 部署代币合约 | $2-5 |
| 部署销售合约 | $3-7 |
| 批准代币 | $0.50-1 |
| 存入代币 | $0.50-1 |
| **总计** | **约 $6-14** |

---

## 🎯 快速开始清单

### 准备阶段
- [ ] 决定代币名称和符号
- [ ] 决定总供应量
- [ ] 决定代币价格（USDC）
- [ ] 准备钱包和 ETH（Gas费）

### 部署阶段
- [ ] 部署代币合约
- [ ] 部署销售合约
- [ ] 批准和存入代币
- [ ] 测试购买功能

### 集成阶段
- [ ] 创建购买页面
- [ ] 集成到 x402
- [ ] 测试完整流程
- [ ] 上线销售

---

## 💡 其他选项

### 使用现有平台

如果不想自己部署合约，可以使用：

1. **Uniswap**
   - 创建流动性池
   - 用户直接兑换

2. **代币发行平台**
   - pump.fun
   - Bonding Curve 平台

3. **第三方服务**
   - Coinbase Commerce
   - 其他支付网关

---

## 📞 需要帮助？

- **Remix 文档**: https://remix-ide.readthedocs.io
- **OpenZeppelin**: https://docs.openzeppelin.com
- **Base 文档**: https://docs.base.org
- **Hardhat**: https://hardhat.org/docs

---

## 🎉 完成！

部署完成后，您就拥有：
- ✅ 自己的 ERC-20 代币
- ✅ USDC 销售系统
- ✅ 完全控制权

用户可以用 USDC 购买您的代币！🚀

