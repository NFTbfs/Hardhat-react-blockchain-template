//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Greeter.sol";

contract GreeterV2 is Greeter {
    function version() public pure returns (string memory) {
        return "2.0";
    }
}