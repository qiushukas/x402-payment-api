// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TokenSale
 * @dev 代币销售合约 - 用户用 USDC 购买您的代币
 */
contract TokenSale is Ownable, ReentrancyGuard {
    // 您的代币
    IERC20 public token;
    
    // USDC 代币 (Base Mainnet)
    IERC20 public usdc;
    
    // 价格：1 个代币需要多少 USDC（以 6 位小数计算）
    // 例如：如果 1 个代币 = $0.01，则 price = 10000（0.01 * 10^6）
    uint256 public price;
    
    // 最小购买量
    uint256 public minPurchase;
    
    // 最大购买量
    uint256 public maxPurchase;
    
    // 销售是否活跃
    bool public saleActive;
    
    // 事件
    event TokensPurchased(address indexed buyer, uint256 usdcAmount, uint256 tokenAmount);
    event PriceUpdated(uint256 newPrice);
    event SaleStatusChanged(bool active);
    
    /**
     * @dev 构造函数
     * @param _token 您的代币地址
     * @param _usdc USDC 代币地址 (Base Mainnet: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
     * @param _price 初始价格（USDC 的 6 位小数）
     * @param _minPurchase 最小购买量（代币数量）
     * @param _maxPurchase 最大购买量（代币数量）
     */
    constructor(
        address _token,
        address _usdc,
        uint256 _price,
        uint256 _minPurchase,
        uint256 _maxPurchase
    ) Ownable(msg.sender) {
        token = IERC20(_token);
        usdc = IERC20(_usdc);
        price = _price;
        minPurchase = _minPurchase;
        maxPurchase = _maxPurchase;
        saleActive = true;
    }
    
    /**
     * @dev 购买代币
     * @param tokenAmount 要购买的代币数量
     */
    function buyTokens(uint256 tokenAmount) external nonReentrant {
        require(saleActive, "Sale is not active");
        require(tokenAmount >= minPurchase, "Below minimum purchase");
        require(tokenAmount <= maxPurchase, "Above maximum purchase");
        
        // 计算需要的 USDC 数量
        uint256 usdcAmount = (tokenAmount * price) / 10**18;
        
        // 检查合约是否有足够的代币
        require(token.balanceOf(address(this)) >= tokenAmount, "Insufficient tokens in contract");
        
        // 从买家转入 USDC 到合约所有者
        require(
            usdc.transferFrom(msg.sender, owner(), usdcAmount),
            "USDC transfer failed"
        );
        
        // 发送代币给买家
        require(token.transfer(msg.sender, tokenAmount), "Token transfer failed");
        
        emit TokensPurchased(msg.sender, usdcAmount, tokenAmount);
    }
    
    /**
     * @dev 计算购买指定代币数量需要多少 USDC
     * @param tokenAmount 代币数量
     * @return USDC 数量（6 位小数）
     */
    function calculateUSDCAmount(uint256 tokenAmount) public view returns (uint256) {
        return (tokenAmount * price) / 10**18;
    }
    
    /**
     * @dev 计算指定 USDC 可以购买多少代币
     * @param usdcAmount USDC 数量（6 位小数）
     * @return 代币数量
     */
    function calculateTokenAmount(uint256 usdcAmount) public view returns (uint256) {
        return (usdcAmount * 10**18) / price;
    }
    
    /**
     * @dev 更新价格（仅所有者）
     * @param _newPrice 新价格
     */
    function setPrice(uint256 _newPrice) external onlyOwner {
        price = _newPrice;
        emit PriceUpdated(_newPrice);
    }
    
    /**
     * @dev 设置购买限制（仅所有者）
     */
    function setPurchaseLimits(uint256 _min, uint256 _max) external onlyOwner {
        minPurchase = _min;
        maxPurchase = _max;
    }
    
    /**
     * @dev 激活/停用销售（仅所有者）
     */
    function setSaleStatus(bool _active) external onlyOwner {
        saleActive = _active;
        emit SaleStatusChanged(_active);
    }
    
    /**
     * @dev 存入代币到合约（仅所有者）
     * @param amount 代币数量
     */
    function depositTokens(uint256 amount) external onlyOwner {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }
    
    /**
     * @dev 提取剩余代币（仅所有者）
     */
    function withdrawTokens() external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(owner(), balance), "Transfer failed");
    }
    
    /**
     * @dev 紧急提取 USDC（仅所有者，以防万一）
     */
    function emergencyWithdrawUSDC() external onlyOwner {
        uint256 balance = usdc.balanceOf(address(this));
        require(usdc.transfer(owner(), balance), "Transfer failed");
    }
}

