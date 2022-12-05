import classes from './product.module.scss';

import { useContext, useEffect, useState } from 'react';
import AdminContext from '../context/adminContext';
import { Link } from 'react-router-dom';

function Product() {

    const admin = useContext(AdminContext)
    const adminData = admin.items.productsPage
    const [addCat, setAddCat] = useState(true)

    const dlt = (e) => {
    }

    const checkFn = (e) => {
        console.log(e.target.checked);
    }

    const product = adminData.products.map((item, i) => {

        return (
            <tr key={i} className={classes.productList}>
                <td>
                    {/* <label htmlFor={i} className={classes.check}>
                    </label> */}
                        <input type='checkbox' id={i} name={i} className={classes.hideInput} onClick={checkFn} />
                </td>
                <td>{item.name}</td>
                <td>{item.unitSold}</td>
                <td>{item.stock}</td>
                <td>{item.expireDate}</td>
                <td>
                    <button className={classes.deleteBtn} onClick={(e) => dlt(e.target.clicked)}>
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                    </button>
                </td>
            </tr>
        )
    })

    const categories = adminData.categories.map((item, i) => {
        return (
            <li key={i}>
                <span>{item}</span>
                <button className={classes.deleteBtn}>
                    <i className="far fa-trash-alt tm-product-delete-icon"></i>
                </button>
            </li>
        )
    })

    const handleClick = () => {
        setAddCat(current => !current)
    }

    return (
        <div className={classes.product}>
            <div className={classes.products}>
                <div className={classes.tableContainer}>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>PRODUCT NAME</th>
                                <th>UNIT SOLD</th>
                                <th>IN STOCK</th>
                                <th>EXPIRE DATE</th>
                                <th></th>
                            </tr>
                            {product}
                        </tbody>
                    </table>
                </div>
                <Link to='/product/add_product'>
                    <button className={classes.adding} >Add new product</button>
                </Link>
                <button className={classes.adding}>delete selected products</button>
            </div>
            <div className={classes.category}>
                <h3>Product Categories</h3>
                {addCat ? 
                <ul>
                    {categories}
                </ul> 
                : 
                <label className={classes.addNewCat}>
                    Category name 
                    <input type='text'/>
                </label>
                }
                
                <button className={classes.adding} onClick={() => handleClick()}>{addCat ? 'add new category' : 'Add'}</button>
            </div>
        </div>
    )
}

export default Product;