import config from "./config";
import { Connection } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import idl from './idl.json';
import { SystemProgram } from '@solana/web3.js';


const { baseAccount, programID } = config


const getProvider = () => {
  const connection = new Connection(config.network, config.opts.preflightCommitment);
  const provider = new Provider(
    connection, window.solana, config.opts.preflightCommitment,
  );
  return provider;
}

const connectWallet = async () => {
  const { solana } = window;
  if (solana) {
    const response = await solana.connect();
    console.log('Connected with Public Key:', response.publicKey.toString());
    return response.publicKey.toString();
  }
};

const checkIfWalletIsConnected = async () => {
  try {
    const { solana } = window;

    if (solana) {
      if (solana.isPhantom) {
        console.log('Phantom wallet found!');
        /*
      * The solana object gives us a function that will allow us to connect
      * directly with the user's wallet!
      */
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log('Connected with Public Key:', response.publicKey.toString());
        return response.publicKey.toString()
      }
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }
  } catch (error) {
    console.error(error);
  }
};

const createGifAccount = async () => {
  try {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);

    await program.rpc.startStuffOff({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount]
    });
  } catch (error) {
    console.log("Error creating BaseAccount account:", error)
  }
}

const getGifList = async () => {
  try {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

    console.log("Got the account", account)
    return account.gifList

  } catch (error) {
    console.log("Error in getGifList: ", error)
    return null
  }
}

export {
  getProvider,
  connectWallet,
  checkIfWalletIsConnected,
  createGifAccount,
  getGifList
}