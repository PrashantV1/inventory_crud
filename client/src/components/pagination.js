import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const Pagination = ({ currentRecord, pageTotal, totalRecord, page, totalPages, handlePage, visiblePages }) => {
  return (
    <div className="custom-pagination my-3">
      <div className="w-100 d-flex justify-content-between align-items-center">
        <div>
          <p>
            Showing {currentRecord}-{pageTotal} of {totalRecord} entries
          </p>
        </div>
        <div className="d-flex align-items-center">
          <nav>
            <ul className="pagination justify-content-end mb-0">
              <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  disabled={page <= 1}
                  onClick={(e) => {
                    handlePage(page - 1);
                  }}
                >
                  Previous
                </button>
              </li>
              {visiblePages.map((item, i) => {
                return (
                  <li key={i} className="page-item cursor-pointer">
                    <button
                      className="page-link"
                      onClick={(e) => {
                        handlePage(item);
                      }}
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
              <li className={`page-item ${totalPages <= page ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  disabled={totalPages <= page}
                  onClick={(e) => {
                    handlePage(page + 1);
                  }}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
