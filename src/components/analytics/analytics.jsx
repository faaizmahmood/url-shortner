/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';  // Importing Line chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';  // Import PointElement for Line chart
import styles from './analytics.module.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,  // Register PointElement
    Title,
    Tooltip,
    Legend
);

const Analytics = ({ data, onClose }) => {
    const [chartData, setChartData] = useState(null);
    const [isDataValid, setIsDataValid] = useState(true);

    useEffect(() => {
        if (data && data.analytics) {
            const analytics = data.analytics;

            // Function to convert Unix timestamp to 'MMM-DD' format (e.g., Jan-15)
            const convertTimestampToDate = (timestamp) => {
                const date = new Date(timestamp);
                const options = { month: 'short', day: 'numeric' }; // Month as abbreviated (e.g., Jan, Feb) and day
                return date.toLocaleDateString('en-US', options); // Returns date in 'MMM-DD' format
            };

            // Aggregate clicks by date (converted from timestamp)
            const aggregateCountsByDate = () => {
                return analytics.reduce((acc, item) => {
                    const date = convertTimestampToDate(item.timestamp); // Assuming 'timestamp' contains the Unix timestamp
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});
            };

            const dateCounts = aggregateCountsByDate();

            // Extract the dates and their respective counts
            const labels = Object.keys(dateCounts);
            const counts = Object.values(dateCounts).map(count => count / 2);

            setChartData({
                labels,
                datasets: [
                    {
                        label: "Number of Clicks",
                        data: counts,
                        backgroundColor: "rgba(75, 192, 192, 0.6)", // This is for line's fill color
                        borderColor: "rgba(75, 192, 192, 1)", // Line color
                        borderWidth: 2,
                        tension: 0.4, // Smooth the line (optional)
                        fill: true,  // Fill the area under the line (optional)
                    },
                ],
            });
        } else {
            setIsDataValid(false);
        }

        // Cleanup function to destroy the chart before unmounting
        return () => {
            if (window.myChart) {
                window.myChart.destroy();
            }
        };
    }, [data]);

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Clicks per Date",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <section className={`${styles.analytics} text-center`}>
            <h2>Analytics</h2>

            {isDataValid && chartData ? (
                <div className={`${styles.chart}`}>
                    <Line data={chartData} options={chartOptions} />  {/* Switch Bar to Line */}
                </div>
            ) : (
                <p>Data is insufficient or unavailable. Please try again later.</p>
            )}

            <div className={`${styles.btn_group}`}>
                <button onClick={onClose}>Close</button>
            </div>
        </section>
    );
};

export default Analytics;
