import { useEffect, useState, ChangeEvent } from "react";
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

export default function EditBrand(): JSX.Element {
  const [inputValues, setInputValues] = useState<{name:string, brandImage:""}>({
    name:'',
    brandImage:""
  });
  const [btn, setBtn] = useState<boolean>(true);
  const [imageState, setImageState] = useState<boolean>(false)
  const [brandImage, setBrandImage] = useState<string>("")

  const { id } = useParams();
  const navigate = useNavigate()
  const URL = process.env.REACT_APP_BASE_URL;



  useEffect(() => {
    if (inputValues) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [inputValues]);

  useEffect(() => {
    fetch(`${URL}/brands/${id}`)
        .then(res => res.json())
        .then((res) => {
            setInputValues({
              name:res.name,
              brandImage:res.image_url
            })
        })
        .catch(err => console.error(err));
}, []);


  function handleChange(e: any) {
    const{value, name} = e.target;
      if (e.target?.files) {
        setInputValues((prev: any) => ({
            ...prev,
            brandImage: e.target.files[0], 
        }));
      } else {
        setInputValues((prev: any) => ({
          ...prev,
          [name]: value,
        }));
      }
    
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", inputValues.name);
    if (inputValues.brandImage) {
      formData.append("image_url", inputValues.brandImage);
    }
  
    try {
      const response = await fetch(`${URL}/brands/${id}`, {
        method: "PUT",
        body: formData,
      });
  
      if (response.ok) {
        navigate("/brands");
      } else {
        // Handle error response
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

  return (
    <div>
      <div style={styles}>
        <h2>Edit Brand</h2>
        <button type="button" className="btn btn-link">
          <Link to="/brands">Go back</Link>
        </button>
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }} method="put" encType="multipart/form-data">
        <div className="form-group">
          <label>Brand Name</label>
          <input name="name" value={inputValues.name} onChange={handleChange} type="text" className="form-control" placeholder="Brands Name" />
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
                    src={inputValues.brandImage} width={100} height={100} />
                  <input 
                    style={{display: imageState ? "block" : "none"}} 
                    name="brandImage"  onChange={handleChange} 
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
