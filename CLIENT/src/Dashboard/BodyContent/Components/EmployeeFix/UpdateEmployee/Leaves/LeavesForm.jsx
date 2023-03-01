import React, { useEffect, useState } from 'react'
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { Button, TextField, Stack } from "@mui/material";
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import { ApiCallGet, ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import SqlDateFormat from '../../../../../../Modules/UiModules/Core/SqlDateFormat';
import LeaveType from '../../../Admin/SetupForms/MasterForms/LeaveType';
import AddNewGeneral from '../../../../../../Modules/UiModules/Core/AddNewGeneral';
import PayType from '../../../Admin/SetupForms/MasterForms/PayType';
import CompareDates from '../../../../../../Modules/UiModules/Core/CompareDates';
import OrderType from '../../../Admin/SetupForms/MasterForms/OrderType';

const LeavesForm = (props) => {
    console.log(props.data);

    const initialFValues = {
        emp_leave_id: props.data?.emp_leave_id ?? null,
        desig_serial_no: props.data?.desig_serial_no ?? null,
        pay_id: props.data?.pay_id ?? '',
        leave_id: props.data?.leave_type_id ?? '',
        leave_remarks: props.data?.leave_remarks ?? '',
        leave_order_file: props.data?.leave_order_file ?? 0,
        leave_file: props.data?.order_file ?? '',
        leave_startdate: props.data?.leave_startdate ?? null,
        leave_enddate: props.data?.leave_enddate ?? null
    }

    const [leavetypes, setleavetypes] = useState([]);
    const [paytypes, setpaytypes] = useState([]);
    const [updated, setUpdated] = useState(0);


    const { values, setValues, handleChange } = useForm(initialFValues);
    const [fileSelect, setfileSelect] = React.useState('');
    const [record, setRecord] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {


            var result1 = await ApiCallGet('/Get_Pay_Type');
            if (result1.error) {
                Toast(result1.text, "error");
            } else {
                let newData1 = result1.data.map((item, index) => {
                    return { id: item.pay_id, title: item.pay_desc }
                });
                setpaytypes(newData1);
            }

            var result2 = await ApiCallGet('/getleavetype');
            if (result2.error) {
                Toast(result2.text, "error");
            } else {
                let newData2 = result2.data.map((item, index) => {
                    return { id: item.leave_type_id, title: item.leave_type_desc }
                });
                setleavetypes(newData2);
            }

            var result = await ApiCallPost('/get_file_select', { file_type: '1', order_type: null });
            if (result.error) {
                Toast('Data Could Not be Fetched', 'error')
            }
            else {
                let settedResult = result.data.map((item, index) => {
                    return { id: item.file_id, title: item.file_no }
                });
                setRecord(settedResult);
                console.log('record', settedResult);
            }


        }
        fetchData();
    }, [updated]);

    const validate = () => {
        // if (values.desig_serial_no === null) {
        //     Toast("Enter Designation Serial No", "error");
        // }
        // else 
        if (values.leave_id === '') {
            Toast("Select Leave Type", "error");
            return;
        }
        // else if (values.leave_order_file === '') {
        //     Toast("Enter Leave Order File No", "error");
        //     return;
        // }
        else if (values.leave_startdate === '') {
            Toast("Enter Leave Start Date", "error");
        }
        else if (values.leave_enddate === '') {
            Toast("Enter Leave End Date", "error");
        }
        else if (CompareDates(values.leave_startdate, values.leave_enddate)) {
            Toast("Leave EndDate should be greater than Leave StartDate", "error");
            return;
        }
        else {
            return true;
        }

        return false;
    }

    const submitData = async () => {

        const CurdateFormated = (currentDate) => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();

        let screenData = {
            emp_id: props.id,
            desig_serial_no: null,
            order_type: values.order_type,
            leave_id: values.leave_id,
            pay_id: values.pay_id,
            leave_order_file: values.leave_order_file,
            leave_file: values.leave_file,
            leave_startdate: values.leave_startdate ? CurdateFormated(new Date(values.leave_startdate)) : null,
            leave_enddate: values.leave_enddate ? CurdateFormated(new Date(values.leave_enddate)) : null,
            leave_remarks: values.leave_remarks,
        }
        console.log(screenData);


        if (props.submitAction === 'Insert') {
            var result = await ApiCallPost('/insert_emp_leave', screenData);
            console.log(result);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Inserted Successfully!', 'success')
                props.setopenPopup(false);
            }
        }
        else if (props.submitAction === 'Update') {
            screenData = {
                ...screenData,
                emp_leave_id: props.data.emp_leave_id
            };

            const result = await ApiCallPost('/update_emp_leave', screenData);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Updated Successfully!', 'success')
                props.setopenPopup(false);

            }
        }
        else {
            Toast('Submit Action Not Defined', 'error');
        }

        props.setTableUpdated((old) => old + 1);
        console.log(screenData);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate())
            return;

        submitData();

    }


    return (

        <>
            <Form onSubmit={handleSubmit}>
                <Stack>
                    <div className="row p-3" >

                        <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                            <Controls.Select fullWidth
                                required
                                name="leave_id"
                                label="Leave Type"
                                value={values.leave_id}
                                options={leavetypes}
                                onChange={handleChange} />
                            <AddNewGeneral label='Leave Type' setUpdated={setUpdated}><LeaveType /></AddNewGeneral>

                        </div>


                        <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Controls.Select fullWidth
                                required
                                name="pay_id"
                                label="Pay Type"
                                value={values.pay_id}
                                options={paytypes}
                                onChange={handleChange} />
                            <AddNewGeneral label='Pay Type' setUpdated={setUpdated}><PayType /></AddNewGeneral>

                        </div>

                        <div className={`${guidelines.inputclass}`}>
                            <Controls.Input id="standard-basic"
                                label="Leave Order No"
                                name="leave_order_file"
                                value={values.leave_order_file}
                                onChange={handleChange} />



                        </div>
                        <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Controls.Select fullWidth

                                name="leave_file"
                                label="Leave Order File"
                                value={values.leave_file}
                                onChange={handleChange}
                                options={record}

                            />
                            {/* <AddNewGeneral label='File' setUpdated={setUpdated}><UploadComponent fileType={1} /></AddNewGeneral> */}


                        </div>
                        <div className={`${guidelines.inputclass}`}>
                            <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                label="Leave Start Date"
                                value={values.leave_startdate}
                                name="leave_startdate"
                                onChange={handleChange} required />


                        </div>


                        <div className={`${guidelines.inputclass}`}>
                            <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                label="Leave End Date"
                                value={values.leave_enddate}
                                name="leave_enddate"
                                onChange={handleChange}
                                required

                            />
                        </div>

                        <div className={`${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                label="Leave Remarks"
                                variant="standard"
                                name="leave_remarks"
                                value={values.leave_remarks}
                                onChange={handleChange}
                            />

                        </div>

                        <div className={`${guidelines.inputclass}`}>

                            <Button variant="contained"
                                type='submit'
                            >{props.label}</Button>

                        </div>
                    </div>
                </Stack>
            </Form>
        </>
    );
}

export default LeavesForm;