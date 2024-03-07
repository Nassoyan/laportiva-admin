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

interface User {
    id:number;
    email:string;
    password:string;
}


const CreateUser: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [btn, setBtn] = useState<boolean>(true)
    const URL = process.env.REACT_APP_BASE_URL;

    const navigate = useNavigate()

    useEffect(() => {
        if (email && password) {
          setBtn(false);
        } else {
          setBtn(true);
        }
      }, [email, password]);
      

    function handleEmailChange(e:React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }
    function handlePasswordChange(e:React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    
        return fetch(`${URL}/users`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({"email":email, "password": password}),
        })
        .then(res => res.ok && navigate("/user")) 
        .catch(error => console.error('Error:', error));
    }
    

    

    return (
        <div>
            <div style={styles}>
                <h2>Create a User</h2>
                <button type="button" className="btn btn-link">
                    <Link to='/user'>Go back</Link>
                    </button>
            </div>
            <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:"15px"}} method="post" encType="multipart/form-data">
                <div className="form-group">
                        <label >User E-mail*</label>
                        <input name="email" value={email} onChange={handleEmailChange} type="email" required className="form-control"  placeholder="User e-mail"/>
                    </div>
                    <div className="form-group">
                        <label >User Password</label>
                        <input name="password" value={password} onChange={handlePasswordChange} type="text" required className="form-control" placeholder="User Password"/>
                    </div>
                    <button disabled={btn} style={buttonStyle} type="submit" className="btn btn-primary">Create</button>
                </form>
        </div>
    )
}

export {CreateUser}