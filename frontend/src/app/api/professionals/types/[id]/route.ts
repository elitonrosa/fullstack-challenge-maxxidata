import { NextRequest, NextResponse } from "next/server";
import { externalFetch } from "@/functions/fetch-utils";
import { FetchStatus } from "@/enums/fetch-status";
import { revalidatePath } from "next/cache";

export const DELETE = async (_request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const { status, data } = await externalFetch(`/professionals/types/${id}`, {
    method: "DELETE",
  });

  if (status === FetchStatus.SUCCESS) revalidatePath("/professionals");

  return NextResponse.json({ status, data });
};

export const GET = async (_request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const { status, data } = await externalFetch(`/professionals/types/${id}`, {
    method: "GET",
  });

  return NextResponse.json({ status, data });
};

export const PATCH = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const body = await request.json();

  const { status, data } = await externalFetch(`/professionals/types/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (status !== FetchStatus.SUCCESS) return NextResponse.json({ status, data });

  revalidatePath("/professionals");

  return NextResponse.json({ status, data });
};
