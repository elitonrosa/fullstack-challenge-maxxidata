import { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header className="flex w-full justify-center border-b py-2 sm:py-4">
      <h2 className="scroll-m-20 text-center text-base font-semibold sm:text-2xl">{children}</h2>
    </header>
  );
}
