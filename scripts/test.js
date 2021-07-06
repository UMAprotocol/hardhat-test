const hre = require("hardhat");
const ethers = hre.ethers;
const createVotingContractInstance = require("./helpers/createVotingContractInstance");

async function main() {
  try {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0x7a3a1c2de64f20eb5e916f40d11b01c441b2a8dc"],
    });

    const signer = await ethers.provider.getSigner(
      "0x7a3a1c2de64f20eb5e916f40d11b01c441b2a8dc"
    );

    const vc = createVotingContractInstance(signer, "1");
    console.log("vc", vc);

    await hre.network.provider.send("hardhat_setBalance", [
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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
