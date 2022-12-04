import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

function Performance() {

    const performanceData = {
        labels: ['Aqua', 'Blue', 'Green', 'Orange', 'Purple', 'Red', 'Yellow'],
        datasets: [
            {
                label: "# of Hits",
                data: [40, 44, 28, 38, 58, 34, 48],
                backgroundColor: [
                    '#4ed6b8',
                    '#3889fc',
                    '#a8d582',
                    '#d59941',
                    '#9966c8',
                    '#f7604d',
                    '#d7d768'
                ],
                barThickness: 6,
                maxBarThickness: 8,
                borderRadius: 3
            }
        ]
    }

    return <Bar data={performanceData} options={{
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
        indexAxis: 'y',
        responsive: true
    }} />
}

export default Performance;