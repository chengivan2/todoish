import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Todoish</h1>
        <p>Go to the dashboard</p>
        <Link href="/dashboard">Dashboard</Link>
      </main>
    </div>
  );
}
