import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

function Storageinfo() {

    const pieData = {
        labels: ['Available Storage (9.15GB)', 'System Storage (6.5GB)', 'Used Storage (18.24GB)'],
        datasets: [
            {
                data: [9.15, 6.5, 18.24],
                backgroundColor: [
                    '#a8d582',
                    '#4ed6b8',
                    '#f7604d'
                ],
                borderColor: 'white',
                radius: 83,
            }
        ]
    }

    return (
        <div style={{maxWidth: '100%', height: '320px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Pie data={pieData} options={{ color: 'white', responsive: true }} />
        </div>
    )
}

export default Storageinfo;