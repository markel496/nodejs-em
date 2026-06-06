import { DEFAULT_LIMIT, DEFAULT_PAGE } from '#consts/pagination'
import type { PaginationQueryParams } from '#schemas/query/pagination'

export const getPagination = ({ page, limit }: PaginationQueryParams) => {
  const currentLimit = Number(limit) || DEFAULT_LIMIT
  const currentPage = Number(page) || DEFAULT_PAGE

  return {
    limit: currentLimit,
    offset: (currentPage - 1) * currentLimit
  }
}
