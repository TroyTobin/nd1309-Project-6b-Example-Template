const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require('fs');
const infuraKey = fs.readFileSync(".infurakey").toString().trim();
const mnemonic  = fs.readFileSync(".secret").toString().trim();


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 4500000
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
        network_id: 4,       // rinkeby's id
        gas: 4500000,        // rinkeby has a lower block limit than mainnet
        gasPrice: 10000000000
    },
  },

  // Compilers configuration
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch latest versions
    }
  }
};