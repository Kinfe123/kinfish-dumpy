import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import localFont from "next/font/local";
import { navItems } from "@/site/nav";
import FloatingNav from "@/components/ui/floating-navbar";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KiNFiSH - Dumps all over the internet",
  description: "a place where farms comes to reality",
};

const fontHeading = localFont({
  src: "../public/assets/fonts/CalSans-SemiBold.ttf",
  variable: "--font-heading",
});
const fontHeadingAlt = localFont({
  src: "../public/assets/fonts/cd-semi.otf",
  variable: "--font-headingAlt",
});

const fontSubHeading = localFont({
  src: "../public/assets/fonts/product-font.ttf",
  variable: "--font-subheading",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <div className="">
          
        <body
          //from-black to-purple-950 text-slate-900
          // prev bg - from-black to-purple-950
          className={`antialiased overflow-x-hidden overflow-y-auto h-[100%]  relative h-full w-full bg-slate-950     text-slate-900 dark:text-slate-50 ${inter.className} ${fontHeading.variable} ${fontSubHeading.variable} ${fontHeadingAlt.variable} `}
        >
          <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="w-full mx-auto py-10 px-4 ">
              <header>
                <FloatingNav navItems={navItems} />
                {/* for static navbar  */}
                {/* <StaticNavBar navItems={navItems} /> */}
                {/* <ModeToggle /> */}
              </header>
              <main>{children}</main>
            </div>
            <Toaster />
            <Analytics />
          </ThemeProvider>
        </body>
      </div>
    </html>
  );
}
