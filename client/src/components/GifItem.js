
import { Text, Flex, Center, Stack } from '@chakra-ui/react';
import { Program } from '@project-serum/anchor';
import { useState } from 'react';
import { getProvider } from '../utils';
import idl from '../idl.json';
import config from '../config';

const GifItem = ({ gif, onUpdate }) => {
  const [voted, setVoted] = useState(false);
  const upvoteGif = async () => {
    setVoted(true);
    try {
      const provider = getProvider();
      const program = new Program(idl, config.programID, provider);
      await program.rpc.upvoteGif(gif.gifLink, {
        accounts: {
          baseAccount: config.baseAccount.publicKey,
          user: provider.wallet.publicKey,
        }
      });
      onUpdate();
    } catch (error) {
      console.log("Error upvote action:", error)
    }
  };

  return <Stack className="gif-item" >
    <img src={ gif.gifLink } alt={ gif.gifLink } />
    <Text>user address: { gif.userAddress?.toString() }</Text>
    <Center>
      <Flex>
        <Text borderRadius='15px' p='1' color='#fff' bg='-webkit-linear-gradient(left, #4e44ce, #35aee2)'>{ gif.upvote?.toString() }</Text>
      </Flex>
      { !voted && <Text variant={ 'simple' } cursor='pointer' mx='5' onClick={ () => !voted && upvoteGif() } fontSize={ '12px' } fontWeight='600' >upvode</Text> }
    </Center>
  </Stack>
}

export default GifItem;