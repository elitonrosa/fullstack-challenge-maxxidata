import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerenciador de Profissionais",
  description: "Gerenciador de Profissionais",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} flex h-screen min-h-screen flex-col`}>
        <header className="w-full bg-zinc-300 py-5 text-center text-xl font-bold text-gray-700">
          Gerenciador de Profissionais
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
