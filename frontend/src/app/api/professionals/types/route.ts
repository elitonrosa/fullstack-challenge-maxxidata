import { externalFetch } from "@/functions/fetch-utils";
import { PaginationDto } from "@/types/pagination-types";
import { ProfessionalTypeDto } from "@/types/profissional-types-types";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { status, data } = await externalFetch<PaginationDto<ProfessionalTypeDto>>("/professionals/types?pageSize=100");

  if (!data) return NextResponse.json({ status, data });

  return NextResponse.json({ status, data: data.data });
};
