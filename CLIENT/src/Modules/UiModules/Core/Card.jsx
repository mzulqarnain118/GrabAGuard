import React from 'react';
import { Card as MyCard } from "@mui/material";
import styles from './Card.module.css';

const Card = (props) => {
    //console.log("card")
    return (
        <div className={styles.padder} style={{ height: props.height ?? '100%', overflowY: 'auto' }}>
            <MyCard className={styles.card} sx={{ width: props.width ?? '100%', height: '100%', overflowY: 'auto' }}>
                {props.children}
            </MyCard>
        </div>
    );
}

export default Card;


