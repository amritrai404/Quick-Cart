'use client'

import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";

export default function ClientLayout({ 
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </ClerkProvider>
  );
}