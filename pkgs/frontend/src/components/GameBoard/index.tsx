import Loading from "@/components/Loading";
import { GlobalContext } from "@/context/GlobalProvider";
import {
  createContract,
  createPlayGameTxData,
  getGameInfo,
} from "@/hooks/useContract";
import styles from "@/styles/Home.module.css";
import { GameInfo, TxData } from "@/utils/types";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gameContractAbi from "./../../utils/abi.json";
import {
  GAMECONTRACT_ADDRESS,
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
      const gameInfo: GameInfo = await getGameInfo();
      console.log("gameInfo:", gameInfo);

      // login
      login();
      // create embeddedWallet instance
      const embeddedWallet = wallets.find(
        (wallet) => wallet.walletClientType === "privy"
      );
      await embeddedWallet!.switchChain(globalContext.chainId);
      // login & create signer
      const provider = await embeddedWallet!.getEthersProvider();
      const signer = provider.getSigner();

      console.log("signer:", signer);

      // create smartWallet
      await globalContext.createSmartWallet(globalContext.chainId, signer);

      setGame(gameInfo);
      setOpening(gameInfo.openingStatus);
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
    globalContext.setSmartAddress("");
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
        globalContext.smartAddress,
        count
      );

      // call playGAme method
      const transactionHash = await globalContext.sendUserOp(txData);
      console.log("tx Hash:", transactionHash);
      // get GameInfo
      const gameInfo: GameInfo = await getGameInfo();
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
        {globalContext.smartAddress && (
          <>
            {opening ? (
              <>🚀🚀🚀 You can play now! 🚀🚀🚀</>
            ) : (
              <>✨✨ Game over ✨✨</>
            )}
            <div>
              You can see NFTs at
              <a
                href={TESTNET_OPENSEA_BASE_URL + globalContext.smartAddress}
                target="_blank"
              >
                here
              </a>
            </div>
          </>
        )}
      </h3>
      {opening && (
        <>
          {globalContext.smartAddress && (
            <>
              {game && (
                <>
                  {game.gameSeacon == 1 ? (
                    <h2>
                      Push button for 15 seconds
                      <br />
                      to get BattleCard NFT!
                    </h2>
                  ) : (
                    <h2>
                      Push button for 15 seconds
                      <br />
                      to defeat the enemy!!
                    </h2>
                  )}
                </>
              )}
              <h2>Please Click button</h2>
            </>
          )}
        </>
      )}
      {game && globalContext.smartAddress && (
        <Image
          src={game.enemyInfo.enemyImgUrl}
          alt="sampleImg"
          height={250}
          width={250}
        />
      )}
      {globalContext.loading ? (
        <p>
          <Loading />
        </p>
      ) : (
        <>
          <div></div>
          {globalContext.smartAddress ? (
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
