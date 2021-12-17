const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

// describe('firstproject', () => {

//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.Provider.env());

//   it('Is initialized!', async () => {
//     // Add your test here.
//     const program = anchor.workspace.Firstproject;
//     const tx = await program.rpc.initialize();
//     console.log("Your transaction signature", tx);
//   });
// });

const main = async () => {
  console.log("🚀 Starting test...")

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Firstproject;

  const baseAccount = anchor.web3.Keypair.generate();

  // Call start_stuff_off, pass it the params it needs!
  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("📝 Your transaction signature", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 GIF Count', account.totalGifs.toString())
  console.log('👀 GIF List', account.gifList)

  // Call add_gif!
  await program.rpc.addGif('https://media.giphy.com/media/d7x9gLbMlxs4KACoyC/giphy.gif', {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey
    },
  });

  await program.rpc.upvoteGif('https://media.giphy.com/media/d7x9gLbMlxs4KACoyC/giphy.gif', {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey
    },
  });

  await program.rpc.upvoteGif('https://media.giphy.com/media/d7x9gLbMlxs4KACoyC/giphy.gif', {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey
    },
  });

  await program.rpc.upvoteGif('https://media.giphy.com/media/d7x9gLbMlxs4KACoyC/giphy.gif', {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey
    },
  });

  // Get the account again to see what changed.
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 GIF Count', account.totalGifs.toString())
  console.log('👀 GIF List', account.gifList)
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();