import { FetchStatus }   from "@/enums/fetch-status";
import { mapStatusHttp } from "@/utils/map-status-http";


const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL;
const LOCAL_API_URL = process.env.NEXT_PUBLIC_INTERNAL_API_URL;

type FetchResponse<T> = {
  status: FetchStatus;
  data: T | null;
};

export const externalFetch = async <T>(
  endpoint: RequestInfo | URL,
  init?: RequestInit | undefined,
): Promise<FetchResponse<T>> => {
  try {
    const response = await fetch(`${EXTERNAL_API_URL}${endpoint}`, {
      cache: "no-store",
      ...init,
    });
    const data: T = await response.json();

    if (response.ok) return { status: FetchStatus.SUCCESS, data };

    return { status: mapStatusHttp(response.status), data };
  } catch {
    return { status: FetchStatus.ERROR, data: null };
  }
};

export const localFetch = async <T>(
  endpoint: RequestInfo | URL,
  init?: RequestInit | undefined,
): Promise<FetchResponse<T>> => {
  try {
    const response = await fetch(`${LOCAL_API_URL}${endpoint}`, {
      cache: "no-store",
      ...init,
    });

    return (await response.json()) as FetchResponse<T>;
  } catch {
    return { status: FetchStatus.ERROR, data: null };
  }
};
