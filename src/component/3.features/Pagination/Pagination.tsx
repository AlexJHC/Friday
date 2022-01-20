import React, {useState, useEffect} from "react";
import style from './Pagination.module.css'

type PaginationPropsType = {
  totalRecords: number
  pageLimit: number
  pageNeighbours: number
  onPageChanged: (page: number) => void
  currentPage: number
}

const LEFT_PAGE = "LEFT"
const RIGHT_PAGE = "RIGHT";

const range = (from: number, to: number, step: number = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};

export const Pagination = ({
                             totalRecords,
                             pageLimit,
                             pageNeighbours,
                             onPageChanged,
                             currentPage
                           }: PaginationPropsType) => {

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit))
  }, [setTotalPages, totalRecords, pageLimit])

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages: any = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers() || [];

  return (
    <nav aria-label="Countries Pagination" className={style.paginationWrapper}>
      <ul className={style.pagination}>
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li key={index}>
                <button
                  className={style.buttonItem}
                  aria-label="Previous"
                  onClick={() => onPageChanged(pageNeighbours * 2 - 1)}>
                  <span aria-hidden="true">...</span>
                </button>
              </li>
            );
          if (page === RIGHT_PAGE)
            return (
              <li key={index}>
                <button
                  className={style.buttonItem}
                  aria-label="Next"
                  onClick={() => onPageChanged(pageNeighbours * 2 + 3)}>
                  <span aria-hidden="true">...</span>
                </button>
              </li>
            );
          return (
            <li
              key={index}>
              <button
                className={currentPage === page ? `${style.buttonItem} ${style.active}` : style.buttonItem}
                onClick={() => onPageChanged(page)}>
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};





