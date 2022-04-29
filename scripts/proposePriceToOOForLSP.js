const hre = require("hardhat");
const ethers = hre.ethers;

const createOOContractInstance = require("./helpers/createOOContractInstance");
const createERC20ContractInstance = require("./helpers/createERC20ContractInstance");
// Data for current known LSP address: 0x372802d8A2D69bB43872a1AABe2bd403a0FafA1F
// This contract expires August 31st, 2021.
// priceIdentifier 0x554d415553440000000000000000000000000000000000000000000000000000
// ancData 0x747761704c656e6774683a33363030
// timeStamp 1630447200

// max uint value is 2^256 - 1
const MAX_UINT_VAL = ethers.constants.MaxUint256;
const INFINITE_APPROVAL_AMOUNT = MAX_UINT_VAL;

async function main() {
  // 2 months roughly
  // const timeToAdvance = 5184000;
  const hardHatID = "31337";

  const foundationAccount = "0x7a3A1c2De64f20EB5e916F40D11B01C441b2A8Dc";

  const OOAddress = "0xc43767f4592df265b4a9f1a398b97ff24f38c6a6";
  const LSP_ADDRESS = "0x57C891D01605d456bBEa535c8E56EaAc4E2DFE11";
  const identifier =
    "0x7544414f5f4b50495f554d410000000000000000000000000000000000000000";
  const ancData =
    "0x737461727454696d657374616d703a313633333034363430302c6d617842617365496e746567726174696f6e733a32302c6d6178426f6e7573496e746567726174696f6e733a352c626f6e75734d696e56616c75653a353030303030302c626f6e7573496e746567726174696f6e734d756c7469706c6965723a322e30302c666c6f6f72496e746567726174696f6e733a30";
  const timestamp = "1640872800";
  // LSP data.
  // const OOAddress = "0xc43767f4592df265b4a9f1a398b97ff24f38c6a6";
  // const LSP_ADDRESS = "0x372802d8A2D69bB43872a1AABe2bd403a0FafA1F";
  // const identifier =
  //   "0x554d415553440000000000000000000000000000000000000000000000000000";
  // const ancData = "0x747761704c656e6774683a33363030";
  // const timestamp = "1630447200";

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

    const allowanceTX = await erc20.approve(
      OOAddress,
      INFINITE_APPROVAL_AMOUNT
    );

    console.log("allowanceTx", allowanceTX);

    // await hre.network.provider.send("hardhat_setBalance", [
    //   LSP_ADDRESS,
    //   "0x10000000000000000000000000",
    // ]);

    const optOracle = createOOContractInstance(signer, OOAddress);
    const proposePriceTX = await optOracle.proposePrice(
      LSP_ADDRESS,
      identifier,
      timestamp,
      ancData,
      "2"
    );

    console.log("PP TX", proposePriceTX);

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
