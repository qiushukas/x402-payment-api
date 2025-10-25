# ⚡ 快速测试命令参考

快速复制粘贴的测试命令集合。

## 🚀 启动服务器

```bash
npm run dev
```

## 🧪 自动化测试

### 运行完整测试套件
```bash
node test-integration.js
```

### 运行 cURL 测试脚本
```bash
bash test-with-curl.sh
```

## 📝 手动 cURL 测试

### 测试受保护页面 ($0.01)
```bash
curl -i http://localhost:3000/protected
```

### 测试高级 API ($0.05)
```bash
curl -i http://localhost:3000/api/premium
```

### 测试天气 API - 北京 ($0.001)
```bash
curl -i "http://localhost:3000/api/weather?location=Beijing&units=celsius"
```

### 测试天气 API - 上海
```bash
curl -i "http://localhost:3000/api/weather?location=Shanghai&units=celsius"
```

### 测试天气 API - 纽约（华氏度）
```bash
curl -i "http://localhost:3000/api/weather?location=NewYork&units=fahrenheit"
```

## 📮 POST 请求测试

### 高级 API POST 请求
```bash
curl -i -X POST http://localhost:3000/api/premium \
  -H "Content-Type: application/json" \
  -d '{"query":"test","limit":10,"format":"json"}'
```

### 天气 API POST 请求
```bash
curl -i -X POST http://localhost:3000/api/weather \
  -H "Content-Type: application/json" \
  -d '{"location":"Tokyo","units":"celsius"}'
```

## 🔍 详细输出测试

### 详细模式（显示所有 HTTP 头）
```bash
curl -v http://localhost:3000/protected
```

### 只显示 HTTP 头
```bash
curl -I http://localhost:3000/protected
```

### 格式化 JSON 输出（需要 jq）
```bash
curl -s http://localhost:3000/protected | jq .
```

### 保存响应到文件
```bash
curl http://localhost:3000/protected > response.json
cat response.json | jq .
```

## 🧮 批量测试

### 测试所有端点（一次性）
```bash
echo "测试 /protected..."
curl -s http://localhost:3000/protected | jq -r '.price // "Error"'

echo "测试 /api/premium..."
curl -s http://localhost:3000/api/premium | jq -r '.price // "Error"'

echo "测试 /api/weather..."
curl -s "http://localhost:3000/api/weather?location=Beijing" | jq -r '.price // "Error"'
```

### 并发测试（10 个并发请求）
```bash
for i in {1..10}; do
  curl -s http://localhost:3000/protected &
done
wait
echo "并发测试完成"
```

### 压力测试（100 个连续请求）
```bash
for i in {1..100}; do
  echo "请求 #$i"
  curl -s http://localhost:3000/protected > /dev/null
done
echo "压力测试完成"
```

## 📊 性能测试工具

### 使用 Apache Bench（如已安装）
```bash
ab -n 100 -c 10 http://localhost:3000/protected
```

### 使用 wrk（如已安装）
```bash
wrk -t4 -c100 -d30s http://localhost:3000/api/premium
```

## 🌐 浏览器测试

### 在浏览器中打开
```bash
# Windows
start http://localhost:3000
start http://localhost:3000/protected
start http://localhost:3000/api/premium

# macOS
open http://localhost:3000

# Linux
xdg-open http://localhost:3000
```

## 🔐 模拟支付测试

### 查看支付说明
```bash
curl -s http://localhost:3000/protected | jq '.paymentInstructions'
```

### 提取价格信息
```bash
curl -s http://localhost:3000/protected | jq '{price: .price, network: .network}'
```

### 测试无效支付头（应返回 402）
```bash
curl -i -H "X-PAYMENT: invalid-payment-token" http://localhost:3000/protected
```

## 📋 验证检查清单

### 检查所有端点返回 402
```bash
echo "检查 /protected..."
STATUS=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/protected)
[ "$STATUS" = "402" ] && echo "✓ 通过" || echo "✗ 失败 (状态码: $STATUS)"

echo "检查 /api/premium..."
STATUS=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/api/premium)
[ "$STATUS" = "402" ] && echo "✓ 通过" || echo "✗ 失败 (状态码: $STATUS)"

echo "检查 /api/weather..."
STATUS=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/api/weather?location=Beijing")
[ "$STATUS" = "402" ] && echo "✓ 通过" || echo "✗ 失败 (状态码: $STATUS)"
```

