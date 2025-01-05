import styles from "../styles/Home.module.css";

export default function Description() {
  return (
    <>
      <div className={styles.grid}>
        <a
          className={styles.card}
          href="https://www.youtube.com/watch?v=RdgnS5dEKxM"
        >
          <h2> Watch All Episodes</h2>
          <p>Find the rest of the episodes here.</p>
        </a>

        <a
          className={styles.card}
          href="https://en.wikipedia.org/wiki/Salad_Fingerss"
        >
          <h2>Salad Fingers Wiki </h2>
          <p>Find in-depth information about Salad Fingers' story.</p>
        </a>
      </div>
    </>
  );
}
