import classes from './product.module.scss';

import { useContext, useEffect, useState } from 'react';
import AdminContext from '../context/adminContext';
import { Link } from 'react-router-dom';

function Product() {

    const admin = useContext(AdminContext)
    const adminData = admin.items.productsPage
    const [addCat, setAddCat] = useState(true)
    const [valueCat, setvalueCat] = useState('')
    const [dltValue, setDltValue] = useState()
    const [dltCValue, setDltCValue] = useState()
    const [checkbtn, setCheckbtn] = useState([])
    const [selectall, setSelectall] = useState([])

    const catVal = (e) => {
        setvalueCat(e)
    }

    useEffect(() => {
        if(valueCat){
            adminData.categories.push(valueCat)
            setvalueCat('')
        }
        if (dltValue) {
            adminData.products.splice(dltValue, 1)
        }
        if(dltCValue){
            adminData.categories.splice(dltValue, 1)
        }
        if (selectall.length > 0) {
            selectall.map((x) => {
                adminData.products.map((y) => {
                    if (x.name === y.name && x.category === y.category) {
                        let indx = adminData.products.indexOf(y)
                        console.log(x, y, indx);
                        adminData.products.splice(indx, 1)
                    }
                })
            })
        }
        localStorage.setItem('items', JSON.stringify(admin.items))
    })

    const alldlt = (e) => {
        setSelectall(checkbtn)
    }

    const product = adminData.products.map((item, i) => {
        const dlt = () => {
            let index = adminData.products.indexOf(item);
            setDltValue(index)
        }

        const checkFn = (e) => {
            if (e.target.checked) {
                setCheckbtn([...checkbtn, (item)])
            }
            if (!e.target.checked) {
                checkbtn.map((items) => {
                    if (items.category === item.category && items.name === item.name && !e.target.checked) {
                        let index = checkbtn.indexOf(items)
                        checkbtn.splice(index, 1)
                        setCheckbtn([...checkbtn])
                    }
                })
            }
        }

        return (
            <tr key={i} className={classes.productList}>
                <td>
                    <input type='checkbox' id={i} name={i} className={classes.hideInput} onClick={checkFn} />
                </td>
                <td>{item.name}</td>
                <td>{item.unitSold}</td>
                <td>{item.stock}</td>
                <td>{item.expireDate}</td>
                <td>
                    <button className={classes.deleteBtn} onClick={() => dlt()} key={i}>
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                    </button>
                </td>
            </tr>
        )
    })

    const categories = adminData.categories.map((item, i) => {
        const dltC = () => {
            let index = adminData.categories.indexOf(item);
            setDltCValue(index)
        }

        return (
            <li key={i}>
                <span>{item}</span>
                <button className={classes.deleteBtn} onClick={() => dltC()}>
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
                <button className={classes.adding} onClick={(e) => alldlt(e)}>delete selected products</button>
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
                        <input type='text' onChange={(e) => catVal(e.target.value)}/>
                    </label>
                }

                <button className={classes.adding} onClick={() => handleClick()}>{addCat ? 'add new category' : 'Add'}</button>
            </div>
        </div>
    )
}

export default Product;