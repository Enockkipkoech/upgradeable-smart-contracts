// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract LegacyCodeCapital is
    Initializable,
    ERC20Upgradeable,
    OwnableUpgradeable
{
    function initialize() public initializer {
        __ERC20_init("LegacyCodeCapital", "LCC");
        __Ownable_init(msg.sender);
        mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function getOwner () public view returns (address) {
        return owner();
    }
    function getBalance () public view returns (uint256) {
        return balanceOf(owner());
    }
    
}
