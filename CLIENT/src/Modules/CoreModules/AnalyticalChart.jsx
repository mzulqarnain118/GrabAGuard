import React from 'react'
import Chart from "react-apexcharts";
import moment from "moment";

function AnalyticalChart({ total, yAxisLabelFormat, xAxisLabelDateFormat, yAxisLabelFloat, width, xAxisTitle, yAxisTitle, chartTitle, alignTitle, chart_data, max, min, tickAmount, chart_type, color_list, chart_category, chart_labels, chart_height, chart_direction, xAxisdoubleLabels, stacked }) {
  console.log(`%cAnalyticalChart=${chart_type},chart_category=${chart_category},chart_data=${chart_data}`, 'background: black; color: white; font-size: 20px;margin: 30px;');

  let series = chart_data
  let options = {

    chart: {
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: []
        },
        export: {
          csv: {
            filename: chartTitle,
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString()
            }
          },
          svg: {
            filename: chartTitle,
          },
          png: {
            filename: chartTitle,
          },
          background: '#fff'

        },
        autoSelected: 'zoom'
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: false,
        zoomedArea: {
          fill: {
            color: '#90CAF9',
            opacity: 0.4
          },
          stroke: {
            color: '#0D47A1',
            opacity: 0.4,
            width: 1
          }
        }
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      stacked: stacked ?? false,
      width: '100%',
      // background: '#fff'   //background of chart
    },

    subtitle: {
      text: chartTitle,
      align: alignTitle,
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: undefined,
        color: 'white'
      },
    }
    ,
    //     title: {
    //         text: chartTitle,
    // align: alignTitle,
    // margin: 10,
    // offsetX: 0,
    // offsetY: 0,
    // floating: false,
    // style: {
    //   fontSize:  '18px',
    //   fontWeight:  'bold',
    //   fontFamily:  undefined,
    //   color:  'white'
    // },
    //    },
    title: {
      text: "undefined",
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      // floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: undefined,
        color: 'black'
      },
    },

    colors: color_list ?? ['#FFEB3B', '#000000', '#f48c06', '#168aad'],
    labels: chart_labels ? chart_labels : {
      style: {
        fontSize: "14px",
      },
    },
    fill: {
      opacity: (chart_type === "radar" || chart_type === "pie" || chart_type === "bar") ? [1, 1] : (chart_type === "radialBar") ? 0.9 : 0.3,
    },
    dataLabels: {
      enabled: (chart_type === "bar" || chart_type === "pie") ? false : false,
    },
    stroke: {
      curve: "smooth",
      width: [2, 2, 2],
      dashArray: [0, 0, 5],
      lineCap: (chart_type === "radialBar") ? "round" : (chart_type === "area") ? "straight" : undefined
    },

    grid: {
      // borderColor: (chart_type === "radialBar") ? undefined : "black",
      // row: {
      //     opacity: 0.5,
      //     type: "solid",
      // },
    },
    markers: {
      strokeWidth: 2,
      size: 7,
      // colors: chart_type === "line" ? color_list : (chart_type === "radialBar") ? undefined : ["rgba(0, 255, 198, 0.17)", "rgba(45, 125, 239, 0.17)"],
      // hover: {
      //     sizeOffset: 1,
      // },
      // radius: chart_type === "radialBar" ? 12 : undefined
    },
    noData: {
      text: "Data Not Found",
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "white",
        fontSize: '18px',
        fontFamily: undefined
      }
    },
    responsive: [{
      // breakpoint: 480,
      options: {
        chart: {
          width: width ?? undefined
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    legend: {
      position: 'bottom',
      horizontalAlign: "center",
      offsetX: null
    },
    plotOptions: {


      bar: {
        dataLabels: {
          position: 'bottom',

          total: {
            enabled: total ?? false,
            offsetX: 10,
            formatter: function (val) {
              return Math.round(val) + " MT"
            },
            style: {
              fontSize: '13px',
              fontWeight: 900,
              color: "white"
            }
          }
        },
        borderRadius: 4,
        horizontal: true,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#333']
        },
        // offsetX: 30
      },

    },
    xaxis: {
      // axisTicks: {
      //     show: true,
      //     borderType: "solid",
      //     color: (chart_type === "radialBar") ? undefined : "#78909C",
      //     height: 3,
      //     offsetX: 0,
      //     offsetY: 0,
      // },
      // tickPlacement: chart_type === "line" ? "between" : undefined,
      labels: {
        style: {
          colors: (chart_type === "radialBar") ? undefined : ["#636E72"],
          fontSize: "10px",
        },
        formatter: (value) => {
          return xAxisLabelDateFormat ? moment(value).format('MM/DD/YYYY hh:mm:ss A') : value;
        },
        rotate: -55,

      },
      categories: chart_category,
      title: {
        text: xAxisTitle,
        offsetX: 0,
        offsetY: xAxisdoubleLabels ? 0 : 128,
        style: {
          color: "white",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          // colors: (chart_type === "radialBar") ? undefined : ["#636E72"],
          fontSize: "10px",
        },
        formatter: (value) => {
          return yAxisLabelFormat ? yAxisLabelFormat + value : yAxisLabelFloat ? value.toFixed(2) : value;
        },
      },

      min: min ? min : undefined,
      max: max ? max : undefined,
      tickAmount: tickAmount ?? 10,
    },
    title: {
      text: yAxisTitle,
      rotate: 360,
      offsetX: -10,
      offsetY: 20,
      rotate: -90,
      style: {
        color: "white",
      },
    },
  }
  return (
    <Chart options={options} series={series} type={chart_type} height={chart_height ?? "350"} width={width ?? "100%"} ></Chart>
  )
}

export default React.memo(AnalyticalChart);