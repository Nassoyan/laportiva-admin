import "../../../styles/brandspage/brandsDelPopUp.scss"


export default function CategoryDelPopUp({setPopUp, removeCategory, row}) {
    return (
        <div className="branddel-popup">
            <div className="branddel-popup-inner">
                <div className="branddel-warning">
                    <div className="icon">!</div>
                </div>
                    <p>Are you sure you want to delete?</p>
                    <div className="branddel-button-box">
                        <button onClick={() => {
                            removeCategory(row.id)
                        }} className="swal2-confirm btn fw-bold btn-danger">Yes, Delete!</button>
                        <button className="branddel-cancel" onClick={() => {
                            setPopUp(false)
                        }}><b>No, cancel</b></button>
                </div>
            </div>
        </div>
    )
}