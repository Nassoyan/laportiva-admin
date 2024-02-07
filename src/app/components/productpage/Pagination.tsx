import React from 'react'


function Pagination({ totalPages,  currentPage, setCurrentPage }) {
    
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li onClick={() => {
                    if(currentPage <= 1) return false
                    setCurrentPage(currentPage - 1)
                    }} className="page-item">
                    <button className="page-link">Previous</button>
                </li>
                {pages.map((page, i) => {
                    return (
                        <li
                            key={i}
                            onClick={() => {
                                setCurrentPage(page)
                            }} // Update the currentPage state on click
                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                            <p className="page-link">{page}</p>
                        </li>
                    );
                })}
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
