deploy-rinkeby:
	@echo "deploying contract on rinkeby network" 
	@npx hardhat run scripts/DeployMsotProxy.js --network rinkeby

verify-rinkeby-contract:
	@npx hardhat verify 0x0128771a56137B5CAf65e87786155367dD13B300 --network rinkeby


verify-mainnet-contract:
	@npx hardhat verify 0x4e092edea66a55c8894b2475f09b2bcbfe70aff9 --network mainnet