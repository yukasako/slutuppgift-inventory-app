import "./globals.css";

export const metadata = {
  title: "Inventory App",
  description: "Slutuppgift för JavaScript som backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        header
        {children}
        footer
      </body>
    </html>
  );
}
