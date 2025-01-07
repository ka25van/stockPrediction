import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";

// Register the required components
Chart.register(...registerables);

export default function Dashboard() {
    const [stock, setStock] = useState("");
    const [graphs, setGraphs] = useState(null);
    const chartRef = useRef(null);

    const handleCheck = async () => {
        const response = await axios.post("http://localhost:5000/predict", { stock });
        setGraphs(response.data);
    };

    useEffect(() => {
        let delayed;
        if (graphs && chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Current Price", "Predicted Price"], 
                    datasets: [
                        {
                            label: graphs.stock_name,
                            data: [graphs.current_price, graphs.predicted_price], 
                            backgroundColor: "blue",
                            fill: false,
                        },
                    ],
                },
                options: {
                    animation: {
                        onComplete: () => {
                          delayed = true;
                        },
                        delay: (context) => {
                          let delay = 0;
                          if (context.type === 'data' && context.mode === 'default' && !delayed) {
                            delay = context.dataIndex * 300 + context.datasetIndex * 100;
                          }
                          return delay;
                        },
                      },
                    responsive: true,
                    scales: {
                        x: {
                            type: "category",
                            ticks: {
                                color: "black", // X-axis text color
                            },
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: "black", // Y-axis text color
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: "black", // Legend text color
                                position: 'top',
                            },
                        },
                        title: {
                            display: true,
                            text: 'Stock for 5 years from now',
                          }
                    },
                    
                },
            });
        }
    }, [graphs]);

    return (
        <div>
            <h1>Dashboard</h1>
            <input type="text" onChange={(e) => setStock(e.target.value)} placeholder="Enter stock name" />
            <button onClick={handleCheck}>Check</button>
            {graphs && (
                <div>
                    <canvas ref={chartRef}></canvas>
                </div>
            )}
        </div>
    );
}