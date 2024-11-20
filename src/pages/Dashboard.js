import React, { useEffect, useRef } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Table } from "antd";
import { Chart } from "chart.js/auto";

const columns1 = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Product",
        dataIndex: "product",
    },
    {
        title: "Status",
        dataIndex: "staus",
    },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
    data1.push({
        key: i,
        name: `Edward King ${i}`,
        product: 32,
        staus: `London, Park Lane no. ${i}`,
    });
}
// Data for monthly sales
const data = [
    { type: "Jan", sales: 38 },
    { type: "Feb", sales: 52 },
    { type: "Mar", sales: 61 },
    { type: "Apr", sales: 105 },
    { type: "May", sales: 48 },
    { type: "Jun", sales: 38 },
    { type: "Jul", sales: 38 },
    { type: "Aug", sales: 38 },
    { type: "Sep", sales: 38 },
    { type: "Oct", sales: 38 },
    { type: "Nov", sales: 38 },
    { type: "Dec", sales: 38 },
];

const Dashboard = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Get the canvas context for Chart.js
        const ctx = document.getElementById("salesChart").getContext("2d");

        // Chart data and configuration
        const chartData = {
            labels: data.map((item) => item.type),
            datasets: [
                {
                    label: "Monthly Sales",
                    data: data.map((item) => item.sales),
                    backgroundColor: "#ffd333",
                    borderColor: "#ffd333",
                    borderWidth: 1,
                },

            ],
        };

        const chartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Month",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Sales",
                    },
                    beginAtZero: true,
                },
            },
        };

        // Create or update the chart
        if (chartRef.current) chartRef.current.destroy();
        chartRef.current = new Chart(ctx, {
            type: "bar",
            data: chartData,
            options: chartOptions,
        });

        return () => chartRef.current?.destroy();
    }, []);

    return (
        <div>
            <h3 className="mb-4 title">Dashboard</h3>

            {/* KPI Cards */}
            <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p className="desc">Total Revenue</p>
                        <h4 className="mb-0 sub-title">$1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="green">
                            <BsArrowUpRight /> 32%
                        </h6>
                        <p className="mb-0 desc">Compared to Last Year</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p className="desc">Total Expenses</p>
                        <h4 className="mb-0 sub-title">$900</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="red">
                            <BsArrowDownRight /> 12%
                        </h6>
                        <p className="mb-0 desc">Compared to Last Year</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p className="desc">Total Expenses</p>
                        <h4 className="mb-0 sub-title">$900</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="red">
                            <BsArrowDownRight /> 12%
                        </h6>
                        <p className="mb-0 desc">Compared to Last Year</p>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="mb-5 title py-3">Monthly Sales Chart</h3>
                <div>
                    <canvas id="salesChart"></canvas>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="mb-5 title py-3">Monthly Sales Data</h3>
                <div>
                    <Table columns={columns1} dataSource={data1} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;