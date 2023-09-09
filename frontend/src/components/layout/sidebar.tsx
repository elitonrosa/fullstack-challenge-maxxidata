import { Briefcase, Home, Kanban, User2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-16 flex-col items-start overflow-x-hidden border-r bg-white shadow transition-all hover:w-48 hover:bg-secondary">
      <div className="mt-5 flex h-10 items-center">
        <Kanban className="ml-4 h-full w-14" />

        <h2 className="ml-3 text-base font-semibold tracking-tight">Professional Management</h2>
      </div>

      <nav className="flex h-[calc(100%-100px)] items-center ">
        <ul className="ml-5 flex flex-col gap-4">
          <li>
            <Link href={"/"} className="flex items-center gap-6">
              <Button variant="link" className="mx-0 flex items-center gap-6 px-0">
                <Home />
                <p>Home</p>
              </Button>
            </Link>
          </li>
          <li>
            <Link href={"/professionals"} className="flex items-center gap-6">
              <Button variant="link" className="mx-0 flex items-center gap-6 px-0">
                <User2 />
                <p>Profissionais</p>
              </Button>
            </Link>
          </li>
          <li>
            <Link href={"/professionals/types"}>
              <Button variant="link" className="mx-0 flex items-center gap-6 px-0">
                <Briefcase />
                <p>Profissões</p>
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
