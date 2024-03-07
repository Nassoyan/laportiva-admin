// @ts-nocheck

import { useState } from "react";
import { FC } from "react"; 
import UserDelPopUp from "./UserDelPopUp";
import {useNavigate} from "react-router-dom"


interface Props {
  row: {
    id: number;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
  removeUser: (id: number) => void;
}

const UsersCustomRow: FC<Props> = ({ row, removeUser }) => {
  const [actions, setActions] = useState(false); // useState should be inside {}
  const [popUp, setPopUp] = useState<boolean>(false)
  const navigate = useNavigate()

  const createdAtValue = row.createdAt; 
  const updatedAtValue = row.updatedAt; 
  const createdAt = new Date(createdAtValue).toLocaleDateString();
  const updatedAt = new Date(updatedAtValue).toLocaleDateString();

  return (
    <>
    <tr onClick={(e) => {
      e.stopPropagation()
    }}>
      <>
        <td></td>
        <td>{row.id}</td>
        <td>
          <b>{row.email}</b>
        </td>
        <td>
          <b>{row.password}</b>
        </td>
        <td>{createdAt}</td>
        <td>{updatedAt}</td>
        <td className="text-end min-w-100px actions-td">
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
            <span onClick={() => {
              setPopUp(true)
              setActions(!actions)
              // 
            }}>Delete</span>
          </div>
          ) : ""}
        </td>
        <td></td>
      </>
    </tr>
    {popUp && (
      <UserDelPopUp removeUser={removeUser} row={row} actions={actions} setPopUp={setPopUp} />
    )}
    </>
  );
};

export { UsersCustomRow };
