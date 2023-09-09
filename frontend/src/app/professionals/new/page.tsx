import ProfessionalsForm from "@/components/pages/professionals/professionals-form";
import { localFetch } from "@/functions/fetch-utils";
import { ProfessionalType } from "@/types/professional-types-types";
import Header from "@/components/layout/header";

const getProfessionalTypes = async () => {
  const { data } = await localFetch<ProfessionalType[]>("/professionals/types");

  if (!data) return [];

  return data;
};

export default async function CreateProfessional() {
  const professionalTypes = await getProfessionalTypes();

  return (
    <>
      <Header>Criar profissional</Header>
      <ProfessionalsForm data={professionalTypes} mode="create" />;
    </>
  );
}
