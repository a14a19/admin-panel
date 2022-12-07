import classes from './addproduct.module.scss';

import React, { useContext, useEffect, useRef, useState } from 'react';
import AdminContext from '../context/adminContext';
import { useNavigate } from 'react-router-dom';

let productData = {
    category: "",
    description: "",
    expireDate: "",
    name: "",
    stock: "",
    unitSold: ""
}

function AddProduct() {

    const admin = useContext(AdminContext)
    const adminData = admin.items.productsPage
    const navigate = useNavigate()
    const [pPage, setPPage] = useState(productData)
    const [submitPro, setSubmitPro] = useState(pPage)
    const [fileError, setFileError] = useState({
        error: '',
        text: ''
    })

    const categories = adminData.categories.map((item, i) => {
        return (
            <option key={i}>
                {item}
            </option>
        )
    })

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        event.preventDefault()
        hiddenFileInput.current.click();
    };

    const update = (k, v) => {
        setPPage({ ...pPage, [k]: v })
    }

    const addProduct = (e) => {
        e.preventDefault()
        setSubmitPro(pPage)
        navigate(-1)
    }

    useEffect(() => {
        if (pPage.name !== '' && pPage.description !== '' && pPage.category !== '' && pPage.expireDate !== '' && pPage.stock !== '') {
            adminData.products.push(submitPro)
            localStorage.setItem('items', JSON.stringify(admin.items))
        }
    }, [submitPro])

    const handleChange = event => {
        const fileUploaded = event.target.files[0];

        if (fileUploaded.type === "image/jpg" || fileUploaded.type === "image/PNG" || fileUploaded.type === "image/jpeg" || fileUploaded.type === "image/bmp" || fileUploaded.type === "image/svg" || fileUploaded.type === "image/webp") {
            setFileError({
                error: 'File uploaded successful.',
                text: classes.fileerrorGreen
            })
            if (fileUploaded.size > 1000000) {
                setFileError({
                    error: 'File size should be less than 1mb.',
                    text: classes.fileerrorRed
                })
            }
        }
        else if (fileUploaded.type !== "image/jpg" || fileUploaded.type !== "image/png" || fileUploaded.type !== "image/jpeg" || fileUploaded.type !== "image/bmp" || fileUploaded.type !== "image/svg" || fileUploaded.type !== "image/webp") {
            setFileError({
                error: 'File type not accepted, only image format allowed.',
                text: classes.fileerrorRed
            })
            if (fileUploaded.size > 1000000) {
                setFileError({
                    error: 'File size should be less than 1mb.',
                    text: classes.fileerrorRed
                })
            }
        }
    };

    return (
        <form className={classes.addproduct}>
            <h3>Add Product</h3>
            <div className={classes.container}>
                <div className={classes.ltContainer}>
                    <label htmlFor='name'>Product Name</label>
                    <input type='text' id='name' name='name' onChange={(e) => update(e.target.name, e.target.value)} />

                    <label htmlFor='description'>Description</label>
                    <textarea rows='3' id='description' name='description' onChange={(e) => update(e.target.name, e.target.value)}></textarea>

                    <label htmlFor='category'>Category</label>
                    <select id='category' name='category' onChange={(e) => update(e.target.name, e.target.value)}>
                        <option>Select category</option>
                        {categories}
                    </select>

                    <div className={classes.dateUnit}>
                        <div className={classes.date}>
                            <label htmlFor='date'>Expire Date</label>
                            <input type='date' id='date' name='expireDate' onChange={(e) => update(e.target.name, e.target.value)} />
                        </div>
                        <div className={classes.number}>
                            <label htmlFor='units'>Units in Stock</label>
                            <input type='number' id='units' name='stock' onChange={(e) => update(e.target.name, e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className={classes.rtContainer}>
                    <label htmlFor='files'>
                        <i className="fas fa-cloud-upload-alt tm-upload-icon"></i>
                    </label>
                    <input type='file' id='files' style={{ display: 'none' }} ref={hiddenFileInput} onChange={handleChange} name='file' />

                    {fileError && <div className={fileError.text}>{fileError.error}</div>}

                    <button onClick={handleClick} className={classes.filebtn}>upload product image</button>
                </div>
            </div>
            <button type='submit' className={classes.addnow} onClick={(e) => addProduct(e)}>add product now</button>
        </form>
    )
}

export default AddProduct;