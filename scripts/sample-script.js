// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const BridgeAdmin = require("@uma/core/contracts-ovm/insured-bridge/implementation/BridgeAdmin.sol");

const hre = require("hardhat");
const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  const Bridge = await hre.ethers.getContractFactory("BridgeDepositBox");
  const bridge = await Bridge.deploy(1, [account], 1, 0, 100000);

  await bridge.deployed();

  console.log("Bridge deployed to:", bridge.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
