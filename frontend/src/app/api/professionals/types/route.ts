import { externalFetch } from "@/functions/fetch-utils";
import { PaginationDto } from "@/types/pagination-types";
import { ProfessionalTypeDto } from "@/types/professional-types-types";
import { NextRequest, NextResponse } from "next/server";
import { FetchStatus } from "@/enums/fetch-status";
import { revalidateTag } from "next/cache";

export const GET = async () => {
  let offset = 0;
  let limit = 500;
  let allProfessionalTypes: ProfessionalTypeDto[] = [];

  while (true) {
    const { status, data } = await externalFetch<PaginationDto<ProfessionalTypeDto>>(
      `/professionals/types?offset=${offset}&limit=${limit}&status=all`,
      {
        cache: "force-cache",
        next: {
          tags: ["professionalTypes"],
        },
      },
    );

    if (status !== FetchStatus.SUCCESS) return NextResponse.json({ status: FetchStatus.ERROR, data });

    allProfessionalTypes = [...allProfessionalTypes, ...data!.data];

    if (data!.meta.currentPage >= data!.meta.lastPage) break;

    offset += limit;
  }

  return NextResponse.json({ status: FetchStatus.SUCCESS, data: allProfessionalTypes });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { status, data } = await externalFetch("/professionals/types", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (status !== FetchStatus.SUCCESS) return NextResponse.json({ status, data });

  revalidateTag("professionalTypes");

  return NextResponse.json({ status, data });
};
