// We are going to skip a bit on these tests...

const { assert } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

//writing the test code from here..

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("DAWAM NFT Unit Tests", function () {
          let dawamNft, deployer

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["dawamnft"])
              dawamNft = await ethers.getContract("DawamNft")
          })
        
        describe("Constructor", () => {
            it("Initializes the NFT Correctly.", async () => {
                const name = await dawamNft.name()
                const symbol = await dawamNft.symbol()
                const tokenCounter=await dawamNft.getTokenCounter()
                assert.equal(name, "DAWAM")
                assert.equal(symbol, "MKT")
                assert.equal(tokenCounter.toString(),"0")
            })
        })
//test02
        describe("Mint NFT", () => {
          beforeEach(async () => {
              const txResponse = await dawamNft.mintNft()
              await txResponse.wait(1)
          })
          
          it("Show the correct balance and owner of an NFT", async function () {
              const deployerAddress = deployer.address;
              const deployerBalance = await dawamNft.balanceOf(deployerAddress)
              const owner = await dawamNft.ownerOf("0")

              assert.equal(deployerBalance.toString(), "1")
              assert.equal(owner, deployerAddress)
          })
        })
    })