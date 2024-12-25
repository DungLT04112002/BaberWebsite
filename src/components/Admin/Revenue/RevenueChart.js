import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const RevenueChart = () => {
    const [listRevenue, setListRevenue] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/totalRevenue');
                setListRevenue(response.data);
                console.log("Data from API: ", response.data); // Kiểm tra dữ liệu trả về
            } catch (error) {
                console.error("Error fetching data:", error); // Bắt lỗi nếu có
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <h2>Doanh thu theo tháng</h2>
            <LineChart width={1200} height={800} data={listRevenue}>
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>
        </div>
    );
}

export default RevenueChart;
