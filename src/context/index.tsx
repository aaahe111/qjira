import React, { ReactNode } from "react";
import { AuthProvider } from "../context/auth-context";
import { QueryClientProvider, QueryClient } from "react-query";

// 创建QueryClient实例
const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
) 
};