// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from 'recharts';

// const GraphAnalytics = ({ row, setShowTable }) => {
//   const chartData = row?.table?.map((item, index) => ({
//     name: `Patient ${index + 1}`,
//     arrivalTime: item.arrivalTime,
//     serviceTime: item.serviceTime,
//   }));

//   const utilizationData = row?.serverUtilization?.map((value, index) => ({
//     name: `Server ${index + 1}`,
//     value: parseFloat(value).toFixed(2),
//   }));

//   return (
//     <div className="p-8 bg-gray-100 shadow-md rounded">
//       <h2 className="text-xl font-bold mb-4">Graphical Analytics</h2>

//       {/* Bar Chart */}
//       {chartData && chartData.length > 0 ? (
//         <BarChart width={600} height={300} data={chartData}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="arrivalTime" fill="#8884d8" />
//           <Bar dataKey="serviceTime" fill="#82ca9d" />
//         </BarChart>
//       ) : (
//         <p>No chart data available.</p>
//       )}

//       {/* Line Chart */}
//       {utilizationData && utilizationData.length > 0 ? (
//         <LineChart width={600} height={300} data={utilizationData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="value" stroke="#1565c0" />
//         </LineChart>
//       ) : (
//         <p>No server utilization data available.</p>
//       )}

//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//         onClick={() => setShowTable(true)}
//       >
//         Back to Table
//       </button>
//     </div>
//   );
// };

