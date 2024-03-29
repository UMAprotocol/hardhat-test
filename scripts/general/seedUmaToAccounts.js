const hre = require("hardhat");
const ethers = hre.ethers;
const createERC20ContractInstance = require("../helpers/createERC20ContractInstance");
const ethersLib = require("ethers");

const sushiAddress = "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2";
const aragonAddress = "0xa117000000f279D81A1D3cc75430fAA017FA5A2e";
const randomAragonHolder = "0xb7f52b8b17736f818b4fb51e730f98a8c392335a";

// Limited ERC-20 ABI
const abi = [
  "function balanceOf(address owner) view returns (uint)",
  "function transfer(address to, uint amount)",
  "function allowance(address owner, address spender) view returns (uint)",
  "function approve(address spender, uint256 amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

async function main() {
  const foundationAccount = "0x7a3a1c2de64f20eb5e916f40d11b01c441b2a8dc";

  const hardhatAccountZero = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
  const hardhatAccountOne = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
  const hardhatAccountTwo = "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc";

  try {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [foundationAccount],
    });

    const signer = await ethers.provider.getSigner(foundationAccount);

    const erc20 = await createERC20ContractInstance(signer, "1");
    await hre.network.provider.send("hardhat_setBalance", [
      foundationAccount,
      "0x10000000000000000000000",
    ]);

    await hre.network.provider.send("hardhat_setBalance", [
      randomAragonHolder,
      "0x10000000000000000000000",
    ]);

    const txOne = await erc20.transfer(
      hardhatAccountZero,
      ethers.utils.parseEther("2000")
    );

    const txTwo = await erc20.transfer(
      hardhatAccountOne,
      ethers.utils.parseEther("2000")
    );

    const txThree = await erc20.transfer(
      hardhatAccountTwo,
      ethers.utils.parseEther("2000")
    );

    console.log("TXOne", txOne);
    console.log("TXTwo", txTwo);
    console.log("TXThree", txThree);

    // await hre.network.provider.request({
    //   method: "hardhat_stopImpersonatingAccount",
    //   params: [foundationAccount],
    // });
    // const secondAcc = "0x718648C8c531F91b528A7757dD2bE813c3940608";

    // await hre.network.provider.request({
    //   method: "hardhat_impersonateAccount",
    //   params: [secondAcc],
    // });

    // await hre.network.provider.send("hardhat_setBalance", [
    //   secondAcc,
    //   "0x10000000000000000000000",
    // ]);

    // const signerTwo = await ethers.provider.getSigner(secondAcc);

    // const sushiERC20 = new ethersLib.Contract(sushiAddress, abi, signerTwo);
    // const sushiBalance = await sushiERC20.balanceOf(secondAcc);
    // console.log("SB", sushiBalance.toString());
    // const txFour = await sushiERC20.transfer(hardhatAccountZero, sushiBalance);

    // console.log("txFour", txFour);

    // await hre.network.provider.request({
    //   method: "hardhat_stopImpersonatingAccount",
    //   params: [secondAcc],
    // });

    // await hre.network.provider.request({
    //   method: "hardhat_impersonateAccount",
    //   params: [randomAragonHolder],
    // });

    // const signerThree = await ethers.provider.getSigner(randomAragonHolder);

    // const aragonERC20 = new ethersLib.Contract(aragonAddress, abi, signerThree);
    // const txFive = await aragonERC20.transfer(
    //   hardhatAccountZero,
    //   ethers.utils.parseEther("20")
    // );

    // console.log("txFive", txFive);

    // await hre.network.provider.request({
    //   method: "hardhat_stopImpersonatingAccount",
    //   params: [randomAragonHolder],
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
