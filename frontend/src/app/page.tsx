import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header>Gerenciamento de profissionais</Header>
      <main className="flex h-full flex-col items-center justify-center pt-5">
        <section className="flex flex-col items-center justify-center gap-2 pb-10 sm:gap-6 sm:pb-20">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">O que deseja fazer?</h2>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <Card className="mt-5 w-72 ">
              <CardHeader className="mb-2 flex w-full justify-center text-center">
                <CardTitle>Profissionais</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <Link href={"/professionals/new"}>
                  <Button variant="secondary" className="w-full">
                    Criar
                  </Button>
                </Link>

                <Link href={"/professionals"}>
                  <Button variant="secondary" className="w-full">
                    Listar
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="mt-5 w-72">
              <CardHeader className="mb-2 flex w-full justify-center text-center">
                <CardTitle>Profissões</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <Link href={"/professionals/types/new"}>
                  <Button variant="secondary" className="w-full">
                    Criar
                  </Button>
                </Link>

                <Link href={"/professionals/types"}>
                  <Button variant="secondary" className="w-full">
                    Listar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
