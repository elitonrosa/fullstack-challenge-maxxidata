import { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header className="flex w-full justify-center border-b bg-zinc-50 py-4 shadow">
      <h2 className="scroll-m-20 text-center text-3xl font-semibold">{children}</h2>
    </header>
  );
}
