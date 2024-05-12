import Loading from "@/components/Loading";
import { GlobalContext } from "@/context/GlobalProvider";
import getAttackInfoQuery from "@/graphql/getAttackInfoQuery";
import getCurrentSupplyUpdatedsQuery from "@/graphql/getCurrentSupplyUpdatedsQuery";
import getEnemyLifeUpdatedsQuery from "@/graphql/getEnemyLifeUpdatedsQuery";
import getGameFinishedsQuery from "@/graphql/getGameFinishedsQuery";
import getGameSeasonChangedInfoQuery from "@/graphql/getGameSeasonChangedInfoQuery";
import {
  addAttackEventListner,
  createContract,
  createPlayGameTxData,
  createTransferNftTxData,
  getActiveGameId,
  getGameInfo,
} from "@/hooks/useContract";
import styles from "@/styles/Home.module.css";
import {
  AttackInfos,
  CurrentSupplysInfos,
  EnemyLifeUpdatedInfos,
  GameFinishedInfos,
  GameInfo,
  GameSeasonChangedInfos,
  TxData,
} from "@/utils/types";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "urql";
import {
  BATTLE_CARD_IMAGE_URL,
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

type Props = {
  game: GameInfo;
};

/**
 * GameBoard Component
 * @returns
 */
const GameBoard = (props: Props) => {
  const [gameStatus, setGameStatus] = useState<string>(GameStatus.NOT_START);
  const [count, setCount] = useState<number>(0);

  const { wallets } = useWallets();
  const { login, logout } = usePrivy();
  const globalContext = useContext(GlobalContext);
  // get game data from props
  const { game } = props;

  // ========================================================================
  // fetch query datas
  // ========================================================================

  //get attack info
  const [result] = useQuery({
    query: getAttackInfoQuery,
    variables: { gameId: Number(game.gameId) },
  });
  const { data: attacks } = result;

  const attacksInfos: AttackInfos = attacks;
  if (attacksInfos != undefined) {
    console.log("attacksInfos:", attacksInfos.attacks);
  }

  //get currentSupply info
  const [result2, currentSupplyUpdatedsQuery] = useQuery({
    query: getCurrentSupplyUpdatedsQuery,
    variables: { gameId: Number(game.gameId) },
  });
  const { data: currentSupplys } = result2;

  const currentSupplysInfos: CurrentSupplysInfos = currentSupplys;
  if (currentSupplysInfos != undefined) {
    console.log(
      "currentSupplysInfos:",
      currentSupplysInfos.currentSupplyUpdateds
    );
  }

  // get EnemeyLife info
  const [result3, enemyLifeUpdatedsQuery] = useQuery({
    query: getEnemyLifeUpdatedsQuery,
    variables: { gameId: Number(game.gameId) },
  });
  const { data: enemyLifeUpdateds } = result3;

  const enemyLifeInfos: EnemyLifeUpdatedInfos = enemyLifeUpdateds;
  if (enemyLifeInfos != undefined) {
    console.log("enemyLifeInfos:", enemyLifeInfos.enemyLifeUpdateds);
  }

  // get season change info
  const [result4, gameSeasonChangedInfoQuery] = useQuery({
    query: getGameSeasonChangedInfoQuery,
    variables: { gameId: Number(game.gameId) },
  });
  const { data: gameSeasonChangeds } = result4;

  const gameSeasonChangedInfos: GameSeasonChangedInfos = gameSeasonChangeds;
  if (gameSeasonChangedInfos != undefined) {
    console.log(
      "gameSeasonChangedInfos:",
      gameSeasonChangedInfos.gameSeasonChangeds
    );
  }

  // get gameFinish info
  const [result5, gameFinishedsQuery] = useQuery({
    query: getGameFinishedsQuery,
    variables: { gameId: Number(game.gameId) },
  });
  const { data: gameFinisheds } = result5;

  const gameFinishedInfos: GameFinishedInfos = gameFinisheds;
  if (gameFinishedInfos != undefined) {
    console.log("gameFinishedInfos:", gameFinishedInfos.gameFinisheds);
  }

  // TODO
  // get NftMinteds info

  /**
   * logIn method
   */
  const logIn = async () => {
    try {
      globalContext.setLoading(true);

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

      // create transfer nft txData
      const txData: TxData = await createTransferNftTxData(
        globalContext.smartAddress,
        count,
        await getActiveGameId()
      );
      // create playGame txData
      const txData2: TxData = await createPlayGameTxData(
        globalContext.smartAddress,
        count
      );

      // call transfer nft method
      const transactionHash = await globalContext.sendUserOp(txData);
      console.log("playGame tx Hash:", transactionHash);
      // call playGame method
      const transactionHash2 = await globalContext.sendUserOp(txData2);
      console.log("playGame tx Hash:", transactionHash2);
      // get GameInfo
      const gameInfo: GameInfo = await getGameInfo();
      // set Status
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

      if (gameSeasonChangedInfos.gameSeasonChangeds.length == 0) {
        toast.info(`Mint ${count} NFTs!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
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

  useEffect(() => {
    // init UseContract instance
    createContract();
    addAttackEventListner();
  }, []);

  return (
    <>
      {attacksInfos != undefined &&
        currentSupplysInfos != undefined &&
        enemyLifeInfos != undefined &&
        gameSeasonChangedInfos != undefined &&
        gameFinishedInfos != undefined && (
          <>
            <h3>
              {globalContext.smartAddress && (
                <>
                  {gameFinishedInfos.gameFinisheds.length == 0 ? (
                    <>🚀🚀🚀 You can play now! 🚀🚀🚀</>
                  ) : (
                    <>
                      ✨✨ Game over ✨✨
                      <br />
                      See you next game!
                      <br />
                    </>
                  )}
                  <div>
                    You can see NFTs at
                    <a
                      href={
                        TESTNET_OPENSEA_BASE_URL +
                        globalContext.smartAddress +
                        "/owned"
                      }
                      target="_blank"
                    >
                      here
                    </a>
                  </div>
                </>
              )}
            </h3>
            <>
              {globalContext.smartAddress && (
                <>
                  {game && (
                    <>
                      {gameFinishedInfos.gameFinisheds.length == 0 && (
                        <>
                          {gameSeasonChangedInfos.gameSeasonChangeds.length !=
                          0 ? (
                            <h2>
                              Push button for 15 seconds
                              <br />
                              to defeat the enemy!!
                              <br />
                              Enemy Status
                              <br />
                              {
                                <>
                                  {enemyLifeInfos.enemyLifeUpdateds.length == 0
                                    ? game.enemyInfo_enemyLife
                                    : enemyLifeInfos.enemyLifeUpdateds[0]
                                        .newEnemyLife}
                                </>
                              }{" "}
                              / {game.enemyInfo_enemyLife}
                            </h2>
                          ) : (
                            <h2>
                              Push button for 15 seconds
                              <br />
                              to get BattleCard NFT!
                              <br />
                              Supply Status
                              <br />
                              {
                                <>
                                  {currentSupplysInfos.currentSupplyUpdateds
                                    .length == 0
                                    ? 0
                                    : currentSupplysInfos
                                        .currentSupplyUpdateds[0].newSupply}
                                </>
                              }{" "}
                              / {game.cardNftSupply}
                            </h2>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
            {game &&
              globalContext.smartAddress &&
              gameFinishedInfos.gameFinisheds.length == 0 && (
                <>
                  {gameSeasonChangedInfos.gameSeasonChangeds.length == 0 ? (
                    <Image
                      src={BATTLE_CARD_IMAGE_URL}
                      alt="battleCardNftImg"
                      height={250}
                      width={250}
                    />
                  ) : (
                    <Image
                      src={game.enemyInfo_enemyImgUrl}
                      alt="sampleImg"
                      height={250}
                      width={250}
                    />
                  )}
                </>
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
                    {gameFinishedInfos.gameFinisheds.length == 0 && (
                      <>
                        {gameStatus == GameStatus.NOT_START && (
                          <>
                            {!globalContext.verifyFlg ? (
                              <button
                                disabled={
                                  gameFinishedInfos.gameFinisheds.length != 0
                                }
                                onClick={globalContext.reCaptcha}
                                className={`${styles.connect} ${styles.playButton}`}
                              >
                                Verify I`m not a bot
                              </button>
                            ) : (
                              <>
                                <button
                                  disabled={
                                    gameFinishedInfos.gameFinisheds.length != 0
                                  }
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
                          </>
                        )}
                        {gameStatus == GameStatus.PRE_START && (
                          <h2> Are you ready...?? </h2>
                        )}
                        {gameStatus == GameStatus.START && <h2> Go!! </h2>}
                        {gameStatus == GameStatus.PLAYING && (
                          <button
                            disabled={
                              gameFinishedInfos.gameFinisheds.length != 0
                            }
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
                              disabled={
                                gameFinishedInfos.gameFinisheds.length != 0
                              }
                              onClick={async () => {
                                // send transaction
                                await sendTransaction().then(() => {
                                  // execute query
                                  currentSupplyUpdatedsQuery({
                                    requestPolicy: "network-only",
                                  });
                                  enemyLifeUpdatedsQuery({
                                    requestPolicy: "network-only",
                                  });
                                  gameSeasonChangedInfoQuery({
                                    requestPolicy: "network-only",
                                  });
                                  gameFinishedsQuery({
                                    requestPolicy: "network-only",
                                  });
                                });
                              }}
                              className={`${styles.connect} ${styles.playButton}`}
                            >
                              Submit your result
                            </button>
                          </>
                        )}
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
        )}
    </>
  );
};

export default GameBoard;
