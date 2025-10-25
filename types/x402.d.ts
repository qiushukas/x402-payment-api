// x402 支付中间件的 TypeScript 类型定义

/**
 * 支付中间件配置接口
 */
export interface PaymentMiddlewareConfig {
  /** 支付的描述信息 */
  description?: string;
  
  /** 资源的 MIME 类型 */
  mimeType?: string;
  
  /** 支付的最大超时时间（秒），默认: 60 */
  maxTimeoutSeconds?: number;
  
  /** 响应的 JSON schema */
  outputSchema?: Record<string, any>;
  
  /** 输入的 JSON schema */
  inputSchema?: Record<string, any>;
  
  /** 自定义的付费墙 HTML */
  customPaywallHtml?: string;
  
  /** 资源 URL（默认为请求 URL） */
  resource?: string;
}

/**
 * 路由配置接口
 */
export interface RouteConfig {
  /** 访问价格，例如 '$0.01' */
  price: string;
  
  /** 区块链网络 */
  network: 'base-sepolia' | 'base-mainnet' | 'solana-devnet' | 'solana-mainnet';
  
  /** 额外配置选项 */
  config?: PaymentMiddlewareConfig;
}

/**
 * Facilitator 配置
 */
export interface FacilitatorConfig {
  /** Facilitator 服务的 URL */
  url?: string;
  
  /** 网络类型 */
  network?: 'testnet' | 'mainnet';
}

/**
 * 支付中间件路由映射
 */
export type RouteConfigurations = Record<string, RouteConfig>;

