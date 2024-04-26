import Loading from "@/components/Loading";
import { GlobalContext } from "@/context/GlobalProvider";
import { createSmartWallet, sendUserOp } from "@/hooks/biconomy";
import {
  GameInfo,
  TxData,
  createContract,
  createPlayGameTxData,
  getGameInfo,
} from "@/hooks/useContract";
import styles from "@/styles/Home.module.css";
import { ChainId } from "@biconomy/core-types";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gameContractAbi from "./../../utils/abi.json";
import {
  GAMECONTRACT_ADDRESS,
  GAME_ID,
  RPC_URL,
  TESTNET_OPENSEA_BASE_URL,
} from "./../../utils/constants";

/**
 * ゲームのステータスを管理する独自の型
 */
enum GameStatus {
  NOT_START = "not_start",
  PRE_START = "pre_start",
  START = "start",
  PLAYING = "playing",
  END = "end",
  PROCESSING = "processing",
}

/**
 * GameBoard Component
 * @returns
 */
const GameBoard = () => {
  const [address, setAddress] = useState<string>("");
  const [chainId, setChainId] = useState<number>(ChainId.AVALANCHE_TESTNET);
  const [opening, setOpening] = useState<boolean>(true);
  const [game, setGame] = useState<GameInfo>();
  const [gameStatus, setGameStatus] = useState<string>(GameStatus.NOT_START);
  const [count, setCount] = useState<number>(0);
  const { wallets } = useWallets();
  const { login, logout } = usePrivy();

  const globalContext = useContext(GlobalContext);

  /**
   * logIn method
   */
  const logIn = async () => {
    try {
      globalContext.setLoading(true);

      // init UseContract instance
      createContract(GAMECONTRACT_ADDRESS, gameContractAbi, RPC_URL);
      // get Status
      // get GameInfo
      const gameInfo: GameInfo = await getGameInfo(GAME_ID);
      console.log("gameInfo:", gameInfo);

      // login
      login();
      // create embeddedWallet instance
      const embeddedWallet = wallets.find(
        (wallet) => wallet.walletClientType === "privy"
      );
      await embeddedWallet!.switchChain(chainId);
      // login & create signer
      const provider = await embeddedWallet!.getEthersProvider();
      const signer = provider.getSigner();

      console.log("signer:", signer);

      // create smartWallet
      const { smartContractAddress: smartWalletAddress } =
        await createSmartWallet(chainId, signer);

      console.log("smartWalletAddress:", smartWalletAddress);

      setGame(gameInfo);
      setOpening(gameInfo.openingStatus);
      setAddress(smartWalletAddress);
    } catch (error) {
      console.error(error);
    } finally {
      globalContext.setLoading(false);
    }
  };

  /**
   * logout
   */
  const logOut = async () => {
    await logout();
    globalContext.setVerifyFlg(false);
    setAddress("");
  };

  /**
   * Countを1増やすメソッド
   */
  const incrementCount = () => {
    const new_count = count + 1;
    setCount(new_count);
    console.log(`count：${new_count}`);
  };

  /**
   * handlePlay
   */
  const handlePlay = () => {
    setGameStatus(GameStatus.PRE_START);
    setTimeout(() => {
      setGameStatus(GameStatus.START);
    }, 1000); // 1秒後
    setTimeout(() => {
      setGameStatus(GameStatus.PLAYING);
    }, 2000); // 2秒後
    setTimeout(() => {
      setGameStatus(GameStatus.END);
    }, 15000); // 15秒後
  };

  /**
   * sendTransaction method
   */
  const sendTransaction = async () => {
    try {
      globalContext.setLoading(true);
      console.log("==================== start ====================");

      console.log("count:", count);
      // create txData
      const txData: TxData = await createPlayGameTxData(
        GAME_ID,
        address,
        count
      );

      // call mintNFT method
      const transactionHash = await sendUserOp(txData);
      console.log("tx Hash:", transactionHash);
      // get GameInfo
      const gameInfo: GameInfo = await getGameInfo(GAME_ID);
      // set Status
      setOpening(gameInfo.openingStatus);
      setGameStatus(GameStatus.NOT_START);

      toast.success("🦄 Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err: any) {
      console.error("error occurred while playing game.. :", err);
      toast.error("Play Game Failed....", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      console.log("====================  end ====================");
      setCount((pre_count) => pre_count);
      setCount(() => {
        return 0;
      });
      globalContext.setLoading(false);
    }
  };

  return (
    <>
      <h3>
        {address && (
          <>
            {opening ? (
              <>🚀🚀🚀 現在、開催中！ 🚀🚀🚀</>
            ) : (
              <>✨✨ 終了しました！ご参加ありがとうございました! ✨✨</>
            )}
            <div>
              GetしたNFTは、
              <a href={TESTNET_OPENSEA_BASE_URL + address} target="_blank">
                ここ
              </a>
              でみれるよ！！
            </div>
          </>
        )}
      </h3>
      {opening && (
        <>
          {address && (
            <>
              <h2>
                15秒間押しまくって
                <br />
                Super NFTをゲットせよ！
              </h2>
            </>
          )}
          {!address && (
            <>
              <h2>ボタンをクリック！</h2>
            </>
          )}
        </>
      )}
      {game && address && (
        <Image src={game.adverUrl} alt="sampleImg" height={300} width={300} />
      )}
      {globalContext.loading ? (
        <p>
          <Loading />
        </p>
      ) : (
        <>
          <div></div>
          {address ? (
            <>
              {gameStatus == GameStatus.NOT_START && (
                <>
                  {!globalContext.verifyFlg ? (
                    <button
                      disabled={!opening}
                      onClick={globalContext.reCaptcha}
                      className={`${styles.connect} ${styles.playButton}`}
                    >
                      Verify I`m not a bot
                    </button>
                  ) : (
                    <>
                      <button
                        disabled={!opening}
                        onClick={handlePlay}
                        className={`${styles.connect} ${styles.playButton}`}
                      >
                        Let`s Play
                      </button>
                      <br />
                      <button onClick={logOut} className={styles.authButton}>
                        LogOut
                      </button>
                    </>
                  )}
                </>
              )}
              {gameStatus == GameStatus.PRE_START && (
                <h2> Are you ready...?? </h2>
              )}
              {gameStatus == GameStatus.START && <h2> Go!! </h2>}
              {gameStatus == GameStatus.PLAYING && (
                <button
                  disabled={!opening}
                  onClick={incrementCount}
                  className={`${styles.connect} ${styles.playButton}`}
                >
                  Push!!
                </button>
              )}
              {gameStatus == GameStatus.END && (
                <>
                  <h2>It`s over!!</h2>
                  <button
                    disabled={!opening}
                    onClick={sendTransaction}
                    className={`${styles.connect} ${styles.playButton}`}
                  >
                    Submit your result
                  </button>
                </>
              )}
            </>
          ) : (
            <button onClick={logIn} className={styles.authButton}>
              Let`s Start
            </button>
          )}
        </>
      )}
    </>
  );
};

export default GameBoard;
