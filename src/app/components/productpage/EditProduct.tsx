import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const styles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  
  const buttonStyle: React.CSSProperties = {
    marginTop: "15px",
    maxWidth: "140px",
  };

export default function EditProduct(): JSX.Element {
    const [inputValues, setInputValues] = useState({
        name: "",
        price: "",
        artikul: "",
        code: "",
        brand_id: "",
      });
  const [btn, setBtn] = useState<boolean>(true);
  const { id } = useParams();
  const navigate = useNavigate()
  const URL = process.env.REACT_APP_BASE_URL;

  


 

  useEffect(() => {
    fetch(`${URL}/products/${id}`)
        .then(res => res.json())
        .then((res) => {
            
            setInputValues({
                name: res.name,
                price: res.price,
                artikul: res.artikul,
                code: res.code,
                brand_id: res.brand_id,
            })
            
        })
        .catch(err => console.error(err));
}, [id]);

function handleChange(e) {
    setBtn(false)
    const{value, name} = e.target;
    setInputValues((prev: any) => ({
        ...prev,
        [name]:value
    }));
}

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    const { name, price, artikul, code, brand_id} = inputValues
      
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, price, artikul, code, brand_id}),
      });
  
      if (response.ok) {
        navigate("/products")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

  return (
    <div>
      <div style={styles}>
        <h2>Edit Product</h2>
        <button type="button" className="btn btn-link">
          <Link to="/products">Go back</Link>
        </button>
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }} method="put" encType="multipart/form-data">
        <div className="form-group">
          <label>Product Name</label>
          <input  onChange={handleChange} value={inputValues.name} name="name"  type="text" className="form-control" placeholder="Brands Name" />
        </div>
        <div className="form-group">
          <label>Product Price</label>
          <input onChange={handleChange} value={inputValues.price} name="price"  type="text" className="form-control" placeholder="Brands Name" />
        </div>
        <div className="form-group">
          <label>Product Artikul</label>
          <input onChange={handleChange} value={inputValues.artikul} name="artikul"  type="text" className="form-control" placeholder="Brands Name" />
        </div>
        <div className="form-group">
          <label>Product Code</label>
          <input onChange={handleChange} value={inputValues.code} name="code"  type="text" className="form-control" placeholder="Brands Name" />
        </div>
        <div className="form-group">
          <label>Products Brand ID</label>
          <input onChange={handleChange} value={inputValues.brand_id} name="brand_id"  type="text" className="form-control" placeholder="Brands Name" />
        </div>
        <button disabled={btn} style={buttonStyle} type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}
