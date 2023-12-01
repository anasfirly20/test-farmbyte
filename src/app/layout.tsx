import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Application",
  description: "Weather Information Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={montserrat.className}>
        <Providers>
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
