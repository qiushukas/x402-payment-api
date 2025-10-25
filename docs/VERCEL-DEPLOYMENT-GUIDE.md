# 🚀 Vercel 部署指南

将您的 x402 项目部署到公网，让 x402scan 可以发现！

---

## 📋 准备工作（5 分钟）

### 需要的账户：

1. **GitHub 账户**
   - 注册：https://github.com
   - 免费

2. **Vercel 账户**
   - 注册：https://vercel.com
   - 使用 GitHub 账户登录
   - 免费

---

## 🔧 步骤 1：准备项目

### 1.1 更新中间件

```powershell
# 切换到 x402scan 兼容版本
Copy-Item middleware-x402scan-compatible.ts middleware.ts
```

### 1.2 确保 .gitignore 正确

`.gitignore` 文件应该包含：
```
.env.local
.env
node_modules/
.next/
```

**⚠️ 重要：不要提交敏感信息到 Git！**

---

## 📦 步骤 2：推送到 GitHub

### 2.1 初始化 Git

```powershell
cd "C:\Users\Administrator\Desktop\新建文件夹"

# 初始化（如果还没有）
git init

# 查看状态
git status
```

### 2.2 提交代码

```powershell
# 添加所有文件
git add .

# 提交
git commit -m "Prepare for Vercel deployment with x402scan support"
```

### 2.3 创建 GitHub 仓库

1. **访问 GitHub**：https://github.com/new
2. **创建新仓库**：
   - Repository name: `x402-payment-api`
   - Public 或 Private（都可以）
   - 不要添加 README、.gitignore 或 license
3. **点击 Create repository**

### 2.4 推送代码

```powershell
# 添加远程仓库（替换为您的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/x402-payment-api.git

# 推送
git branch -M main
git push -u origin main
```

---

## 🌐 步骤 3：部署到 Vercel

### 3.1 登录 Vercel

1. 访问：https://vercel.com
2. 点击 "Sign Up" 或 "Login"
3. 选择 "Continue with GitHub"
4. 授权 Vercel 访问 GitHub

### 3.2 导入项目

1. 在 Vercel 主页，点击 **"Add New..."** → **"Project"**
2. 找到您的仓库：`x402-payment-api`
3. 点击 **"Import"**

### 3.3 配置项目

**Framework Preset**: Next.js（自动检测）

**Root Directory**: `./` （保持默认）

**Build Command**: `next build` （保持默认）

**Output Directory**: `.next` （保持默认）

### 3.4 配置环境变量 🔴 重要！

点击 **"Environment Variables"**，添加：

```
CDP_API_KEY_ID = 863ae52c-b280-4dc5-8904-dcd541233cb2
CDP_API_KEY_SECRET = LPRYJsTKXc3wnr3UMu9mHWFuL+O0m7UgsOi7iM/YhgVhlf/r1oTn9XVgfBQGPibqmw3YK1bo3IjTSImwrZfDUw==
RECEIVER_WALLET_ADDRESS = 0xc61cd7032925603c63b2eb658e2b56faac351d24
NETWORK = base-mainnet
ENVIRONMENT = production
FACILITATOR_NETWORK = mainnet
```

**对每个变量：**
- Name: 变量名
- Value: 变量值
- 选择所有环境（Production, Preview, Development）

### 3.5 部署

点击 **"Deploy"** 按钮！

---

## ⏰ 步骤 4：等待部署（2-5 分钟）

Vercel 会：
1. ✅ 安装依赖
2. ✅ 构建 Next.js 项目
3. ✅ 部署到全球 CDN
4. ✅ 配置 HTTPS

**部署成功后，您会看到：**
```
🎉 Congratulations!
Your project is live at:
https://x402-payment-api.vercel.app
```

---

## 🧪 步骤 5：测试部署

### 5.1 访问您的 URL

```
https://your-project.vercel.app
```

应该能看到主页！

