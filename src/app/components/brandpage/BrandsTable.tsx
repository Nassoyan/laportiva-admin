import { useState } from "react"


export default function BrandsTable({brand, deleteBrand}) {
    const [popUp, setPopUp] = useState<boolean>(false)
    return (
        <>
          <tr  className='brand_tr'>
            <td className='brands-td'>{brand.id}</td> 
            <td className='brands-td'>{brand.name}</td> 
            <td className='brands-td'><img width={50} height={50} src={brand?.image_url} /></td>
            <td className='brands-td'>{brand.createdAt}</td>
            <td className='brands-td'>{brand.updatedAt}</td>
            <td className='brands-td brands_delete'>
              <span onClick={() => {
                setPopUp(true)
                  deleteBrand(brand.id)
              }} className="icon-bin">
                  
              </span>
            </td>
          </tr>
        </>
    )
}



