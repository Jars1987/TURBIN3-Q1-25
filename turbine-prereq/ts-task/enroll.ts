import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { Program, Wallet, AnchorProvider } from '@coral-xyz/anchor';
import { IDL, Turbin3Prereq } from './programs/Turbin3_prereq';
import wallet from './Turbin3-wallet.json';

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const github = Buffer.from('jars1987', 'utf8');

//AcnhorProvider
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: 'confirmed',
});

//Get our program
const program: Program<Turbin3Prereq> = new Program(IDL, provider);

// Create the PDA for our enrollment account
const enrollment_seeds = [Buffer.from('prereq'), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId
);

// Execute our enrollment transaction
// NOTE: No need to pass the PDA in the accounts. Anchor will automatically pass it in for you.
// It gets the Signer key form the signer account and the descriminator from the seeds in the IDL.
(async () => {
  try {
    const txhash = await program.methods
      .complete(github) //instructions
      .accounts({
        signer: keypair.publicKey,
      }) //accounts
      .signers([keypair]) //signers
      .rpc();

    console.log(`Success! Check out your TX here:
  https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
