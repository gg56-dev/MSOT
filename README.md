# Upgradeable MSOT (ERC20 Token)

## Introduction

This project includes the following:

- [x] Upgradeable contracts - Implemented through UUPS upgradeable proxy pattern (OpenZeppelin Standard)

- [x] MSOT (ERC20 Token)

- [x] Scripts for deployment and upgradation of the smart contract

- [x] Unit and Integration Tests

## Project Setup

To get started with this project, follow these steps:
    
1. Clone the repo

2. Run `npm install` in the root of the repo

3. Add a `secret.json` file in your root directory, where you'll store your wallet address, key and other sensitive data. The content should be similar to this: 

    ```
    {
        "key": "<Key to your metamask wallet account>",
        "MSOT_PROJECT_RINKEBY": "https://rinkeby.infura.io/v3/<MSOT-Project-Id>",
        "wallet_address": "<Your metamask account address>",
        "deployedMsotAddress": "<Once you deploy MSOT, it will return an address, paste that here>"
    }
    ```
   > **Please Note:**  Deployed address is required because it is needed in upgradation, after the initial deployment. This file needs to be kept private.
   

4. Run `npx hardhat compile` to get all the contracts compiled

5. Run `npx hardhat test` to run all the tests

6. Run `npx hardhat coverage` to know the testing coverage

7. Run `npx hardhat run scripts/<script-name>.js` to run any of the scripts

8. Run `npx hardhat run scripts/<script-name>.js --network rinkeby` to make transactions like, deployment and upgradation on the testnet. Try running these scripts, but do remember that your rinkeby configuration in hardhat.config.js file will look like this: 

    ```
    rinkeby: {
        url: secret.MSOT_PROJECT_RINKEBY, 
        accounts: [secret.key] 
    }
    ```

    `npx hardhat run scripts/DeployMsotProxy.js --network rinkeby`

   It should deploy the contract on the rinkeby testnet and return the address, paste that address in the deployedMsotAddress in your secret.json file so that you can upgrade it later on.

    `npx hardhat run scripts/UpgradeMsotProxy.js --network rinkeby`

