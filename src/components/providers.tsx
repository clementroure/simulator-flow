"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return (
/*     <ThemeProvider enableSystem defaultTheme="system" attribute="class">
 */      <SessionProvider>
        {children}
      </SessionProvider>
    /* </ThemeProvider> */
  );
}
