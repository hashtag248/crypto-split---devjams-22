async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const MultiSig = await ethers.getContractFactory("MultiSigWallet");
    const multisig = await MultiSig.deploy(["0xCDF770392F1E5E61725Cc9522c80070134D50eC7"], {value: ethers.utils.parseEther('0.001')});
  
    console.log("Token address:", multisig.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });