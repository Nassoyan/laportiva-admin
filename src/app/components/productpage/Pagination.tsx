import React from 'react'


function Pagination({ totalPages,  currentPage, setCurrentPage }) {
    
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const MAX_PAGES_DISPLAYED = 5;


    const getPagesToDisplay = () => {
        const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    
        if (totalPages <= MAX_PAGES_DISPLAYED) {
          return pages;
        }
    
        const middleIndex = Math.floor(MAX_PAGES_DISPLAYED / 2);
    
        if (currentPage <= middleIndex) {
          return [...pages.slice(0, MAX_PAGES_DISPLAYED - 1), '...', totalPages];
        } else if (currentPage >= totalPages - middleIndex) {
          return [1, '...', ...pages.slice(totalPages - MAX_PAGES_DISPLAYED + 2)];
        } else {
          return [
            1,
            '...',
            ...pages.slice(currentPage - middleIndex, currentPage + middleIndex),
            '...',
            totalPages,
          ];
        }
      };
    
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li onClick={() => {
                    if(currentPage <= 1) return false
                    setCurrentPage(currentPage - 1)
                    }} className="page-item">
                    <button className="page-link">Previous</button>
                </li>
                {getPagesToDisplay().map((page: number | string, i) => (
                    <span
                        key={i}
                        onClick={() => {
                        if (typeof page === 'number') {
                            setCurrentPage && setCurrentPage(page);
                        }
                        }}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >
                       <p className="page-link">{page}</p> 
                    </span>
                ))}
                <li onClick={() => {
                    if(currentPage >= totalPages) return false
                    setCurrentPage(currentPage + 1)
                    }} className="page-item">
                    <button className="page-link">Next</button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
