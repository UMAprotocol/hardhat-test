const ethers = require("ethers");
const VotingTokenArtifact = require("@uma/core/build/contracts/VotingToken.json");

// Limited ERC-20 ABI
const abi = [
  "function balanceOf(address owner) view returns (uint)",
  "function transfer(address to, uint amount)",
  "function allowance(address owner, address spender)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

// interface Network {
//   [key: string]: {
//     address: string;
//     events: object;
//     links: object;
//     transactionHash: string;
//   };
// }

// Default to UMA Mainnet Contract Address.
module.exports = function createERC20ContractInstance(signer, networkId) {
  const artifact = VotingTokenArtifact.networks;
  const network = artifact[networkId];

  return new ethers.Contract(network.address, abi, signer);
};
