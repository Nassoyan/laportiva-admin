import React, { useState } from 'react'

function SubCategory({subCatData}) {
  const [secondSubCatData, setSecondSubCatData] = useState([])
  const URL = process.env.REACT_APP_BASE_URL;


  function handleSecondCategoryClick(id:number) {
    return fetch(`${URL}/category/sub-category/${id}`)
    .then((res) => res.json())
    .then((res) => setSecondSubCatData(res))
    .catch((error) => {
      console.error("Error fetching subcategories:", error);
    });
}

console.log(secondSubCatData, "secondSubCatData");


  return (
    <>
    {subCatData.length > 0 ? (
      <select
      onChange={(e:any) => {
        console.log(e.target.value, "valllll");
        
        handleSecondCategoryClick(e.target.value)
      }}
       className='select_category'>
        <option>Sub Categories</option>
        {subCatData?.map((item) => {
          
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          )
        })}
    </select>
    ) : (
      <div className='select_category'>
        <p style={{color:"red", marginTop:"-15px"}}>No subCategories</p>
      </div>
    )}
    {secondSubCatData.length > 0 && (
      <select
      onChange={(e:any) => {
      }}
       className='select_category'>
        <option > Sub Categories</option>
        {secondSubCatData?.map((item:any) => {
          
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          )
        })}
    </select>
    )}
    </>
    
  )
}

export default SubCategory