import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marathi Biodata Maker",
  description: "Create beautiful Marathi matrimonial biodatas online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
