import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Brands } from "../../pages/brands/BrandsPage";

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
      name_ru: "",
      name_en: "",
      outer_carton: "",
      inner_carton: "",
      price: "",
      artikul: "",
      code: "",
      brand_id: "",
      product_images:""
    });
  const [brandData, setBrandData] = useState<Brands[]>()
  const [btn, setBtn] = useState<boolean>(true);
  const [imageState, setImageState] = useState<boolean>(false)
  const { id } = useParams();
  const navigate = useNavigate()
  const URL = process.env.REACT_APP_BASE_URL;

  

  useEffect(() => {
    fetch(`${URL}/brands`)
      .then(req => req.json())
      .then((res) => {
        setBrandData(res);
      });
  }, [])
 

  useEffect(() => {
    fetch(`${URL}/products/${id}`)

        .then(res => res.json())
        .then((res) => {
            console.log(res, "ressss");
            
            setInputValues({
                name: res.name,
                name_ru: res.name_ru,
                name_en: res.name_en,
                outer_carton: res.outer_carton,
                inner_carton: res.inner_carton,
                price: res.price,
                artikul: res.artikul,
                code: res.code,
                brand_id: res.brand_id,
                product_images: res.images[0].image_url
            })
            
        })
          .catch(err => console.error(err));
  }, [id]);

  function handleChange(e) {
    // console.log(e.target.files[0], "e.target");
    
      setBtn(false)
      const{value, name} = e.target;
      if (e.target?.files) {
        setInputValues((prev: any) => ({
            ...prev,
            product_images: e.target.files[0], 
        }));
      } else {
        setInputValues((prev: any) => ({
          ...prev,
          [name]: value,
        }));
      }
      console.log(inputValues, "-> inputValues");
      
  }

  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

  //   const { name, name_ru, name_en, outer_carton, inner_carton, price, artikul, code, brand_id, product_images} = inputValues
      

  //   e.preventDefault();
  //   console.log(inputValues);
    
  //   try {
  //     const response = await fetch(`${URL}/products/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({name, name_ru, name_en, outer_carton, inner_carton, price, artikul, code, brand_id, product_images}),
  //     });
  
  //     if (response.ok) {
  //       navigate("/products")
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputValues.name);
    formData.append("name_ru", inputValues.name_ru);
    formData.append("name_en", inputValues.name_en);
    formData.append("outer_carton", inputValues.outer_carton);
    formData.append("inner_carton", inputValues.inner_carton);
    formData.append("price", inputValues.price);
    formData.append("artikul", inputValues.artikul);
    formData.append("code", inputValues.code);
    formData.append("brand_id", inputValues.brand_id);
    formData.append("product_images", inputValues.product_images);

    try {
      
        const response = await fetch(`${URL}/products/${id}`, {
            method: "PUT",
            body: formData,
        });

        if (response.ok) {
            navigate("/products");
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
          <input  onChange={handleChange} value={inputValues.name} name="name"  type="text" className="form-control" placeholder="Products Name" />
        </div>
        <div className="form-group">
          <label>Ru Name</label>
          <input  onChange={handleChange} value={inputValues.name_ru} name="name_ru"  type="text" className="form-control" placeholder="Products Ru Name" />
        </div>
        <div className="form-group">
          <label>En Name</label>
          <input  onChange={handleChange} value={inputValues.name_en} name="name_en"  type="text" className="form-control" placeholder="Products En Name" />
        </div>

        <div className="form-group">
          <label>Outer Carton*</label>
          <input required name="outer_carton" value={inputValues.outer_carton} onChange={handleChange} type="text" className="form-control"  placeholder="Correct count in outer Carton"/>
        </div>
        <div className="form-group">
          <label>Inner Carton*</label>
          <input required name="inner_carton" value={inputValues.inner_carton} onChange={handleChange} type="text" className="form-control"  placeholder="Correct count in inner Carton"/>
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
            <label>Select Brand*</label>
            <select name="brand_id" className="form-control" value={inputValues.brand_id} onChange={handleChange}>
              <option value="" disabled>Select Brand </option>
              {brandData?.map((brand) => {
                return (
                  <option  value={brand.id} key={brand.id}>{brand.name}</option>
                );
              })}
            </select>
          </div>

          <div className="form-control">
            <label>Image*</label>
                <div className="edit_product_image_box">
                  <span onClick={() => setImageState(true)}
                        style={{display: !imageState ? "block" : "none"}}
                        className="edit_product_image_closebtn">X</span>
                  <button onClick={(e) => {
                         e.preventDefault()
                         setImageState(false)}} 
                         style={{display: imageState ? "block" : "none"}} 
                         className="edit_product_imgbtn" >Discard</button>
                  <img 
                    style={{display: !imageState ? "block" : "none"}} 
                    src={inputValues.product_images} width={100} height={100} />
                  <input 
                    style={{display: imageState ? "block" : "none"}} 
                    name="product_images"  onChange={handleChange} 
                    type="file" className="form-control" />
                </div>
          </div>

        <button disabled={btn} style={buttonStyle} type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}
