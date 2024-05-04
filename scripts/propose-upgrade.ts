import { defender, ethers } from "hardhat";

async function main() {
  const proxyAddress = process.env.PROXY_CONTRACT_ADDRESS as string;

  const GreeterV2 = await ethers.getContractFactory("GreeterV2");
  console.log("Preparing proposal...");
  const proposal = await defender.proposeUpgrade(proxyAddress, GreeterV2);
  console.log("Upgrade proposal created at:", proposal.url);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  })