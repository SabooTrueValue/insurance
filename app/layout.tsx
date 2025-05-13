import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saboo Insurance App",
  description: "Created for saboo insurance agents",
};
const font = localFont({
  src: [
    {
      path: "./fonts/Poppins-Regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/Poppins-Medium.ttf",
      weight: "500",
    },
    {
      path: "./fonts/Poppins-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "./fonts/Poppins-Bold.ttf",
      weight: "700",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className}  antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
