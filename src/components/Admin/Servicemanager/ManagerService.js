import { useState, useEffect } from "react";
import axios from "axios";
import styles from './BookingForm.module.css'

const BookingForm = () => {
    const [listService, setListService] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8081/getServices");
            setListService(response.data);
        }
        fetchData();


    }, [listService])
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
                    <input placeholder="Số điện thoại" className={styles.inputForm}></input>
                    <input placeholder="Họ và tên" className={styles.inputForm}></input>
                    <p className={styles.labelForm}>Dịch vụ</p>
                    <select className={styles.selectForm}  >
                        {
                            listService.map((service,index)=>{
                                return(
                                    <option value={service.name} className={styles.optionInput}>{service.name}  </option>

                                )
                            })
                        }
                        {/* <option value="" disabled selected hidden className={styles.optionInput} >Chọn dịch vụ</option>
                        <option value="Cắt tóc + Gội" className={styles.optionInput}>Cắt tóc + Gội  </option>
                        <option value="Cạo" className={styles.optionInput}>Cạo</option>
                        <option value="Combo" className={styles.optionInput}>Combo</option>
                        <option value="Gội tạo kiểu" className={styles.optionInput}>Gội tạo kiểu</option> */}
                    </select>
                </div>
            </div>

        </div>
    )
}
export default BookingForm;