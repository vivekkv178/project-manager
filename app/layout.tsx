import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "@vivekkv178/library/dist/style.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import StoreProvider from "@/lib/StoreProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project-Manager",
  description:
    "Unify Your Workflow with Project Manager. Seamlessly Manage All Your Apps in One Place, Boost Productivity, and Drive Success Across Your Projects!",
  metadataBase: new URL(
    `${process.env.NEXT_PUBLIC_CDN_PATH}/project-manager/Thumbnail.png`,
  ),
  openGraph: {
    title: "Project-Manager",
    description:
      "Unify Your Workflow with Project Manager. Seamlessly Manage All Your Apps in One Place, Boost Productivity, and Drive Success Across Your Projects!",
    url: "https://e-order-vivekkv.vercel.app/",
    siteName: "Project-Manager",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CDN_PATH}/project-manager/Thumbnail.png`, // Must be an absolute URL
        width: 800,
        height: 1000,
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_PATH}/project-manager/Thumbnail.png`, // Must be an absolute URL
        width: 1800,
        height: 2000,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