### 5.2 测试 x402 端点

```
https://your-project.vercel.app/protected
```

应该返回 402 响应！

### 5.3 使用 PowerShell 测试

```powershell
Invoke-RestMethod -Uri "https://your-project.vercel.app/protected"
```

应该看到：
```json
{
  "x402Version": 1,
  "error": "Payment Required",
  "accepts": [...]
}
```

---

## 📊 步骤 6：注册到 x402scan

### 现在您可以注册了！

1. **访问 x402scan**
   ```
   https://x402scan.com/register
   或
   https://bazaar.x402.org/register
   ```

2. **填写信息**
   ```
   Resource URL: https://your-project.vercel.app/protected
   Name: Premium Content Access
   Description: Access exclusive protected content
   Category: Content
   Tags: content, premium, paid
   ```

3. **提交验证**

4. **等待批准**（通常几分钟）

---

## 🔄 更新部署

### 当您修改代码后：

```powershell
# 提交更改
git add .
git commit -m "Update middleware"
git push

# Vercel 会自动重新部署！
```

---

## 🌍 自定义域名（可选）

### 如果您有域名：

1. 在 Vercel 项目设置中
2. 点击 "Domains"
3. 添加您的域名
4. 按照说明配置 DNS
5. 等待生效（几分钟到几小时）

**示例：**
```
api.yourdomain.com → 您的 Vercel 项目
```

---

## 📋 部署检查清单

### 部署前
- [ ] ✅ 中间件已更新为 x402scan 兼容版本
- [ ] ✅ .gitignore 包含 .env.local
- [ ] ✅ 代码已提交到 GitHub
- [ ] ✅ Vercel 账户已创建

### 部署中
- [ ] ✅ 项目已导入到 Vercel
- [ ] ✅ 环境变量已配置
- [ ] ✅ 部署成功

### 部署后
- [ ] ✅ 访问主页正常
- [ ] ✅ /protected 返回 402
- [ ] ✅ 响应格式符合 x402scan
- [ ] ✅ HTTPS 正常工作

### 注册
- [ ] ✅ 在 x402scan 注册端点
- [ ] ✅ 验证通过
- [ ] ✅ 在市场中展示

---

## 🆘 常见问题

### Q: 部署失败了

**检查：**
1. `package.json` 中的依赖是否完整
2. 环境变量是否都设置了
3. Build 日志中的错误信息

**解决：**
- 查看 Vercel 部署日志
- 修复错误后重新推送

---

### Q: 环境变量不生效

**检查：**
1. 是否在 Vercel 设置了环境变量
2. 变量名是否正确
3. 是否选择了所有环境

**解决：**
- 重新部署（Deployments → 点击 "Redeploy"）

---

### Q: CORS 错误

**解决：**
在 `next.config.js` 添加：
```javascript
headers: async () => [
  {
    source: '/api/:path*',
    headers: [
      { key: 'Access-Control-Allow-Origin', value: '*' },
      { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
    ],
  },
],
```

---

## 💰 费用

### Vercel 免费计划包括：

- ✅ 无限部署
- ✅ HTTPS
- ✅ 全球 CDN
- ✅ 100GB 带宽/月
- ✅ 无限 API 请求

**对大多数项目足够了！**

如果超出：
- Pro 计划：$20/月

---

## 🎊 完成！

部署成功后，您拥有：

- ✅ 公网可访问的 URL
- ✅ 自动 HTTPS
- ✅ 符合 x402scan 标准
- ✅ 可以注册到市场
- ✅ 全球 CDN 加速

**您的 API 现在对全世界开放了！** 🌍

---

## 📞 需要帮助？

- **Vercel 文档**: https://vercel.com/docs
- **Next.js 部署**: https://nextjs.org/docs/deployment
- **x402scan**: https://x402scan.com
- **GitHub**: https://docs.github.com

---

**准备好部署了吗？开始吧！** 🚀

