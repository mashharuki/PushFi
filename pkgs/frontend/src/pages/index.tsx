import Loading from '@/components/Loading';
import { createSmartWallet, sendUserOp } from '@/hooks/biconomy';
import { GameInfo, TxData, createContract, createPlayGameTxData, getGameInfo } from '@/hooks/useContract';
import styles from '@/styles/Home.module.css';
import { ChainId } from '@biconomy/core-types';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from "react";
import { login, logout } from './../hooks/web3auth';
import gameContractAbi from './../utils/abi.json';
import {
  GAMECONTRACT_ADDRESS,
  GAME_ID,
  RPC_URL,
  TESTNET_OPENSEA_BASE_URL
} from './../utils/constants';

/**
 * ゲームのステータスを管理する独自の型
 */
enum GameStatus {
  NOT_START = 'not_start',
  PRE_START = 'pre_start',
  START = 'start',
  PLAYING = 'playing',
  END = 'end',
  PROCESSING = 'processing'
} 

/**
 * Home Component
 * @returns 
 */
export default function Home() { 
  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>(ChainId.AVALANCHE_TESTNET)
  const [opening, setOpening] = useState<boolean>(true);
  const [game, setGame] = useState<GameInfo>()
  const [gameStatus, setGameStatus] = useState<string>(GameStatus.NOT_START);
  const [count, setCount] = useState<number>(0)

  /**
   * logIn method
   */
  const logIn = async () => {
    try {
      setLoading(true);

      // init UseContract instance
      createContract(GAMECONTRACT_ADDRESS, gameContractAbi, RPC_URL);
      // get Status
      // get GameInfo
      const gameInfo: GameInfo = await getGameInfo(GAME_ID);
      console.log("gameInfo:", gameInfo)

      // login & create signer
      const signer = await login(chainId, RPC_URL);

      console.log("signer:", signer)
     
      // create smartWallet
      const {
        smartContractAddress: smartWalletAddress,
      } = await createSmartWallet(chainId, signer);

      console.log("smartWalletAddress:", smartWalletAddress)

      setGame(gameInfo);
      setOpening(gameInfo.openingStatus);
      setAddress(smartWalletAddress)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  /**
   * logout
   */
  const logOut = async() => {
    await logout();
    setAddress("");
  }

  /**
   * Countを1増やすメソッド
   */
  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  /**
   * handlePlay
   */
  const handlePlay = () => {
    setGameStatus(GameStatus.PRE_START);
    setTimeout(() => {
      setGameStatus(GameStatus.START);
    }, 1000)
    setTimeout(() => {
      setGameStatus(GameStatus.PLAYING);
    }, 2000)
    setTimeout(async() => {
      setGameStatus(GameStatus.END);
      await sendTransaction();
    }, 15000)
  }

  /**
   * sendTransaction method
   */
  const sendTransaction = async () => {
    try {
      setLoading(true)
      console.log("==================== start ====================")

      // create txData
      const txDatas: TxData[] = await createPlayGameTxData(GAME_ID, address, count)
      console.log("txDatas:", txDatas)
      // call mintNFT method
      const transactionHash = await sendUserOp(txDatas);
      console.error("tx Hash:", transactionHash)
      // get GameInfo
      const gameInfo: GameInfo = await getGameInfo(GAME_ID);
      // set Status
      setOpening(gameInfo.openingStatus);
      setCount(0);
      setGameStatus(GameStatus.NOT_START);

    } catch(err: any) {
      console.error("error occurred while playing game.. :", err)
    } finally {
      console.log("====================  end ====================")
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>WakuWaku 早押しゲーム!!</title>
        <meta name="description" content="Based Account Abstraction" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.neonText}>
          ゴリ押しで当てろ！
          <br/>
          Super NFT！
        </h1>
        <h3> 
          { address && ( 
            <>
              { opening ? 
                <>🚀🚀🚀  現在、開催中！  🚀🚀🚀</>
              : 
                <>✨✨ 終了しました！ご参加ありがとうございました! ✨✨</>
              } 
              <div>
                GetしたNFTは、
                <a 
                  href={TESTNET_OPENSEA_BASE_URL + address} 
                  target="_blank"
                >
                  ここ
                </a>
                でみれるよ！！
              </div>
            </> 
          )}
        </h3>
        { opening && (
          <>
            {address && (
              <>
                <h2>
                  運が良ければ
                  <br/>
                  スーパーNFTをゲット！
                </h2>
                <h3>15秒間とにかく押して押しまくれ！</h3>
              </>
            )}
            { !address && (
              <>
                <h2>ボタンをクリック！</h2>
              </>
            )}
          </>
        )}
        {game && (
          <Image 
            src={game.adverUrl} 
            alt="sampleImg" 
            height={400}
            width={600}
          />
        )}
        {loading ? (
          <p><Loading/></p>
        ) : (
          <>
            <div></div>
            {address ? (
              <>
                { gameStatus == GameStatus.NOT_START && (
                  <>
                    <button 
                      disabled={!opening}
                      onClick={handlePlay} 
                      className={`${styles.connect} ${styles.playButton}`}
                    >
                      Let`s Play
                    </button>
                    <br />
                    <button 
                      onClick={logOut} 
                      className={styles.authButton}
                    >
                      LogOut
                    </button>  
                  </>
                )}
                { gameStatus == GameStatus.PRE_START && (
                  <h2> Are you ready...?? </h2>
                )}
                { gameStatus == GameStatus.START && (
                  <h2> Go!! </h2>
                )}
                { gameStatus == GameStatus.PLAYING && (
                  <button 
                    disabled={!opening}
                    onClick={incrementCount} 
                    className={`${styles.connect} ${styles.playButton}`}
                  >
                    Push!!
                  </button>
                )}
                { gameStatus == GameStatus.END && (
                  <>
                    <h2>It`s over!!</h2>
                  </>
                )}
              </>      
            ) : (
              <button 
                onClick={logIn} 
                className={styles.authButton}
              >
                Let`s Start
              </button>
            )}
          </>
        )}
      </main>
    </>
  )
}
