
const hre = require("hardhat");
require("dotenv").config();
async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function cosoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const from = memo.from;
    const user_id = memo.user_id;
    const election_id = memo.election_id;
    const candidate_id = memo.candidate_id;


    console.log(
      `At ${timestamp},from ${from},address ${user_id},voting to ${candidate_id}, with electionis ${election_id}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("Transaction");
  const contract = await chai.deploy(); //instance of contract

  await contract.deployed();
  console.log("Address of contract:", contract.address);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("Before Contesting Election ");
  await cosoleBalances(addresses);
  const amount = { value: hre.ethers.utils.parseEther("0.007") };

  await contract.connect(from1).addToBlockchain("userid1","electionid1","candidateid1");
  await contract.connect(from2).addToBlockchain("userid2","electionid2","candidateid2");

  await contract.connect(from3).addToBlockchain("userid1","electionid3","candidateid3");

  console.log("After Contesting Election");
  await cosoleBalances(addresses);

  // const addToBlockchain = await contract.addToBlockchain();
  const getAllTransaction = await contract.getAllTransaction();
  const getTransactionCount = await contract.getTransactionCount();
  
  consoleMemos( getAllTransaction);
  console.log(getTransactionCount);
  console.log(process.env.PRIVATE_KEY);
  

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
