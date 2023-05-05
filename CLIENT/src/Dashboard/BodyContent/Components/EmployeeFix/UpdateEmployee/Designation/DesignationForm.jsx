import React, { useContext, useEffect, useState } from 'react';
import { Button, Stack } from "@mui/material";
import Controls from '../../../../../../Modules/UiModules/Control/Controls'
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import { ApiCallGet, ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import SubDepartments from '../../../Admin/SetupForms/MasterForms/SubDepartments';
//import Scale from '../../../Admin/SetupForms/MasterForms/Scale';
import OrderType from '../../../Admin/SetupForms/MasterForms/OrderType';
import AddNewGeneral from '../../../../../../Modules/UiModules/Core/AddNewGeneral';
// import JobNature from '../../../Admin/SetupForms/MasterForms/JobNature';
import PackageType from '../../../Admin/SetupForms/MasterForms/PackageType';
//import SqlDateFormat from '../../../../../../Modules/UiModules/Core/SqlDateFormat';
//import FrontEndDateFormat from '../../../../../../Modules/UiModules/Core/FrontEndDateFormat';
import Loading from '../../../../../../Modules/UiModules/Core/Loading/Loading';
//import SqlDateFormat from '../../../../../../Modules/UiModules/Core/SqlDateFormat';
import CompareDates from '../../../../../../Modules/UiModules/Core/CompareDates';
//import Formheading from '../../../../../../Modules/UiModules/Control/Formheading';
import DepartmentTabTable from '../../../Admin/SetupForms/MasterForms/DepartmentTabTable';
import Designation from '../../../Admin/SetupForms/MasterForms/Designation'
import SubDepartmentTable from '../../../Admin/SetupForms/MasterForms/SubDepartmentTable';
import { SanctionDasigContext } from './DesigContext';
import UploadComponent from '../../../Files/UploadFile/UploadFile';
const DesignationForm = (props) => {

    const { userData, setUserData } = useContext(SanctionDasigContext);
    const [disabled, setDisabled] = useState((userData?.rowData?.is_primary == 1) ? true : false);

    console.log('context data', userData)
    const initialFValues = {
        form_no: userData?.rowData?.form_no ?? '',
        job_nature: userData?.rowData?.job_nature ?? '',
        order_no: userData?.rowData?.order_no ?? '',
        order_date: userData?.rowData?.order_date ?? null,
        wef_date: userData?.rowData?.wef_date ?? null,
        desig_id: userData?.rowData?.desig_id ?? '',
        order_type: userData?.rowData?.order_type ?? null,
        adv_no: userData?.rowData?.adv_no ?? '',
        emp_scale: userData?.rowData?.emp_scale ?? '',
        package_type: userData?.rowData?.package_type ?? '',
        package_amount: userData?.rowData?.package_amount ?? null,
        is_primary: userData?.rowData?.is_primary ? 1 : 0,
        contract_startdate: userData?.rowData?.contract_startdate ?? null,
        contract_enddate: userData?.rowData?.contract_enddate ?? null,
        joining_date: userData?.rowData?.joining_date ?? null,
        leaving_date: userData?.rowData?.leaving_date ?? null,
        leaving_status: userData?.rowData?.leaving_status ?? '',
        leave_remarks: userData?.rowData?.leave_remarks ?? '',
        sub_dept_id: userData?.rowData?.sub_dept_id ?? '',
        campus_id: userData?.rowData?.campus_id ?? '',
        dept_id: userData?.rowData?.dept_id ?? '',
        serial_no: userData?.rowData?.serial_no ?? '',
        asNewRecord: userData?.rowData?.asNewRecord ?? false,
        order_pic: userData?.rowData?.order_pic ?? ''
    }
    const { values, setValues, handleChange } = useForm(initialFValues);

    //designation details
    const [JobNatureOptions, setJobNatureOptions] = useState([]);
    const [PackageTypeOptions, setPackageTypeOptions] = useState([]);
    const [LeavingStatusOptions, setLeavingStatusOptions] = useState([]);
    const [subDepartmentOptions, setSubDepartmentOptions] = useState([]);
    const [subdptfilter, setSubdptfilter] = useState([]);
    const [designationOptions, setDesignationOptions] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [empScaleOptions, setEmpScaleOptions] = useState([]);
    const [orderTypeOptions, setOrderTypeOptions] = useState([]);
    const [department, setDepartment] = useState(props.data?.dept_id ?? '');
    const [subDepartment, setSubDepartment] = useState(props.data?.sub_dept_id ?? '');
    const [desigFile, setdesigFile] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(0);
    const [campus, setCampus] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            var result = await ApiCallPost('/get_file_select', { file_type: '1', order_type: null });
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
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!')
            console.log(initialFValues?.dept_id)
            if (getsubDepartment.error) {
                Toast(getsubDepartment.text, "error");
            }
            else {
                var obj = getsubDepartment.data.map((item) => {
                    return { id: item.sub_dept_id, title: item.sub_dept_name, main_id: item.dept_id }
                })
                setSubDepartmentOptions(() => obj);
                setSubdptfilter(() => obj);
                var a = [];
                if (initialFValues?.dept_id) {
                    setSubdptfilter((v) => {
                        a = v.filter((department) => department.main_id === initialFValues.dept_id);
                        return a;
                    });
                    console.log('a',a)
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

            var GetLeavingStatus = await ApiCallGet('/GetLeavingStatus');
            if (GetLeavingStatus.error) {
                Toast(GetLeavingStatus.text, "error");
            }
            else {
                let LeavingData = GetLeavingStatus.data.map((item) => {
                    return { id: item.leaving_id, title: item.leaving_desc }
                });
                setLeavingStatusOptions(LeavingData);
            }
            const c = await ApiCallGet('/get_campus');
            if (c.error) {
                Toast(c.text, "error");
            } else {
                let cam = c.data.map((item) => {
                    return { id: item.campus_id, title: item.campus_desc }
                });
                console.log(cam);
                setCampus(cam);
            }


            setLoading(false);

        }


        fetchData();



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchData = async () => {


            var result = await ApiCallPost('/get_file_select', { file_type: '1', order_type: null });
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


                if (initialFValues?.dept_id) {
                    setSubdptfilter((v) => {
                        const a = v.filter((department) => department.main_id === initialFValues.dept_id);
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

            var GetLeavingStatus = await ApiCallGet('/GetLeavingStatus');
            if (GetLeavingStatus.error) {
                Toast(GetLeavingStatus.text, "error");
            }
            else {
                let LeavingData = GetLeavingStatus.data.map((item) => {
                    return { id: item.leaving_id, title: item.leaving_desc }
                });
                setLeavingStatusOptions(LeavingData);
            }




        }


        fetchData();



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updated]);


    const validate = () => {
        if (values.order_no === '') {
            Toast("Enter Order No", "error");
        }
        else if (!values.order_type) {
            Toast("Select Order Type", "error");
            return false;
        }
        else if (values.order_date === null) {
            Toast("Enter Order Date", "error");
            return false;
        }
        else if (values.department === '') {
            Toast("Select Department", "error");
        }
        else if (values.desig_id === '') {
            Toast("Select Designation", "error");
        }
        else if (values.job_nature === '') {
            Toast("Select Job Nature", "error");
        }
        else if (values.contract_startdate && !values.contract_enddate) {
            Toast("Enter Contract EndDate", "error");
            return false;
        }
        else if (values.contract_enddate && !values.contract_startdate) {
            Toast("Enter Contract StartDate", "error");
            return false;
        }
        else if (CompareDates(values.contract_startdate, values.contract_enddate)) {
            Toast("Contract EndDate should be greater than Contract StartDate", "error");
            return false;
        }
        else if (values.joining_date === null) {
            Toast("Enter Joining Date", "error");
            return false;
        }
        // else if ((new Date(values.order_date)) > (new Date(values.joining_date))) {
        //     Toast("Joining Date should be greater than Order Date", "error");
        //     return;
        // }
        // else if (CompareDates(values.joining_date, values.leaving_date)) {
        //     Toast("Leaving Date should be greater than Joining Date ", "error");
        //     return;
        // }
        else {
            return true;
        }

        return false;
    }

    const submitData = async () => {
        const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();

        var screenData = {
            emp_id: props.id,
            form_no: parseInt(values.form_no),
            job_nature: values.job_nature,
            order_no: values.order_no,
            order_type: values.order_type,
            adv_no: values.adv_no,
            order_date: values.order_date ? CurdateFormated(new Date(values.order_date)) : null,
            emp_scale: parseInt(values.emp_scale),
            package_type: parseInt(values.package_type),
            package_amount: values.package_amount,
            dept_id: parseInt(values.dept_id),
            sub_dept_id: parseInt(values.sub_dept_id),
            desig_id: values.desig_id,
            is_primary: values.is_primary == true ? 1 : 0,
            contract_startdate: values.contract_startdate ? CurdateFormated(new Date(values.contract_startdate)) : null,
            contract_enddate: values.contract_enddate ? CurdateFormated(new Date(values.contract_enddate)) : null,
            joining_date: values.joining_date ? CurdateFormated(new Date(values.joining_date)) : null,
            leaving_date: values.leaving_date ? CurdateFormated(new Date(values.leaving_date)) : null,
            leaving_status: parseInt(values.leaving_status),
            leave_remarks: values.leave_remarks,
            wef_date: values.wef_date ? CurdateFormated(new Date(values.wef_date)) : null,
            order_pic: values.order_pic
        }

        if (values.asNewRecord !== null || props.submitAction === 'Insert') {
            var result = await ApiCallPost('/insert_emp_designation', screenData);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Inserted Successfully!', 'success')
                props.setopenPopup(false);
            }
        }

        else if (values.asNewRecord === null && props.submitAction === 'Update') {
            screenData = {
                ...screenData,
                serial_no: props.data.serial_no
            };

            const result = await ApiCallPost('/update_emp_designation', screenData);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Updated Successfully!', 'success')
                props.setopenPopup(false);
            }
            console.log(values.order_pic)
            console.log(screenData)

        }
        else {
            Toast('Submit Action Not Defined', 'error');
        }

        props.setTableUpdate((old) => old + 1);
        console.log(screenData);

    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (!validate())
    //         return;

    //     submitData();
    //     props.setopenPopup(false);
    //     setUserData([]);

    // }
    const moveNext = () => {
        setUserData({ ...userData, rowData: values });
    }

    return (
        <>
            {loading ? <Loading /> :
                <Form>

                    <Stack>
                        <div className="row p-3" >

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

                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Order Date"
                                    name='order_date'
                                    value={values.order_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Desig Effective Date "
                                    name='wef_date'
                                    value={values.wef_date}
                                    onChange={handleChange}
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
                                        setDepartment(e)
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
                                        else
                                            setSubDepartment(null);

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
                                <AddNewGeneral label='Designation' setUpdated={setUpdated}><Designation /></AddNewGeneral>

                            </div>
                            <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Controls.Select fullWidth

                                    name="order_pic"
                                    label="Order File"
                                    //value={fileSelect}
                                    value={values.order_pic}
                                    onChange={handleChange}
                                    // onChange={(e) => {
                                    //     (setfileSelect(e.target.value));
                                    //     setFile(desigFile.filter((row) => row.id === e.target.value))
                                    // }}
                                    options={desigFile}

                                />
                                <AddNewGeneral label='File' setUpdated={setUpdated}><UploadComponent fileType={1} orderType={1} /></AddNewGeneral>


                            </div>
                            <div className={`${guidelines.inputclass}`} style={{ paddingTop: '3px' }}>
                                <Controls.Checkbox
                                    name="is_primary"
                                    label="Is Primary"
                                    disabled={disabled}
                                    required
                                    value={values.is_primary}
                                    onChange={handleChange}
                                />
                            </div>
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
                                    name="job_nature"
                                    label="Job Nature"
                                    options={JobNatureOptions}
                                    required
                                    value={values.job_nature}
                                    setValues={setValues}

                                />
                                {/* <AddNewGeneral label='JobNature' setUpdated={setUpdated}><JobNature /></AddNewGeneral> */}

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
                                    label="Contract Start Date"
                                    name='contract_startdate'
                                    value={values.contract_startdate}
                                    onChange={handleChange}
                                // required
                                />
                            </div>


                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Contract End Date"
                                    name='contract_enddate'
                                    value={values.contract_enddate}
                                    onChange={handleChange}
                                // required
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Emp Joining Date"
                                    name='joining_date'
                                    value={values.joining_date}
                                    onChange={handleChange}
                                    helperText="Date when employee joined"
                                    required
                                />
                            </div>


                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Desig Leaving Date"
                                    name='leaving_date'
                                    value={values.leaving_date}
                                    onChange={handleChange}
                                // required
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Autocomplete
                                    name="leaving_status"
                                    label="Desig Leaving Status"
                                    options={LeavingStatusOptions}
                                    // required
                                    value={values.leaving_status}
                                    setValues={setValues}

                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input
                                    name="leave_remarks"
                                    label="Desig Leaving Remarks"
                                    value={values.leave_remarks}
                                    onChange={handleChange}
                                />
                            </div>
                            {(props.submitAction === 'Update') ?
                                <div className={`${guidelines.inputclass}`} style={{ paddingTop: '3px' }}>
                                    <Controls.Checkbox
                                        name="asNewRecord"
                                        label="Add as new Record"
                                        value={values.asNewRecord}
                                        onChange={handleChange}
                                    />
                                </div> : null
                            }
                            <div className={`${guidelines.inputclass}`} style={{ paddingTop: '3px' }}>

                                <Button variant="contained"
                                    onClick={() => { let result = validate(); if (result) { moveNext(); props.setValue(1) } }}>
                                    Next</Button>

                            </div>
                        </div>
                    </Stack>
                </Form>}
        </>
    );


}

export default DesignationForm;