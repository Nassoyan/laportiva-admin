// @ts-nocheck

import { useState } from "react";
import { FC } from "react"; // Don't forget to import FC from react
import "../../../styles/createBrand/createBrand.scss";
import BrandDelPopUp from "../brandpage/BrandDelPopUp";
import {useNavigate} from "react-router-dom"
import ProductdDelPopUp from "./ProductDelPopUp";




const ProductsCustomRow: FC<Props> = ({ row, removeProduct }) => {
  const [actions, setActions] = useState(false); // useState should be inside {}
  const [popUp, setPopUp] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <>
    <tr>
      <>
        <td></td>
        <td>{row.id}</td>
        <td>
          <b>{row.name}</b>
        </td>
        <td><img width={60} height={60} alt="img" src={row.images[0].image_url} style={{objectFit:"cover"}} /></td>
        <td>
          {row.price}
        </td>
        <td>{row.artikul}</td>
        <td>{row.code}</td>
        <td>{row.brand_id}</td>
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
      <ProductdDelPopUp row={row} removeProduct={removeProduct} actions={actions} setPopUp={setPopUp} />
    )}
    </>
  );
};

export { ProductsCustomRow };