// export default GraphAnalytics;
// import React from 'react';
// import { Line, Bar } from 'react-chartjs-2'; // Import Bar chart as well
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Register chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const GraphAnalytics = ({ row }) => {
//     // Example data setup for Line and Bar charts
//     const chartData = {
//         labels: row?.table?.map((_, idx) => `Patient ${idx + 1}`), // x-axis labels: Patient IDs
//         datasets: [
//             {
//                 label: 'Turnaround Time (Line)',
//                 data: row?.table?.map(item => item.turnAroundTime), // y-axis data: Turnaround Time
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 fill: true,
//                 tension: 0.4,  // Smooth the line chart
//             },
//             {
//                 label: 'Wait Time (Bar)',
//                 data: row?.table?.map(item => item.waitingTime), // y-axis data: Wait Time
//                 backgroundColor: 'rgba(153, 102, 255, 0.6)', // Bar color
//                 borderColor: 'rgba(153, 102, 255, 1)', // Bar border color
//                 borderWidth: 1,
//             }
//         ]
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             title: {
//                 display: true,
//                 text: 'Patient Data Analytics'
//             },
//             tooltip: {
//                 mode: 'index',
//                 intersect: false,
//             }
//         },
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Patient'
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Time (in minutes)'
//                 }
//             }
//         }
//     };

//     return (
//         <div style={{ width: '80%', margin: '0 auto', paddingTop: '20px' }}>
//             {row?.table?.length > 0 ? (
//                 <div>
//                     {/* Line chart */}
//                     <Line data={chartData} options={options} style={{ marginBottom: '2rem' }} />

//                     {/* Bar chart */}
//                     <Bar data={chartData} options={options} />
//                 </div>
//             ) : (
//                 <p>No data available for chart</p>
//             )}
//         </div>
//     );
// }

// export default GraphAnalytics;
// import React, { useState } from 'react';
// import { Line, Bar } from 'react-chartjs-2'; // Import Bar chart as well
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Register chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const GraphAnalytics = ({ row }) => {
//     const [showCharts, setShowCharts] = useState(false); // State to control chart display

//     // Example data setup for Line and Bar charts
//     const chartData = {
//         labels: row?.table?.map((_, idx) => `Patient ${idx + 1}`), // x-axis labels: Patient IDs
//         datasets: [
//             {
//                 label: 'Turnaround Time (Line)',
//                 data: row?.table?.map(item => item.turnAroundTime), // y-axis data: Turnaround Time
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 fill: true,
//                 tension: 0.4,  // Smooth the line chart
//             },
//             {
//                 label: 'Wait Time (Bar)',
//                 data: row?.table?.map(item => item.waitingTime), // y-axis data: Wait Time
//                 backgroundColor: 'rgba(153, 102, 255, 0.6)', // Bar color
//                 borderColor: 'rgba(153, 102, 255, 1)', // Bar border color
//                 borderWidth: 1,
//             }
//         ]
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             title: {
//                 display: true,
//                 text: 'Patient Data Analytics'
//             },
//             tooltip: {
//                 mode: 'index',
//                 intersect: false,
//             }
//         },
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Patient'
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Time (in minutes)'
//                 }
//             }
//         }
//     };

//     const handleShowCharts = () => {
//         setShowCharts(true); // Show the charts when the button is clicked
//     };

//     return (
//         <div style={{ width: '80%', margin: '0 auto', paddingTop: '20px' }}>
//             {/* Button to show charts */}
//             <div className="flex items-center justify-center">
//                 <button
//                     onClick={handleShowCharts}
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 >
//                     Show Charts
//                 </button>
//             </div>

//             {/* Display the charts after button click */}
//             {showCharts ? (
//                 <div>
//                     {/* Line chart */}
//                     <Line data={chartData} options={options} style={{ marginBottom: '2rem' }} />

//                     {/* Bar chart */}
//                     <Bar data={chartData} options={options} />
//                 </div>
//             ) : (
//                 <p>Click the button to display the charts</p>
//             )}
//         </div>
//     );
// }

// export default GraphAnalytics;

import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2'; // Import both Line and Bar chart
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphAnalytics = ({ row }) => {
    const [showCharts, setShowCharts] = useState(false); // State to control chart display

    // Example data setup for individual Line and Bar charts
    const chartDataTurnaround = {
        labels: row?.table?.map((_, idx) => `Patient ${idx + 1}`), // x-axis labels: Patient IDs
        datasets: [
            {
                label: 'Turnaround Time',
                data: row?.table?.map(item => item.turnAroundTime), // y-axis data: Turnaround Time
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,  // Smooth the line chart
            }
        ]
    };

    const chartDataWaiting = {
        labels: row?.table?.map((_, idx) => `Patient ${idx + 1}`),
        datasets: [
            {
                label: 'Waiting Time',
                data: row?.table?.map(item => item.waitingTime), // y-axis data: Waiting Time
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
                tension: 0.4,  // Smooth the line chart
            }
        ]
    };

    const chartDataResponse = {
        labels: row?.table?.map((_, idx) => `Patient ${idx + 1}`),
        datasets: [
            {
                label: 'Response Time',
                data: row?.table?.map(item => item.responseTime), // y-axis data: Response Time
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                fill: true,
                tension: 0.4,  // Smooth the line chart
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Patient Data Analytics'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Patient'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Time (in minutes)'
                }
            }
        }
    };

    const handleShowCharts = () => {
        setShowCharts(true); // Show the charts when the button is clicked
    };

    return (
        <div style={{ width: '80%', margin: '0 auto', paddingTop: '20px' }}>
            {/* Button to show charts */}
            <div className="flex items-center justify-center">
                <button
                    onClick={handleShowCharts}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Show Charts
                </button>
            </div>

            {/* Display the charts after button click */}
            {showCharts ? (
                <div>
                    {/* Turnaround Time - Line Chart */}
                    <h3>Turnaround Time</h3>
                    <Line data={chartDataTurnaround} options={options} style={{ marginBottom: '2rem' }} />

                    {/* Waiting Time - Line Chart */}
                    <h3>Waiting Time</h3>
                    <Line data={chartDataWaiting} options={options} style={{ marginBottom: '2rem' }} />

                    {/* Response Time - Line Chart */}
                    <h3>Response Time</h3>
                    <Line data={chartDataResponse} options={options} style={{ marginBottom: '2rem' }} />

                    {/* Alternatively, you can use Bar charts for a different view */}
                    {/* Turnaround Time - Bar Chart */}
                    <h3>Turnaround Time (Bar Chart)</h3>
                    <Bar data={chartDataTurnaround} options={options} style={{ marginBottom: '2rem' }} />

                    {/* Waiting Time - Bar Chart */}
                    <h3>Waiting Time (Bar Chart)</h3>
                    <Bar data={chartDataWaiting} options={options} style={{ marginBottom: '2rem' }} />

                    {/* Response Time - Bar Chart */}
                    <h3>Response Time (Bar Chart)</h3>
                    <Bar data={chartDataResponse} options={options} />
                </div>
            ) : (
                <p>Click the button to display the charts</p>
            )}
        </div>
    );
}

export default GraphAnalytics;
