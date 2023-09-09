import { Briefcase, Home, Kanban, User2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="flex bg-secondary shadow sm:fixed sm:left-0 sm:top-0 sm:h-screen sm:w-16 sm:flex-col sm:items-start sm:overflow-x-hidden sm:border-r sm:bg-white sm:transition-all sm:hover:w-48 sm:hover:bg-secondary">
      <div className="mt-5 hidden h-10 items-center sm:flex">
        <Kanban className="ml-4 h-full w-14" />

        <h2 className="ml-3 hidden text-base font-semibold tracking-tight sm:block">Professional Management</h2>
      </div>

      <nav className="flex h-9 w-full items-center justify-center py-5 sm:h-[calc(100%-100px)] sm:justify-start ">
        <ul className="ml-5 flex gap-4 sm:flex-col">
          <li>
            <Link href={"/"} className="flex items-center gap-6">
              <Button variant="link" className="mx-0 flex items-center gap-6 px-0">
                <Home />
                <p className="hidden sm:block">Home</p>
              </Button>
            </Link>
          </li>
          <li>
            <Link href={"/professionals"} className="flex items-center gap-6">
              <Button variant="link" className="mx-0 flex items-center gap-6 px-0">
                <User2 />
                <p className="hidden sm:block">Profissionais</p>
              </Button>
            </Link>
          </li>
          <li>
            <Link href={"/professionals/types"}>
              <Button variant="link" className="mx-0 flex items-center gap-6 px-0">
                <Briefcase />
                <p className="hidden sm:block">Profissões</p>
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
