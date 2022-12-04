import classes from './account.module.scss';

import { useContext, useEffect, useState } from 'react';
import AdminContext from '../context/adminContext';

const accObj = {
    email: '',
    name: '',
    password: '',
    phone: '',
    profilePic: ''
}

function Account() {
    const admin = useContext(AdminContext)
    const adminData = admin.items.accountsPage
    const [accData, setAccData] = useState({})
    const [accountsPage, setAccountsPage] = useState(adminData)
    const [Admin, setAdmin] = useState({})
    const [change, setChnge] = useState(adminData)
    const [selectData, setSelectData] = useState()
    const accOpt = admin.accType.map((item, i) => {
        return <option key={i}>{item}</option>
    })
    console.log(adminData);
    const update = (k, v) => {
        console.log({ [k]: v });
        if ('Admin' === selectData) {
            setAdmin({ ...adminData.Admin, [k]: v })
        }
    }
    console.log(Admin);
    useEffect(() => {
        console.log({ ...admin.items, accountsPage });
        if('Admin' === selectData) {
            setAccountsPage({ ...admin.items.accountsPage, Admin })
            localStorage.setItem('items', JSON.stringify({ ...admin.items, accountsPage }));
        }
    }, [Admin])

    const updateBtn = () => {
        console.log('clicked');
    }

    const selectChange = (e) => {
        setSelectData(e.target.value)
        if ('Admin' === e.target.value) {
            setAccData({
                ...accObj,
                email: adminData.Admin.email,
                name: adminData.Admin.name,
                password: adminData.Admin.password,
                phone: adminData.Admin.phone,
                profilePic: adminData.Admin.profilePic
            })
        }
        else if ('Customer' === e.target.value) {
            setAccData({
                ...accObj,
                email: adminData.Customer.email,
                name: adminData.Customer.name,
                password: adminData.Customer.password,
                phone: adminData.Customer.phone,
                profilePic: adminData.Customer.profilePic
            })
        }
        else if ('Editor' === e.target.value) {
            setAccData({
                ...accObj,
                email: adminData.Editor.email,
                name: adminData.Editor.name,
                password: adminData.Editor.password,
                phone: adminData.Editor.phone,
                profilePic: adminData.Editor.profilePic
            })
        }
        else if ('Merchant' === e.target.value) {
            setAccData({
                ...accObj,
                email: adminData.Merchant.email,
                name: adminData.Merchant.name,
                password: adminData.Merchant.password,
                phone: adminData.Merchant.phone,
                profilePic: adminData.Merchant.profilePic
            })
        }
        else {
            setAccData({
                ...accObj,
                email: '',
                name: '',
                password: '',
                phone: '',
                profilePic: ''
            })
        }
    }

    return (
        <div className={classes.account}>
            <div className={classes.accountlist}>
                <h3>List of Accounts</h3>
                <label htmlFor='account'>Accounts</label>
                <select onChange={selectChange} id='account'>
                    <option>Select account</option>
                    {accOpt}
                </select>
            </div>
            <div className={classes.profile}>
                <div className={classes.avatar}>
                    <h3>
                        Change Avatar
                    </h3>
                    <div className={classes.imgContainer}>
                        <img src={accData.profilePic} alt='...' />
                        <div>
                            <i className="far fa-trash-alt tm-product-delete-icon"></i>
                        </div>
                    </div>
                    <button>upload new photo</button>
                </div>
                <div className={classes.accSetting}>
                    <h3>Account Settings</h3>
                    <div className={classes.accSubSetting}>
                        <div>
                            <label htmlFor='name'>Account Name</label>
                            <input id='name' type='text' placeholder={accData.name} onChange={(e) => update('name', e.target.value)} />

                            <label htmlFor='password'>Password</label>
                            <input id='password' type='text' placeholder={accData.password} onChange={(e) => update('password', e.target.value)} />

                            <label htmlFor='phone'>Phone</label>
                            <input id='phone' type='number' placeholder={accData.phone} onChange={(e) => update('phone', e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor='email'>Account Email</label>
                            <input id='email' type='email' placeholder={accData.email} onChange={(e) => update('email', e.target.value)} />

                            <label htmlFor='accRePass'>Re-enter Password</label>
                            <input type='password' id='accRePass' onChange={(e) => update('accRePass', e.target.value)} />

                            <button onClick={() => updateBtn()}>update your profile</button>
                        </div>
                    </div>
                    <button>delete your account</button>
                </div>
            </div>
        </div>
    )
}

export default Account;