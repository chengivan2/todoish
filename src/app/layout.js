import "./globals.css";

export const metadata = {
  title: "Todoish",
  description: "Manage tasks quickly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
