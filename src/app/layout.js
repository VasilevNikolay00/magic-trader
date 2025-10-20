import { fetchAllRssFeeds } from "@/lib/rss";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/NavBar";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "MagicTracker",
  description: "MTG Companion",
};

export default async function RootLayout({ children }) {
  await fetchAllRssFeeds();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased m-0 p-0 h-screen overflow-hidden">
        <div className="fixed inset-0 bg-[url(/front_page_background.webp)] bg-no-repeat bg-cover bg-center -z-10" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-screen flex flex-col">
            <div className="w-9/10 mx-auto flex-1 overflow-auto">
              <NavBar />
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
