/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './analytics.module.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = ({ data, onClose }) => {
    const [chartData, setChartData] = useState(null);
    const [isDataValid, setIsDataValid] = useState(true);

    useEffect(() => {
        if (data && data.analytics) {
            const analytics = data.analytics;

            // Aggregate clicks for deviceType, browser, and OS
            const aggregateCounts = (key) => {
                return analytics.reduce((acc, item) => {
                    acc[item[key]] = (acc[item[key]] || 0) + 1;
                    return acc;
                }, {});
            };

            const deviceCounts = aggregateCounts("deviceType");
            const browserCounts = aggregateCounts("browser");
            const osCounts = aggregateCounts("os");

            const labels = [
                ...Object.keys(deviceCounts),
                ...Object.keys(browserCounts),
                ...Object.keys(osCounts),
            ];
            const counts = [
                ...Object.values(deviceCounts),
                ...Object.values(browserCounts),
                ...Object.values(osCounts),
            ];

            setChartData({
                labels,
                datasets: [
                    {
                        label: "Number of Clicks",
                        data: counts,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            });
        } else {
            setIsDataValid(false);
        }
    }, [data]);

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Analytics: Data and Clicks",
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
                    <Bar data={chartData} options={chartOptions} />
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
