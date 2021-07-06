
const hre = require("hardhat");
// const ethers = require("ethers");


async function main() {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0x7a3a1c2de64f20eb5e916f40d11b01c441b2a8dc"]}
  )


  const signer = await ethers.provider.getSigner("0x7a3a1c2de64f20eb5e916f40d11b01c441b2a8dc")
  console.log("signer", signer);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
