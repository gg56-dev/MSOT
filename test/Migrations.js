require('mocha')
const assert = require('assert');
const hre = require('hardhat')

before('deploy', async function (){
    this.migrations = await ethers.getContractFactory('Migrations');
    this.instance;
});

it('deploys the migrations', async function() {

    this.timeout(500000)
    this.instance = await this.migrations.deploy()
    await this.instance.deployed();
    console.log('Migrations Proxy Deployed!')

})

it('should not fail', async function() {
    this.timeout(500000)
    assert.doesNotReject(async ()=> await this.instance.setCompleted(0))
    
})


