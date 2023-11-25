
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from '../../components/productpage/Pagination';
import { ProductsCustomRow } from '../../components/productpage/ProductCustomRow';
import "../../../styles/products/productTable.scss"
import { KTIcon } from '../../../_metronic/helpers';
import { Brands } from '../brands/BrandsPage';


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
    const [brands, setBrands] = useState<Brands[]>([])
    const [totalPages, setTotalPages] = useState<number>(0) 
    const [currentPage, setCurrentPage] = useState<number>(1) 
    const [productsPerPage, setProductsPerPage] = useState<number>(10)
    const [searchValue, setSearchValue] = useState<null | string>(null)
    const [brand, setBrand] = useState<string>("")
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    function getProductsData() {
      let url =  new URL(`${BASE_URL}/products?page=${currentPage}&size=${productsPerPage}`)
      if(searchValue) {
        url.searchParams.append("search", searchValue)
      }
      if(brand) {
        url.searchParams.append("brand_id", brand)
      }
      return fetch(url.toString())
    }
    

    useEffect(() => {
      fetch(`${BASE_URL}/brands`)
        .then(req => req.json())
        .then((res) => {
          setBrands(res);
        });
    }, [])
    

    useEffect(() => {
      getProductsData()
        .then(req => req.json())
        .then((res) => {
          setTotalPages(res.totalPages)
          setData(res.products);
          setCurrentPage(res.currentPage)
        });
    }, [currentPage, brand])

    
    const removeProductCallback = useCallback(
      (id: number) => {
        return fetch(`${BASE_URL}/products/${id}`, {
          method: "DELETE"
        })
          .then(() => {
            return getProductsData()
              .then((res) => res.json())
              .then((res) => setData(res.products))
              .catch((err) => console.error(err));
          });
      },
      [currentPage, productsPerPage, setData]
    );


     function handleChange(e:ChangeEvent<HTMLInputElement>) {
      setSearchValue(e.target.value);
    }

      useEffect(() => {
        const handle = setTimeout(() => {
          if(searchValue !== null) {
              getProductsData()
              .then(req => req.json())
              .then((res) => {
                setTotalPages(res.totalPages);
                setData(res.products);
                setCurrentPage(res.currentPage);
            })
            .catch(error => {
            console.error(error);
            });
          }
      }, 1000);
    
      return () => {
        clearTimeout(handle);
      };
    }, [searchValue]);

    
  return (
    <div className='products-table'>
      <div className='table-responsive'>
              <h2>Products</h2>
              <div className='d-flex align-items-center gap-2 gap-lg-3 justify-content-between' style={{marginBottom:"10px"}}>

                <div className='d-flex align-items-center position-relative my-1'>
                  <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-6' />
                  <input
                    style={{backgroundColor:"#f3f3f3"}}
                    type='text'
                    data-kt-user-table-filter='search'
                    className='form-control form-control-solid  ps-14'
                    placeholder='Search product'
                    onChange={handleChange}
                    value={searchValue || ""}
                  />

                  <select
                    value={brand}
                    className='form-select form-select-solid me-2'
                    style={{ marginLeft: '5px', backgroundColor:"#f3f3f3", cursor:"pointer"}}
                     onChange={(e) => {
                      setBrand(e.target.value)
                     }}
                  >
                    <option value="" >All Brands</option>
                    {brands?.map((brand) => {
                      return (
                        <option  value={brand.id} key={brand.id}>{brand.name}</option>
                      );
                    })}
                    
                  </select>

                </div>

                <div className='d-flex align-items-center position-relative my-1' >
                  
                  <Link to='create' className=' d-flex align-items-center btn btn-sm fw-bold btn-primary  h-40px'>
                    <KTIcon iconName='plus' className='fs-2' />
                    Create Product
                  </Link>
                </div>

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
                    <th className='min-w-125px'>Brand</th>
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
                      return <ProductsCustomRow removeProduct={removeProductCallback}  key={row.id} row={row} />
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
