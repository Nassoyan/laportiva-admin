
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from '../../components/productpage/Pagination';
import { ProductsCustomRow } from '../../components/productpage/ProductCustomRow';
import "../../../styles/products/productTable.scss"
import { KTIcon } from '../../../_metronic/helpers';
import { Brands } from '../brands/BrandsPage';
import clsx from "clsx";
import {Dropdown1} from "../../../_metronic/partials";
import {useLayout} from "../../../_metronic/layout/core";


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
    const {config} = useLayout()
    const [data, setData] = useState<Products[]>([])
    const [brands, setBrands] = useState<Brands[]>([]);
    const [catData, setCatData] = useState<any>([]);
    const [orderId, setOrderId] = useState<string>('asc'); 

    
    

    const daterangepickerButtonClass = config.app?.toolbar?.fixed?.desktop
        ? 'btn-light'
        : 'bg-body btn-color-gray-700 btn-active-color-primary'

    const [totalPages, setTotalPages] = useState<number>(0) 
    const [currentPage, setCurrentPage] = useState<number>(1) 
    const [productsPerPage, setProductsPerPage] = useState<number>(10)
    const [searchValue, setSearchValue] = useState<null | string>(null)
    const [brand, setBrand] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedCategories, setSelectedCategories] = useState<(number | null)[]>([]);


    const BASE_URL = process.env.REACT_APP_BASE_URL;

    function getProductsData() {
      let url =  new URL(`${BASE_URL}/products?page=${currentPage}&size=${productsPerPage}`)
      if(searchValue) {
        url.searchParams.append("search", searchValue)
      }
      if(brand) {
        url.searchParams.append("brand_id", brand)
      }
      if(selectedCategories.length) {
        url.searchParams.append("categories", selectedCategories.join(","))
      }
      if(orderId) {
        url.searchParams.append("order_id", orderId)
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
      fetch(`${BASE_URL}/category/categories-parents`)
       .then((res) => res.json())
        .then((res) => setCatData([res]))
    }, [])

    useEffect(() => {
      const handle = setTimeout(() => {
        if(searchValue !== null) {
            getProductsData()
            .then(req => req.json())
            .then((res) => {
              if(currentPage > res.totalPages) { 
                setCurrentPage((res.totalPages - res.totalPages) + 1)
                setTotalPages(res.totalPages)
                setData(res.products);
              } else {
                setTotalPages(res.totalPages);
                setData(res.products);
                setCurrentPage(res.currentPage);
              }
          })
          .catch(error => {
          console.error(error);
          });
        }
    }, 600);
  
    return () => {
      clearTimeout(handle);
    };
  }, [searchValue]);

    useEffect(() => {
      getProductsData()
        .then(req => req.json())
        .then((res) => {
          setLoading(true)
          
          if(currentPage > res.totalPages){
            setCurrentPage((res.totalPages - res.totalPages) + 1)
            setTotalPages(res.totalPages)
            setData(res.products);
          } else {
            setCurrentPage(res.currentPage)
            setTotalPages(res.totalPages)
            setData(res.products);
          }
        });
     }, [currentPage, brand, selectedCategories, orderId])


    const toggleOrder = () => {
      const newOrder = orderId === 'asc' ? 'desc' : 'asc';
      setOrderId(newOrder);
     };

    
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

     function handleCategoryClick(id:number,index:number) {
      
      setSelectedCategories((prevs:any) => {
          if (index <= prevs.length) {
              prevs[index-1] = id;
              return prevs.slice(0, index);
          }
          console.log(prevs, "-> prevs");
          
        return [...prevs, id].filter(Boolean)
      })
      console.log(selectedCategories, "-> selectedCategories");
      
      
      let newCategoryArray:any[0] = [...catData];

      if(!id) {
        return fetch(`${BASE_URL}/category/categories-parents`)
        .then((res) => res.json())
         .then((res) => setCatData([res]))
        } else {
          return fetch(`${BASE_URL}/category/categories-children/${id}`)
          .then((res) => res.json())
          .then((res) => {
              newCategoryArray[index]=[...res]
              res.length ?  setCatData(newCategoryArray.slice(0,index+1)) : setCatData(newCategoryArray.slice(0, index));
          }
        )
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
        });
        }
    }

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
                    <div>
                        <a
                            href='#'
                            className={clsx('btn btn-sm btn-flex fw-bold', daterangepickerButtonClass)}
                            data-kt-menu-trigger='click'
                            data-kt-menu-placement='bottom-end'
                        >
                            <KTIcon iconName='filter' className='fs-6 text-muted me-1' />
                            Filter By Category
                        </a>
                        <Dropdown1 catData={catData} handleCategoryClick={handleCategoryClick} />
                    </div>
                    <div className='order'>
                    <a
                      href='#'
                      onClick={toggleOrder}
                      className={clsx('btn btn-sm btn-flex fw-bold ', daterangepickerButtonClass)}
                    >
                    <span>&darr;&uarr;</span>
                     Change Order
                  </a>
                    </div>
                </div>


                  <div className='d-flex align-items-center position-relative my-1' >
                  <Link to='create' className=' d-flex align-items-center btn btn-sm fw-bold btn-primary  h-40px'>
                    <KTIcon iconName='plus' className='fs-2' />
                    Create Product
                  </Link>
                </div>
              </div>





              {loading ? (
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
              ) : (<div>In process...</div>)}
              
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
