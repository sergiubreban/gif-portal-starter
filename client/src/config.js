import { web3 } from '@project-serum/anchor';
import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import kp from './keypair.json'
import idl from './idl.json';


// let baseAccount = Keypair.generate();
const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
const baseAccount = web3.Keypair.fromSecretKey(secret)

const programID = new PublicKey(idl.metadata.address);

const network = clusterApiUrl('devnet');

const opts = {
  preflightCommitment: "processed"
}

const config = {
  baseAccount,
  programID,
  network,
  opts
}

export default config;