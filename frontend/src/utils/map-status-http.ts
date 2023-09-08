import { FetchStatus } from "@/enums/fetch-status";

export const mapStatusHttp = (status: number) => {
  if (status > 199 && status < 300) return FetchStatus.SUCCESS;
  if (status === 400) return FetchStatus.BAD_REQUEST;
  if (status === 404) return FetchStatus.NOT_FOUND;
  if (status === 422) return FetchStatus.UNPROCESSABLE_ENTITY;
  return FetchStatus.ERROR;
};
