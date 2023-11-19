import { sendUserOp } from '@/hooks/biconomy';
import { GameInfo, TxData, createPlayGameTxData, getGameInfo } from '@/hooks/useContract';
import { GAME_ID } from '@/utils/constants';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './../styles/Home.module.css';
import Loading from './Loading';

interface Props {
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
  address, 
  opening,
  setOpening
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  /**
   * handlePlay method
   */
  const handlePlay = async () => {
    try {
      setLoading(true)
      console.log("==================== start ====================")

      toast.info('Playing Game...', {
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
      const txData: TxData = await createPlayGameTxData(GAME_ID, address)
      console.log("txData:", txData)
      // call mintNFT method
      const transactionHash = await sendUserOp(txData);
      // get GameInfo
      const gameInfo: GameInfo = await getGameInfo(GAME_ID);
      // set Status
      setOpening(gameInfo.openingStatus);

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
      console.log("====================  end ====================")
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
              disabled={!opening}
              onClick={handlePlay} 
              className={`${styles.connect} ${styles.playButton}`}
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