import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';
import styles from './AppAndService.module.css';
import AddService from "../Servicemanager/AddService";
import MenuAdmin from '../MenuAdmin/MenuAdmin'
const AppAndSerManager = () => {
    const [listAppointment, setListAppointment] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListAppointment = async () => {
            try {
                const response = await axios.get("http://localhost:8081/getlistAppointment");
                setListAppointment(response.data);
                setFilteredAppointments(response.data);
            } catch (error) {
                setError("Có lỗi xảy ra khi tải dữ liệu");
            }
        };
        fetchListAppointment();
    }, []);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    };
    const handleDeleteAppointment = async (id) => {
        const confirmed = window.confirm("Bạn có chắc muốn xóa lịch hẹn này này không?");
        if (confirmed) {
            try {
                const response = await axios.delete(`http://localhost:8081/deleteAppointment/${id}`);
                console.log(response.data); // Kiểm tra phản hồi từ API
                // Cập nhật danh sách cuộc hẹn sau khi xóa
                setListAppointment(prevList => prevList.filter(appointment => appointment.id !== id));
                setFilteredAppointments(prevList => prevList.filter(appointment => appointment.id !== id));
            } catch (error) {
                setError("Có lỗi xảy ra khi xóa dữ liệu");
                console.error(error); // In lỗi ra console để kiểm tra
            }
        }

    };
    const handleFilterChange = (e) => {
        const selectedDate = e.target.value;
        setFilterDate(selectedDate);
        if (selectedDate) {
            const formattedSelectedDate = format(new Date(selectedDate), 'yyyy-MM-dd');
            console.log("Selected Date:", formattedSelectedDate);
            const filtered = listAppointment.filter(appointment => {
                const appointmentDate = format(new Date(appointment.date_appointment), 'yyyy-MM-dd');
                console.log("Appointment Date:", appointmentDate);
                return appointmentDate === formattedSelectedDate;
            });
            setFilteredAppointments(filtered);
        } else {
            setFilteredAppointments(listAppointment);
        }
    };

    return (
        <div className={styles.siteAppManager}>
            <MenuAdmin></MenuAdmin>
            <div className={styles.siteTable}>
                <h1>Danh sách lịch hẹn</h1>
                <div className={styles.FillterDate}>
                    <h3>
                        Lọc theo ngày
                    </h3>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={handleFilterChange}
                        className={styles.dateInput}
                    />
                </div>

                {error && <div>{error}</div>}
                <table className={styles.tableList}>
                    <thead>
                        <tr>
                            <th>Họ và tên</th>
                            <th>Số điện thoại</th>
                            <th>Thời gian</th>
                            <th>Ngày</th>
                            <th>Dịch vụ</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.name}</td>
                                <td>{appointment.phone}</td>
                                <td>{formatTime(appointment.time_appointment)}</td>
                                <td>{formatDate(appointment.date_appointment)}</td>
                                <td>{appointment.service}</td>
                                <td><button onClick={() => handleDeleteAppointment(appointment.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h1>Thêm dịch vụ</h1>
                <AddService />
            </div>
        </div>
    );
};

export default AppAndSerManager;