### 验证价格正确
```bash
echo "验证价格..."
PRICE=$(curl -s http://localhost:3000/protected | jq -r '.price')
echo "/protected 价格: $PRICE (期望: \$0.01)"

PRICE=$(curl -s http://localhost:3000/api/premium | jq -r '.price')
echo "/api/premium 价格: $PRICE (期望: \$0.05)"

PRICE=$(curl -s "http://localhost:3000/api/weather?location=Beijing" | jq -r '.price')
echo "/api/weather 价格: $PRICE (期望: \$0.001)"
```

## 🐛 调试命令

### 检查服务器是否运行
```bash
curl -s http://localhost:3000 > /dev/null && echo "服务器运行中" || echo "服务器未运行"
```

### 查看 middleware.ts 配置
```bash
cat middleware.ts | grep -A 5 "price:"
```

### 检查路由文件是否存在
```bash
ls -la app/protected/page.tsx
ls -la app/api/premium/route.ts
ls -la app/api/weather/route.ts
```

### 查看最近的 npm 日志
```bash
npm run dev 2>&1 | tee server.log
```

## 💾 保存测试结果

### 创建测试报告
```bash
{
  echo "=== x402 测试报告 ==="
  echo "测试时间: $(date)"
  echo ""
  
  echo "端点: /protected"
  curl -s http://localhost:3000/protected | jq .
  echo ""
  
  echo "端点: /api/premium"
  curl -s http://localhost:3000/api/premium | jq .
  echo ""
  
  echo "端点: /api/weather"
  curl -s "http://localhost:3000/api/weather?location=Beijing" | jq .
} > test-report.txt

cat test-report.txt
```

## 🎯 常用组合命令

### 完整测试流程
```bash
# 1. 启动服务器（在另一个终端）
npm run dev

# 2. 等待服务器启动
sleep 3

# 3. 运行自动化测试
node test-integration.js

# 4. 查看详细响应
curl -s http://localhost:3000/protected | jq .
```

### 快速验证
```bash
# 一行命令测试所有端点
curl -s http://localhost:3000/protected | jq -r '.price' && \
curl -s http://localhost:3000/api/premium | jq -r '.price' && \
curl -s "http://localhost:3000/api/weather?location=Beijing" | jq -r '.price'
```

## 📱 PowerShell 命令（Windows）

### 基础测试
```powershell
# 测试受保护页面
Invoke-WebRequest -Uri "http://localhost:3000/protected" -Method Get

# 查看状态码
$response = Invoke-WebRequest -Uri "http://localhost:3000/protected" -Method Get
$response.StatusCode
```

### 格式化输出
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:3000/protected"
$response | ConvertTo-Json -Depth 10
```

### POST 请求
```powershell
$body = @{
    query = "test"
    limit = 10
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/premium" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

## 🎓 学习命令

### 查看 HTTP 响应头
```bash
curl -i http://localhost:3000/protected 2>&1 | head -n 20
```

### 测量响应时间
```bash
curl -w "\n响应时间: %{time_total}s\n" -o /dev/null -s http://localhost:3000/protected
```

### 跟踪重定向
```bash
curl -L -i http://localhost:3000/protected
```

## 🚨 故障排除命令

### 端口被占用？查看 3000 端口
```bash
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000
```

### 杀死占用端口的进程
```bash
# Windows (管理员权限)
# 先找到 PID，然后:
taskkill /PID <PID> /F

# macOS/Linux
kill -9 $(lsof -t -i :3000)
```

### 清除 npm 缓存
```bash
npm cache clean --force
rm -rf node_modules
npm install --legacy-peer-deps
```

## 📚 更多信息

- **完整测试指南**: TESTING-GUIDE.md
- **自动化脚本**: test-integration.js, test-with-curl.sh
- **配置文档**: README-X402.md

---

**提示**: 将常用命令保存为 shell 脚本或 alias，方便快速测试！

```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
alias x402-test="node test-integration.js"
alias x402-curl="bash test-with-curl.sh"
alias x402-dev="npm run dev"
```

