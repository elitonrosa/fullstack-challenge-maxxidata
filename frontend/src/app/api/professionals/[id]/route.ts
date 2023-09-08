import { NextRequest, NextResponse } from "next/server";
import { externalFetch } from "@/functions/fetch-utils";
import { revalidatePath } from "next/cache";
import { FetchStatus } from "@/enums/fetch-status";

export const DELETE = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const { status, data } = await externalFetch(`/professionals/${id}`, {
    method: "DELETE",
  });

  if (status === FetchStatus.SUCCESS) revalidatePath("/professionals");

  return NextResponse.json({ status, data });
};

export const GET = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const { status, data } = await externalFetch(`/professionals/${id}`, {
    method: "GET",
  });

  return NextResponse.json({ status, data });
};

export const PATCH = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const body = await request.json();

  const { status, data } = await externalFetch(`/professionals/${id}`, {
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
