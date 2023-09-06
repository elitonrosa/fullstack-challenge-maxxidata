export type Paginated<T> = {
  data: T[];
  total: number;
  pageSize: number;
  page: number;
  totalPages: number;
};
