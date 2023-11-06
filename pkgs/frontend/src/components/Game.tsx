import { Biconomy } from '@/hooks/biconomy';
import { GAME_ID } from '@/utils/constants';
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './../styles/Home.module.css';
import Loading from './Loading';
import { TxData, UseContract } from '@/hooks/useContract';

interface Props {
  biconomyService: Biconomy,
  contractService: UseContract,
  smartAccount: BiconomySmartAccountV2,
  address: string,
  opening: boolean,
  setOpening: any,
}

/**
 * Game Component
 * @param param0 
 * @returns 
 */
const Game: React.FC<Props> = ({ 
  biconomyService, 
  contractService, 
  smartAccount,
  address, 
  opening,
  setOpening
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  /**
   * handleMint
   */
  const handleMint = async () => {
    try {
      setLoading(true)

      toast.info('Minting your NFT...', {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // create txData
      const txData:TxData = await contractService.createPlayGameTxData(GAME_ID, address)
      // call mintNFT method
      const transactionHash = await biconomyService.sendUserOp(smartAccount, txData);
      // get Status
      const gameStatus = await contractService.getGameStatus(GAME_ID);
      // set Status
      setOpening(gameStatus);

      toast.success(`Success! Here is your transaction:${transactionHash} `, {
        position: "top-right",
        autoClose: 18000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    } catch(err: any) {
      console.error("error occurred while playing game.. :", err)
    } finally {
      setLoading(false)
    }
  }


  return(
    <>
      {address && (
        <>
          { loading ? 
            <Loading/>
          : (
            <button 
              disabled={opening}
              onClick={handleMint} 
              className={styles.connect}
            >
              Let`s Play
            </button>
          )}
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default Game;