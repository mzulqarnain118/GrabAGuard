import { set } from 'date-fns';
import React, { Component, useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import { ApiCallGet } from '../../../../../Modules/CoreModules/ApiCall';
import HomePage from './HomePage';
import Popup from '../../../../../Modules/UiModules/Core/Popup';

const PieChart = (props) => {
    console.log(props.data, "props")
    const [popUp, setPopUp] = useState();
    const [value, setValue] = useState();
    const [temp, setTemp] = useState();
    const [options, setOptions] = useState({
        labels: ["Permanent", "Transfred", "IPFP", "Temporary"],
        colors: ['#1d3557', '#f48c06', '#168aad', '#9C3940'],
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
                    setValue(config.dataPointIndex + 5)
                }
            },
        }
    })


    const [series, setSeries] = useState([])
    useEffect(() => {

        const fetchData = async () => {
            // var result = await ApiCallGet('/get_dashboard_data');
            // console.log(result);

            let arr = [];
            console.log(props.data, "props")
            arr.push(props.data['gcu_permanent_emp']);
            arr.push(props.data['gov_trasferred_emp']);
            arr.push(props.data['ipfp_emp']);
            arr.push(props.data['temporary_emp']);


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
                    width="380"
                /> : null}
            </div>
            <Popup title={temp} openPopup={popUp} setOpenPopup={setPopUp}>
                {/* <AllEmployees user={props.user} idR={value} /> */}
            </Popup>
        </>
    );

}

export default PieChart;
