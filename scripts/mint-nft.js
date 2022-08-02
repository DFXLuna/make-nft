require("dotenv").config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);


// This is the compiled contract from hardhat
const contract = require("../artifacts/contracts/nft.sol/EmiNFT.json"); // Change this if deploying a new contract
// This is the address of the deployed contract on the blockchain
const contractAddress = "0x92354342Aff4CACC4edaAA401688AB9f667F7454"; // Change this if deploying a new contract
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)


const IPFS_LINK = "ipfs://Qmc2rwDgTfBqinPMLuhcuwZdkTuRxdgR8bFMfLpT1sBNeA";

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce from your wallet
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        )
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log(" Promise failed:", err)
        })
}

mintNFT(IPFS_LINK);