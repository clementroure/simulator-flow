"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return (
    /*     <ThemeProvider enableSystem defaultTheme="system" attribute="class">
     */ <SessionProvider>{children}</SessionProvider>
    /* </ThemeProvider> */
  );
}
