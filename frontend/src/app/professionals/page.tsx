import { localFetch } from "@/functions/fetch-utils";
import { Professional } from "@/types/professionals-types";
import DataTable from "@/components/data-table/data-table";
import { professionalsColumns } from "@/data/data-table-columns";

const getProfessionals = async () => {
  const { data } = await localFetch<Professional[]>("/professionals");
  if (!data) return [];
  return data;
};

export default async function Professionals() {
  const data = await getProfessionals();

  return (
    <main className="px-10 py-6">
      <DataTable searchColumn="Nome" columns={professionalsColumns} data={data} />
    </main>
  );
}