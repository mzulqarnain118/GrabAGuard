import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Slider.module.css";
import img from "./bg1.png";
import img2 from "./bg2.png";
import img3 from "./bg3.png";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

// import "swiper/css/bundle";
import SwiperCore, {
    Autoplay,
    Pagination
} from 'swiper';
SwiperCore.use([Autoplay, Pagination]);

const ImgSlider = () => {

    return (
        <>
            <Swiper className={`mySwiper ${styles.swiper1}`} spaceBetween={30} centeredSlides={true} 
            autoplay={{
                "delay": 2500,
                "disableOnInteraction": false

            }}
                pagination={{
                    "clickable": true
                }}>
                <SwiperSlide className={styles.swiper__slide}>
                    <div className={styles.slide__wrapper}>
                        <img style={{ width: "100%", height: "auto" }} src={img} alt="bgimg" />
                        <h2 className= {styles.catchy__slogan} > Discover what’s possible</h2>
                        <p className={styles.catchy__slogan__desc}>A simple system that manages your day to day tasks in the most efficient manner.</p>
                    </div>

                </SwiperSlide>
                <SwiperSlide className={styles.swiper__slide}>
                    <div className={styles.slide__wrapper}>
                        <img style={{ width: "100%", height: "auto" }} src={img2} alt="bgimg" />
                        <h2 className= {styles.catchy__slogan} >Doing things a different way</h2>
                        <p className={styles.catchy__slogan__desc}>Think out of the box, don't follow the norms of writing evrything on paper.</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.swiper__slide}>
                    <div className={styles.slide__wrapper}>
                        <img style={{ width: "100%", height: "auto" }} src={img3} alt="bgimg" />
                        <h2 className= {styles.catchy__slogan} >Get it right the first time</h2>
                        <p className={styles.catchy__slogan__desc}>No more worrying about wrong data entry, just enter the information and leave the rest to us.</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
export default ImgSlider;