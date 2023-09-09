import Header from "@/components/layout/header";

export default function Home() {
  return (
    <>
      <Header>Gerenciamento de profissionais</Header>
      <main className="pt-5">
        <h1 className="text-center text-sm text-muted-foreground">
          Bem-vindo ao sistema de gerenciamento de profissionais
        </h1>
      </main>
    </>
  );
}
