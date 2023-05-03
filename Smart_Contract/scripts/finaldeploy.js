const hre = require("hardhat");

async function main() {
    const [deployer] =  await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  



    const chai = await hre.ethers.getContractFactory("Transaction");
  
    const contract = await chai.deploy(); //instance of contract
   
    await contract.deployed();
    console.log("Address of contract:", contract.address);

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  