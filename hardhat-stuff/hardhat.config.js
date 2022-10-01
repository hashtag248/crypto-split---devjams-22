/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-toolbox");
const ALCHEMY_API_KEY = "UKPqh_wm4TzJvPU_Chu73wL4W80D3NBO";
const GOERLI_PRIVATE_KEY = "3ffc0b50e79fdb5c10ac6abdb824cf186b53e3714cd5c1d3e4d15dbfdc4c6a01";

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};