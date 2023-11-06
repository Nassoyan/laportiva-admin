import React from 'react'

function Pagination({pageNumbers, currentPage, setCurrentPage}) {
    console.log(pageNumbers);
    const pages = Array.from({ length: pageNumbers }, (_, index) => index + 1);

    
  return (
    <nav aria-label="Page navigation example">
        <ul className="pagination">
            <li onClick={() => {
                if(currentPage <= 1) return false
                setCurrentPage(currentPage - 1)
            }} className="page-item"><a className="page-link" href="#">Previous</a></li>
            {pages.map((page, i) => {
                return (
                    <li key={i} onClick={(e) => {
                        setCurrentPage(i + 1)
                    }} className={`page-item ${currentPage === page ? "active" : ""}`}><a className="page-link" href="#">{page}</a></li>
                )
            })}
            <li onClick={() => {
                if(currentPage >= pages.length) return false;
                setCurrentPage(currentPage + 1)
                }}  className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
    </nav>
  )
}

export default Pagination