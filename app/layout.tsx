import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
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
      <body
      //from-black to-purple-950 text-slate-900
        className={`antialiased overflow-x-hidden overflow-y-auto h-[100%]  w-screen  bg-white dark:bg-gradient-to-br from-black to-purple-950 text-slate-900 dark:text-slate-50 ${inter.className} ${fontHeading.className} ${fontSubHeading.className} ${fontHeadingAlt.variable} `}
      >
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
    </html>
  );
}
