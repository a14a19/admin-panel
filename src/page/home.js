import classes from './home.module.scss';
import Latesthits from '../component/latesthits';
import Storageinfo from '../component/storageinfo';
import Performance from '../component/performance';

import { useContext } from 'react';
import AdminContext from '../context/adminContext';

function Home() {

    const admin = useContext(AdminContext)

    const notify = admin.items.dasbhoardPage.notifications.map((item, i) => {
        return (
            <div key={i} className={classes.notifyItem}>
                <div className={classes.imgContainer}>
                    <img src={item.pic} alt='...' />
                </div>
                <div className={classes.txt}>
                    <p>{item.message}</p>
                    <span>{item.time}</span>
                </div>
            </div>
        )
    })

    const orders = admin.items.dasbhoardPage.orders.map((item, i) => {
        let dotColor;
        if (item.status === 'Moving') {
            dotColor = '#00ff00'
        } else if (item.status === 'Pending') {
            dotColor = 'orange'
        } else if (item.status === 'Cancelled') {
            dotColor = 'red'
        } else if (item.status === 'Delivered') {
            dotColor = '#0090ff'
        }

        return (
            <tr key={i} className={classes.oList}>
                <td>#{item.orderNo}</td>
                <td>
                    <span className={classes.dot} style={{ backgroundColor: dotColor, boxShadow: `0px 0px 5px ${dotColor}` }}>
                    </span>
                    {item.status}
                </td>
                <td>{item.operators}</td>
                <td>{item.location}</td>
                <td>{item.distance} km</td>
                <td>{item.startDate}</td>
                <td>{item.deliveryDate}</td>
            </tr>
        )
    })

    return (
        <main className={classes.home}>
            <p className={classes.dashTitle}>Welcome back, <span>Admin</span></p>
            <div className={classes.container}>
                <div className={classes.charts}>
                    <h3>Latest Hits</h3>
                    <Latesthits />
                </div>
                <div className={classes.charts}>
                    <h3>Performance</h3>
                    <Performance />
                </div>
                <div className={classes.charts}>
                    <h3>Storage Information</h3>
                    <Storageinfo />
                </div>
                <div className={classes.charts}>
                    <h3>Notification List</h3>
                    <div className={classes.notify}>
                        {notify}
                    </div>
                </div>
            </div>
            <div className={classes.order}>
                <h3>Orders List</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>ORDER NO.</th>
                            <th>STATUS</th>
                            <th>OPERATORS</th>
                            <th>LOCATION</th>
                            <th>DISTANCE</th>
                            <th>START DATE</th>
                            <th>EST DELIVERY DUE</th>
                        </tr>
                        {orders}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default Home;