import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}

const buttonStyle = {
    marginTop:"15px",
    maxWidth:"100px"
}

const CreateProduct: React.FC = () => {
    const [inputText, setInputText] = useState({
        name: "",
        price: "",
        artikul: "",
        code: "",
        brand_id: "",
        product_images: "", // initialize to null
      });
      const [btn, setBtn] = useState(true);
      const navigate = useNavigate()
    
      useEffect(() => {
        const { name, price, artikul, code, brand_id, product_images } = inputText;
        if (name && price && artikul && code && brand_id && product_images) {
          setBtn(false);
        } else {
          setBtn(true);
        }
      }, [inputText]);
    
      function handleChange(e: React.ChangeEvent<HTMLInputElement> | any) {
        const { value, name } = e.target;
    
        if (e.target?.files) {
          setInputText((prev: any) => ({
            ...prev,
            product_images: e.target.files[0], // set the file itself
          }));
        } else {
          setInputText((prev: any) => ({
            ...prev,
            [name]: value,
          }));
        }
      }
    
      async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", inputText.name);
        formData.append("price", inputText.price);
        formData.append("artikul", inputText.artikul);
        formData.append("code", inputText.code);
        formData.append("brand_id", inputText.brand_id);
        formData.append("product_images", inputText.product_images);
        
    
        try {
          await fetch("http://localhost:3000/products", {
            method: "POST",
            body: formData, // send the formData instead of JSON
          }).then((res) => res.ok && navigate("/products"));
          
        } catch (err) {
          console.error(err);
        }
    
        // Add any necessary error handling or success messages here
      }
    

    

    return (
        <div>
            <div style={styles}>
                <h2>Create Product</h2>
                <button type="button" className="btn btn-link">
                    <Link to='/products'>Go back</Link>
                    </button>
            </div>
                <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:"15px"}} method="post" encType="multipart/form-data">

                <div className="form-group">
                  <label>Product Name</label>
                  <input name="name" value={inputText.name} onChange={handleChange} type="text" className="form-control"  placeholder="Product Name"/>
                </div>

                <div className="form-group">
                  <label>Product Price</label>
                  <input name="price" value={inputText.price} onChange={handleChange} type="text" className="form-control"  placeholder="Product Price"/>
                </div>

                <div className="form-group">
                  <label>Product Artikul</label>
                  <input name="artikul" value={inputText.artikul} onChange={handleChange} type="text" className="form-control"  placeholder="Product Artikul"/>
                </div>

                <div className="form-group">
                  <label>Product Code</label>
                  <input name="code" value={inputText.code} onChange={handleChange} type="text" className="form-control"  placeholder="Product Code"/>
                </div>

                <div className="form-group">
                  <label>Brand ID</label>
                  <input name="brand_id" value={inputText.brand_id} onChange={handleChange} type="text" className="form-control"  placeholder="Brand ID"/>
                </div>
                
                <div className="form-group">
                  <label>Product Image</label>
                  <input name="product_images"  onChange={handleChange} type="file" className="form-control" />
                </div>


                <button disabled={btn} style={buttonStyle} type="submit" className="btn btn-primary">Save</button>
                </form>
        </div>
    )
}

export {CreateProduct}