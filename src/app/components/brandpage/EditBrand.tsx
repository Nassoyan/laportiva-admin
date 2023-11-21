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
  const [inputText, setInputText] = useState<string>("");
  const [btn, setBtn] = useState<boolean>(true);
  const { id } = useParams();
  const navigate = useNavigate()
  const URL = process.env.REACT_APP_BASE_URL;



  useEffect(() => {
    if (inputText) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [inputText]);

  useEffect(() => {
    fetch(`${URL}/brands/${id}`)
        .then(res => res.json())
        .then((res) => {
            setInputText(res.name)
        })
        .catch(err => console.error(err));
}, []);


  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/brands/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputText }),
      });
  
      if (response.ok) {
        navigate("/brands")
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
          <input value={inputText} onChange={handleChange} type="text" className="form-control" placeholder="Brands Name" />
        </div>
        <button disabled={btn} style={buttonStyle} type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}
