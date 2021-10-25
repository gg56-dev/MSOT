const {HardhatUserConfig} = require('hardhat/types')

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("solidity-coverage");
let secret = require('./secret')
require("@nomiclabs/hardhat-etherscan");

var accounts;
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",
  
  networks: {
  
    ropsten: {
      url: secret.urlRopsten,
      accounts: [secret.key_rinkeby],
    },
    rinkeby: {
      url: secret.rinkeby, //Infura url with projectId
      accounts: [secret.key_rinkeby] // add the account that will deploy the contract (private key)
    },
    mainnet: {
      url: secret.mainnet, //Infura url with projectId
      accounts: [secret.key_mainnet]

    }
  },
  etherscan: {
    apiKey: secret.etherScanAPIKEY
  }
};
