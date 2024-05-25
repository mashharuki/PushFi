import styles from "@/styles/Home.module.css";
import { CircularProgress } from "react-loading-indicators";

/**
 * Spinner Component
 * @returns
 */
const Loading = () => {
  return (
    <div className={styles.loading}>
      <CircularProgress
        variant="dotted"
        color="#316acc"
        size="large"
        text="wait..."
        textColor=""
      />
    </div>
  );
};

export default Loading;
