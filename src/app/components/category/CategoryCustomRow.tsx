import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FC } from "react"; 
import CategoryDelPopUp from './CategoryDelPopUp';


interface Props {
 key:number;
 removeCategory:(arg0:number) => void;
 row:{
   id:number,
   name:string
 };
 isSelected:boolean;
 onSelect:() => void;
};


const CategoryCustomRow: FC<Props> = ({row, key, removeCategory, isSelected, onSelect}) => {
  const [actions, setActions] = useState(false); // useState should be inside {}
  const [popUp, setPopUp] = useState<boolean>(false)
  const [catData, setCatData] = useState<any>([])
  const navigate = useNavigate()
  const URL = process.env.REACT_APP_BASE_URL;


    // subCategories = [ [ {name: bajak} ], [ { name: gini } ] ]


  function handleCategoryClick(id:number, index:number) {
    let newCategoryArray:any[0] = [...catData];

    if(!id) {
    return fetch(`${URL}/category/sub-category/${0}`)
    .then((res) => res.json())
    .then((res) => {
      newCategoryArray[index]=[...res]
            res.length ?  setCatData(newCategoryArray.slice(0,index+1)) : setCatData(newCategoryArray.slice(0, index));
    }
  )
    } else { 
      
      fetch(`${URL}/category/sub-category/${id}`)
      .then((res) => res.json())
      .then((res) => {
        newCategoryArray[index]=[...res]
              res.length ?  setCatData(newCategoryArray.slice(0,index+1)) : setCatData(newCategoryArray.slice(0, index));
      }
    )
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
    });
}}




  return (
    <>
      <div className='d-flex category_page' key={key}>
        <div
        onClick={() => {
              onSelect()
              handleCategoryClick(row.id, 0)
            }}
         className='form-control category_name' key={key}>
            <div >
            {row.name} 
            </div>
            {isSelected && (
              <div className='category_page_dropdown'>
                {catData.length ? catData?.map((cat:any, idx:any) => {
                  return (
                    <div className='form-control mb-1 mt-1'>
                    <select  
                    className='form-select'
                    onClickCapture={(e) => {
                      e.nativeEvent.stopPropagation()
                    }}
                    onChange={(e:any) => {
                      handleCategoryClick(e.target.value, idx+1)
                  }}>
                    <option value="">Select Category</option>
                    {cat.map((i) => {
                      return (
                        <option value={i.id}>
                          {i.name}
                        </option>
                      )
                    })}
                    
                  </select>
                  </div>

                  )
                }) : <div style={{color:"red"}} className='form-control'>No categories</div>}

              </div>
            )}
        </div>
        <div className="text-end min-w-100px actions-td">
            <a
              href="#"
              style={{ display: "flex", flexDirection: "column" }}
              className="align-items-center btn btn-light btn-active-light-primary btn-sm"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              onClick={() => {
                setActions(!actions)
              }}
            >
              Actions
              <i className="ki-duotone ki-down fs-5 m-0"></i>
            </a>
            {actions ? (
              <div className="actions-box">
              <span role="link" onClick={() => {
                  navigate(`edit/${row.id}`);
                }}>Edit</span>
              <span onClick={() => {
                setPopUp(true)
                setActions(!actions)
              }}>Delete</span>
            </div>
            ) : ""}
          </div>
      </div>
      {popUp && <CategoryDelPopUp removeCategory={removeCategory} row={row}  setPopUp={setPopUp} />}
    </>
  )
}

export default CategoryCustomRow