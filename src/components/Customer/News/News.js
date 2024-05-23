import React from "react";
import styles from "./News.module.css"
import imagenew1 from "./../../../assets/imagenew1.jpg"
class News extends React.Component {
    render() {
        return (
            <div className={styles.indexNew}      >
                <div className={styles.containerNews}>
                    <div className={styles.containerTile}>
                        <p >TIN TỨC </p >
                        <hr className={styles.line}></hr>
                    </div>
                    <div className={styles.mainContainerNews}>

                        <div className={styles.elementNew}>
                        </div>
                        <div className={styles.elementNew}>
                        </div>
                        <div className={styles.elementNew}>                 
                        </div>
                        <div className={styles.elementNew}>
                        </div>
                        <div className={styles.elementNew}>
                        </div>
                        <div className={styles.elementNew}>
                        </div>
                        <div className={styles.elementNew}>
                        </div>
                        <div className={styles.elementNew}>
                        </div>

                    </div>
                </div>

            </div>
        )
    }

}

export default News;