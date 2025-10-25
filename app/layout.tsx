import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'x402 支付中间件演示',
  description: '使用 x402 实现基于加密货币的微支付',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}

