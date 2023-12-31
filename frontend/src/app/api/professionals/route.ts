import { NextRequest, NextResponse } from "next/server";
import { externalFetch } from "@/functions/fetch-utils";
import { Professional, ProfessionalDto } from "@/types/professionals-types";
import { PaginationDto } from "@/types/pagination-types";
import { revalidateTag } from "next/cache";
import { FetchStatus } from "@/enums/fetch-status";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { status, data } = await externalFetch("/professionals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (status !== FetchStatus.SUCCESS) return NextResponse.json({ status, data });

  revalidateTag("professionals");

  return NextResponse.json({ status, data });
};

export const GET = async () => {
  let offset = 0;
  let limit = 500;
  let allProfessionals: Professional[] = [];

  while (true) {
    const { status, data } = await externalFetch<PaginationDto<ProfessionalDto>>(
      `/professionals?offset=${offset}&limit=${limit}&status=all`,
      {
        cache: "force-cache",
        next: {
          tags: ["professionals"],
        },
      },
    );

    if (status !== FetchStatus.SUCCESS) return NextResponse.json({ status: FetchStatus.ERROR, data });

    allProfessionals = [...allProfessionals, ...data!.data];

    if (data!.meta.currentPage >= data!.meta.lastPage) break;

    offset += limit;
  }

  const professionals = allProfessionals.map((professional) => ({
    ...professional,
    professionalType: professional.professionalType.description,
  }));

  return NextResponse.json({ status: FetchStatus.SUCCESS, data: professionals });
};
