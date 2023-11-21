// @ts-nocheck

import { useState } from "react";
import { FC } from "react"; 
import BrandDelPopUp from "./BrandDelPopUp";
import {useNavigate} from "react-router-dom"


interface Props {
  row: {
    id: number;
    name: string;
    image_url: string;
    createdAt: string;
    updatedAt: string;
  };
  removeBrand: (id: number) => void;
}

const BrandsCustomRow: FC<Props> = ({ row, removeBrand }) => {
  const [actions, setActions] = useState(false); // useState should be inside {}
  const [popUp, setPopUp] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <>
    <tr onClick={(e) => {
      e.stopPropagation()
    }}>
      <>
        <td></td>
        <td>{row.id}</td>
        <td>
          <b>{row.name}</b>
        </td>
        <td>
          <div className="brand-image-box">
            <img className="brand-image" src={row?.image_url} alt={"img"} />
          </div>
        </td>
        <td>{row.createdAt}</td>
        <td>{row.updatedAt}</td>
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
            <span role="link" onClick={() => {
                navigate(`edit/${row.id}`);
              }}>Edit</span>
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
      <BrandDelPopUp removeBrand={removeBrand} row={row} actions={actions} setPopUp={setPopUp} />
    )}
    </>
  );
};

export { BrandsCustomRow };
