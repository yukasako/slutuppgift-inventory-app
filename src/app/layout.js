import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/auth";

export const metadata = {
  title: "Inventory App",
  description: "Slutuppgift för JavaScript som backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
