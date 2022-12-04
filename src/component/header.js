import classes from './header.module.scss';

import { useContext, useState } from 'react';
import AdminContext from '../context/adminContext';
import { Link, NavLink } from 'react-router-dom';

function Header() {

    const admin = useContext(AdminContext)
    const [dmenu, setDmenu] = useState(false)

    const logout = (e) => {
        e.preventDefault()
        admin.setLog(false)
    }

    const dMenuBtn = () => {
        setDmenu(current => !current)
    }
    return (
        <header className={classes.header}>
            <h2>
                <Link to='/home'>
                    PRODUCT ADMIN
                </Link>
            </h2>
            <ul className={dmenu ? classes.activeUlmenu1 : classes.dnone}>
                <NavLink to='/home' className={({ isActive }) => isActive && admin.log ? classes.active : classes.inActive}>
                    <li>
                        <i className="fas fa-tachometer-alt"></i>
                        Dashboard
                    </li>
                </NavLink>
                <NavLink to='/product' className={({ isActive }) => isActive && admin.log ? classes.active : classes.inActive}>
                    <li>
                        <i className="fas fa-shopping-cart"></i>
                        Products
                    </li>
                </NavLink>
                <NavLink to='/account' className={({ isActive }) => isActive && admin.log ? classes.active : classes.inActive}>
                    <li>
                        <i className="far fa-user"></i>
                        Accounts
                    </li>
                </NavLink>
            </ul>
            {admin.log &&
                <div className={dmenu ? classes.activeUlmenu2 : classes.dnone}>
                    <Link to='/login'>
                        <button onClick={(e) => logout(e)}>
                            Admin, <span>Logout</span>
                        </button>
                    </Link>
                </div>
            }
            <button className={classes.dropMenu} onClick={() => dMenuBtn()}>
                <i className="fas fa-bars tm-nav-icon"></i>
            </button>
        </header>
    )
}

export default Header;