import Link from "next/link";
import styles from "./homepage.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <section id={styles.heroSection}>
          <header className={styles.header}>
            <div className={styles.logo}>
              <Image
                src="/todoishMainLogo.png"
                width={50}
                height={50}
                alt="Todoish Main Logo"
              />
            </div>
            <nav className={styles.menu}>
              <Link className={styles.link} href="/">
                Home
              </Link>
              <Link className={styles.link} href="/about">
                About
              </Link>
              <Link className={styles.link} href="/contact">
                Contact
              </Link>
            </nav>
            <div className={styles.authButtons}>
              <Link className={styles.link} href="/dashboard">
                Dashboard
              </Link>
              <button className={styles.signOutButton}>Sign Out</button>
            </div>
          </header>
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>Welcome to Todoish</h1>
            <p className={styles.heroSubtitle}>Your task management solution</p>
          </div>
        </section>
      </main>
    </div>
  );
}
