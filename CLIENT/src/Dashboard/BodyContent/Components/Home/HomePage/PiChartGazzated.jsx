import React, { Component, useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import { ApiCallGet } from '../../../../../Modules/CoreModules/ApiCall';
import HomePage from './HomePage';
// import AllEmployees from '../../EmployeeFix/AllEmployees/AllEmployees';
import Popup from '../../../../../Modules/UiModules/Core/Popup';
const PieChart = (props) => {


    const [popUp, setPopUp] = useState();
    const [value, setValue] = useState();
    const [temp, setTemp] = useState();
    const [options, setOptions] = useState({
        labels: ["Gazzated", "Non Gazzated"],
        colors: ['#FFEB3B', '#000000', '#f48c06', '#168aad'],
        xaxis: {
            categories: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E']
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

    useEffect(() => {

        const fetchData = async () => {
            // var result = await ApiCallGet('/get_dashboard_data');
            // console.log(result);

            let arr = [];
            arr.push({
                name: 'Jobs',
                data: [10, 20, 30, 40, 50]
            });
            arr.push({
                name: 'Jobs1',
                data: [10, 20, 30, 40, 50] // array of data points
            });
            setSeries(arr);
            console.log('abc',arr)


            // console.log(Data);


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
    console.log(series)

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
