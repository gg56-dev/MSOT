// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../MSOT.sol";

contract MSOT2 is MSOT{
    function version() pure public returns (string memory a ){
        return 'v2';
    }
}

