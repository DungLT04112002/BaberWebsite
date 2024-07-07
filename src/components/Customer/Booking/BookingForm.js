import { useState, useEffect } from "react";
import axios from "axios";
import styles from './BookingForm.module.css'
import headerImg from './../../../assets/imgheaderform.jpg'
import logoFormBooking from './../../../assets/logoFormBooking.png'
const BookingForm = () => {
    const [listService, setListService] = useState([]);
    const [myService, setMyService] = useState("");
    const [timeAppointment, setTimeAppointment] = useState("");
    const [dateAppointment, setDateAppointment] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [listTime, setlistTime] = useState([
        "10:00", "10:30", "11:00", "11:30", "12:00",
        "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30", "17:00",
        "17:30", "18:00", "18:30", "19:00", "19:30",
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8081/getServices");
            setListService(response.data);
        }
        fetchData();
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        console.log(name, phone, myService, timeAppointment, dateAppointment);
        if (name != "" && phone != "" && myService != "" && timeAppointment != "" && dateAppointment != "") {
            try {
                const response = await axios.post("http://localhost:8081/uploadAppointment", {
                    name: name,
                    phone: phone,
                    service: myService,
                    timeAppointment: timeAppointment,
                    dateAppointment: dateAppointment
                });
                alert("Lịch hẹn của bạn đã đặt thành công")

            } catch (error) {
                console.error("Error submitting the form:", error);
            }
        }else{
            alert("Bạn cần điền đẩy đủ thông tin để hẹn lịch. Cảm ơn bạn rất nhiều đã lựa chọn dịch vụ của chúng tôi")
        }


    }

    const chooseService = (event) => {
        setMyService(event.target.value);
    };
    const chooseDate = (event) => {
        setDateAppointment(event.target.value);
    };
    const chooseName = (event) => {
        setName(event.target.value);
    };
    const choosePhone = (event) => {
        setPhone(event.target.value);
    };

    const displayCost = (cost) => {
        return cost.toLocaleString('vi-VN');
    }
    const chooseTime = (Time) => {
        setTimeAppointment(Time);
        console.log(Time)
    }

    return (
        <div className={styles.formBookingSite}>

            <div className={styles.form}>
                <div className={styles.headerForm}>
                    <img src={headerImg} className={styles.headerImg}></img>
                    <img src={logoFormBooking} className={styles.headerLogo}></img>
                    <div className={styles.textContainer}>
                        <p className={styles.textHeader}>Giờ mở cửa: 10:00 - 19:30</p>
                        <p className={styles.textHeader}>Số điện thoại: 19004407</p>
                    </div>
                </div>
                <div className={styles.bodyForm}>
                    <p className={styles.labelForm}>Quý khách vui lòng cho biết thông tin</p>
                    <input onChange={choosePhone} placeholder="Số điện thoại" className={styles.inputForm}></input>
                    <input onChange={chooseName} placeholder="Họ và tên" className={styles.inputForm}></input>
                    <p className={styles.labelForm}>Dịch vụ</p>
                    <select className={styles.selectForm} onChange={chooseService}  >
                        <option value="" disabled selected hidden className={styles.optionInput} >Chọn dịch vụ</option>
                        {
                            listService.map((service, index) => {
                                return (
                                    <option value={service.name} className={styles.optionInput} >
                                        {service.name}  {displayCost(service.cost)} VNĐ
                                    </option>
                                )
                            })
                        }

                    </select>
                    <p className={styles.labelForm}>Ngày đặt lịch</p>
                    <input className={styles.inputFormDate} type="date" onChange={chooseDate}></input>
                    <p className={styles.labelForm}>Chọn khung giờ dịch vụ</p>
                    <div className={styles.siteTime}>
                        {
                            listTime.map((Time, index) => {
                                return (<div className={styles.Time}>
                                    <button className={styles.timeButton} onClick={() => chooseTime(Time)}>
                                        <p className={styles.timeText}>
                                            {Time}
                                        </p>
                                    </button>

                                </div>)
                            })
                        }

                    </div>
                    <p className={styles.labelForm}>Thời gian bạn chọn: </p>
                    <input className={styles.inputForm} value={timeAppointment} ></input>
                    <button className={styles.subApp} onClick={handleSubmit}>Đặt lịch</button>
                </div>


            </div>

        </div >
    )
}
export default BookingForm;