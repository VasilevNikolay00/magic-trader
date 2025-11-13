import { fetchAllRssFeeds } from "@/lib/rss";
import { getAuthenticatedUser } from "@/lib/auth";
import { Providers } from "@/components/Providers";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "MagicTracker",
  description: "MTG Companion",
};

export default async function RootLayout({ children }) {
  const user = await getAuthenticatedUser();
  await fetchAllRssFeeds();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased m-0 p-0 h-screen overflow-hidden">
        <div className="fixed inset-0 bg-[url(/front_page_background.webp)] bg-no-repeat bg-cover bg-center -z-10" />
        <Providers user={user}>
          <div className=" h-screen flex flex-col">
            <div className="w-[90%] mx-auto flex-1 overflow-auto">
              <NavBar />
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
