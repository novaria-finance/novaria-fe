// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MockGTX} from "../src/mocks/MockGTX.sol";
import {FundingVault} from "../src/FundingVault.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FundingVaultTest is Test {
    MockGTX public mockGTX;
    FundingVault public fundingVault;
    
    address public token = 0x64A73FE98adcb13bC4869a1990aCc0933f205b34;

    function setUp() public {
        vm.createSelectFork("https://base-sepolia.g.alchemy.com/v2/1uB1XMonmy23HGTlb07w41ajwEFcOigh", 25740208);
        mockGTX = new MockGTX();
        fundingVault = new FundingVault(address(mockGTX), token);
        
        // Deal token to the test contract instead of the other token
        deal(token, address(this), 100_000e18);
    }

    function test_deposit() public {
        IERC20(token).approve(address(fundingVault), 100e18);
        fundingVault.deposit(100);

        console.log("balance of", fundingVault.balanceOf(address(this)));
    }

    function test_withdraw() public {
        IERC20(token).approve(address(fundingVault), 100);
        fundingVault.deposit(100);

        fundingVault.withdraw(fundingVault.balanceOf(address(this)));

        console.log("balance of", fundingVault.balanceOf(address(this)));
    }
}