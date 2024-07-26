import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DesignProvider } from "./providers/designProvider";
import "./globals.css";
import { AuthProvider } from "./functions/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gym Log App",
  description: "Gym Log App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <DesignProvider>
            {children}
          </DesignProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

