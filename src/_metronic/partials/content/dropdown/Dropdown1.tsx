/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export function Dropdown1({ catData, handleCategoryClick }) {
  return (
    <div className='menu menu-sub menu-sub-dropdown w-250px w-md-300px' data-kt-menu='true'>
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
      </div>

      <div className='separator border-gray-200'></div>

      <div className='px-7 py-5'>
        <div className='mb-10'>
            {catData.map((i,index)=>{
                return(
                    <div className="d-flex position-relative my-1">
                        <div className='align-items-center position-relative my-1'>
                            <select className='form-select form-select-solid me-2'
                                    style={{ marginLeft: '5px', backgroundColor:"#f3f3f3", cursor:"pointer"}}
                                    onChange={(e:any) => {
                                        handleCategoryClick(e.target.value,index+1)
                                    }}>
                                {index === 0 ? <option value="">Select Parent Category</option> :
                                    <option value="" >Select Parent Category</option>}
                                {i?.map((cat:any) => {
                                    return (
                                        <option  value={cat.id} key={cat.id}>
                                            {cat.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                )
            })}
        </div>
      </div>
    </div>
  )
}
