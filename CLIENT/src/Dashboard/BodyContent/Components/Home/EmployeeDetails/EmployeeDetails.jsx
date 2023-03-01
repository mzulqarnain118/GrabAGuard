import React, { useEffect, useState } from 'react'
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import avatar from '../EmployeeDetails/avatar6.png';
// import TextField from '@mui/material/TextField';
import styles from './Employee.module.css';
import InfoField from './InfoField';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import AccountMenu from '../../../../Header/AccountMenu';




const EmployeeDetails = (props) => {
    //const [data, setdata] = useState([])
    const [totalLeaves, setLeaves] = useState(0);
    const [record, setRecord] = useState([]);
    const [leaveStatus, setLeaveStatus] = useState('Present');
    const user = props.userlog;

    const CurdateFormated = currentDate => currentDate.getMonth() + 1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();


    useEffect(() => {
        const fetchEmpData = async () => {
            let result = await ApiCallPost('/get_emp_personal_information', { emp_id: user?.emp_id });
            let result1 = await ApiCallPost('/get_emp_leave_status', { emp_id: user?.emp_id, year: null });
            console.log(result1)
            if (result.error) {
                console.log(result.error);
            }

            else if (result1.error) {
                console.log(result1.error);

            }
            else {
                setRecord(() => [...result.data])
                //setdata(() => [...result1.data])
                let total = 0;
                result1.data[0].map((leave) => {
                    total += parseInt(leave.total_leaves);
                });
                setLeaves(total);
                setLeaveStatus((result1.data[1][0].on_leave) ? 'On Leave' : 'Present');
            }
        }
        fetchEmpData();
    }, [user?.emp_id]);
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0} className={styles.container}>
                    <Grid item lg={12} className={styles.Grid}>

                        <Card className={styles.main__card}>



                            <Avatar src={avatar} className={styles.avatarpic} />



                            <CardContent className={styles.card__content}>

                                <Stack
                                    direction="row"
                                    divider={<Divider sx={{ borderColor: 'white' }} orientation="vertical" flexItem />}
                                >
                                    <Typography className={styles.topGridFont} gutterBottom variant="subtitle1" >
                                        {record[0]?.email_address ?? '(Email)'}
                                    </Typography>
                                    <Typography className={styles.topGridFont} gutterBottom variant="subtitle1" >
                                        {record[0]?.emp_name ?? '-'}
                                    </Typography>
                                    <Typography className={styles.topGridFont} gutterBottom variant="subtitle1" >
                                        {record[0]?.phone_1 ?? '-'}
                                    </Typography>
                                    <Typography className={styles.topGridFont} gutterBottom variant="subtitle1" >
                                        {record[0]?.desig_name ?? '-'}
                                    </Typography>
                                    <Typography className={styles.topGridFont} gutterBottom variant="subtitle1" >
                                        {record[0]?.dept_name ?? '-'}
                                    </Typography>
                                </Stack>



                            </CardContent>

                        </Card>

                        <Grid item xs={12} lg={12}>
                            <Card className={styles.second__card} >

                                <CardContent className={styles.header__card}>
                                    <Link className={styles.bottomGridFont} href="#" sx={{
                                        typography: 'body1', '& > :not(style) + :not(style)':
                                            { ml: 2, },
                                    }} >
                                        {/* Edit */}
                                    </Link>


                                </CardContent>

                            </Card>
                        </Grid>

                    </Grid>

                </Grid>
            </Box >



            <Box sx={{ marginTop: '2rem', marginBottom: '2rem', flexGrow: 1 }}>
                <div className={styles.main__box}>
                    {/* Start of Left Column */}

                    <Grid container className={` ${styles.container__padder} ${styles.column}`}>
                        <Grid item className={styles.Grid}>


                            <Card className={styles.InfoCard} >

                                <CardContent sx={{ float: 'left', width: '100%', padding: '0' }}>
                                    <div className={styles.info_heading_wrapper}>
                                        <span className={styles.info_heading_before} />
                                        <Typography className={styles.InfoTypography} gutterBottom variant="body2" >
                                            Personal Information
                                        </Typography>

                                    </div>
                                    <InfoField label="Name" value={record[0]?.emp_name ?? '-'}></InfoField>
                                    <InfoField label="Father Name" value={record[0]?.father_name ?? '-'}></InfoField>
                                    <InfoField label="Spouse's Name" value={record[0]?.spouse_name ?? '-'}></InfoField>
                                    <InfoField label="Domicile" value={record[0]?.dom_desc ?? '-'}></InfoField>
                                    <InfoField label="Date Of birth" value={record[0]?.date_of_birth ? CurdateFormated(new Date(record[0].date_of_birth)) : '-'}
                                    ></InfoField>
                                    <InfoField label="CNIC" value={record[0]?.nic ?? '-'}></InfoField>
                                    <InfoField label="Gender" value={record[0]?.gender === 'M' ? 'Male' : "Female" ?? '-'}></InfoField>
                                    <InfoField label="Religion" value={record[0]?.religion_name ?? '-'}></InfoField>


                                </CardContent>
                                {/* value={record[0]?.gender ?? '-'} */}
                            </Card>




                            <Card className={styles.InfoCard}>

                                <CardContent sx={{ float: 'left', width: '100%', padding: '0' }}>

                                    <div className={styles.info_heading_wrapper}>
                                        <span className={styles.info_heading_before} />
                                        <Typography className={styles.InfoTypography} gutterBottom variant="body2" >
                                            Leave balance
                                        </Typography>
                                    </div>


                                    <InfoField label="Total Leaves" value={totalLeaves} />
                                    <InfoField label="Current Status" value={leaveStatus} />



                                </CardContent>

                            </Card>







                        </Grid>

                    </Grid>

                    {/* Start of Right Column */}
                    <Grid container className={` ${styles.container__padder} ${styles.column}`}>


                        <Card className={styles.InfoCard}>

                            <CardContent sx={{ width: '100%', padding: '0' }}>

                                <div className={styles.info_heading_wrapper}>
                                    <span className={styles.info_heading_before} />
                                    <Typography className={styles.InfoTypography} gutterBottom variant="body2" >
                                        Work Information
                                    </Typography>
                                </div>


                                <InfoField label="Employee ID" value={record[0]?.emp_id ?? '-'} />
                                <InfoField label="Designation" value={record[0]?.desig_name ?? '-'} />
                                <InfoField label="Scale" value={record[0]?.emp_scale ?? '-'} />
                                <InfoField label="Employee Type" value={record[0]?.nature_desc ?? '-'} />


                            </CardContent>

                        </Card>







                        <Card className={styles.InfoCard}>

                            <CardContent sx={{ float: 'left', width: '100%', padding: '0' }}>

                                <div className={styles.info_heading_wrapper}>
                                    <span className={styles.info_heading_before} />

                                    <Typography className={styles.InfoTypography} gutterBottom variant="body2" >
                                        Contact Information
                                    </Typography>
                                </div>
                                <InfoField label="Contact No" value={record[0]?.phone_1 ?? '-'} />
                                <InfoField label="Email" value={record[0]?.email_address ?? '-'} />
                                <InfoField label="Present Address" value={record[0]?.present_address ?? '-'} />
                                <InfoField label="Permanent Adress" value={record[0]?.permanent_addreess ?? '-'} />

                            </CardContent>

                        </Card>

                    </Grid>
                </div>
            </Box>


        </>
    );


};



export default EmployeeDetails;