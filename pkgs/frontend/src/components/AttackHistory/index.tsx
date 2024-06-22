import { displayAddress } from "@/utils/constants";
import { AttackInfos } from "@/utils/types";
import styles from "./AttackHistory.module.css";

type Props = {
  attacks: AttackInfos;
  onClose: () => void;
};

/**
 * AttckHistory component
 * @param param0
 * @returns
 */
const AttackHistory = ({ attacks, onClose }: Props) => {
  console.log("attacks:", attacks);
  return (
    <div className={styles.overlay}>
      <div className={styles.historyContainer}>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
        <h2>Attack History</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Enemy`s Attack</th>
              <th>Player</th>
              <th>Push Count</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {attacks.attacks.map((attack, index) => (
              <tr key={index}>
                <td>{attack.attack}</td>
                <td>{displayAddress(attack.player)}</td>
                <td>{attack.pushCount}</td>
                <td>{attack.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttackHistory;
