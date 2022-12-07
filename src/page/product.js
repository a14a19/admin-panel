import classes from './product.module.scss';

import { useContext, useState } from 'react';
import AdminContext from '../context/adminContext';
import { Link } from 'react-router-dom';

function Product() {

    const admin = useContext(AdminContext)
    const adminData = admin.items.productsPage
    const [addCat, setAddCat] = useState(true)
    const [valueCat, setvalueCat] = useState('')
    const [data, setData] = useState(adminData)
    const [checkbtn, setCheckbtn] = useState([])

    const alldlt = (e) => {
        if(checkbtn.length > 0){
            checkbtn.map((x) => {
                adminData.products.map((y) => {
                    if (x.name === y.name && x.category === y.category) {
                        let indx = adminData.products.indexOf(y)
                        setData(adminData.products.splice(indx, 1))
                    }
                })
            })
        }
        localStorage.setItem('items', JSON.stringify(admin.items))
    }

    const handleClick = () => {
        setAddCat(current => !current)
    }
    
    const addhandleClick = () => {
        setAddCat(current => !current)
        if(valueCat){
            adminData.categories.push(valueCat)
            setvalueCat('')
        }
    }

    const products = adminData.products.map((item, i) => {

        const checkFn = (e) => {
            if (e.target.checked) {
                setCheckbtn([...checkbtn, (item)])
            }
            else if (!e.target.checked) {
                checkbtn.map((items) => {
                    if (items.category === item.category && items.name === item.name && !e.target.checked) {
                        checkbtn.splice(i, 1)
                        setCheckbtn([...checkbtn])
                    }
                })
            }
        }

        return (
            <tr key={i} className={classes.productList}>
                <td>
                    <input 
                        type='checkbox' 
                        id={i} 
                        name={i} 
                        className={classes.hideInput} 
                        onChange={(e) => checkFn(e)}
                    />
                </td>
                <td>{item.name}</td>
                <td>{item.unitSold}</td>
                <td>{item.stock}</td>
                <td>{item.expireDate}</td>
                <td>
                    <button 
                        className={classes.deleteBtn} 
                        onClick={() => setData(adminData.products.splice(i,1))} 
                        key={i}
                    >
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                    </button>
                </td>
            </tr>
        )
    })

    const categoriess = adminData.categories.map((item, i) => {

        return (
            <li key={i}>
                <span>{item}</span>
                <button 
                    className={classes.deleteBtn} 
                    onClick={() => setData(adminData.categories.splice(i, 1))}
                >
                    <i className="far fa-trash-alt tm-product-delete-icon"></i>
                </button>
            </li>
        )
    })

    return (
        <div className={classes.product}>
            <div className={classes.products}>
                <div className={classes.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>PRODUCT NAME</th>
                                <th>UNIT SOLD</th>
                                <th>IN STOCK</th>
                                <th>EXPIRE DATE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products}
                        </tbody>
                    </table>
                </div>
                <Link to='/product/add_product'>
                    <button className={classes.adding} >Add new product</button>
                </Link>
                <button className={classes.adding} onClick={(e) => alldlt(e)}>delete selected products</button>
            </div>
            <div className={classes.category}>
                <h3>Product Categories</h3>
                {addCat ?
                    <ul>
                        {categoriess}
                    </ul>
                    :
                    <label className={classes.addNewCat}>
                        Category name
                        <input type='text' onChange={(e) => setvalueCat(e.target.value)}/>
                    </label>
                }

                {
                    addCat ? 
                    <button className={classes.adding} onClick={() => handleClick()}>add new category</button>
                    :
                    <button className={classes.adding} onClick={() => addhandleClick()}>Add</button>
                }
                
            </div>
        </div>
    )
}

export default Product;