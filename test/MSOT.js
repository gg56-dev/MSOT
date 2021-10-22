require('mocha')
const assert = require('assert');
const hre = require('hardhat');
Web3 = require("web3");
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


before('deploy', async function (){
    this.MsotV1 = await ethers.getContractFactory('MSOT');
    this.MsotV2 = await ethers.getContractFactory('MSOT2');
    this.proxy;
    this.upgraded_MSOT;
    this.accounts = await hre.ethers.getSigners();
});  


it('deploys the Proxy of the MSOT Token', async function() {
    this.timeout(500000)
    this.proxy = await hre.upgrades.deployProxy(this.MsotV1, {kind: 'uups'}); 
    assert.equal(await this.proxy.name(), 'Msot')
    console.log('MSOT Proxy Deployed!')

})

it('Upgrades the proxy to point to a newer version of the MSOT Token', async function(){
    this.timeout(500000)
    this.upgraded_MSOT = await hre.upgrades.upgradeProxy(this.proxy.address, this.MsotV2)
    await this.upgraded_MSOT.deployed();
    assert.equal(await this.upgraded_MSOT.version(), 'v2');
    console.log("MSOT Upgraded Successfully!")

})

it('deploys the proxy and the upgrade on the same address', async function(){
    assert.equal(this.proxy.address, this.upgraded_MSOT.address)
    console.log("The Addresses: ");
    console.log("initial MSOT Address: " + this.proxy.address);
    console.log("Upgrade MSOT Address: " + this.upgraded_MSOT.address)
})

it('should transfer the tokens correctly using transferFrom function', async function(){

    this.Msot = await ethers.getContractFactory('MSOT');
    this.msot_proxy = await hre.upgrades.deployProxy(this.Msot, {kind: 'uups'}); 
    console.log(this.msot_proxy.address)
    var done = await this.msot_proxy.increaseAllowance(this.accounts[0].address, 500);
    var previousBalance = await this.msot_proxy.balanceOf(this.accounts[1].address);
    await this.msot_proxy.transferFrom(this.accounts[0].address, this.accounts[1].address , 50);
    var newBalance = await this.msot_proxy.balanceOf(this.accounts[1].address);
    assert.notEqual(newBalance, previousBalance);
    var allowance = await this.msot_proxy.allowance(this.accounts[0].address, this.accounts[1].address);
    console.log(allowance);

})

it('should transfer the tokens correctly using transferFrom function', async function(){

    this.Msot = await ethers.getContractFactory('MSOT');
    this.msot_proxy = await hre.upgrades.deployProxy(this.Msot, {kind: 'uups'}); 
    console.log(this.msot_proxy.address)
    var done = await this.msot_proxy.increaseAllowance(this.accounts[0].address, 500);
    var previousBalance = await this.msot_proxy.balanceOf(this.accounts[1].address);

})

it('should not transfer the tokens if the amount is greater than total supply', async function(){

    this.Msot = await ethers.getContractFactory('MSOT');
    this.msot_proxy = await hre.upgrades.deployProxy(this.Msot, {kind: 'uups'}); 
    await assert.rejects(() => this.msot_proxy.transferFrom(this.accounts[0].address, this.accounts[1].address , 18000000000));

})

it('should transfer the tokens correctly using transfer function', async function(){

    this.Msot = await ethers.getContractFactory('MSOT');
    this.msot_proxy = await hre.upgrades.deployProxy(this.Msot, {kind: 'uups'}); 
    var done = await this.msot_proxy.increaseAllowance(this.accounts[0].address, 500);
    var previousBalance = await this.msot_proxy.balanceOf(this.accounts[1].address);
    await this.msot_proxy.transfer(this.accounts[1].address , 50);
    var newBalance = await this.msot_proxy.balanceOf(this.accounts[1].address);
    assert.notEqual(newBalance, previousBalance);

})

it('should not transfer the tokens if the amount is greater than the balance', async function(){

    this.Msot = await ethers.getContractFactory('MSOT');
    this.msot_proxy = await hre.upgrades.deployProxy(this.Msot, {kind: 'uups'}); 
    var done = await this.msot_proxy.increaseAllowance(this.accounts[2].address, 500);
    var previousBalance = await this.msot_proxy.balanceOf(this.accounts[2].address);
    await assert.rejects(async () => await this.msot_proxy.transferFrom(this.accounts[2].address, this.accounts[1].address , 50));
    var newBalance = await this.msot_proxy.balanceOf(this.accounts[2].address);
    assert.deepEqual(newBalance, previousBalance);

})

it('should not burn more than the total supply of MSOT tokens', async function(){

    this.Msot = await ethers.getContractFactory('MSOT');
    this.msot_proxy = await hre.upgrades.deployProxy(this.Msot, {kind: 'uups'}); 
    const supply = await this.msot_proxy.totalSupply();
    await assert.rejects(async () => await this.msot_proxy.burn(this.accounts[0].address, supply+1));

})

it('should not burn negative number of MSOT tokens', async function(){

    this.Msot = await ethers.getContractFactory('MSOT');
    this.msot_proxy = await hre.upgrades.deployProxy(this.Msot, {kind: 'uups'}); 
    await assert.rejects(async () => await this.msot_proxy.burn(this.accounts[0].address, -1));

})











