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

const payloadObject = {};

const CreateRelations: React.FC = () => {
    const [inputText, setInputText] = useState('')
    const [parent, setParent] = useState<any>({})
    const [btn, setBtn] = useState<boolean>(true)
    const [catData, setCatData] = useState<any>([])
    const [payload, setPayload] = useState<any>({})
    const [currentData, setCurrentData] = useState<any>({});
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

    const handleSelectChange = (newItem) => {

        if(!payload.id) {
            console.log("empty case -> ", payload);
            setPayload({ id: newItem.id, name: newItem.name });
            return;
        }

        // Function to recursively find and update the tree
        const updateTree = (currentItem, newItem, parentId) => {
            if (currentItem.id === parentId) {
                // Update the old item
                currentItem.child_category_id = newItem.id;

                // Add new item as a child
                currentItem.child = {
                    id: newItem.id,
                    name: newItem.name,
                    child: null
                };
            } else if (currentItem.child) {
                updateTree(currentItem.child, newItem, parentId);
            }
        };

        updateTree(payload, newItem, parent.id);

        setPayload({ ...payload });

        const newData = [...catData[0]]
        setCatData([...catData, newData])
    };

    function handleCategoryClick(item:any,index:number) {

        const x = {
            category_id: item.id,
            parent_category_id: parent.id,
            child_category_id: null,
            child: null
        }

        setCurrentData(x);
                
        const newData = [...catData[0]]
        setCatData([...catData, newData])
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch(`${URL}/category/relation/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
                    <Link to='/relation'>Go back</Link>
                    </button>
            </div>
                <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:"15px"}} method="post" encType="multipart/form-data">
                    <div className="create_category_container">
                        {catData.map((i, index)=>{
                            return(
                                <div key={index} className="form-control">
                                    <select
                                      className="form-select"
                                      onChange={(e:any) => {
                                            const item = JSON.parse(e.target.value);
                                            handleCategoryClick(item, index+1);

                                            handleSelectChange(item);
                                            setParent(item);
                                        }}>
                                            <option>Select Parent Category</option>
                                            {i?.map((cat:any) => {
                                                return (
                                                    <option value={JSON.stringify(cat)} key={cat.id}>
                                                        {cat.name}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                 </div>
                            )
                        })}
                    </div>
              
                    <button style={buttonStyle} type="submit" className="btn btn-primary">Save</button>
                </form>
        </div>
    )
}

export {CreateRelations}