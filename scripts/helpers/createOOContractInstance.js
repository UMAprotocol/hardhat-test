const OOArtifact = require("@uma/core/build/contracts/OptimisticOracle.json");
const ethers = require("ethers");

function createOOContractInstance(signer, address) {
  const contract = new ethers.Contract(address, OOArtifact.abi, signer);

  return contract;
}

module.exports = createOOContractInstance;
