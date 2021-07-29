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

  const foundationAccount = "0x7a3a1c2de64f20eb5e916f40d11b01c441b2a8dc";

  // LSP data.
  const OOAddress = "0xc43767f4592df265b4a9f1a398b97ff24f38c6a6";
  const LSP_ADDRESS = "0x372802d8A2D69bB43872a1AABe2bd403a0FafA1F";
  const identifier =
    "0x554d415553440000000000000000000000000000000000000000000000000000";
  const ancData = "0x747761704c656e6774683a33363030";
  const timestamp = "1630447200";

  try {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [LSP_ADDRESS],
    });

    const signer = await ethers.provider.getSigner(foundationAccount);

    const erc20 = createERC20ContractInstance(signer, "1");
    await hre.network.provider.send("hardhat_setBalance", [
      foundationAccount,
      "0x10000000000000000000000",
    ]);

    const allowanceTX = await erc20.approve(
      OOAddress,
      INFINITE_APPROVAL_AMOUNT
    );

    console.log("allowanceTx", allowanceTX);

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
