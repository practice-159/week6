import { Fragment } from "react/jsx-runtime";

import type { PaginationType } from "../types/paginationType";

// week4 - 分頁
const Pagination = ({ pagination, fetchProducts }: PaginationType) => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    page: number,
  ) => {
    e.preventDefault();
    fetchProducts(page);
  };
  return (
    <Fragment>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {/* 前一頁 */}
          <li className={`page-item ${pagination.has_pre ? "" : "disabled"}`}>
            <a
              href="#"
              className="page-link"
              aria-label="Previous"
              onClick={(e) => {
                handleClick(e, pagination.current_page - 1);
              }}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {/* 中間有數字的頁數 */}
          {Array.from({ length: pagination.total_pages }, (_, index) => (
            <li
              key={`${index}_page`}
              className={`page-item ${pagination.current_page === index + 1 && "active"}`}
            >
              <a
                href="#"
                className="page-link"
                onClick={(e) => {
                  handleClick(e, index + 1);
                }}
              >
                {index + 1}
              </a>
            </li>
          ))}
          {/* 下一頁 */}
          <li className={`page-item ${pagination.has_next ? "" : "disabled"}`}>
            <a
              href="#"
              aria-label="Next"
              className="page-link"
              onClick={(e) => {
                handleClick(e, pagination.current_page + 1);
              }}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Pagination;
