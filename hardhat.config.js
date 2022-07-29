require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
// const fs = require("fs");

// const privateKey = fs.readFileSync(".secret").toString().trim();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("sendEthToDevAccount", "Sends eth to the dev accounts", async () => {
  try {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0x7a3a1c2de64f20eb5e916f40d11b01c441b2a8dc"],
    });

    const signer = await ethers.provider.getSigner(
      "0x7a3a1c2de64f20eb5e916f40d11b01c441b2a8dc"
    );

    await network.provider.send("hardhat_setBalance", [
      "0x7a3a1c2de64f20eb5e916f40d11b01c441b2a8dc",
      "0x100000000000000000",
    ]);

    const tx = await signer.sendTransaction({
      to: "0x2210087BF0fD1C787e87d3a254F56a33D428312D",
      value: ethers.utils.parseEther("0.01"),
    });

    console.log("TX", tx);
  } catch (err) {
    console.log("err", err);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337,
      hardfork: "london",
      gasPrice: 100,
      initialBaseFeePerGas: 1_000_000_000,
    },
    matic: {
      /*      
  New unified URL (recommended): https://polygon-rpc.com/
  Use this new aggregated RPC link to avoid RPC disconnects. You can read more details on this here and here.

  Use these alternative RPCs only if the above RPC fails:
  https://rpc-mainnet.matic.network or
  https://matic-mainnet.chainstacklabs.com or
  https://rpc-mainnet.maticvigil.com or
  https://rpc-mainnet.matic.quiknode.pro or
  https://matic-mainnet-full-rpc.bwarelabs.com
*/
      url: "https://polygon-rpc.com/",
      accounts: [],
      // accountsBalance: "10000000000000000000000",
      // gasPrice: 8000000000, // default is 'auto' which breaks chains without the london hardfork
    },
  },
};
