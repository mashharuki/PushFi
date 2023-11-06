import Game from '@/components/Game';
import Loading from '@/components/Loading';
import { createSmartWallet } from '@/hooks/biconomy';
import { createContract, getGameStatus } from '@/hooks/useContract';
import styles from '@/styles/Home.module.css';
import { ChainId } from '@biconomy/core-types';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from "react";
import { login, logout } from './../hooks/web3auth';
import gameContractAbi from './../utils/abi.json';
import { GAMECONTRACT_ADDRESS, GAME_ID, RPC_URL, SAMPLE_ADVERTISEMENT_URL } from './../utils/constants';

/**
 * Home Component
 * @returns 
 */
export default function Home() { 
  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>(ChainId.AVALANCHE_TESTNET)
  const [opening, setOpening] = useState<boolean>(true);

  /**
   * logIn method
   */
  const logIn = async () => {
    try {
      setLoading(true);

      // init UseContract instance
      createContract(GAMECONTRACT_ADDRESS, gameContractAbi, RPC_URL);
      // get Status
      const gameStatus = await getGameStatus(GAME_ID);
      console.log("gameStatus:", gameStatus)

      // login & create signer
      const signer = await login(chainId, RPC_URL);

      console.log("signer:", signer)
     
      // create smartWallet
      const {
        smartContractAddress: smartWalletAddress,
      } = await createSmartWallet(chainId, signer);

      console.log("smartWalletAddress:", smartWalletAddress)

      setOpening(gameStatus);
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
        <h1>WakuWaku 早押しゲーム!!</h1>
        <h3> 
          { address && ( 
            <>
              { opening ? 
                <>🚀🚀🚀🚀🚀  現在、開催中！！  🚀🚀🚀🚀🚀</>
              : 
                <>✨✨✨✨✨ 終了しました！ご参加ありがとうございました! ✨✨✨✨✨</>
              } 
            </> 
          )}
        </h3>
        <h2>100回目の挑戦者には 100USDCをプレゼント！</h2>
        <h3>※ ゲームに参加してくれた人には 記念バッジをプレゼント！</h3>
        <Image 
          src={SAMPLE_ADVERTISEMENT_URL} 
          alt="sampleImg" 
          height={400}
          width={600}
        />
        <div></div>
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
            className={styles.connect}
          >
            LogOut
          </button>       
        ) : (
          <button 
            onClick={logIn} 
            className={styles.connect}
          >
            Let`s Start
          </button>
        )}
      </main>
    </>
  )
}
