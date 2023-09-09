import { localFetch } from "@/functions/fetch-utils";
import { Professional } from "@/types/professionals-types";
import { ProfessionalType } from "@/types/professional-types-types";
import ProfessionalsForm from "@/components/pages/professionals/professionals-form";
import { FetchStatus } from "@/enums/fetch-status";
import { notFound } from "next/navigation";
import Header from "@/components/layout/header";

const getProfessional = async (id: string) => {
  const { data, status } = await localFetch<Professional>(`/professionals/${id}`);

  return { data, status };
};

const getProfessionalTypes = async () => {
  const { data } = await localFetch<ProfessionalType[]>("/professionals/types");

  if (!data) return [];

  return data;
};

export default async function UpdateProfessional({ params }: { params: { id: string } }) {
  const professional = (await getProfessional(params.id)) as { data: Professional; status: FetchStatus };
  const professionalTypes = await getProfessionalTypes();

  if (professional.status === FetchStatus.NOT_FOUND) return notFound();

  return (
    <>
      <Header>Editar profissional</Header>
      <ProfessionalsForm entity={professional.data} data={professionalTypes} mode="update" />
    </>
  );
}
