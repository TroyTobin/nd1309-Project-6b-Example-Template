# Supply chain & data auditing

## UML Diagrams

### State/Activity diagram

![image](https://user-images.githubusercontent.com/3337802/154064682-8c56e0fc-7671-423d-8f6f-7c2898aebcc6.png)

### Sequence Diagram

![image](https://user-images.githubusercontent.com/3337802/154064636-922b6d55-1000-4d2c-bbe1-8713c3bd1ce4.png)

### Class diagram

![image](https://user-images.githubusercontent.com/3337802/154064657-b5d2eef5-11ee-446a-ba85-6a7e1174ae0b.png)

## Testing
Run ganache
```
> ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

Migrate the contract
```
> truffle migrate
```
```
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'development'
> Network id:      1644933879996
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x505919d44fa3d375481d6e6b0fcda3c2dc2f563452b24704f36c4b05ab4c0620
   > Blocks: 0            Seconds: 0
   > contract address:    0xFEeCfF2CB7d6f3BfcBE5fa41c49c8fB642f2dDbF
   > block number:        1
   > block timestamp:     1644933888
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.99549526
   > gas used:            225237 (0x36fd5)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00450474 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00450474 ETH


2_deploy_contracts.js
=====================

   Deploying 'FarmerRole'
   ----------------------
   > transaction hash:    0x9aa579743f7c7d51097b9815c7761e08d2fc0ccf00a8fde22a11cfdb96d52fe2
   > Blocks: 0            Seconds: 0
   > contract address:    0xf2ee0b0Cdcae5013930B92c0Ba54F7F7f1933613
   > block number:        3
   > block timestamp:     1644933888
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.98803348
   > gas used:            330726 (0x50be6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00661452 ETH


   Deploying 'DistributorRole'
   ---------------------------
   > transaction hash:    0x99269e44115967030a0ac64226912bd8340acc1e08065eaac15657127eba26ea
   > Blocks: 0            Seconds: 0
   > contract address:    0xd22De155853B67cE1cA3693FBE52EE958f755E7b
   > block number:        4
   > block timestamp:     1644933888
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.98141896
   > gas used:            330726 (0x50be6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00661452 ETH


   Deploying 'RetailerRole'
   ------------------------
   > transaction hash:    0xe265a51873e836e88523aa6e73a03ae11af733c759f3b86fb940d72bdf5608fd
   > Blocks: 0            Seconds: 0
   > contract address:    0x79051A2faFcC216A55d3897474012145d158F170
   > block number:        5
   > block timestamp:     1644933889
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.97480444
   > gas used:            330726 (0x50be6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00661452 ETH


   Deploying 'ConsumerRole'
   ------------------------
   > transaction hash:    0xfb5decb80faf504fe8fdc49f3d934e25db99e16f77c39af7d2298347ef84ff87
   > Blocks: 0            Seconds: 0
   > contract address:    0xA65B87754E0A73860AA6B7eb6E95D79CD2d893d2
   > block number:        6
   > block timestamp:     1644933889
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.96818992
   > gas used:            330726 (0x50be6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00661452 ETH


   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0x67f85afee47d460dd3b037697b6ec30018394accbd58766ce7721dacf3156ab7
   > Blocks: 0            Seconds: 0
   > contract address:    0x23E2b13b08a22E9eEe431F862eC7A17aB1E99B98
   > block number:        7
   > block timestamp:     1644933889
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.91651448
   > gas used:            2583772 (0x276cdc)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.05167544 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.07813352 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.08263826 ETH
```

## Run the client UI
```
> npm run dev
```
![image](https://user-images.githubusercontent.com/3337802/154078207-c03dbfdd-b7e9-498d-b72f-6342bfa2e8e9.png)

### Harvest
![image](https://user-images.githubusercontent.com/3337802/154078303-58cfc02f-1cb8-44f3-9a01-db5720cc1598.png)



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

> The starter code is written for **Solidity v0.4.24**. At the time of writing, the current Truffle v5 comes with Solidity v0.5 that requires function *mutability* and *visibility* to be specified (please refer to Solidity [documentation](https://docs.soliditylang.org/en/v0.5.0/050-breaking-changes.html) for more details). To use this starter code, please run `npm i -g truffle@4.1.14` to install Truffle v4 with Solidity v0.4.24. 

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/udacity/nd1309/tree/master/course-5/project-6
```

Change directory to ```project-6``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd project-6
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

Your terminal should look something like this:

![truffle test](images/ganache-cli.png)

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

Your terminal should look something like this:

![truffle test](images/truffle_compile.png)

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Your terminal should look something like this:

![truffle test](images/truffle_migrate.png)

Test smart contracts:

```
truffle test
```

All 10 tests should pass.

![truffle test](images/truffle_test.png)

In a separate terminal window, launch the DApp:

```
npm run dev
```

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.


## Authors

See also the list of [contributors](https://github.com/your/project/contributors.md) who participated in this project.

## Acknowledgments

* Solidity
* Ganache-cli
* Truffle
* IPFS
