import { Program } from "@project-serum/anchor";
import { useState } from "react";
import config from "../config";
import idl from '../idl.json';
import { getProvider } from "../utils";


const NewGifForm = (props) => {
  const [inputValue, setInputValue] = useState('');

  const sendGif = async () => {
    if (inputValue.length > 0) {
      setInputValue('')
      try {
        const provider = getProvider();
        const program = new Program(idl, config.programID, provider);
        await program.rpc.addGif(inputValue, {
          accounts: {
            baseAccount: config.baseAccount.publicKey,
            user: provider.wallet.publicKey,
          }
        });
        console.log("Created a new BaseAccount w/ address:", config.baseAccount.publicKey.toString())
        props?.onSubmit?.()
      } catch (error) {
        console.log("Error adding a gif:", error)
      }
    }
  };


  return <form
    onSubmit={ (event) => {
      event.preventDefault();
      sendGif();
    } }
  >
    <input
      type="text"
      placeholder="Enter gif link!"
      value={ inputValue }
      onChange={ (e) => setInputValue(e.target.value) }
    />
    <button type="submit" className="cta-button submit-gif-button">Submit</button>
  </form>
}

export default NewGifForm