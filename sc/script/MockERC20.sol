// SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {MockERC20} from "../src/mocks/MockERC20.sol";

contract MockERC20Script is Script {
    MockERC20 public mockERC20;

    function setUp() public {}

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        mockERC20 = new MockERC20();

        vm.stopBroadcast();
    }
}
