module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 3500000
    }
  },

  // Compilers configuration
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch latest versions
    }
  }
};