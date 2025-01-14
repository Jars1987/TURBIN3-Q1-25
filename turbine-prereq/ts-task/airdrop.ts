import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import wallet from './dev-wallet.json';

//impoirting the wallet from the json file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
//Connect to the devnet cluster
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Airdrop 2 SOL to the new account
(async () => {
  try {
    // We're going to claim 2 devnet SOL tokens
    const txhash = await connection.requestAirdrop(
      keypair.publicKey,
      2 * LAMPORTS_PER_SOL
    );

    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`
    );
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
