import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";

const AddProduct=()=>{
    const[name, setName] = useState('');
    const[price, setPrice] = useState('');
    const[category, setCategory] = useState('');
    const[company, setCompany] = useState('');
    const[error, setError] = useState(false);

    const addProduct= async()=>{
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body: JSON.stringify({name, price, category,userId, company}),
            headers: {
                'Content-type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
    }

    return (
        <div className="add-product">
            <h1>Add Product</h1>
            <input className="input-box" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className="invalid">Invalid Name</span>}
            <br/>
            <input className="input-box" type="text" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className="invalid">Invalid Price</span>}
            <br/>
            <input className="input-box" type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className="invalid">Invalid Category</span>}
            <br/>
            <input className="input-box" type="text" placeholder="Enter Company" value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className="invalid">Invalid Company</span>}
            <br/>
            <button onClick={addProduct} className="signUpButton" type="button ">Add Product</button>

        </div>
    )
}
export default AddProduct;