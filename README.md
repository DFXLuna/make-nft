# clone-nft
This repo demonstrates the ease of minting an NFT on the Ethereum blockchain using Node, Alchemy and Alchemy-web3
Adapting https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft

Please review the code thoroughly before using it, I'm not responsible for any lost funds because my code doesn't work :)

## Prerequisites

- An Alchemy account
- An ethereum wallet with ~25gwei to fund the minting
- An additional 25gwei if you want want to deploy your own NFT minting contract
    - Make sure to run on a test net first. 


## Instructions

### Minting
This will deploy your NFT to my existing contract on the Goerli testnet
1. Create an Alchemy project on the Goerli testnet and retrieve the API URL
2. Fill out the fields in `.env`
    - API_URL is your Alchemy project API url
    - PRIVATE_KEY is your wallet's private key, used to sign the transaction
        - Make sure you thoroughly review my code before running it and make sure I'm not trying to steal your wallet key ;)
    - PUBLIC_KEY is your wallet public key, used in the `from` field of the transaction
3. Open `scripts/mint-nft.js` and set `IPFS_LINK` equal to the IPFS link of your NFT.
    - Creating an pinning an NFT is a little outside the scope of this readme.
        - There's an example NFT json in metadata. You simply need to pin your image with a service like nft.storage, set the link and fields in your NFT JSON and then pin that in your service as well. The IPFS link from pinning the JSON file will be used to mint the NFT.
4. Run `npm install` to download the dependencies
5. Run `npm mint` to mint your NFT using the configured contract

### Contract Deployment
0. Fill out the fields in `.env`
1. Open `contracts/nft.sol` and swap out `eNFT` and `EmiNFT` for your NFT's symbol and Name. These get attached to the contract used to generate your NFT.
2. Review the contract code. This current contract is set to allow anyone to use it to mint NFTs.
3. Modify `scripts/deploy.js` to use your NFT's name in place of `EmiNFT`
4. Run `npm compile` to compile the contract code and `npm deploy:g` to deploy the contract to the goerli testnet
5. Modify `scripts/mint-nft.js` to point to your contract's json and address on the block chain
6. Follow the minting instructions to mint NFTs on your new contract