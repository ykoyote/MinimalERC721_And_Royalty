const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('MinimalERC721 Test', () => {
    let minimalNFT

    before(async () => {
        [deployer, account1, account2] = await ethers.getSigners()

        const MinimalNFT = await ethers.getContractFactory('MinimalERC721')

        minimalNFT = await MinimalNFT.deploy()
        await minimalNFT.deployed()
    })

    describe('Mint token and set royalty', async () => {
        it('mint two tokens and set two different royalties', async () => {
            const royalty10Percent = 1000
            const royalty20Percent = 1000

            await minimalNFT.connect(deployer).mint(account1.address)
            await minimalNFT.connect(deployer).setRoyalties(0, account1.address, royalty10Percent)
            await minimalNFT.connect(deployer).mint(account1.address)
            await minimalNFT.connect(deployer).setRoyalties(1, account1.address, royalty20Percent)

            const token0Royalty = await minimalNFT.getRaribleV2Royalties(0)
            const token1Royalty = await minimalNFT.getRaribleV2Royalties(1)

            expect(token0Royalty[0][1]).to.equal(royalty10Percent)
            expect(token1Royalty[0][1]).to.equal(royalty20Percent)
        })
    })
})