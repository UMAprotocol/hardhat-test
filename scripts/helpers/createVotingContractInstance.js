const VotingArtifact = require("@uma/core/build/contracts/Voting.json");
const ethers = require("ethers");

function createVotingContractInstance(signer, networkId) {
  const artifact = VotingArtifact.networks;
  const network = artifact[networkId];

  const contract = new ethers.Contract(
    network.address,
    VotingArtifact.abi,
    signer
  );

  return contract;
}

module.exports = createVotingContractInstance;
