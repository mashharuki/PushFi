import GameBoard from "@/components/GameBoard";
import Header from "@/components/Header";
import Toaster from "@/components/Toaster";
import getGameQuery from "@/graphql/getGameQuery";
import styles from "@/styles/Home.module.css";
import { APP_TITLE } from "@/utils/constants";
import { GameInfos } from "@/utils/types";
import { useQuery } from "urql";

/**
 * Home Component
 * @returns
 */
export default function Home() {
  //get game info
  const [result] = useQuery({
    query: getGameQuery,
  });
  const { data: games } = result;

  const gameInfos: GameInfos = games;
  if (gameInfos != undefined) {
    console.log("gameInfos:", gameInfos.gameCreateds[0]);
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.neonText}>{APP_TITLE}</h1>
        {gameInfos != undefined && (
          <GameBoard game={gameInfos.gameCreateds[0]} />
        )}
        <Toaster />
      </main>
    </>
  );
}
