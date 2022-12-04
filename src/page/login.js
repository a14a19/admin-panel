import { useEffect, useState } from 'react';
import classes from './login.module.scss';

import { useContext } from 'react';
import AdminContext from '../context/adminContext';
import { Link } from 'react-router-dom';

const userRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,16}$/

const loginData = {
    username: '',
    password: ''
}

function Login() {
    const admin = useContext(AdminContext)
    const [login, setLogin] = useState(loginData)
    const [logbtn, setLogbtn] = useState(true)

    const loginForm = (e) => {
        e.preventDefault()
    }

    const inputField = (k, v) => {
        if (k === 'password' && v.match(passRegex)) {
            setLogin({ ...login, [k]: v })
        }
        if (k === 'username' && v.match(userRegex)) {
            setLogin({ ...login, [k]: v })
        }
    }

    useEffect(() => {
        if (login.username !== '' || login.password !== '') {
            setLogbtn(false)
        } else {
            setLogbtn(true)
        }
    }, [login])

    const loginBtn = (e) => {
        e.preventDefault()
        admin.setLog(true)
    }

    return (
        <div className={classes.login}>
            <div className={classes.loginSub}>
                <h3>Welcome to Dashboard, Login</h3>
                <form onSubmit={loginForm}>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' name='username' onChange={(e) => inputField('username', e.target.value)} />

                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' onChange={(e) => inputField('password', e.target.value)} />

                    {logbtn ? <></> : <ul className={classes.passVal}>
                        Password must:<br/>
                        <li> be between 6 - 16 Characters</li>
                        <li> include the following;</li>
                        <li> an uppercase character</li>
                        <li> a lowercase character</li>
                        <li> a number</li>
                        <li> a special character</li>
                    </ul>}

                    <Link to='/home'>
                        <button onClick={(e) => loginBtn(e)} disabled={logbtn}>
                            Login
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login;