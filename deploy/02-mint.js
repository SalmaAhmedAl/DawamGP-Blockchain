const { network, ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts()

    // Basic NFT
    const dawamNft = await ethers.getContract("DawamNft", deployer)
    const dawamNftTx = await dawamNft.mintNft()
    const receipt= await dawamNftTx.wait(1) // Wait for the transaction to be mined
    console.log("Transaction hash:", receipt.transactionHash);
    console.log(`DAWAM NFT index 0 tokenURI: ${await basicNft.tokenURI(0)}`)
}
module.exports.tags = ["all", "mint"] 