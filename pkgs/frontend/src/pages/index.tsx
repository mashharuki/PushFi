import Game from '@/components/Game';
import Loading from '@/components/Loading';
import { createSmartWallet } from '@/hooks/biconomy';
import { GameInfo, createContract, getGameInfo } from '@/hooks/useContract';
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
 * Home Component
 * @returns 
 */
export default function Home() { 
  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>(ChainId.AVALANCHE_TESTNET)
  const [opening, setOpening] = useState<boolean>(true);
  const [game, setGame] = useState<GameInfo>()

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

  return (
    <>
      <Head>
        <title>WakuWaku 早押しゲーム!!</title>
        <meta name="description" content="Based Account Abstraction" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          WakuWaku
          <br/>
          当てろ！スーパーNFT！！
        </h1>
        <h3> 
          { address && ( 
            <>
              { opening ? 
                <>🚀🚀🚀🚀🚀  現在、開催中！！  🚀🚀🚀🚀🚀</>
              : 
                <>✨✨✨✨✨ 終了しました！ご参加ありがとうございました! ✨✨✨✨✨ </>
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
                  {(game?.goalCount)?.toString()}
                  の倍数回目にトランザクションを送信した人には
                  <br/>
                  スーパーNFTをプレゼント！！
                </h2>
                <h3>※ ゲームに参加してくれた人には 記念NFTをプレゼント！</h3>
              </>
            )}
            { !address && (
              <>
                <h2>下のボタンを押して早押しゲームに参加しよう！！</h2>
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
        {loading && <p><Loading/></p>}
        <div></div>
        {address && (
          <Game 
            address={address} 
            opening={opening}
            setOpening={setOpening}
          />
        )}
        {!loading && address ? (
          <button 
            onClick={logOut} 
            className={styles.authButton}
          >
            LogOut
          </button>       
        ) : (
          <button 
            onClick={logIn} 
            className={styles.authButton}
          >
            Let`s Start
          </button>
        )}
      </main>
    </>
  )
}
