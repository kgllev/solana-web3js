const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js')

const wallet = new Keypair()

const publicKey = new  PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(walletBalance)
    }catch (error){
        console.log(error)
    }
}

const airDropSol = async() => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    const fromAirdropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
    await connection.confirmTransaction(fromAirdropSignature)

}

// Test to check if the wallet balance has changed
const main = async() => {
    await getWalletBalance()
    await  airDropSol()
    await getWalletBalance()
}


main()
