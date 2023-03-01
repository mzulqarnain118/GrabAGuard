import React, { Component, useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import { ApiCallGet } from '../../../../../Modules/CoreModules/ApiCall';
import HomePage from './HomePage';
import Popup from '../../../../../Modules/UiModules/Core/Popup';
import AllEmployees from '../../EmployeeFix/AllEmployees/AllEmployees';
const PieChart = (props) => {
    const [options, setOptions] = useState({
        labels: ["Female", "Male"],
        colors: ['#1d3557','#9C3940', '#f48c06', '#168aad' ],
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



    const [popUp, setPopUp] = useState();
    const [value, setValue] = useState();
    const [temp, setTemp] = useState();
    const [series, setSeries] = useState([])


    useEffect(() => {

        const fetchData = async () => {

            let arr = [];
            arr.push(props.data['female_employees']);
            arr.push(props.data['male_employees']);
            setSeries(arr);



        }
        fetchData();


    }, []);
    useEffect(() => {
        if (value) {
            setPopUp(true)
        }
    }, [value]);
    useEffect(() => {
        if (!popUp) {
            setValue(undefined);
        }
    }, [popUp]);




    return (
        <>
            <div id="chart">
                {series?.length > 0 ? <ReactApexChart
                    options={options}
                    series={series}
                    type="pie"
                    width="350"
                /> : null}
            </div>
            <Popup title={temp} openPopup={popUp} setOpenPopup={setPopUp}>
                <AllEmployees user={props.user} idR={value} />
            </Popup>

        </>
    );

}

export default PieChart;
