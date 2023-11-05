import Game from '@/components/Game';
import Loading from '@/components/Loading';
import { Biconomy } from '@/hooks/biconomy';
import styles from '@/styles/Home.module.css';
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { ChainId } from '@biconomy/core-types';
import { ethers } from 'ethers';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from "react";
import { Lit } from './../hooks/lit';
import { RPC_URL, SAMPLE_ADVERTISEMENT_URL } from './../utils/constants';

// base Avalanche RPC
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

/**
 * Home Component
 * @returns 
 */
export default function Home() { 
  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccountV2 | null>(null);
  const [biconomyService, setbiconomyService] = useState<Biconomy | null>(null);
  const [litService, setLitService] = useState<Lit | null>(null);
  const [chainId, setChainId] = useState<number>(ChainId.AVALANCHE_TESTNET)
  const [opening, setOpening] = useState<boolean>(true);

  /**
   * signUp
   */
  const signUp = async () => {
    setLoading(true);
    var newPkpWallet;
      
    try {
      if(litService == null || litService == undefined) {
        // init lit isntance
        const lit = new Lit();
        const newLitService = await lit.create();
        setLitService(newLitService);

        await newLitService.registerWebAuthn();
        // authicate (SignInにあたる)
        const authMethod = await newLitService!.authenticateWithWebAuthn();
        // get PKPS 
        const pkp = await newLitService!.getPKPs(authMethod!);
        // get new pkpWallet
        newPkpWallet = await newLitService!.getPkpWallet(pkp[0].publicKey, authMethod!);
      } else {
        await litService!.registerWebAuthn();
        // authicate (SignInにあたる)
        const authMethod = await litService!.authenticateWithWebAuthn();
        // get PKPS 
        const pkp = await litService!.getPKPs(authMethod!);
        // get new pkpWallet
        newPkpWallet = await litService!.getPkpWallet(pkp[0].publicKey, authMethod!);
      }

      if(biconomyService == null || biconomyService == undefined) {
        // init Bicnomy isntance
        const biconomy = new Biconomy();
        const newBicocomyService = await biconomy.create(chainId);
        setbiconomyService(newBicocomyService);
        // create smartWallet
        const {
          smartContractAddress: smartWalletAddress,
          biconomySmartAccount: smartAccount
        } = await newBicocomyService!.createSmartWallet(newPkpWallet);
        
        setAddress(smartWalletAddress)
        setSmartAccount(smartAccount)
      } else {
        // create smartWallet
        const {
          smartContractAddress: smartWalletAddress,
          biconomySmartAccount: smartAccount
        } = await biconomyService!.createSmartWallet(newPkpWallet);
        
        setAddress(smartWalletAddress)
        setSmartAccount(smartAccount)
      }   
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  /**
   * signIn method
   */
  const signIn = async () => {
    try {
      setLoading(true);
      var newPkpWallet;

      if(litService == null || litService == undefined) {
        // init lit isntance
        const lit = new Lit();
        const newLitService = await lit.create();
        setLitService(newLitService);

        // authicate (SignInにあたる)
        const authMethod = await newLitService!.authenticateWithWebAuthn();
        // get PKPS 
        const pkp = await newLitService!.getPKPs(authMethod!);
        // get new pkpWallet
        newPkpWallet = await newLitService!.getPkpWallet(pkp[0].publicKey, authMethod!);
      } else {
        // authicate (SignInにあたる)
        const authMethod = await litService!.authenticateWithWebAuthn();
        // get PKPS 
        const pkp = await litService!.getPKPs(authMethod!);
        // get new pkpWallet
        newPkpWallet = await litService!.getPkpWallet(pkp[0].publicKey, authMethod!);
      }

      if(biconomyService == null || biconomyService == undefined) {
        // init Bicnomy isntance
        const biconomy = new Biconomy();
        const newBicocomyService = await biconomy.create(chainId);
        setbiconomyService(newBicocomyService);

        // create smartWallet
        const {
          smartContractAddress: smartWalletAddress,
          biconomySmartAccount: smartAccount
        } = await newBicocomyService!.createSmartWallet(newPkpWallet);
        
        setAddress(smartWalletAddress)
        setSmartAccount(smartAccount)
      } else {
        // create smartWallet
        const {
          smartContractAddress: smartWalletAddress,
          biconomySmartAccount: smartAccount
        } = await biconomyService!.createSmartWallet(newPkpWallet);
        
        setAddress(smartWalletAddress)
        setSmartAccount(smartAccount)
      }   

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };


  return (
    <>
      <Head>
        <title>WakuWaku 早押しゲーム!!</title>
        <meta name="description" content="Based Account Abstraction" />
      </Head>
      <main className={styles.main}>
        <h1>WakuWaku 早押しゲーム!!</h1>
        <h3> 
          { opening ? 
            <>🚀🚀🚀🚀🚀  現在、開催中！！  🚀🚀🚀🚀🚀</>
          : 
            <>✨✨✨✨✨ 終了しました！ご参加ありがとうございました! ✨✨✨✨✨</>
          } 
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
        {!loading && !address && (
          <button 
            onClick={signUp} 
            className={styles.connect}
          >
            Sign Up
          </button>
        )}
        {!loading && !address && (
          <button 
            onClick={signIn} 
            className={styles.connect}
          >
            Sign In
          </button>
        )}
        {loading && <p><Loading/></p>}
        {smartAccount && provider && (
          <Game 
            biconomyService={biconomyService!}
            smartAccount={smartAccount} 
            address={address} 
            provider={provider} 
          />
        )}
      </main>
    </>
  )
}
