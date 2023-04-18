import React, { Component, useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import { ApiCallGet } from '../../../../../Modules/CoreModules/ApiCall';
import HomePage from './HomePage';
// import AllEmployees from '../../EmployeeFix/AllEmployees/AllEmployees';
import Popup from '../../../../../Modules/UiModules/Core/Popup';
const PieChart = ({ data }) => {

    console.log("🚀 ~ file: PiChartGazzated.jsx:9 ~ PieChart ~ data:", data)

    
    const [popUp, setPopUp] = useState();
    const [value, setValue] = useState();
    const [temp, setTemp] = useState();
    const [options, setOptions] = useState({
        labels: ["Gazzated", "Non Gazzated"],
        colors: ['#FFEB3B', '#000000', '#f48c06', '#168aad'],
        xaxis: {
            categories: ['Door Supervisors', 'Key Holding and Alarm Response', 'Dog Handling Service', 'CCTV Monitoring', 'VIP Close Protection']
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


    const [series, setSeries] = useState([])
    const fetchData = async () => {
        let arr = [];
        arr.push({
            name: 'Completed',
            data: [2,0,0,1,0]
        });
        arr.push({
            name: 'Pending',
            data: [1, 0, 2, 0, 0]
        });
        
    }
    useEffect(() => {
        setSeries(data);
    }, [data])

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

export default PieChart;
