require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_URL = "HTTP://127.0.0.1:7545";
// const PRIVATE_KEY = "abbda3a322ed52129bf48e2c9f0af4b23d9dc38e482486c1c860e8b186b5e43b";
const PRIVATE_KEY="67fa0f168afc072b6bb1f5136fb54088846532864f45740913807032321fbe42";

module.exports = {
  solidity: "0.8.17",
  networks: {
    metamask: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY],
    
    },
  },
};