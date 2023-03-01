import React, { useState, useEffect, useContext } from 'react';
import { Button, Stack, Alert } from "@mui/material";
import Controls from '../../../../../Modules/UiModules/Control/Controls';
import guidelines from '../../../../../Modules/Guidelines/Guidelines';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import Formheading from '../../../../../Modules/UiModules/Control/Formheading';
import { multiStepContext } from './StepContext';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import { useHistory } from 'react-router-dom';
import AddNewGeneral from '../../../../../Modules/UiModules/Core/AddNewGeneral';
import PackageType from '../../Admin/SetupForms/MasterForms/PackageType';
import SubDepartmentTable from '../../Admin/SetupForms/MasterForms/SubDepartmentTable';
import DepartmentTabTable from '../../Admin/SetupForms/MasterForms/DepartmentTabTable';
import JobNaturee from '../../Admin/SetupForms/MasterForms/JobNature';
import OrderType from '../../Admin/SetupForms/MasterForms/OrderType';
import Designations from '../../Admin/SetupForms/MasterForms/Designation'
import { Form, useForm } from '../../../../../Modules/UiModules/Control/useForm';
import UploadComponent from '../../Files/UploadFile/UploadFile';

//import Card from "../../../../../Modules/UiModules/Core/Card";
//import EmployeeForm from './EmployeeForm';
//import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
//import { SettingsEthernetSharp } from '@mui/icons-material';
const EmployeeDesignation = (props) => {
    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext);
    const [info, setInfo] = useState(0);
    const [desigFile, setdesigFile] = React.useState([]);
    const [fileSelect, setfileSelect] = React.useState('');
    const [file, setFile] = React.useState([]);
    const [emp, setEmp] = useState({ 0: null, 1: null, 2: null, id: null });
    const [disabled, setDisabled] = useState(false);

    //designation details
    const [subDepartmentOptions, setSubDepartmentOptions] = useState([]);
    const [subdptfilter, setSubdptfilter] = useState([]);
    const [designationOptions, setDesignationOptions] = useState([])
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [Enable, setEnable] = useState(false);
    const [offerLetter, setOfferLetter] = useState(userData['offerletter'] ?? '')
    const [offerEnable, setOfferEnable] = useState(false)
    const [JobNatureOptions, setJobNatureOptions] = useState([]);
    const [PackageTypeOptions, setPackageTypeOptions] = useState([]);
    //const [LeavingStatusOptions, setLeavingStatusOptions] = useState([]);
    const [orderTypeOptions, setOrderTypeOptions] = useState([]);
    const [empScaleOptions, setEmpScaleOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(0);
    const [campus, setCampus] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            var result = await ApiCallPost('/get_file_select', { file_type: '1', order_type: '1' ?? 0 });
            if (result.error) {
                Toast('Data Could Not be Fetched', 'error')
            }
            else {
                let settedResult = result.data.map((item, index) => {
                    return { id: item.file_id, title: item.file_no }
                });
                setdesigFile(settedResult);
                console.log('record', settedResult);
            }

            let getJobNature = await ApiCallGet('/getjobnature');
            if (getJobNature.error) {
                Toast(getJobNature.text, 'error')
            }
            else {
                let jobnatureData = getJobNature.data.map((item) => {
                    return { id: item.nature_id, title: item.nature_desc }
                });
                setJobNatureOptions(jobnatureData);
            }

            let getDepartment = await ApiCallGet('/getdepartment');
            if (getDepartment.error) {
                Toast(getDepartment.text, "error");
            }
            else {
                let departmentData = getDepartment.data.map((item) => {
                    return { id: item.dept_id, title: item.dept_name }
                });
                setDepartmentOptions(departmentData);
            }

            var getOrderType = await ApiCallGet('/getordertype');
            if (getOrderType.error) {
                Toast(getOrderType.text, "error");
            }
            else {
                let orderTypeData = getOrderType.data.map((item) => {
                    return { id: item.type_id, title: item.type_desc }
                });
                setOrderTypeOptions(orderTypeData);
            }

            var getsubDepartment = await ApiCallGet('/getsubdepartmentdata');
            if (getsubDepartment.error) {
                Toast(getsubDepartment.text, "error");
            }
            else {
                var obj = getsubDepartment.data.map((item) => {
                    return { id: item.sub_dept_id, title: item.sub_dept_name, main_id: item.dept_id }
                })
                setSubDepartmentOptions(() => obj);
                setSubdptfilter(() => obj);

                if (props.data?.dept_id) {
                    setSubdptfilter((v) => {
                        const a = v.filter((department) => department.main_id === props.data.dept_id);
                        return a;
                    });
                    console.log(subDepartmentOptions);
                } else {
                    setSubdptfilter(() => obj);
                }


            }




            var getDesignation = await ApiCallGet('/getdesignation');
            if (getDesignation.error) {
                Toast(getDesignation.text, "error");
            }
            else {
                let designationData = getDesignation.data.map((item) => {
                    return { id: item.desig_id, title: item.desig_name }
                });
                setDesignationOptions(designationData);
            }

            var getScale = await ApiCallGet('/getscale');
            if (getScale.error) {
                Toast(getScale.text, "error");
            }
            else {
                let scaleData = getScale.data.map((item) => {
                    return { id: item.scale_id, title: item.scale_number }
                });
                setEmpScaleOptions(scaleData);
            }

            var GetPackageType = await ApiCallGet('/Select_Package_Type');
            if (GetPackageType.error) {
                Toast(GetPackageType.text, "error");
            }
            else {
                let PackageData = GetPackageType.data.map((item) => {
                    return { id: item.package_type_id, title: item.package_desc }
                });
                setPackageTypeOptions(PackageData);
            }

            // var GetLeavingStatus = await ApiCallGet('/GetLeavingStatus');
            // if (GetLeavingStatus.error) {
            //     Toast(GetLeavingStatus.text, "error");
            // }
            // else {
            //     let LeavingData = GetLeavingStatus.data.map((item) => {
            //         return { id: item.leaving_id, title: item.leaving_desc }
            //     });
            //     setLeavingStatusOptions(LeavingData);
            // }

            const c = await ApiCallGet('/get_campus');
            if (c.error) {
                Toast(c.text, "error");
            } else {
                let cam = c.data.map((item) => {
                    return { id: item.campus_id, title: item.campus_desc }
                });
                console.clear(cam);
                console.log(cam);
                setCampus(cam);
            }

            const lastemp = await ApiCallGet('/get_last_emp_id');
            if (lastemp.error) {
                Toast(lastemp.text, "error ");
            } else {
                setValues((old) => ({ ...old, [`empid`]: (parseInt(lastemp.data[0].emp_id) + 1) }))
            }



            setLoading(false);

        }


        fetchData();



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updated]);


    const initialFValues = {
        empid: userData?.DesignationData?.empid ?? '',
        cnic: userData?.DesignationData?.cnic ?? '',
        pasportno: userData?.DesignationData?.pasportno ?? '',
        job_nature: userData?.DesignationData?.job_nature ?? '',
        order_no: userData?.DesignationData?.order_no ?? '',
        order_date: userData?.DesignationData?.order_date ?? null,
        wef_date: userData?.DesignationData?.wef_date ?? null,
        desig_id: userData?.DesignationData?.desig_id ?? '',
        order_type: userData?.DesignationData?.order_type ?? '',
        adv_no: userData?.DesignationData?.adv_no ?? '',
        emp_scale: userData?.DesignationData?.emp_scale ?? '',
        package_type: userData?.DesignationData?.package_type ?? null,
        package_amount: userData?.DesignationData?.package_amount ?? null,
        is_primary: userData?.DesignationData?.is_primary ?? 1,
        contract_startdate: userData?.DesignationData?.contract_startdate ?? null,
        contract_enddate: userData?.DesignationData?.contract_enddate ?? null,
        joining_date: userData?.DesignationData?.joining_date ?? null,
        // leaving_date: userData?.DesignationData?.leaving_date ?? null,
        // leaving_status: userData?.DesignationData?.leaving_status ?? '',
        // leave_remarks: userData?.DesignationData?.leave_remarks ?? '',
        //offerletter: userData?.DesignationData?.offerletter ?? '',
        sub_dept_id: userData?.DesignationData?.sub_dept_id ?? '',
        campus_id: userData?.DesignationData?.campus_id ?? '',
        dept_id: userData?.DesignationData?.dept_id ?? '',
        desig_file: userData?.DesignationData?.desig_file ?? ''
    }
    const { values, setValues, handleChange } = useForm(initialFValues);

    const history = useHistory();

    const Validations = () => {

        if (values.empid === '') {
            Toast("Enter EmployeeID", "error");
        }
        else if (values.cnic === '') {
            Toast("Please Enter CNIC", "error");
            return;
        }
        else if (values.job_nature === '') {
            Toast("Enter JobNature", "error");
            return
        }
        else if (values.order_no === '') {
            Toast("Please Enter Order No", "error");
            return;
        }
        else if (values.order_type === '') {
            Toast("Please Enter OrderType", "error");
            return;
        }
        else if (values.desig_file === '') {
            Toast("Please Select Order File", "error");
            return;
        }
        else if (values.order_date === null) {
            Toast("Please Enter OrderDate", "error");
            return;
        }
        else if (values.wef_date === null) {
            Toast("Please Enter wef Date", "error");
            return;
        }
        else if (values.campus_id === '') {
            Toast("Please Select Campus", "error");
        }
        else if (values.dept_id === '') {
            Toast("Please Enter Department", "error");
            return;
        }
        else if (values.sub_dept_id === '') {
            Toast("Please Enter SubDepartment", "error");
            return;
        }
        else if (values.desig_id === '') {
            Toast("Please Enter Designation", "error");
            return;
        }
        // else if (values.desig_file === '') {
        //     Toast("Please Select Designation File", "error");
        //     return;
        // }
        else if (values.joining_date === null) {
            Toast("Please Enter JoiningDate", "error");
            return;
        }
        else {
            setCurrentStep(1);
            setUserData({ ...userData, 'DesignationData': values })
        }
    }

    const check = (value, id) => {
        if (value) {
            ApiCallPost('/exist_employee', { id: value, type: id })
                .then((result) => {
                    if (result.error) {
                        Toast(result.text, "error");
                    } else {
                        if (result.data.length === 0) {
                            emp[id] = null;
                            if (emp[0] === null && emp[1] === null && emp[2] === null) {
                                if (info === 0 || info === 2) {
                                    setDisabled(false);
                                    setInfo(1);
                                }
                                setEmp({ 0: null, 1: null, 2: null, id: null });
                            }
                        } else {
                            setEmp((old) => ({ ...old, [id]: result.data[0].emp_id, id: result.data[0].emp_id }))
                            setInfo(() => 2);
                            setDisabled(true);
                        }
                    }
                });
        } else {
            emp[id] = null;
            if (id === 2) {
                if (info === 2) {
                    if (emp[0] == null && emp[1] == null) {
                        setEmp({ 0: null, 1: null, 2: null, id: null });
                        setInfo(1);
                        setDisabled(false);
                    } else {
                        setEmp((old) => ({ ...old, 2: null }));
                        setInfo(() => 2);
                        setDisabled(true);
                    }
                }
            } else {
                if (emp[0] === null && emp[1] === null && emp[2] === null) {
                    if (info === 2 || info === 1)
                        setInfo(0);
                    setEmp({ 0: null, 1: null, 2: null, id: null });
                    setDisabled(true);
                }
            }
        }
    }

    return (<>

        <Form>
            <Stack>
                <Formheading label="" />
                {info === 1 ? <Alert severity="success">
                    Its New Employee
                </Alert> : info === 0 ? <Alert severity="info">
                    Add Employee ID or CNIC or Passport to check if Employee Exist
                </Alert> : <Alert severity="error" >
                    Employee {(emp['0']) ? 'ID' : (emp['1']) ? 'CNIC' : 'Passport'} Already Exist!
                    <Button
                        variant="text"
                        size='small'
                        color="primary"
                        onClick={() => {
                            window.location.href = `/main/employee-fix/update-employee/${emp.id}`;
                        }}

                    >Redirect
                    </Button>
                </Alert>}

                <div className="row p-3" >
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            label="Employee ID"
                            required
                            name="empid"
                            value={values.empid}
                            onChange={handleChange}
                            onBlur={(e) => check(e.target.value, 0)}
                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input inputProps={{ type: 'number' }} id="standard-basic"
                            label="CNIC No."
                            name="cnic"
                            required
                            value={values.cnic}
                            onChange={handleChange}
                            onBlur={(e) => check(e.target.value, 1)}
                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            label="Passport No."
                            value={values.pasportno}
                            name="pasportno"
                            onChange={handleChange}
                            onBlur={(e) => check(e.target.value, 2)}
                        />
                    </div>
                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Autocomplete
                            fullWidth variant="standard"
                            name="job_nature"
                            label="Job Nature"
                            required
                            value={values.job_nature}
                            setValues={setValues}
                            change={(e) => {
                                // if (e === JobNatureOptions[5].id) { setOfferEnable(() => true) } else { setOfferEnable(() => false) }
                                if (e === JobNatureOptions[3].id) { setEnable(() => true) } else { setEnable(() => false) }
                            }}
                            options={JobNatureOptions}
                        />
                        <AddNewGeneral label='JobNature' setUpdated={setUpdated}><JobNaturee /></AddNewGeneral>

                    </div>
                    {/* offer letter
                    {offerEnable === true ?
                        <div className={`${guidelines.inputclass}`}>
                            <Controls.Select
                                fullWidth variant="standard"
                                name="offerletter"
                                label="Offer Letter"
                                required
                                value={offerLetter}
                                onChange={(e) => {
                                    setOfferLetter(e.target.value);
                                    setUserData({ ...userData, 'offerletter': e.target.value })
                                }}
                                options={JobNatureOptions}
                            />
                        </div> : null} */}

                    {Enable === true ?
                        <div className={`${guidelines.inputclass}`}>
                            <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                label="Contract Start Date"
                                name='contract_startdate'
                                value={values.contract_startdate}
                                onChange={(e) => handleChange(e, true)}
                            />
                        </div> : null}

                    {Enable === true ?
                        <div className={`${guidelines.inputclass}`}>
                            <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                label="Contract End Date"
                                name='contract_enddate'
                                value={values.contract_enddate}
                                onChange={(e) => handleChange(e, true)}
                            />
                        </div> : null}


                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input
                            name="adv_no"
                            label="Advertisement No"
                            // required
                            value={values.adv_no}
                            onChange={handleChange}
                        //value={userData.rowData.form_no}
                        // onChange={(e) => setUserData((old) => ({ ...old, form_no: e.target.value }))}

                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input
                            name="order_no"
                            label="Order No"
                            required
                            value={values.order_no}
                            onChange={handleChange}

                        />
                    </div>
                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Autocomplete
                            name="order_type"
                            label="Order Types"
                            options={orderTypeOptions}
                            required
                            value={values.order_type}
                            setValues={setValues}



                        />
                        <AddNewGeneral label='OrderType' setUpdated={setUpdated}><OrderType /></AddNewGeneral>
                    </div>
                    <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Select fullWidth

                            name="desig_file"
                            label="Order File"
                            //value={fileSelect}
                            value={values.desig_file}
                            onChange={handleChange}
                            required
                            // onChange={(e) => {
                            //     (setfileSelect(e.target.value));
                            //     setFile(desigFile.filter((row) => row.id === e.target.value))
                            // }}
                            options={desigFile}

                        />
                        <AddNewGeneral label='File' setUpdated={setUpdated}><UploadComponent fileType={1} orderType={1} /></AddNewGeneral>


                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                            label="Order Date"
                            name='order_date'
                            value={values.order_date}
                            onChange={(e) => handleChange(e, true)}
                            required
                        />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                            label="Desig Effective Date "
                            name='wef_date'
                            value={values.wef_date}
                            onChange={(e) => handleChange(e, true)}
                            required
                        />
                    </div>
                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Select fullWidth

                            name="campus_id"
                            label="Campus"
                            value={values.campus_id}
                            onChange={handleChange}
                            options={campus}
                            required

                        />
                    </div>
                    <div className={`${guidelines.inputclass} d-flex align-items-center justify-content-center`}>
                        <Controls.Autocomplete
                            name="dept_id"
                            label="Department "
                            required
                            value={values.dept_id}
                            setValues={setValues}
                            change={(e) => {

                                setSubdptfilter(e ? subDepartmentOptions : []);
                                if (e)
                                    setSubdptfilter((v) => {
                                        const a = v.filter((department) => department.main_id === e);
                                        if (a.length !== 0) {
                                            // values.sub_dept_id = a[0].id
                                            setValues((old) => ({ ...old, 'sub_dept_id': a[0].id }));
                                        }
                                        return a;
                                    });
                                else return
                                // setSubDepartment(null);

                            }}
                            options={departmentOptions}
                        />
                        <AddNewGeneral label='Department' setUpdated={setUpdated}><DepartmentTabTable /></AddNewGeneral>

                    </div>

                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Autocomplete
                            name="sub_dept_id"
                            label="Sub Department"
                            options={subdptfilter}
                            required
                            value={values.sub_dept_id}
                            setValues={setValues}
                        // disabled
                        />
                        <AddNewGeneral label='Sub-Department' setUpdated={setUpdated}><SubDepartmentTable /></AddNewGeneral>
                    </div>

                    <div className={`${guidelines.inputclass}  d-flex align-items-center justify-content-center`}>
                        <Controls.Autocomplete
                            name="desig_id"
                            label="Designation"
                            options={designationOptions}
                            required
                            value={values.desig_id}
                            setValues={setValues}
                            change={() => console.log('OnChange AC')}
                        />
                        <AddNewGeneral label='Designation' setUpdated={setUpdated}><Designations /></AddNewGeneral>

                    </div>
                    {/* <div className={`${guidelines.inputclass}`} style={{ paddingTop: '3px' }}>
                        <Controls.Checkbox
                            name="is_primary"
                            label="Is Primary"
                            required
                            value={values.is_primary}
                            onChange={handleChange}
                        />
                    </div> */}

                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Autocomplete
                            name="emp_scale"
                            label="Scale"
                            options={empScaleOptions}
                            // required
                            value={values.emp_scale}
                            setValues={setValues}

                        />
                        {/* <AddNewGeneral label='Scale' setUpdated={setUpdated}><Scale /></AddNewGeneral> */}
                    </div>

                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Autocomplete
                            name="package_type"
                            label="Package Type"
                            options={PackageTypeOptions}
                            // required
                            value={values.package_type}
                            setValues={setValues}
                        />
                        <AddNewGeneral label='PackageType' setUpdated={setUpdated}><PackageType /></AddNewGeneral>

                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input
                            name="package_amount"
                            label="Package Amount"
                            // required
                            value={values.package_amount}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                            label="Emp Joining Date"
                            name='joining_date'
                            value={values.joining_date}
                            onChange={(e) => handleChange(e, true)}
                            required
                        />
                    </div>


                    {/* <div className={`${guidelines.inputclass}`}>
                        <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                            label="Leaving Date"
                            name='leaving_date'
                            value={values.leaving_date}
                            onChange={handleChange}
                        // required
                        />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Autocomplete
                            name="leaving_status"
                            label="Leaving Status"
                            options={LeavingStatusOptions}
                            // required
                            value={values.leaving_status}
                            setValues={setValues}

                        />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input
                            name="leave_remarks"
                            label="Leaving Remarks"
                            value={values.leave_remarks}
                            onChange={handleChange}
                        />
                    </div> */}
                </div>

                {/* MOVE TO NEXT STEP */}
                <div >
                    <Button
                        style={{ float: 'right' }}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            Validations()
                        }}
                        disabled={disabled}

                    >Next
                    </Button>
                </div>
            </Stack>
        </Form>

    </>);
}

export default EmployeeDesignation;