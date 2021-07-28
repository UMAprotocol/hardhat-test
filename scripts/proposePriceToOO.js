const hre = require("hardhat");
const ethers = hre.ethers;

const createOOContractInstance = require("./helpers/createOOContractInstance");
const createERC20ContractInstance = require("./helpers/createERC20ContractInstance");

async function main() {
  // 2 months roughly
  // const timeToAdvance = 5184000;
  const hardHatID = "31337";
  const OOAddress = "0xc43767f4592df265b4a9f1a398b97ff24f38c6a6";

  const foundationAccount = "0x7a3a1c2de64f20eb5e916f40d11b01c441b2a8dc";

  try {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [foundationAccount],
    });

    const signer = await ethers.provider.getSigner(foundationAccount);

    const erc20 = createERC20ContractInstance(signer, "1");
    await hre.network.provider.send("hardhat_setBalance", [
      foundationAccount,
      "0x10000000000000000000000",
    ]);

    const optOracle = createOOContractInstance(signer, OOAddress);
    console.log("optOracle", optOracle);

    // await hre.network.provider.request({
    //   method: "hardhat_stopImpersonatingAccount",
    //   params: [foundationAccount],
    // });
  } catch (err) {
    console.log("err", err);
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
