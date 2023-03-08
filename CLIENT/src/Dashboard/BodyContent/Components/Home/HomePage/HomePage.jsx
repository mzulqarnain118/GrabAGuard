import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import {
    ArrowUpward as ArrowUpwardIcon,
    Money as MoneyIcon,
    AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

import PieChartHirerGuard from './PieChartHirerGuard';
import PiChartGazzated from './PiChartGazzated'
import PiChartEmployeeType from './PiChartEmployeeType'
import ReteringEmployee from './ReteringEmployee';
import EmployeeCount from './EmployeeCount';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
// Shared components
import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletContent
} from '../../../../../components';
import { Form } from '../../../../../Modules/UiModules/Control/useForm';
import Loading from '../../../../../Modules/UiModules/Core/Loading/Loading';
import AnalyticalChart from '../../../../../Modules/CoreModules/AnalyticalChart';

// Component styles

const useStyles = makeStyles({
    root: {
        // background: 'linear-gradient(45deg,  rgba(211, 163, 58, 0.849) 30%, rgb(104, 47, 47) 90%)',
        border: 0,
        borderRadius: '10px',
        color: 'white',
        height: "80",
        width: "80"
    },

    text: {
        textAlign: "center",
        justifyContent: "center",
        margin: "0",
        padding: "0",
        fontSize: "14px !important"

    },
    container: {
        // padding: "2rem",
        background: '#E0F3FF',
        padding: '1px'
    },
    card__content: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    card__content1: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    text2: {
        textAlign: "center",
        fontSize: "18px !important"

    },
    root: {},
    refreshButton: {
        margin: 16
    },
    chartWrapper: {
        position: 'relative',
        height: '300px'
    },
    headerBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItem: 'center',
        paddingLeft: '25px',
        paddingRight: '25px'
    },
    header: {
        margin: '10px',
        backgroundColor: '#d9dddd',
        borderRadius: '30px',
        height: '30px',
        width: '375px',
    },
    headerText: {
        backgroundColor: 'black',
        borderRadius: '105px',
        height: '64px',
        width: '190px',
        paddingRight: '30px'
    },
    stats: {
        marginTop: 16,
        display: 'flex',
        justifyContent: 'center'
    },
    device: {
        textAlign: 'center',
        padding: 8
    },
    deviceIcon: {
        color: "#E4E7EB"
    }

});



