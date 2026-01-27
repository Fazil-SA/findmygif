import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GIF Explorer - Search and Browse GIFs",
  description: "Search and explore GIFs powered by Giphy API",
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
