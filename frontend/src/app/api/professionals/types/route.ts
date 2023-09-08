import { externalFetch } from "@/functions/fetch-utils";
import { PaginationDto } from "@/types/pagination-types";
import { ProfessionalTypeDto } from "@/types/professional-types-types";
import { NextRequest, NextResponse } from "next/server";
import { FetchStatus } from "@/enums/fetch-status";
import { revalidatePath } from "next/cache";

export const GET = async () => {
  const { status, data } = await externalFetch<PaginationDto<ProfessionalTypeDto>>(
    "/professionals/types?pageSize=100&status=all",
  );

  if (status !== FetchStatus.SUCCESS) return NextResponse.json({ status, data });

  const formattedData = data?.data;

  return NextResponse.json({ status, data: formattedData });
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

  revalidatePath("/professionals");

  return NextResponse.json({ status, data });
};
