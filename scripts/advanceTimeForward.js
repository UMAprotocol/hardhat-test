const hre = require("hardhat");
const ethers = hre.ethers;

// KNOWN LSP Contract ends: 1630447200 (GMT: Tuesday, August 31, 2021 10:00:00 PM)
async function main() {
  // 2 months roughly
  const hardHatID = "31337";
  const time = 1630447300;

  try {
    const tx = await hre.network.provider.request({
      jsonrpc: "2.0",
      method: "evm_mine",
      params: [time],
      id: hardHatID,
    });
    console.log("Tx?", tx);
  } catch (err) {
    console.log("err in evm_increaseTime", err);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
