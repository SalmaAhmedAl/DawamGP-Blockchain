const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const response = await fetch("http://example.com/movies.json");
    const body = await response.json();
    const uri = body.tokenUri;
    //console.log(uri);
    log("----------------------------------------------------")
    const arguments = ["QmdxMRxev1Dyt5Xp7XkN7NSWq7isU87QEq4YGJY3Y6h5EH"]
    const dawamNft = await deploy("DawamNft", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    const dawamNftTx = await dawamNft.mintNft()
    const receipt= await dawamNftTx.wait(1) // Wait for the transaction to be mined
    console.log("Transaction hash:", receipt.transactionHash);
    console.log(`DAWAM NFT index 0 tokenURI: ${await basicNft.tokenURI(0)}`)
    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(dawamNft.address, arguments)
    }
}

module.exports.tags = ["all", "dawamNft", "main"]