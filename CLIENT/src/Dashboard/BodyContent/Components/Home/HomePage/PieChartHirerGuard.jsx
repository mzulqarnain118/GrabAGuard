import React, { Component, useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import Popup from '../../../../../Modules/UiModules/Core/Popup';
const PieChart = ({ hirers, guards }) => {
    const [options, setOptions] = useState({
        labels: ["Client", "Guard"],
        colors: ['#FFEB3B', '#000000', '#f48c06', '#168aad'],
        responsive: [
            {
                breakpoint: 100,
                options: {
                    chart: {
                        width: "100%"
                    },
                    legend: {
                        show: false
                    }
                }
            }
        ],
        chart: {
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    console.log(config.w.config.labels[config.dataPointIndex]);
                    console.log(config.dataPointIndex)
                    setTemp(config.w.config.labels[config.dataPointIndex])
                    setValue(config.dataPointIndex + 12)
                }
            }
        }
    })


    console.log('====================================');
    console.log(hirers, guards, 'hirers,guards');
    console.log('====================================');
    const [popUp, setPopUp] = useState();
    const [series, setSeries] = useState([hirers, guards]);


    const [value, setValue] = useState();
    const [temp, setTemp] = useState();

    // useEffect(() => {
    //     if (value) {
    //         setPopUp(true)
    //     }
    // }, [value]);
    useEffect(() => {
        setSeries([hirers, guards])

    }, [hirers, guards]);
    // useEffect(() => {
    //     if (!popUp) {
    //         setValue(undefined);
    //     }
    // }, [popUp]);




    return (
        <>
            <div id="chart" key={Math.random()}>
                <ReactApexChart
                    options={options}
                    series={series}
                    type="pie"
                    width="450"
                />
            </div>
            <Popup title={temp} openPopup={popUp} setOpenPopup={setPopUp}>
                {/* <AllEmployees user={props.user} idR={value} /> */}
            </Popup>

        </>
    );

}

export default PieChart;
