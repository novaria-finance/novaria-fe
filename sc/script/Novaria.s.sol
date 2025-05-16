// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {MockGTX} from "../src/mocks/MockGTX.sol";
import {FundingVault} from "../src/FundingVault.sol";
import {PrincipleToken} from "../src/PrincipleToken.sol";
import {YieldToken} from "../src/YieldToken.sol";

contract NovariaScript is Script {
    MockGTX public mockGTX;
    FundingVault public fundingVault;
    YieldToken public yieldToken;
    PrincipleToken public principleToken;

    function setUp() public {}

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        address wallet = vm.addr(vm.envUint("PRIVATE_KEY"));

        uint64 nonce = vm.getNonce(wallet);
        address expectedYieldTokenAddress = vm.computeCreateAddress(wallet, nonce + 2);
        address expectedPrincipleTokenAddress = vm.computeCreateAddress(wallet, nonce + 3);

        mockGTX = new MockGTX();
        fundingVault = new FundingVault(address(mockGTX), 0x92f62b2c51d2832561AdF505b004d231D3146c2f);

        yieldToken = new YieldToken(expectedPrincipleTokenAddress);
        principleToken = new PrincipleToken(address(fundingVault), expectedYieldTokenAddress);

        require(address(principleToken) == expectedPrincipleTokenAddress, "Principle token address mismatch");
        require(address(yieldToken) == expectedYieldTokenAddress, "Yield token address mismatch");

        console.log("mock GTX address", address(mockGTX));
        console.log("funding vault address", address(fundingVault));
        console.log("principle token address", address(principleToken));
        console.log("yield token address", address(yieldToken));

        vm.stopBroadcast();
    }
}