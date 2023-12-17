import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { CategoryCustomRow } from '../../components/category/CategoryCustomRow';
import "../../../styles/category/category.scss"
import CategoryCustomRow from '../../components/category/CategoryCustomRow';


interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  parent_id?: number | null;
}

function CategoryPage() {
  const [data, setData] = useState<Category[] | undefined>([]);
  const [subData, setSubData] = useState()
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    try {
      fetch(`${URL}/category`)
        .then((res) => res.json())
        .then((res) => setData(res));
    } catch (error) {
      console.error(error, 'error while fetching categories');
    }
  }, []);
  



  function removeCategory(id: number) {
    return fetch(`${URL}/category/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        return fetch(`${URL}/category`)
          .then((res) => res.json())
          .then((res: Category[]) => setData(res))
          .catch((err) => console.error(err));
      });
  }


  return (
    <div className='table-responsive'>
      <h2>Category</h2>
      <div className='create_category' >
        <Link to='create' className='btn btn-sm fw-bold btn-primary'>
          Create Category
        </Link>
      </div>
      <div id='' className='categories_container'>
          <div className='text-gray-600 fw-bold name_action_title'>
            <p className='min-w-100px'>Names</p>
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
              className='min-w-100px'
            >
              Actions
            </p>
          </div>
          <hr></hr>
        <div className='text-gray-600 fw-bold name_action'>
          {data?.length ? data?.map((row) => {
            return(
              <CategoryCustomRow 
                key={row.id} 
                row={row} 
                removeCategory={removeCategory}
                isSelected={row.id === selectedRowId}
                onSelect={() => {
                 setSelectedRowId((prevId) => (prevId === row.id ? null : row.id));
                  }}
                />
          )
          }) : <p style={{textAlign:"center"}}>Empty Categories</p>}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
