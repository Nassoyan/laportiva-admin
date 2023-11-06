import { useEffect, useState } from "react"
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

const CreateBrand: React.FC = () => {
    const [inputText, setInputText] = useState('')
    const [brandImage, setBrandImage] = useState<any>()
    const [btn, setBtn] = useState<boolean>(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (inputText && brandImage) {
          setBtn(false);
        } else {
          setBtn(true);
        }
      }, [inputText, brandImage]);

    function handleChange(e:any) {
        setInputText(e.target.value)
    }

    function handleFileChange(e:any) {
        
        setBrandImage(e.target?.files[0])
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', inputText);
        formData.append('image', brandImage);
        
    
        return fetch('http://localhost:3000/brands', {
            method: 'POST',
            body: formData,
        }).then(res => res.ok && navigate("/brands")) 
        .catch(error => console.error('Error:', error));
    }

    

    return (
        <div>
            <div style={styles}>
                <h2>Create Brand</h2>
                <button type="button" className="btn btn-link">
                    <Link to='/brands'>Go back</Link>
                    </button>
            </div>
                <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:"15px"}} method="post" encType="multipart/form-data">
                <div className="form-group">
                        <label >Brand Name</label>
                        <input value={inputText} onChange={handleChange} type="text" className="form-control"  placeholder="Brands Name"/>
                    </div>
                    <div className="form-group">
                        <label >Image</label>
                        <input name="brandFile" onChange={handleFileChange} type="file" className="form-control" placeholder="Select an Image"/>
                    </div>
                    <button disabled={btn} style={buttonStyle} type="submit" className="btn btn-primary">Save</button>
                </form>
        </div>
    )
}

export {CreateBrand}