import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { CategoryCustomRow } from '../../components/category/CategoryCustomRow';
import "../../../styles/category/category.scss"
import CategoryCustomRow from '../../components/category/CategoryCustomRow';
import { UsersCustomRow } from '../../components/userPage/UserCustomRow';


interface User {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

function UserPage() {
  const URL = process.env.REACT_APP_BASE_URL;
  console.log(URL, "-> URL");
  
  const[userData, setUserData] = useState<User[]>()

  useEffect(() => {
    try {
      fetch(`${URL}/users`)
        .then((res) => res.json())
        .then((res) => res && setUserData(res));
    } catch (error) {
      console.error(error, 'error while fetching categories');
    }
  }, []);

  function removeUser(id:number) {
    return fetch(`${URL}/users/${id}`, {
        method:"DELETE"
    })
        .then(() => {
            return fetch(`${URL}/users`)
            .then(res => res.json())
            .then((res: User[]) => setUserData(res))
            .catch(err => console.error(err));
        })
}


  return (
    <div className='table-responsive'>
            <h2>Users</h2>
            <div className='d-flex align-items-center gap-2 gap-lg-3 justify-content-end' style={{marginBottom:"10px"}}>
            <Link to='create' className='btn btn-sm fw-bold btn-primary'>Create User</Link>

            </div>
            <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <th></th>
              <th className='min-w-125px'>Id</th>
              <th className='min-w-125px'>Email</th>
              <th className='min-w-125px'>Password</th>
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
            {userData?.length ? (
              userData?.map((row:User) => {
                return <UsersCustomRow removeUser={removeUser} key={row.id} row={row} />
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
  );
}

export default UserPage;
