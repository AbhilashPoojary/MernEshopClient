import React from "react";

export default function Pagination({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
  conditionNo,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  const prevFunc = () => {
    if (currentPage >= 2) {
      paginate(currentPage - 1);
    }
  };
  const nextFunc = () => {
    console.log(pageNumbers);
    if (pageNumbers.length > currentPage) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav>
      {totalProducts > conditionNo && (
        <ul className="pagination flex gap-2 justify-end">
          <li>
            <button
              className={`p-2 text-sm ${
                currentPage >= 2 ? "text-white bg-orange-600" : ""
              }`}
              disabled={currentPage <= 1}
              onClick={prevFunc}
            >
              Prev
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => paginate(number)}
                className={`${
                  number === currentPage
                    ? "text-white bg-orange-600"
                    : "text-black bg-white"
                } p-2 text-sm`}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              className={`p-2 text-sm ${
                pageNumbers.length > currentPage
                  ? "text-white bg-orange-600"
                  : ""
              }`}
              disabled={pageNumbers.length <= currentPage}
              onClick={nextFunc}
            >
              Next
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
