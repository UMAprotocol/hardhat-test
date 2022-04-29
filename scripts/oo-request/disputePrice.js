const hre = require("hardhat");
const ethers = hre.ethers;
const createOOContractInstance = require("../helpers/createOOContractInstance");
const createERC20ContractInstance = require("../helpers/createERC20ContractInstance");

const ethersLib = require("ethers");
const web3 = require("web3");
const toWei = require("../helpers/toWei");

const MAX_INT = ethers.constants.MaxUint256;

/**
 * @notice Disputes a price value for an existing price request with an active proposal.
 * @param requester sender of the initial price request.
 * @param identifier price identifier to identify the existing request.
 * @param timestamp timestamp to identify the existing request.
 * @param ancillaryData ancillary data of the price being requested.
 * @return totalBond the amount that's pulled from the disputer's wallet as a bond. The bond will be returned to
 * the disputer once settled if the dispute was valid (the proposal was incorrect).
 */
/*
     function disputePrice(
      address requester,
      bytes32 identifier,
      uint256 timestamp,
      bytes memory ancillaryData
  ) external virtual returns (uint256 totalBond);
*/

async function main() {
  const foundationAccount = "0x7a3a1c2de64f20eb5e916f40d11b01c441b2a8dc";
  const ooAddress = "0xc43767f4592df265b4a9f1a398b97ff24f38c6a6";
  const hardhatAccount0 = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

  try {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [foundationAccount],
    });

    await hre.network.provider.send("hardhat_setBalance", [
      foundationAccount,
      "0x10000000000000000000000",
    ]);

    const signer = await ethers.provider.getSigner(foundationAccount);
    const erc20 = await createERC20ContractInstance(signer, "1");

    const tx = await erc20.approve(ooAddress, MAX_INT);
    console.log("tx", tx);
    const oo = createOOContractInstance(signer, ooAddress);

    const toIdenHex = web3.utils.utf8ToHex("UMAUSD");
    const identifier = web3.utils.padRight(toIdenHex, 64);
    console.log("identifier", identifier);
    const timestamp = Number(process.argv[2]);
    const ancData = "0x";
    const currency = "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828";

    const disputeTx = await oo.disputePrice(
      foundationAccount,
      identifier,
      timestamp,
      ancData
    );
    console.log("disputeTx", disputeTx);
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
