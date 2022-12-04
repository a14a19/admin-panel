import classes from './addproduct.module.scss';

import React, { useContext, useRef } from 'react';
import AdminContext from '../context/adminContext';

function AddProduct() {

    const admin = useContext(AdminContext)
    const adminData = admin.items.productsPage

    const categories = adminData.categories.map((item, i) => {
        return (
            <option key={i}>
                {item}
            </option>
        )
    })

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
    };

    return (
        <div className={classes.addproduct}>
            <h3>Add Product</h3>
            <div className={classes.container}>
                <div className={classes.ltContainer}>
                    <label htmlFor='name'>Product Name</label>
                    <input type='text' id='name'/>
                    <label htmlFor='description'>Description</label>
                    <textarea rows='3' id='description'></textarea>
                    <label htmlFor='category'>Category</label>
                    <select id='category'>
                        <option>Select category</option>
                        {categories}
                    </select>
                    <div className={classes.dateUnit}>
                        <div className={classes.date}>
                            <label htmlFor='date'>Expire Date</label>
                            <input type='date' id='date'/>
                        </div>
                        <div className={classes.number}>
                            <label htmlFor='units'>Units in Stock</label>
                            <input type='number' id='units'/>
                        </div>
                    </div>
                </div>
                <div className={classes.rtContainer}>
                    <label htmlFor='files'>
                        <i className="fas fa-cloud-upload-alt tm-upload-icon"></i>
                    </label>
                    <input type='file' id='files' style={{display:'none'}} ref={hiddenFileInput} onChange={handleChange}/>
                    <button onClick={handleClick} className={classes.filebtn}>upload product image</button>
                </div>
            </div>
            <button className={classes.addnow}>add product now</button>
        </div>
    )
}

export default AddProduct;