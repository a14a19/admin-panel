import classes from './account.module.scss';
import React from 'react';

import { useContext, useEffect, useState, useRef } from 'react';
import AdminContext from '../context/adminContext';

let accObj = {
    email: '',
    name: '',
    password: '',
    phone: '',
    profilePic: '',
    accRePass: ''
}

function Account() {
    const admin = useContext(AdminContext)
    const adminData = admin.items.accountsPage
    const [accData, setAccData] = useState(accObj)
    const [change, setChnge] = useState({ ...adminData.selectData })
    const [selectData, setSelectData] = useState('')
    const [passCheck, setPassCheck] = useState()
    const hiddenFileInput = React.useRef(null)
    const [file, setFile] = useState('')
    const [fileError, setFileError] = useState({
        error: '',
        text: ''
    })

    const accOpt = Object.keys(adminData).map((item, i) => {
        return <option key={i}>{item}</option>
    })
    const update = (k, v) => {
        setAccData({ ...accData, [k]: v })
    }

    const form = (e) => {
        e.preventDefault()
    }

    useEffect(() => {

        if (selectData === 'Select account' || selectData === '') {
            localStorage.setItem('items', JSON.stringify(admin.items))
        } else {
            localStorage.setItem('items', JSON.stringify({ ...admin.items, ['accountsPage']: change }))
        }

    }, [change])

    const updateBtn = (e) => {
        e.preventDefault()
        if (accData.password !== '' && accData.accRePass !== '') {
            if (accData.password === accData.accRePass) {
                console.log(true);
                setPassCheck(true)
                if (selectData !== 'Select account') {
                    setChnge({ ...adminData, [selectData]: accData })
                }
            } else {
                setPassCheck(false)
            }
        }
    }

    const dltimg = () => {
        if (selectData === "Admin") {
            delete accData.profilePic
            setAccData({ ...accData })
        } else if (selectData === "Customer") {
            delete accData.profilePic
            setAccData({ ...accData })
        } else if (selectData === "Editor") {
            delete accData.profilePic
            setAccData({ ...accData })
        } else if (selectData === "Merchant") {
            delete accData.profilePic
            setAccData({ ...accData })
        }
    }

    const fileUpload = (e) => {
        e.preventDefault()
        const fileUploaded = e.target.files[0];
        console.log(fileUploaded);
        if (fileUploaded.type === "image/jpg" || fileUploaded.type === "image/PNG" || fileUploaded.type === "image/jpeg" || fileUploaded.type === "image/bmp" || fileUploaded.type === "image/svg" || fileUploaded.type === "image/webp") {
            setFile(fileUploaded)
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
            setFile('')
            setFileError({
                error: 'File type not accepted, only image format allowed.',
                text: classes.fileerrorRed
            })
            if (fileUploaded.size > 1000000) {
                setFile('')
                setFileError({
                    error: 'File size should be less than 1mb.',
                    text: classes.fileerrorRed
                })
            }
        }
    }

    const addimg = event => {
        hiddenFileInput.current.click()
    }

    const selectChange = (e) => {
        setSelectData(e)
        if ('Admin' === e) {
            setAccData({
                ...accData,
                email: adminData.Admin.email,
                name: adminData.Admin.name,
                password: adminData.Admin.password,
                phone: adminData.Admin.phone,
                profilePic: adminData.Admin.profilePic,
                accRePass: ''
            })
        }
        else if ('Customer' === e) {
            setAccData({
                ...accData,
                email: adminData.Customer.email,
                name: adminData.Customer.name,
                password: adminData.Customer.password,
                phone: adminData.Customer.phone,
                profilePic: adminData.Customer.profilePic,
                accRePass: ''
            })
        }
        else if ('Editor' === e) {
            setAccData({
                ...accData,
                email: adminData.Editor.email,
                name: adminData.Editor.name,
                password: adminData.Editor.password,
                phone: adminData.Editor.phone,
                profilePic: adminData.Editor.profilePic,
                accRePass: ''
            })
        }
        else if ('Merchant' === e) {
            setAccData({
                ...accData,
                email: adminData.Merchant.email,
                name: adminData.Merchant.name,
                password: adminData.Merchant.password,
                phone: adminData.Merchant.phone,
                profilePic: adminData.Merchant.profilePic,
                accRePass: ''
            })
        }
        else {
            setAccData({
                ...accData,
                email: '',
                name: '',
                password: '',
                phone: '',
                profilePic: '',
                accRePass: ''
            })
        }
    }

    return (
        <div className={classes.account}>
            <div className={classes.accountlist}>
                <h3>List of Accounts</h3>
                <label htmlFor='account'>Accounts</label>
                <select onChange={(e) => selectChange(e.target.value)} id='account'>
                    <option>Select account</option>
                    {accOpt}
                </select>
            </div>
            <div className={classes.profile}>
                <div className={classes.avatar}>
                    <h3>
                        Change Avatar
                    </h3>
                    <button className={classes.imgContainer} onClick={() => dltimg()}>
                        <img src={file ? URL.createObjectURL(file) : accData.profilePic} alt='...' />
                        <div>
                            <i className="far fa-trash-alt tm-product-delete-icon"></i>
                        </div>
                    </button>
                    <button onClick={(e) => addimg(e)}>
                        <label htmlFor='fileup'>
                            upload new photo
                        </label>
                        <input type='file' onChange={fileUpload} id='fileup' ref={hiddenFileInput}/>
                    </button>

                    {fileError && <div className={fileError.text}>{fileError.error}</div>}
                </div>
                <div className={classes.accSetting}>
                    <h3>Account Settings</h3>
                    <div className={classes.accSubSetting}>
                        <div>
                            <label htmlFor='name'>Account Name</label>
                            <input id='name' type='text' name='name' value={accData.name} onChange={(e) => update(e.target.name, e.target.value)} />

                            <label htmlFor='password'>Password</label>
                            <input id='password' type='text' value={accData.password} name='password' onChange={(e) => update('password', e.target.value)} className={passCheck ? classes.greenborder : classes.redborder} />

                            <label htmlFor='phone'>Phone</label>
                            <input id='phone' type='number' value={accData.phone} name='phone' onChange={(e) => update('phone', e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor='email'>Account Email</label>
                            <input id='email' type='email' name='email' value={accData.email} onChange={(e) => update('email', e.target.value)} />

                            <label htmlFor='accRePass'>Re-enter Password</label>
                            <input type='password' id='accRePass' name='accRePass' value={accData.accRePass} onChange={(e) => update('accRePass', e.target.value)} className={passCheck ? classes.greenborder : classes.redborder} />

                            <button onClick={(e) => updateBtn(e)} type='submit'>update your profile</button>
                        </div>
                    </div>
                    <button>delete your account</button>
                </div>
            </div>
        </div>
    )
}

export default Account;