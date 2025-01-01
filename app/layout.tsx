import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { PayoutProvider } from "@/provider/payout-provider";
import { AnalyticsProvider } from "@/provider/analytics-provider";
import { Navbar } from "@/components/navbar";

import "./globals.css";

export const metadata = {
  title: "News Website",
  description: "Latest news and updates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PayoutProvider>
              <AnalyticsProvider>
                <Navbar />
                {children}
              </AnalyticsProvider>
            </PayoutProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
