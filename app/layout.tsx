import type { Metadata } from "next";
import "./globals.css";
import { RequestsProvider } from "@/providers/requests-context";

export const metadata: Metadata = {
  title: "Task 5",
  description: "Task 5 by Valeentin Kim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RequestsProvider>
          {children}
        </RequestsProvider>
      </body>
    </html>
  );
}
