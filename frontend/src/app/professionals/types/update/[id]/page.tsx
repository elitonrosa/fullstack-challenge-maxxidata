import { localFetch } from "@/functions/fetch-utils";
import { ProfessionalType } from "@/types/professional-types-types";
import { FetchStatus } from "@/enums/fetch-status";
import { notFound } from "next/navigation";
import ProfessionalTypesForm from "@/components/pages/professional-types/professional-types-form";

const getProfessional = async (id: string) => {
  return await localFetch<ProfessionalType>(`/professionals/types/${id}`);
};

export default async function UpdateProfessional({ params }: { params: { id: string } }) {
  const { status, data } = (await getProfessional(params.id)) as { data: ProfessionalType; status: FetchStatus };

  if (status === FetchStatus.NOT_FOUND) return notFound();

  return <ProfessionalTypesForm entity={data} mode="update" />;
}
