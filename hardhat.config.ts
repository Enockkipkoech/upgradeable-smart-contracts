import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import "@nomicfoundation/hardhat-verify";
import "@openzeppelin/hardhat-upgrades";

import * as dotenv from "dotenv";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      // forking: {
      //   url: process.env.RPC_URL as string,
      // }
    },
    localhost: {
      url:"http://127.0.0.1:8545/",      
      // accounts: {
      //   mnemonic: process.env.MNEMONIC
      // }
    },
    
    // mainnet: {
      // url: process.env.ALCHEMY_MAINNET_RPC_URL,
      // accounts: {
      //   mnemonic: process.env.MNEMONIC
      // }
    // },
  },

  solidity: {
    version:"0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }  
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    gasPrice: 21
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  sourcify: {
    enabled: true
  }

};

export default config;
