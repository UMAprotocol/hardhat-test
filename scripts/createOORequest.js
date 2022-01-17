const hre = require("hardhat");
const ethers = hre.ethers;
const createOOContractInstance = require("./helpers/createOOContractInstance");
const ethersLib = require("ethers");

async function main() {
  const foundationAccount = "0x7a3a1c2de64f20eb5e916f40d11b01c441b2a8dc";

  try {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [foundationAccount],
    });

    const signer = await ethers.provider.getSigner(foundationAccount);

    const ooInstance = createOOContractInstance(
      signer,
      "0xc43767f4592df265b4a9f1a398b97ff24f38c6a6"
    );
    console.log("ooInstance", ooInstance);
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
