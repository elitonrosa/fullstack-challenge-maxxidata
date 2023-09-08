import DataTable from "@/components/data-table/data-table";
import { professionalTypesColumns } from "@/data/data-table-columns";
import { localFetch } from "@/functions/fetch-utils";
import { ProfessionalType } from "@/types/professional-types-types";
import { FetchStatus } from "@/enums/fetch-status";

const getProfessionalTypes = async () => {
  const { data, status } = await localFetch<ProfessionalType[]>("/professionals/types");

  if (status !== FetchStatus.SUCCESS) return [];

  return data as ProfessionalType[];
};

export default async function ProfessionalTypes() {
  const professionalTypes = await getProfessionalTypes();

  return (
    <main className="px-10 py-6">
      <DataTable searchColumn="Descrição" columns={professionalTypesColumns} data={professionalTypes} />
    </main>
  );
}
