import styles from "./page.module.css";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Todoish</h1>

        <LoginLink>Sign in</LoginLink>
        <RegisterLink>Sign up</RegisterLink>
      </main>
    </div>
  );
}
