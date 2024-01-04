/* eslint-disable jsx-a11y/anchor-is-valid */
// import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
// import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../_metronic/layout/core'
import { BrandsCustomRow } from '../../components/brandpage/BrandCustomRow';
import "../../../styles/brandspage/customRow.scss"

export interface Brands {
    id:number;
    name:string;
    image_url:string;
    createdAt: string;
    updatedAt: string;
}

const BrandsPage: React.FC = () => {

    const [data, setData] = useState<Brands[]>()
    const URL = process.env.REACT_APP_BASE_URL;


    useEffect(() => {
                fetch(`${URL}/brands`,)
                    .then(res => res.json())
                    .then((res: Brands[]) => setData(res))
                    .catch(err => console.error(err));
            }, []);
    
    function removeBrand(id:number) {
        return fetch(`${URL}/brands/${id}`, {
            method:"DELETE"
        })
            .then(() => {
                return fetch(`${URL}/brands`)
                .then(res => res.json())
                .then((res: Brands[]) => setData(res))
                .catch(err => console.error(err));
            })
    }

    return (
        <div className='table-responsive'>
            <h2>Brands</h2>
            <div className='d-flex align-items-center gap-2 gap-lg-3 justify-content-end' style={{marginBottom:"10px"}}>
            <Link to='create' className='btn btn-sm fw-bold btn-primary'>Create Brand</Link>

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
              data?.map((row:Brands) => {
                return <BrandsCustomRow removeBrand={removeBrand} key={row.id} row={row} />
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
    )
}



export {BrandsPage}




