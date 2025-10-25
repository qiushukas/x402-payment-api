// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyToken
 * @dev 您的自定义代币 - 可以根据需求修改
 */
contract MyToken is ERC20, Ownable {
    uint8 private _decimals;
    
    /**
     * @dev 构造函数
     * @param name 代币名称（例如："MyToken"）
     * @param symbol 代币符号（例如："MTK"）
     * @param initialSupply 初始供应量（例如：1000000 表示 100 万个代币）
     * @param tokenDecimals 小数位数（通常是 18）
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 tokenDecimals
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _decimals = tokenDecimals;
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
    
    /**
     * @dev 返回代币的小数位数
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
    
    /**
     * @dev 铸造新代币（仅所有者）
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev 销毁代币
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}

