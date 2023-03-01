import React, { Component, useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import { ApiCallGet } from '../../../../../Modules/CoreModules/ApiCall';
import HomePage from './HomePage';
import AllEmployees from '../../EmployeeFix/AllEmployees/AllEmployees';
import Popup from '../../../../../Modules/UiModules/Core/Popup';
const PieChart = (props) => {


    const [popUp, setPopUp] = useState();
    const [value, setValue] = useState();
    const [temp, setTemp] = useState();
    const [options, setOptions] = useState({
        labels: ["Gazzated", "Non Gazzated"],
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
            arr.push(props.data['gazetted_employees']);
            arr.push(props.data['non_gazetted_employees']);
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
                    type="pie"
                    width="390"
                /> : null}
            </div>
            <Popup title={temp} openPopup={popUp} setOpenPopup={setPopUp}>
                <AllEmployees user={props.user} idR={value} />
            </Popup>
        </>

    );

}

export default PieChart;
