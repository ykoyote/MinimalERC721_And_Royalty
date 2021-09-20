const hre = require("hardhat")

async function main() {
    const MinimalNFT = await hre.ethers.getContractFactory('MinimalNFT')

    await MinimalNFT.deployed()

    console.log("MinimalNFT deployed to:", MinimalNFT.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })