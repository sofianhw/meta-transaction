const hardhat = require("hardhat");

async function main() {
  var minimcontract = await deployMinim();
  deployNFT(minimcontract);
}

async function deployMinim(): Promise<string>  {
  const MINIM = await hardhat.ethers.getContractFactory("MinimalForwarder");
  const minim = await MINIM.deploy({
    gasPrice: await hardhat.ethers.provider.getGasPrice(),
  });

  await minim.deployed();

  console.log(
    `MINIM with  deployed to ${minim.address}`
  );

  return minim.address;
}

async function deployNFT(minimcontract:string) {
  const NFTGL = await hardhat.ethers.getContractFactory("NFTGL");
  const nftgl = await NFTGL.deploy(minimcontract, {
    gasPrice: await hardhat.ethers.provider.getGasPrice(),
  });

  await nftgl.deployed();

  console.log(
    `NFTGL with  deployed to ${nftgl.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
