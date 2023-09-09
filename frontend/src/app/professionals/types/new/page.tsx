import ProfessionalTypesForm from "@/components/pages/professional-types/professional-types-form";
import Header from "@/components/layout/header";

export default async function CreateProfessional() {
  return (
    <>
      <Header>Criar profissão</Header>
      <ProfessionalTypesForm mode="create" />;
    </>
  );
}
