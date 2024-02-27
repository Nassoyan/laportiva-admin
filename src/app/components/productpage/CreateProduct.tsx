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
  const [brandData, setBrandData] = useState<Brands[]>();
  const [catData, setCatData] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<(number | null)[]>([]);

  const URL = process.env.REACT_APP_BASE_URL;

    const [inputText, setInputText] = useState({
        name: "",
        name_ru: "",
        name_en: "",
        outer_carton:"",
        inner_carton:"",
        price: "",
        artikul: "",
        code: "",
        brand_id: "Select Brand",
        country:"",
        product_images: "", 
      });
      const[product_Images2, setProduct_image2] = useState("")
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

      useEffect(() => {
        fetch(`${URL}/category/categories-parents`)
         .then((res) => res.json())
          .then((res) => setCatData([res]))
      }, [])

      function handleCategoryClick(id:number,index:number) {
        setSelectedCategories((prevs:any) => {
          return [...prevs, id]
        })
        
        let newCategoryArray:any[0] = [...catData];

        if(!id) {
          return fetch(`${URL}/category/categories-parents`)
          .then((res) => res.json())
           .then((res) => setCatData([res]))
          } else {
            return fetch(`${URL}/category/categories-children/${id}`)
            .then((res) => res.json())
            .then((res) => {
                newCategoryArray[index]=[...res]
                res.length ?  setCatData(newCategoryArray.slice(0,index+1)) : setCatData(newCategoryArray.slice(0, index));
            }
      )
          
          .catch((error) => {
            console.error("Error fetching subcategories:", error);
          });
            
          }
    }

      function handleChangeSecondImage(e: React.ChangeEvent<HTMLInputElement> | any) {
        console.log(e.target.files[0], "-> 2 image");
        
        setProduct_image2(e.target.files[0])
      }

    
      function handleChange(e: React.ChangeEvent<HTMLInputElement> | any) {
        const { value, name } = e.target;
    
        if (e.target?.files) {
          console.log(e.target.files, "-> etargetfiles")
          setInputText((prev: any) => ({
            ...prev,
            product_images: e.target.files[0],
            product_images2: product_Images2,
          }));
          
        } else {
          setInputText((prev: any) => ({
            ...prev,
            [name]: value,
          }));
        }
        console.log(inputText.product_images,  "handleChange 1 image");
        
        
      }

      async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
          e.preventDefault();

          const formData = new FormData();
          formData.append("name", inputText.name);
          formData.append("name_ru", inputText.name_ru);
          formData.append("name_en", inputText.name_en);
          formData.append("outer_carton", inputText.outer_carton);
          formData.append("inner_carton", inputText.inner_carton);
          formData.append("price", inputText.price);
          formData.append("artikul", inputText.artikul);
          formData.append("code", inputText.code);
          formData.append("brand_id", inputText.brand_id);
          formData.append("country", inputText.country);
          formData.append("product_images", inputText.product_images);
          formData.append("product_images", product_Images2);

          const categoryIdsJson = JSON.stringify(selectedCategories.filter(id => id !== null));
          formData.append("category_ids", categoryIdsJson);
          console.log(inputText.product_images,  "handleSubmit 1 image");
          console.log(product_Images2, "handleSubmit 2 image");

          try {
              const response = await fetch(`${URL}/products`, {
                  method: "POST",
                  body: formData, 
              });

              if (response.ok) {
                  navigate("/products");
              } else {
                  console.error('Server error:', response.status);
              }
          } catch (err) {
              console.error('Network error:', err);
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
                  <label> Ru Name*</label>
                  <input required name="name_ru" value={inputText.name_ru} onChange={handleChange} type="text" className="form-control"  placeholder="Product RU Name"/>
                </div>

                <div className="form-group">
                  <label> EN Name*</label>
                  <input required name="name_en" value={inputText.name_en} onChange={handleChange} type="text" className="form-control"  placeholder="Product EN Name"/>
                </div>

                <div className="form-group">
                  <label> How many sets in Outer Carton*</label>
                  <input required name="outer_carton" value={inputText.outer_carton} onChange={handleChange} type="text" className="form-control"  placeholder="Type how many sets are in outer Carton"/>
                </div>

                <div className="form-group">
                  <label> How many sets in inner  Carton*</label>
                  <input required name="inner_carton" value={inputText.inner_carton} onChange={handleChange} type="text" className="form-control"  placeholder="Type how many sets are in inner Carton"/>
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
                  <label>Brand*</label>
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
                  <label>Country</label>
                  <input required name="country" value={inputText.country} onChange={handleChange} type="text" className="form-control"  placeholder="Product Country"/>
                </div>
                
                <div className="form-group">
                  <label>Category*</label>
                    {/* <div className="form-control"> */}
                      {/* <div className="create_category_container"> */}
                          {catData.map((i,index)=>{
                              return(
                                  // <div key={index} className="form-control">
                                      <select className="form-select"  
                                      onChange={(e:any) => {
                                              handleCategoryClick(e.target.value,index+1)
                                          }}>
                                              <option value="">Select Parent Category</option>
                                              {i?.map((cat:any) => {
                                                  return (
                                                      <option  value={cat.id} key={cat.id}>
                                                          {cat.name}
                                                      </option>
                                                  )
                                              })}
                                          </select>
                                  // </div>
                              )
                          })}
                      {/* </div> */}
                    {/* </div> */}
                </div>
                <div className="form-group">
                  <label>Product Image*</label>
                  <input name="product_images"  onChange={handleChange} type="file" className="form-control" />
                </div>

                <div className="form-group">
                  <label>Product Image2*</label>
                  <input name="product_Images2"  onChange={handleChangeSecondImage} type="file" className="form-control" />
                </div>
                <button disabled={btn} style={buttonStyle} type="submit" className="btn btn-primary">Save</button>
                </form>
        </div>
    )
}

export {CreateProduct}