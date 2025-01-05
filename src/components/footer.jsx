import styles from "../styles/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <br />{" "}
      <a
        className={styles.card}
        href="https://github.com/iminparallel/MileStones-Contract"
      >
        {" "}
        Smart Contract
      </a>{" "}
      <br />
      <a className={styles.card} href="https://github.com/iminparallel">
        {" "}
        Harit Chowdhury{" "}
      </a>
      <br />
    </footer>
  );
}
