export interface IPaginationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort: string;
  search: string;
  activated?: string | number;
}

export interface IPaginationResponse {
  total: number;
  page: number;
  limit: number;
  total_page: number;
}
