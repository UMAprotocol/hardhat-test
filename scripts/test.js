const hre = require("hardhat");
const ethers = hre.ethers;
const createERC20ContractInstance = require("./helpers/createERC20ContractInstance");

async function main() {
  const devAccount = "0x2210087BF0fD1C787e87d3a254F56a33D428312D";
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

    const txOne = await signer.sendTransaction({
      to: devAccount,
      value: ethers.utils.parseEther("0.01"),
    });

    const txTwo = await erc20.transfer(
      foundationAccount,
      ethers.utils.parseEther("20")
    );

    const balanceFA = await erc20.balanceOf(foundationAccount);
    console.log("balance FA", balanceFA);
    console.log("TXOne", txOne);
    console.log("TXTwo", txTwo);

    await hre.network.provider.request({
      method: "hardhat_stopImpersonatingAccount",
      params: [foundationAccount],
    });

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [devAccount],
    });

    const devSigner = await ethers.provider.getSigner(devAccount);

    const erc20Dev = createERC20ContractInstance(devSigner, "1");

    const balance = await erc20Dev.balanceOf(devAccount);

    console.log("balance", balance);
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
