export interface IPagination {
  limit?: number | 100;
  offset?: number | 1;
  currentPage?: number | 0;
  totalPages?: number | 0;
}

export interface IPaginationQuery {
  page?: number | 0;
  limit?: number | 100;
  sort_by?: string | "asc";
  sort?: string | "name";
  search?: string;
}