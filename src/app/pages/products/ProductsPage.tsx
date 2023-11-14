/* eslint-disable jsx-a11y/anchor-is-valid */
// import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from '../../components/productpage/Pagination';
import { ProductsCustomRow } from '../../components/productpage/ProductCustomRow';
import "../../../styles/products/productTable.scss"
// import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
// import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../_metronic/layout/core'ber,


interface Products {
    id:number;
    name:string;
    price:string;
    artikul: string;
    code: string;
    brand_id:number
    createdAt: string;
    updatedAt: string;
}

const ProductsPage: React.FC = () => {
    const [data, setData] = useState<Products[]>([])
    const [totalPages, setTotalPages] = useState<number>(0) 
    const [currentPage, setCurrentPage] = useState<number>(1) 
    const [productsPerPage, setProductsPerPage] = useState(10)



    useEffect(() => {
      console.log("second UseEffect");
      
      fetch(`http://localhost:3000/products?page=${currentPage}&size=${productsPerPage}`)
        .then(req => req.json())
        .then((res) => {
          setTotalPages(res.totalPages)
          setData(res.products);
          setCurrentPage(res.currentPage)
        });
    }, [currentPage])
    

    function removeProduct(id:number) {
      return fetch(`http://localhost:3000/products/${id}`, {
          method:"DELETE"
      })
          .then(() => {
              return fetch(`http://localhost:3000/products?page=${currentPage}&size=${productsPerPage}`)
              .then(res => res.json())
              .then((res) => setData(res.products))
              .catch(err => console.error(err));
          })
  }
    
  return (
    <div className='products-table'>
      <div className='table-responsive'>
              <h2>Products</h2>
              <div className='d-flex align-items-center gap-2 gap-lg-3 justify-content-end' style={{marginBottom:"10px"}}>
              <Link to='create' className='btn btn-sm fw-bold btn-primary'>Create Product</Link>

              </div>
              <div>
                <label>Search</label>
                <input type="text" />
              </div>
              <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                  <th></th>
                <th className='min-w-125px'>Id</th>
                <th className='min-w-125px'>Name</th>
                <th className='min-w-125px'>Image</th>
                <th className='min-w-125px'>Price</th>
                <th className='min-w-125px'>Artikul</th>
                <th className='min-w-125px'>Code</th>
                <th className='min-w-125px'>Brand ID</th>
                <th className='min-w-125px'>CreatedAt</th>
                <th className='min-w-125px'>UpdatedAt</th>
                <th style={{
                    display: "flex",
                    justifyContent: "center"
                    }} 
                    className='min-w-100px'>Actions</th>
                    <th></th>
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold'>
              {data?.length ? (
                data?.map((row:Products) => {
                  return <ProductsCustomRow removeProduct={removeProduct}  key={row.id} row={row} />
                })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      No matching records found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
          <Pagination 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
            totalPages={totalPages}
           />
    </div>
  )
}

export {ProductsPage}
