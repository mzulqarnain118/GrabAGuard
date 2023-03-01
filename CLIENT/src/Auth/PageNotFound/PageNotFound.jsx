import React from 'react'
import styles from './css/PageNotFound.module.css'
import img from './img/png.png'
const PageNotFound = () => {
    return (<>
        <center>
            {/* <div className='card'> */}
            <div className={`container ${styles.card_body}`}>

                <img src={img} className={` ${styles.image}`}>

                </img>

                <h1 className={styles.heading_1}>404</h1>

                <h5 className={styles.heading_5}>SORRY</h5>
                <p className={`mb-4 ${styles.para}`}>The Page you are looking for is not found <br></br>
                    or currently unavailable</p>

            </div>

            {/* 
            </div> */}
        </center>
    </>);
}

export default PageNotFound;