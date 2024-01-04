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

interface Category {
    id:number;
    name:string;
    parent_id:string | null
}

const CreateCategory: React.FC = () => {
    const [inputText, setInputText] = useState('')
    const [parentId, setParentId] = useState()
    const [btn, setBtn] = useState<boolean>(true)
    const [catData, setCatData] = useState<any>([])
    const URL = process.env.REACT_APP_BASE_URL;

    const navigate = useNavigate()

    useEffect(() => {
        if (inputText) {
          setBtn(false);
        } else {
          setBtn(true);
        }
      }, [inputText]);

      useEffect(() => {
        fetch(`${URL}/category`)
         .then((res) => res.json())
          .then((res) => setCatData([res]))
      }, [])
      

    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value)
    }

    function handleCategoryClick(id:number,index:number) {
        let newCategoryArray:any[0] = [...catData];
        
        return fetch(`${URL}/category/sub-category/${id}`)
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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch(`${URL}/category`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputText, parent_ids: parentId}),
    })
    .then(res => res.ok && navigate("/category")) 
    .catch(error => {
        console.error('Error:', error);
    });
}

    return (
        <div>
            <div style={styles}>
                <h2>Create Category and Sub categories</h2>
                <button type="button" className="btn btn-link">
                    <Link to='/category'>Go back</Link>
                    </button>
            </div>
                <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:"15px"}} method="post" encType="multipart/form-data">
                    {/* <div className="create_category_container">
                        {catData.map((i,index)=>{
                            return(
                                <div key={index} className="form-control">
                                    <select
                                    className="form-select"
                                      onChange={(e:any) => {
                                            setParentId(e.target.value)
                                            handleCategoryClick(e.target.value,index+1)
                                        }}>
                                            <option>Select Parent Category</option>
                                            {i?.map((cat:any) => {
                                                return (
                                                    <option  value={cat.id} key={cat.id}>
                                                        {cat.name}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                 </div>
                            )
                        })}
                    </div> */}
              
                <div className="form-group">
                        <label >Category Name*</label>
                        <input value={inputText} onChange={handleChange} type="text" className="form-control"  placeholder="Category Name"/>
                    </div>
                    <button disabled={btn} style={buttonStyle} type="submit" className="btn btn-primary">Save</button>
                </form>
        </div>
    )
}

export {CreateCategory}