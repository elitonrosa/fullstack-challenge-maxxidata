import { NextRequest, NextResponse } from "next/server";
import { externalFetch } from "@/functions/fetch-utils";
import { revalidateTag } from "next/cache";
import { FetchStatus } from "@/enums/fetch-status";

export const DELETE = async (_request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const { status, data } = await externalFetch(`/professionals/${id}`, {
    method: "DELETE",
  });

  if (status === FetchStatus.SUCCESS) {
    revalidateTag("professionals");
    revalidateTag(`professional-${id}`);
  }

  return NextResponse.json({ status, data });
};

export const GET = async (_request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const { status, data } = await externalFetch(`/professionals/${id}`, {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: [`professional-${id}`],
    },
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

  revalidateTag("professionals");
  revalidateTag(`professional-${id}`);

  return NextResponse.json({ status, data });
};
