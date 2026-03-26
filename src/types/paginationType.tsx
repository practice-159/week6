export type PaginationType = {
  pagination: Pagination;
  fetchProducts: (e?: number) => Promise<void>;
};

export type Pagination = {
  category: string;
  has_pre: boolean;
  has_next: boolean;
  total_pages: number;
  current_page: number;
};
