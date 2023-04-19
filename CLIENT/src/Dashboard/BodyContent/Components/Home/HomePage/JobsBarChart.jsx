import React, { Component, useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import { ApiCallGet } from '../../../../../Modules/CoreModules/ApiCall';
import HomePage from './HomePage';
// import AllEmployees from '../../EmployeeFix/AllEmployees/AllEmployees';
import Popup from '../../../../../Modules/UiModules/Core/Popup';
const JobsBarChart = ({ data,categories }) => {

    console.log("🚀 ~ file: PiChartGazzated.jsx:9 ~ JobsBarChart ~ data:", data, categories)

    
    const [popUp, setPopUp] = useState();
    const [value, setValue] = useState();
    const [temp, setTemp] = useState();
    const [series, setSeries] = useState([])
    useEffect(() => {
        setSeries(data);
    }, [data, categories])
    const [options, setOptions] = useState({
        labels: categories,
        colors: ['#FFEB3B', '#000000', '#f48c06', '#168aad'],
        xaxis: {
            categories: categories
        },
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
                    console.log('index', config.dataPointIndex)

                    setValue(config.dataPointIndex + 9)
                    setTemp(config.w.config.labels[config.dataPointIndex])
                }
            }
        }
    })


    return (
        <>
            <div id="chart">
                {series?.length > 0 ? <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    width="1000"
                /> : null}
            </div>
            <Popup title={temp} openPopup={popUp} setOpenPopup={setPopUp}>
                {/* <AllEmployees user={props.user} idR={value} /> */}
            </Popup>
        </>

    );

}

export default JobsBarChart;
