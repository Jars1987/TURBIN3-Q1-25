import bs58 from 'bs58';
import promptSync from 'prompt-sync';

const prompt = promptSync();

// Convert a base58 encoded private key to a wallet (byte array)
function base58ToWallet() {
  const base58 = prompt('Enter the base58 encoded private key: ');
  try {
    const wallet = bs58.decode(base58);
    console.log('Wallet (byte array):', Array.from(wallet));
  } catch (error: any) {
    console.error('Invalid base58 string:', error.message);
  }
}

// Convert a wallet (byte array) to a base58 encoded private key
function walletToBase58() {
  const input = prompt(
    'Enter the wallet as a comma-separated byte array: '
  ).trim();
  try {
    // Remove any invalid characters (non-numeric and non-comma characters)
    const sanitizedInput = input.replace(/[^0-9,]/g, '');
    const wallet = Uint8Array.from(sanitizedInput.split(',').map(Number));
    const base58 = bs58.encode(wallet);
    console.log('Base58 encoded private key:', base58);
  } catch (error: any) {
    console.error('Invalid wallet format:', error.message);
  }
}

// CLI Menu
console.log('Choose an option:');
console.log('1. Convert base58 to wallet');
console.log('2. Convert wallet to base58');
const choice = prompt('Enter your choice (1 or 2): ');

if (choice === '1') {
  base58ToWallet();
} else if (choice === '2') {
  walletToBase58();
} else {
  console.log('Invalid choice!');
}
