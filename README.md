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
> Network id:      1645096501180
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x505919d44fa3d375481d6e6b0fcda3c2dc2f563452b24704f36c4b05ab4c0620
   > Blocks: 0            Seconds: 0
   > contract address:    0xFEeCfF2CB7d6f3BfcBE5fa41c49c8fB642f2dDbF
   > block number:        1
   > block timestamp:     1645096507
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
   > block timestamp:     1645096507
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
   > block timestamp:     1645096507
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
   > block timestamp:     1645096508
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
   > block timestamp:     1645096508
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.96818992
   > gas used:            330726 (0x50be6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00661452 ETH


   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0xfbe4836656a05b0d70b691d810034a9a60be5f0748b75aca2f12b3ff6792a158
   > Blocks: 0            Seconds: 0
   > contract address:    0x23E2b13b08a22E9eEe431F862eC7A17aB1E99B98
   > block number:        7
   > block timestamp:     1645096508
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.91559856
   > gas used:            2629568 (0x281fc0)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.05259136 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.07904944 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.08355418 ETH
```

## Run the client UI
```
> npm run dev
```
![image](https://user-images.githubusercontent.com/3337802/154470947-7d2495b1-afd5-4607-9ca7-fff80f913dc8.png)


### Harvest
![image](https://user-images.githubusercontent.com/3337802/154473013-7ccf79d9-3c0c-4e2c-9ec6-9f43c943c113.png)


Click "Fetch Data 1", "Fetch Data 2", "Fetch Events"
![image](https://user-images.githubusercontent.com/3337802/154473050-3a44b3ed-f847-4b28-82f7-89467cfdb36c.png)


### Process
![image](https://user-images.githubusercontent.com/3337802/154473071-d4d0b688-c536-4040-bb20-3c1dcf8b9d33.png)

Click "Fetch Data 1", "Fetch Data 2", "Fetch Events"
![image](https://user-images.githubusercontent.com/3337802/154473118-39f10fb8-6a85-438b-b45b-5c20b868de36.png)

### Pack
![image](https://user-images.githubusercontent.com/3337802/154473159-f1174580-936c-492c-a43a-e52c34356c24.png)

Click "Fetch Data 1", "Fetch Data 2", "Fetch Events"
![image](https://user-images.githubusercontent.com/3337802/154473190-65c3691a-0b86-4fee-b856-e48d26e22ef2.png)

### Sell
![image](https://user-images.githubusercontent.com/3337802/154473240-0f4da351-caaa-4138-a0b3-c71c121642f0.png)

Click "Fetch Data 1", "Fetch Data 2", "Fetch Events"
![image](https://user-images.githubusercontent.com/3337802/154473275-77cae9f6-ce8f-4a16-b5c5-c3b1bf24b0ff.png)

### Buy
![image](https://user-images.githubusercontent.com/3337802/154473316-556b332e-00cc-4880-9488-afe76ccdc751.png)

Click "Fetch Data 1", "Fetch Data 2", "Fetch Events"
![image](https://user-images.githubusercontent.com/3337802/154473332-c98d75fe-5341-4c41-86c8-827bf166b63d.png)

### Ship
![image](https://user-images.githubusercontent.com/3337802/154473359-f17dbdb9-0742-4aff-bb81-ffb39621c5f2.png)

Click "Fetch Data 1", "Fetch Data 2", "Fetch Events"
![image](https://user-images.githubusercontent.com/3337802/154473413-18077456-29d8-4d87-b34f-01da22ae15d8.png)

### Recieve
![image](https://user-images.githubusercontent.com/3337802/154473461-f60f338c-5328-4546-a433-57490b50100c.png)

Click "Fetch Data 1", "Fetch Data 2", "Fetch Events"
![image](https://user-images.githubusercontent.com/3337802/154473487-560efad8-182b-4140-847b-0a016dd626a7.png)

### Purchase
![image](https://user-images.githubusercontent.com/3337802/154473557-ec3ab9d1-cb3e-40a4-b047-b99e3ba9db42.png)
Click "Fetch Data 1", "Fetch Data 2", "Fetch Events"
![image](https://user-images.githubusercontent.com/3337802/154473577-cbcd1eb6-7c0e-42c9-a067-ba4ae1edcf2b.png)



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
