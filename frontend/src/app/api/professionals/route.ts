import { NextRequest, NextResponse } from "next/server";
import { externalFetch } from "@/functions/fetch-utils";
import { ProfessionalDto } from "@/types/professionals-types";
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
  const { status, data } = await externalFetch<PaginationDto<ProfessionalDto>>(
    "/professionals?pageSize=100&status=all",
    {
      cache: "force-cache",
      next: {
        tags: ["professionals"],
      },
    },
  );

  if (!data) return NextResponse.json({ status, data });

  const professionals = data.data.map((professional) => ({
    ...professional,
    professionalType: professional.professionalType.description,
  }));

  return NextResponse.json({ status, data: professionals });
};
