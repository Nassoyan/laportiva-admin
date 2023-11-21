import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Brands } from "../../pages/brands/BrandsPage"

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
  const [brandData, setBrandData] = useState<Brands[]>()
  const URL = process.env.REACT_APP_BASE_URL;

    const [inputText, setInputText] = useState({
        name: "",
        price: "",
        artikul: "",
        code: "",
        brand_id: "Select Brand",
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

      useEffect(() => {
        fetch(`${URL}/brands`)
                      .then(res => res.json())
                      .then((res: Brands[]) => setBrandData(res))
                      .catch(err => console.error(err));
      }, [])

    
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
          await fetch(`${URL}/products`, {
            method: "POST",
            body: formData, 
          })
          .then((res) => res.ok && navigate("/products"));
        } catch (err) {
          console.error(err);
        }
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
                  <label>Product Name*</label>
                  <input required name="name" value={inputText.name} onChange={handleChange} type="text" className="form-control"  placeholder="Product Name"/>
                </div>

                <div className="form-group">
                  <label>Product Price*</label>
                  <input required name="price" value={inputText.price} onChange={handleChange} type="number" min="0" className="form-control"  placeholder="Product Price"/>
                </div>

                <div className="form-group">
                  <label>Product Artikul*</label>
                  <input required name="artikul" value={inputText.artikul} onChange={handleChange} type="text" className="form-control"  placeholder="Product Artikul"/>
                </div>

                <div className="form-group">
                  <label>Product Code*</label>
                  <input required name="code" value={inputText.code} onChange={handleChange} type="text" className="form-control"  placeholder="Product Code"/>
                </div>

                <div className="form-group">
                  <label>Brand ID*</label>
                  <select name="brand_id" className="form-control" value={inputText.brand_id} onChange={handleChange}>
                    <option value="Select Brand" disabled>Select Brand</option>
                    {brandData?.map((brand) => {
                      return (
                        <option  value={brand.id} key={brand.id}>{brand.name}</option>
                      );
                    })}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Product Image*</label>
                  <input name="product_images"  onChange={handleChange} type="file" className="form-control" />
                </div>


                <button disabled={btn} style={buttonStyle} type="submit" className="btn btn-primary">Save</button>
                </form>
        </div>
    )
}

export {CreateProduct}