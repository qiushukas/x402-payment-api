import { NextResponse } from 'next/server';

// 这是一个受保护的 API 端点示例
// 访问需要通过 x402 支付中间件
export async function GET(request: Request) {
  return NextResponse.json({
    data: {
      message: '这是受保护的高级 API 数据',
      timestamp: new Date().toISOString(),
      premiumFeatures: [
        '高级分析',
        '实时数据',
        '优先支持',
        '自定义报告'
      ],
      userId: 'premium-user',
      accessLevel: 'premium'
    },
    message: '成功访问高级 API 端点'
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  
  return NextResponse.json({
    data: {
      received: body,
      processed: true,
      timestamp: new Date().toISOString()
    },
    message: '成功处理高级 API 请求'
  });
}

