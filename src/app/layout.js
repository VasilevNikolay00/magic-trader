import { fetchAllRssFeeds } from "@/lib/rss";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "MagicTrader",
  description: "MTG Companion",
};

export default function RootLayout({ children }) {
  fetchAllRssFeeds();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[url(/front_page_background.webp)] flex flex-col w-full m-auto bg-no-repeat bg-cover bg-center bg-fixed justify-center">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
