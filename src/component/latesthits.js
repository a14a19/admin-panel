import { useContext } from 'react';
import AdminContext from '../context/adminContext';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

function Latesthits() {

    const admin = useContext(AdminContext)
    const adminData = admin.items.dasbhoardPage.latestHits

    const lineData = {
        labels: adminData.months.map((item) => item),
        datasets: [
            {
                label: "Latest Hits",
                data: adminData.latest.map((item) => item),
                borderColor: 'rgba(75, 191, 191, 1.0)',
                borderWidth: 2,
                tension: 0.3,
                borderJoinStyle: 'round',
                pointRadius: 0,
            },
            {
                label: "Popular Hits",
                data: adminData.popular.map((item) => item),
                borderColor: '#ff6384',
                borderWidth: 2,
                tension: 0.3,
                borderJoinStyle: 'round',
                pointRadius: 0,
            },
            {
                label: "Featured",
                data: adminData.featured.map((item) => item),
                borderColor: 'rgb(153,102,255)',
                borderWidth: 2,
                tension: 0.3,
                borderJoinStyle: 'round',
                pointRadius: 0,
            }
        ]
    }

    return <Line data={lineData} options={{
        color: 'white', scales: {
            y: {
                ticks: {
                    beginAtZero: true,
                    color: 'white'
                }
            },
            x: {
                ticks: {
                    beginAtZero: true,
                    color: 'white'
                }
            },
        },
        responsive: true
    }} />
}

export default Latesthits;