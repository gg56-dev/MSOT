# Upgradeable SOT NFT (ERC721 Token) & MSOT (ERC20 Token)

## Introduction

This project includes the following:

- [x] Upgradeable contracts - Implemented through UUPS upgradeable proxy pattern (OpenZeppelin Standard)

- [x] SOT NFT (ERC721 Token) - Including the NFT's metadata implementation (both through IPFS and Cloud)

- [x] MSOT (ERC20 Token)

- [x] Scripts for deployment of contracts 

- [x] Scripts for upgradation of contracts

- [x] Script for minting a new token in a deployed instance

- [x] Scripts for uploading NFT's images and metadata files on IPFS

- [x] Unit and Integration Tests

## Project Setup

To get started with this project, follow these steps:
    
1. Clone the repo

2. Run `npm install` in the root of the repo

3. Add a `secret.json` file in your root directory, where you'll store your wallet address, key and other sensitive data. The content should be similar to this: (keep the content as such for now, but fill the first 5 fields before running the deploy scripts)

    ```
    {
        "key": "<Key to your metamask wallet account>",
        "urlRopsten": "https://speedy-nodes-nyc.moralis.io/<Project-Id>/eth/ropsten",
        "SOT_PROJECT_RINKEBY": "https://rinkeby.infura.io/v3/<SOT-Project-Id>",
        "MSOT_PROJECT_RINKEBY": "https://rinkeby.infura.io/v3/<MSOT-Project-Id>",
        "wallet_address": "<Your metamask account address>",
        "deployedSotAddress": "<Once you deploy SOT, it will return an address, paste that here>",
        "deployedMsotAddress": "<Once you deploy MSOT, it will return an address, paste that here>"
    }
    ```
   > **Please Note:**  Deployed addresses are required because they are needed in upgradation, after the initial deployment. This file needs to be kept private.
   

4. Run `npx hardhat compile` to get all the contracts compiled

5. Run `npx hardhat test` to run all the tests

6. Run `npx hardhat coverage` to know the testing coverage

7. [OPTIONAL] If you wish to use IPFS for NFT metadata and images, add a `.env` file in your root directory and add the following content init:
    ```
    PINATA_API_KEY=""
    PINATA_API_SECRET=""
    PINATA_ENDPOINT="https://api.pinata.cloud/pinning/pinFileToIPFS"
    MNEMONIC="<Your Metamask mnemonic/phrase>"
    ETH_CLIENT_URL="https://rinkeby.infura.io/v3/<Infura-Project-Id>"
    ```
   > **Please Note:**  Login to [Pinata Service](https://app.pinata.cloud/), click profile icon on the right, click on the API keys to know your pinata api key and secret. Sign Up on [Infura](https://infura.io/), create a project and get you project Id from there. Also, keep this .env file private as it contains sensitive data.   
   
    ![Pinata](https://static.slab.com/prod/uploads/7adb25ff/posts/images/J__0NjUkj_6BObi1Q4Q3eRe6.png)

    ![Infura](https://www.trufflesuite.com/img/tutorials/infura/infura-project-details.png)

8. Run `npx hardhat run scripts/<script-name>.js` to run any of the scripts

9. Run `npx hardhat run scripts/<script-name>.js --network rinkeby` to make transactions like, deployment, upgradation and minting on the testnet. Try running these scripts, but do remember that your testnet urls are stored in secret.json file that we just created, so make sure to use the right url in the rinkeby network configuration in your hardhat.config.json file. If you are **deploying the SOT**, the rinkeby configuration will look like this: 

    ```
    rinkeby: {
        url: secret.SOT_PROJECT_RINKEBY, 
        accounts: [secret.key] 
    }
    ```

    `npx hardhat run scripts/DeploySotProxy.js --network rinkeby`

   It should deploy the contract on the rinkeby testnet and return the address, paste that address in the deployedSotAddress in your secret.json file so that you can upgrade it later on.

    `npx hardhat run scripts/UpgradeSotProxy.js --network rinkeby`

10. Now, to **deploy MSOT**, change your rinkeby configration in hardhat config as follows:

    ```
    rinkeby: {
        url: secret.MSOT_PROJECT_RINKEBY, 
        accounts: [secret.key] 
    }
    ```

    `npx hardhat run scripts/DeployMsotProxy.js --network rinkeby`

    It should deploy the contract on the rinkeby testnet and return the address, paste that address in the deployedMsotAddress in your secret.json file so that you can upgrade it later on.

    `npx hardhat run scripts/UpgradeMsotProxy.js --network rinkeby`

## Adding Metadata and Minting a new SOT
Each SOT NFT is supposed to possess specific attributes. Like the SOT's size, location etc. In addition to that, it also has an associated image and a name which differentiates it from other SOTs. Metadata is a json file consisting that information. Now,how is this metadata file associated with each SOT? Well, the metadata is always off-chain, so it can be stored either on another blockchain like IPFS or on some cloud service like cloudinary. We have used the cloudinary service to store our metadata files. The OpenSea platform access the tokenURI function of the NFT and looks for the metadata file in the link that is returned. like in our case, it returns 
`https://res.cloudinary.com/dhxeeeqc8/raw/upload/v1632816504/SOTs/Metadata/X.json` 
where X replaces the tokenID. like [this](https://res.cloudinary.com/dhxeeeqc8/raw/upload/v1632816504/SOTs/Metadata/0.json)

So, in order to display an SOT's metadata on OpenSea, you need to upload the metadata file on some cloud and name it such that it matches the link returned by the tokenURI function when passed the token's Id.

When you are done with uploading the new token's metadata, run the minting script as follows:

`npx hardhat run scripts/mintSOT.js --network rinkeby`

It will take some time, your token will be minted, and you will be able to view the new token on OpenSea with all its metadata.

![SOT Metadata](https://res.cloudinary.com/dhxeeeqc8/image/upload/v1632994755/images/SOT_Metadata.png)

## Defining the Royalty
Now, that you are done with minting your SOTs, its time to sell them on OpenSea with some royalty. In order to do that, you need to create a new collection on OpenSea Testnet (make sure you are connected to rinkeby testnet on your metamask wallet), choose the tokens that will be used to buy and sell the NFTs, define the royalty, like 2.5% in addition to OpenSea's 2.5%, which will make the contract owner receive a royalty of 2.5% on each sale of the NFT. After creating the collection, you need to move your NFTs to this collection.

![Defining the royalty](https://res.cloudinary.com/dhxeeeqc8/image/upload/v1632995848/images/royalty.png)

> **THAT'S IT!  START TRADING!**
