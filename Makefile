deploy-rinkeby:
	@echo "deploying contract on rinkeby network" 
	@npx hardhat run scripts/DeployMsotProxy.js --network rinkeby

verify-rinkeby-contract:
	@npx hardhat verify 0x6fDF1d86dE7a1D869Ff6E5650A7696aa7B1b2A51 --network rinkeby


upgrade-rinkby-contract:
	@echo "upgrding contract on rinkeby network" 
	@npx hardhat run scripts/UpgradeMsotProxy.js --network rinkeby


upgrade-mainnet-contract:
	@echo "upgrding contract on mainnet network" 
	@npx hardhat run scripts/UpgradeMsotProxy.js --network mainnet


verify-mainnet-contract:
	@npx hardhat verify 0x310a0329af688be8151f8392ddc80eccf2fdbd2e --network mainnet