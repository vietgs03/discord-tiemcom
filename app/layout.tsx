import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
const font = Open_Sans({ subsets: ["latin"] });
import { viVN } from "@clerk/localizations";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tiệm bánh hoàng tử bé",
  description: "Tiệm bánh hoàng tử bé",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={viVN}>
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className,"bg-white dark:bg-[#313338]")}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="discord-theme"
          >
        {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