export default function HomePage(props) {
    const { response, error } = ApiCallGet('/users');
    console.log(`%cIN-COMPONENT--------response=${response},error=${error}`, 'background: blue; color: white; font-size: 20px;margin: 30px;');
    const [open_popup1, set_open_popup1] = React.useState(false);
    const [open_popup2, set_open_popup2] = React.useState(false);
    const [open_popup3, set_open_popup3] = React.useState(false);
    const [open_popup4, set_open_popup4] = React.useState(false);
    const [open_popup5, set_open_popup5] = React.useState(false);
    const [piClick, setPiClick1] = React.useState(undefined);
    const [buttonSelected, setButtonSelected] = React.useState(()=>'Users');
    const buttons = [
        { title: 'Users', slug: 'Users' },
        { title: 'Jobs', slug: 'Jobs' },
        { title: 'Revenue', slug: 'Revenue' }
    ]
    const [loading, setLoading] = useState(false);
    const [Data, setData] = useState();
    const DashBoardData = React.useCallback(() => {
        setLoading(true)
        const hirers = response?.results?.filter((item) => item.role === "hirer")
        const guards = response?.results?.filter((item) => item.role === "guard")
        const obj = {
            hirers: hirers?.length,
            guards: guards?.length,
            jobs: response?.results?.length,
            revenue: response?.results?.length,
            hours: response?.results?.length,
        }
        setData(obj)
        setLoading(false)
    }, [response])

    useEffect(() => {

        // const fetchData = async () => {
        //     setLoading(true)
        //     let result = await ApiCallGet('/get_dashboard_data');
        //     console.log(result, "usjkskjk")
        //     console.log(result.data);
        //     if (result.error) {

        //     }
        //     else {
        //         console.log(result);
        //         setData(result.data);
        //     }
        //     setLoading(false);

        // }
        // fetchData();
        DashBoardData()

    }, [response]);
 



    const classes = useStyles();

    const handleChartClick = () => {
        set_open_popup5(true)
        //  setPiClick(undefined)
    }

console.log('====================================');
console.log(Data, "Data");
console.log('====================================');
    return (

        <>

            {loading ? <div style={{ marginTop: "220px" }}><Loading /></div> :

                <Form>


                    <Grid container spacing={1} className={classes.container}>
                        <Grid item xs={4} md={4} lg={4} onClick={() => { set_open_popup1(true) }} >
                            {/* <Popup title='Total Active Employees' openPopup={open_popup1} setOpenPopup={set_open_popup1}>
                                <AllEmployees user={props.user} idR={1} /> */}
                            {/* <h1>Hellow</h1> */}
                            {/* {DisplayPopup()} */}
                            {/* </Popup> */}
                            <Card>
                                <CardActionArea >
                                    <CardMedia
                                        className={classes.root}

                                    />
                                    <CardContent className={classes.card__content}>
                                        <MoneyIcon />
                                        <Typography gutterBottom variant="body1" component="span" className={classes.text}>
                                            TOTAL REVENUE
                                        </Typography>
                                        <Typography gutterBottom variant="body1" color="text.secondary" className={classes.text2}>
                                            {Data?.revenue}
                                        </Typography>
                                    </CardContent>
                                   
                                </CardActionArea>


                            </Card>
                        </Grid>


                        <Grid item xs={4} md={4} lg={4} onClick={() => { set_open_popup2(true) }}>
                            {/* <Popup title='Teaching Employees' openPopup={open_popup2} setOpenPopup={set_open_popup2}>
                                <AllEmployees user={props.user} idR={2} />
                            </Popup> */}
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.root}

                                    />
                                    <CardContent className={classes.card__content}>

                                        <AccessTimeIcon />
                                        <Typography gutterBottom variant="body1" component="div" body1 className={classes.text}>
                                            TOTAL HOURS WORKED
                                        </Typography>
                                        <Typography gutterBottom variant="body1" color="text.secondary" className={classes.text2}>
                                            {Data?.hours}
                                        </Typography>
                                    </CardContent>
                                   
                                </CardActionArea>

                            </Card>
                        </Grid>

                        <Grid item xs={4} md={4} lg={4} onClick={() => { set_open_popup3(true) }}>
                            {/* <Popup title='Non Teaching Employees' openPopup={open_popup3} setOpenPopup={set_open_popup3}>
                                <AllEmployees user={props.user} idR={3} />
                            </Popup> */}
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.root}
                                    />
                                    <CardContent className={classes.card__content}>
                                        <AccessibilityNewOutlinedIcon />
                                        <Typography gutterBottom variant="body1" component="div" className={classes.text}>
                                            TOTAL GUARDS
                                        </Typography>
                                        <Typography gutterBottom variant="body1" color="text.secondary" className={classes.text2}>
                                            {Data?.guards}
                                        </Typography>
                                    </CardContent>
                                    
                                </CardActionArea>


                            </Card>
                        </Grid>







                    </Grid>

                    {Data && <Grid item xs={12} md={12} lg={12}>

                        <PortletHeader className={classes.header}>
                            {buttons.map((item) => (
                                <div
                                    key={item.slug}
                                    className={`${classes.headerBox} ${buttonSelected === item.slug && classes.headerText
                                        }`}
                                    onClick={async () => {
                                        setButtonSelected(item.slug);
                                    }}>
                                    <PortletLabel
                                        title={item.title}
                                        click={buttonSelected === item.slug}
                                    />
                                </div>
                            ))}
                        </PortletHeader>
                        <Card sx={{ margin: '0.5rem', marginLeft: "1rem" }}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.root}
                                />
                                <CardContent className={classes.card__content}>

                                    <div className="mixed-chart">
                                        {buttonSelected === 'Users' ? (
                                            <>
                                                <div className={classes.chartWrapper} style={{ float: "center" }}>
                                                    <PieChartHirerGuard hirers={Data?.hirers} guards={Data?.guards} />
                                                   
                                                </div>
                                            </>
                                        ) : (
                                            <PiChartGazzated user={props.user} data={Data} setData={setData} />
                                        )}
                                    </div>
                                </CardContent>

                            </CardActionArea>

                        </Card>
                    </Grid>}
              

                    <Grid item xs={12} md={12} lg={12}>
                        <ReteringEmployee data={response?.results} ></ReteringEmployee>
                    </Grid>


                    {/* <Grid item xs={12} md={12} lg={6}>

                            <EmployeeCount data={Data} setData={setData}></EmployeeCount>

                        </Grid> */}
                    {/* </div> */}

                </Form>}
        </>
    );
}