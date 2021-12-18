import { useEffect, useState } from 'react'
import './App.css';
import { Box, Button, useColorMode, Text, Stack } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import NewGifForm from './components/NewGifForm';
import { checkIfWalletIsConnected, connectWallet, createGifAccount, getGifList } from './utils';
import GifItem from './components/GifItem';
// Import the functions you need from the SDKs you need

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [gifs, setGifs] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const fetchGifs = () => {
    getGifList().then(setGifs)
  }

  useEffect(() => {
    if (walletAddress) {
      fetchGifs()
    }
  }, [walletAddress]);

  useEffect(() => {
    const onLoad = async () => {
      const address = await checkIfWalletIsConnected();
      if (address) {
        setWalletAddress(address)
      }
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <Box position='absolute' p='2' top='0' right='0'>
        <Stack spacing={ 2 } direction='row' alignItems='center'>
          <a href='https://github.com/sergiubreban/gif-portal-starter' target='_blank' rel="noreferrer"><Text>github</Text></a>
          <Button variant='simple' onClick={ toggleColorMode }>
            { colorMode === 'light' ? <MoonIcon /> : <SunIcon /> }
          </Button>
        </Stack>
      </Box>
      <div className={ walletAddress ? "authed-container" : "container" }>
        <div className="header-container">
          <Text className="header">🖼 GIF Portal</Text>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
        </div>
        { !walletAddress ? <button
          className="cta-button connect-wallet-button"
          onClick={ () => connectWallet().then(setWalletAddress) }
        >
          Connect to Wallet
        </button> : gifs === null ? <div className="connected-container">
          <button className="cta-button submit-gif-button" onClick={ () => createGifAccount().then(fetchGifs) }>
            Do One-Time Initialization For GIF Program Account
          </button>
        </div> : <div className="connected-container">
          <NewGifForm onSubmit={ () => fetchGifs() } />

          <div className="gif-grid">
            { gifs.map((gif, i) => <GifItem onUpdate={ () => fetchGifs() } gif={ gif } key={ gif.gifLink } />) }
          </div>
        </div> }
      </div>
    </div>
  );
};

export default App;
