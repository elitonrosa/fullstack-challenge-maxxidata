import { localFetch } from "@/functions/fetch-utils";
import { Professional } from "@/types/professionals-types";
import { ProfessionalType } from "@/types/profissional-types-types";
import ProfessionalsForm from "@/components/pages/professionals/professionals-form";
import { FetchStatus } from "@/enums/fetch-status";
import { notFound } from "next/navigation";

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
  const { status, data } = (await getProfessional(params.id)) as { data: Professional; status: FetchStatus };
  const professionalTypes = await getProfessionalTypes();

  if (status === FetchStatus.NOT_FOUND) notFound();

  return <ProfessionalsForm entity={data} data={professionalTypes} mode="update" />;
}
