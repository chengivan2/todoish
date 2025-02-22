import Link from "next/link";
import styles from "./homepage.module.css";
import Image from "next/image";
import HomeMenu from "./components/homemenu";

export default function Home() {
  return (
    
      <main>
        <section id={styles.heroSection}>
          <div className={styles.hero}>
            <header className={styles.header}>
              <div className={styles.logo}>
                <Image
                  src="/todoishMainLogo.png"
                  width={40}
                  height={40}
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
              <HomeMenu />
            </header>
            <div className={styles.heroSectionText}>
            <h1 className={styles.heroTitle}>Welcome to Todoish</h1>
            <p className={styles.heroSubtitle}>Your task management solution</p>
            </div>
          </div>
        </section>
      </main>
  );
}
