import { ethers, upgrades } from "hardhat";


async function main() {
  const Greeter = await ethers.getContractFactory('Greeter');
  console.log('Deploying Greeter...');
  const greeter = await upgrades.deployProxy(Greeter, ["Hello, multisig!"]);
  console.log('Greeter deployed to:', greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });