import GameBoard from "@/components/GameBoard";
import Header from "@/components/Header";
import Toaster from "@/components/Toaster";
import styles from "@/styles/Home.module.css";
import { APP_TITLE } from "@/utils/constants";

/**
 * Home Component
 * @returns
 */
export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.neonText}>{APP_TITLE}</h1>
        <GameBoard />
        <Toaster />
      </main>
    </>
  );
}
