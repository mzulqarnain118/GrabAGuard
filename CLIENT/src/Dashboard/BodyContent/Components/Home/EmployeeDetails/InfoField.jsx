import React from 'react'
import styles from "./InfoField.module.css";

const InfoField = (props) =>{
    return (
        <div className = {styles.info__wrapper}>
            <div className={`${styles.info__item} ${styles.info__item__label}`}>{props.label}</div>
            <div className={`${styles.info__item} ${styles.info__item__value}`}>{props.value}</div>
        </div>
    )
}

export default InfoField
