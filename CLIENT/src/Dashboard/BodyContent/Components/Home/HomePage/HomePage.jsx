import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
    ArrowUpward as ArrowUpwardIcon,
    Money as MoneyIcon,
    AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import PieChartHirerGuard from './PieChartHirerGuard';
import PiChartGazzated from './PiChartGazzated'
import ReteringEmployee from './ReteringEmployee';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import Loading from '../../../../../Modules/UiModules/Core/Loading/Loading';

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
    card__content: {
        padding: "20px",
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
        paddingLeft: '35px',
        paddingRight: '35px',

    },
    header: {
        margin: '10px',
        backgroundColor: '#d9dddd',
        borderRadius: '30px',
        height: '64px',
        width: '375px',
    },
    headerText: {
        backgroundColor: 'black',
        borderRadius: '105px',
        height: '64px',
        width: '190px',
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
    },
    titleClick: {
        color: "white",
        fontWeight: 1000
    },
    title: {
        color: "black",
        fontWeight: 500
    },
    root1: {
        alignItems: 'center',
        display: 'flex',
        justifyContent:"space-evenly",
        height: '64px',
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


        DashBoardData()

    }, [response]);
 



    const classes = useStyles();

    const handleChartClick = () => {
        set_open_popup5(true)
        //  setPiClick(undefined)
    }

    return (

        <>
            {loading ? <div style={{ marginTop: "220px" }}><Loading /></div> :
                <>
                    <Grid container spacing={1}>
                        <Grid item xs={4} md={4} lg={4}  >
                            <Card className={classes.card__content}>
                                        <MoneyIcon />
                                        <Typography gutterBottom variant="body1" component="span" className={classes.text}>
                                            TOTAL REVENUE
                                        </Typography>
                                        <Typography gutterBottom variant="body1" color="text.secondary" className={classes.text2}>
                                            {Data?.revenue}
                                        </Typography>
                            </Card>
                        </Grid>


                        <Grid item xs={4} md={4} lg={4} >
                            <Card className={classes.card__content}>
                                        <AccessTimeIcon />
                                        <Typography gutterBottom variant="body1" component="div" body1 className={classes.text}>
                                            TOTAL HOURS WORKED
                                        </Typography>
                                        <Typography gutterBottom variant="body1" color="text.secondary" className={classes.text2}>
                                            {Data?.hours}
                                        </Typography>
                            </Card>
                        </Grid>

                        <Grid item xs={4} md={4} lg={4}
                            // onClick={() => { set_open_popup3(true) }}
                        >
                            {/* <Popup title='Non Teaching Employees' openPopup={open_popup3} setOpenPopup={set_open_popup3}>
                                <AllEmployees user={props.user} idR={3} />
                            </Popup> */}
                            <Card className={classes.card__content}>
                                {/* <CardActionArea> */}
                                    {/* <CardMedia
                                        
                                    /> */}
                                        <AccessibilityNewOutlinedIcon />
                                        <Typography gutterBottom variant="body1" component="div" className={classes.text}>
                                            TOTAL GUARDS
                                        </Typography>
                                        <Typography gutterBottom variant="body1" color="text.secondary" className={classes.text2}>
                                            {Data?.guards}
                                        </Typography>                                    
                                {/* </CardActionArea> */}
                            </Card>
                        </Grid>
                    </Grid>

                    {Data && <Grid item xs={12} md={12} lg={12}>
                        <div className={classes.header}>
                            <div className={classes.root1}>
                            {buttons.map((item) => (
                                <div key={item.slug}
                                    className={`${classes.headerBox} ${buttonSelected === item.slug && classes.headerText
                                        }`}
                                    onClick={async () => {
                                        setButtonSelected(item.slug);
                                    }}>
                                    <div className={buttonSelected === item.slug ? classes.titleClick : classes.title}>{item.title}</div>
                                </div>
                            ))}
                            </div>
                        </div>
                        <Card className={classes.card__content}>
                                        {buttonSelected === 'Users' ? 
                                                    <PieChartHirerGuard hirers={Data?.hirers} guards={Data?.guards} />:
                                            <PiChartGazzated user={props.user} data={Data} setData={setData} />}
                        </Card>
                    </Grid>}
                        <ReteringEmployee data={response?.results} ></ReteringEmployee>
                </>}
        </>
    );
}