import "./globals.css";
import { AuthProvider } from "./AuthProvider";

export const metadata = {
  title: "Todoish",
  description: "Manage tasks quickly",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
