import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import Card from "../../../../../Modules/UiModules/Core/Card"
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
// import listformatter from '../../../../../Modules/Utility/ListFormatter'
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import { useForm, Form } from '../../../../../Modules/UiModules/Control/useForm';
import Controls from '../../../../../Modules/UiModules/Control/Controls';
import { Button } from "@mui/material";
//import guidelines from '../../../../../Modules/Guidelines/Guidelines';

const AllEmployees = (props) => {

    const initialFValues = {
        dept: null,
        facultyType: null,
        emp: 1,
    }
    // const faculty = [
    //     { id: 0, title: 'Non - Teaching' }, { id: 1, title: 'Teaching' }
    // ]
    const { values, setValues, handleChange } = useForm(initialFValues);
    //const [departmentOptions, setDepartmentOptions] = useState([]);
    const [departmentlookup, setDepartmentLookup] = useState({});
    const [empOptions, setEmpOptions] = useState([{ id: 1, title: 'Current Employees' }, { id: 2, title: 'Left Employees' }, { id: 3, title: 'Deleted Employees' }]);
    const [jobNatureOptions, setJobNatureOptions] = useState({});
    const gender = { "M": "Male", "F": "Female" };
    const [maritalStatusOptions, setMaritalStatus] = useState([])
    const [loadingA, setLoadingA] = useState(true);
    const [loadingB, setLoadingB] = useState(true);
    //const [updated, setUpdated] = useState(0);
    const [ReligionLookup, setReligionLookup] = useState([]);
    const [desigLookgup, setDesigLookup] = useState([]);
    const [LeavingStatusLookup, setLeavingStatusLookup] = useState([]);


    const [Data, setData] = useState([]);
    const columns = (values.emp === 3) ? [
        {
            title: "Recover", feild: 'recover', hidden: props.user?.role === 'DVO' ? true : false, render: (row) => <Button variant="contained" color="primary" onClick={() => recoverEmp(row)}>Recover</Button>, cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "left" }
        },
        { title: "Emp ID", editable: () => false, field: 'emp_id', type: 'numeric', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "left" } },
        { title: "Designation", editable: () => false, field: 'desig_id', lookup: desigLookgup, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Visiting", editable: () => false, field: 'is_visiting', type: 'boolean', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Job Nature", field: "job_nature", lookup: jobNatureOptions, editable: () => false, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        // { title: "Form No", editable: () => false, field: 'form_no', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        // { title: "AdvertNo", render: (row) => (row.adv_no === null) ? <b style={{ marginLeft: "15px" }} > —</b > : row.adv_no, editable: () => true, field: 'adv_no', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Employee Name", editable: () => true, field: 'emp_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Father Name", editable: () => true, field: 'father_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Spouse Name", editable: () => true, field: 'spouse_name', render: (row) => (row.spouse_name === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.spouse_name, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Campus", field: 'campus_desc', type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Department", field: 'dept_id', lookup: departmentlookup, type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },

        { title: "SubDepartment", field: 'sub_dept_name', type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Scale", field: "emp_scale", cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Scale Code", field: "scale_code", cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Teaching", field: 'is_teaching', type: 'boolean', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        // { title: "OrderNo", editable: () => true, field: 'order_no', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "NIC", editable: () => true, field: 'nic', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Passport No", editable: () => true, field: 'passport_no', render: (row) => (row.passport_no === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.passport_no, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Mobile No", editable: () => true, field: 'phone_1', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Office No", editable: () => true, field: 'phone_2', render: (row) => (row.phone_2 === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.phone_2, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Date of Birth", editable: () => true, type: 'date', dateSetting: { locale: "en-GB" }, field: 'date_of_birth', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Gender", field: 'gender', editable: () => true, lookup: gender, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Religion", editable: () => true, field: 'religion', lookup: ReligionLookup, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "MaritalStatus", editable: () => true, field: 'marital_status', lookup: maritalStatusOptions, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Releaving Status", field: 'leaving_status', lookup: LeavingStatusLookup, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Area Special", editable: () => true, render: (row) => (row.area_special === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.area_special, field: 'area_special', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Nationality", editable: () => true, field: 'nat_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Present Address", editable: () => true, field: 'present_address', type: 'string', cellStyle: { textAlign: "left", whiteSpace: "break-spaces" }, headerStyle: { textAlign: "left" } },
        { title: "Permanent Address", editable: () => true, field: 'permanent_addreess', type: 'string', cellStyle: { textAlign: "left", whiteSpace: "break-spaces" }, headerStyle: { textAlign: "left" } },
        { title: "Email", editable: () => true, render: (row) => (row.email_address === null) ? <b style={{ marginLeft: "60px" }} > —</b > : row.email_address, field: 'email_address', type: 'email', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Domicile", editable: () => true, field: 'dom_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Date of Joining", editable: () => true, type: 'date', dateSetting: { locale: "en-GB" }, field: 'joining_date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },

    ] : [
        { title: "Emp ID", editable: () => false, field: 'emp_id', type: 'numeric', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "left" } },
        { title: "Designation", editable: () => false, field: 'desig_id', lookup: desigLookgup, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Visiting", editable: () => false, field: 'is_visiting', type: 'boolean', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Job Nature", field: "job_nature", lookup: jobNatureOptions, editable: () => false, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        // { title: "Form No", editable: () => false, field: 'form_no', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        // { title: "AdvertNo", render: (row) => (row.adv_no === null) ? <b style={{ marginLeft: "15px" }} > —</b > : row.adv_no, editable: () => true, field: 'adv_no', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Employee Name", editable: () => true, field: 'emp_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Father Name", editable: () => true, field: 'father_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Spouse Name", editable: () => true, field: 'spouse_name', render: (row) => (row.spouse_name === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.spouse_name, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Campus", field: 'campus_desc', type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Department", field: 'dept_id', lookup: departmentlookup, type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Scale", field: "emp_scale", cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Scale Code", field: "scale_code", cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "SubDepartment", field: 'sub_dept_name', type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Teaching", field: 'is_teaching', type: 'boolean', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        // { title: "OrderNo", editable: () => true, field: 'order_no', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "NIC", editable: () => true, field: 'nic', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Passport No", editable: () => true, field: 'passport_no', render: (row) => (row.passport_no === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.passport_no, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Mobile No", editable: () => true, field: 'phone_1', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Office No", editable: () => true, field: 'phone_2', render: (row) => (row.phone_2 === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.phone_2, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Date of Birth", editable: () => true, type: 'date', dateSetting: { locale: "en-GB" }, field: 'date_of_birth', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Gender", field: 'gender', editable: () => true, lookup: gender, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Religion", editable: () => true, field: 'religion', lookup: ReligionLookup, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "MaritalStatus", editable: () => true, field: 'marital_status', lookup: maritalStatusOptions, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Releaving Status", field: 'leaving_status', lookup: LeavingStatusLookup, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Area Special", editable: () => true, render: (row) => (row.area_special === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.area_special, field: 'area_special', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Nationality", editable: () => true, field: 'nat_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Present Address", editable: () => true, field: 'present_address', type: 'string', cellStyle: { textAlign: "left", whiteSpace: "break-spaces" }, headerStyle: { textAlign: "left" } },
        { title: "Permanent Address", editable: () => true, field: 'permanent_addreess', type: 'string', cellStyle: { textAlign: "left", whiteSpace: "break-spaces" }, headerStyle: { textAlign: "left" } },
        { title: "Email", editable: () => true, render: (row) => (row.email_address === null) ? <b style={{ marginLeft: "60px" }} > —</b > : row.email_address, field: 'email_address', type: 'email', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Domicile", editable: () => true, field: 'dom_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Date of Joining", editable: () => true, type: 'date', dateSetting: { locale: "en-GB" }, field: 'joining_date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },

    ];

    // const update = async (oldRow, newRow) => {

    //     let validate = true;
    //     if (newRow.emp_name === '' || newRow.emp_name === null || newRow.emp_name === undefined) {
    //         validate = false;
    //         Toast("Employee Name Cannot be empty", "error");
    //     }
    //     if (newRow.order_no === '') {
    //         validate = false;
    //         Toast("Order No Can't Be Empty", "error");
    //     }
    //     if (newRow.nic === '') {
    //         validate = false;
    //         Toast("NIC Can't Be Empty", "error");
    //     }
    //     if (newRow.phone_1 === '') {
    //         validate = false;
    //         Toast("Phone 1 Can't Be Empty", "error");
    //     }
    //     if (newRow.date_of_birth === '' || newRow.date_of_birth === null || newRow.date_of_birth === undefined) {
    //         validate = false;
    //         Toast("Date of Birth Can't Be Empty", "error");
    //     }
    //     if (newRow.religion === '') {
    //         validate = false;
    //         Toast("Religion Can't Be Empty", "error");
    //     }
    //     if (newRow.nationality === '') {
    //         validate = false;
    //         Toast("Nationality Can't Be Empty", "error");
    //     }
    //     if (newRow.father_name === '') {
    //         validate = false;
    //         Toast("Father Name Can't Be Empty", "error");
    //     }
    //     if (newRow.present_address === '') {
    //         validate = false;
    //         Toast("Present Address Can't Be Empty", "error");
    //     }
    //     if (newRow.permanent_addreess === '') {
    //         validate = false;
    //         Toast("Permanent Address Can't Be Emty", "error");
    //     }
    //     if (newRow.domicile === '') {
    //         validate = false;
    //         Toast("Domicile Can't Be Emty", "error");
    //     }
    //     if (newRow.email_address !== '' && (!newRow.email_address.includes("@") || !newRow.email_address.includes("."))) {
    //         validate = false;
    //         Toast("Invalid Email Address", "error");
    //     }

    //     if (validate === true) {

    //         const data = {
    //             empID: newRow.emp_id,
    //             advNo: (newRow.adv_no === '') ? null : newRow.adv_no,
    //             orderNo: newRow.order_no,
    //             name: newRow.emp_name,
    //             nic: newRow.nic,
    //             passport: (newRow.passport_no === '') ? null : newRow.passport_no,
    //             phone1: newRow.phone_1,
    //             phone2: (newRow.phone_2 === '') ? null : newRow.phone_2,
    //             dob: GetFormattedDate(new Date(newRow.date_of_birth)),
    //             gender: newRow.gender,
    //             religion: newRow.religion,
    //             area: (newRow.area_special === '') ? null : newRow.area_special,
    //             nationality: newRow.nationality,
    //             father: newRow.father_name,
    //             spouse: (newRow.spouse_name === '') ? null : newRow.spouse_name,
    //             present: newRow.present_address,
    //             permanent: newRow.permanent_addreess,
    //             email: (newRow.email_address === '') ? null : newRow.email_address,
    //             domicile: newRow.domicile,
    //             jobNature: parseInt(newRow.job_nature),
    //             teaching: (newRow.is_teaching === false) ? 0 : (newRow.is_teaching === "0") ? 0 : 1,
    //             leaving: (newRow.leaving_status === "null" || newRow.leaving_status === null) ? null : parseInt(newRow.leaving_status)
    //         }

    //         console.log(data);

    //         const result = await ApiCallPost('/update_employee', { ...data });
    //         if (result.error) {
    //             Toast(result.text, "error");
    //         } else {
    //             setUpdated(old => (old + 1));
    //             Toast('Data Updated Successfully!', 'success');
    //         }
    //     }
    // };

    useEffect(async () => {
        setLoadingA(true);
        let getDesig = await ApiCallGet('/getdesignation');
        if (getDesig.error) {
            Toast(getDepartment.text, 'error');
            return;
        } else {
            setDesigLookup((old) => {
                for (let i = 0; i < getDesig.data.length; i++)
                    old[getDesig.data[i].desig_id] = getDesig.data[i].desig_name;
                return old;
            });
        }
        console.log(getDesig.data);
        var getDepartment = await ApiCallGet('/getdepartment');
        if (getDepartment.error) {
            Toast(getDepartment.text, 'error');
            return;
        } else {
            // let departmentData = getDepartment.data.map((item) => {
            //     return { id: item.dept_id, title: item.dept_name }
            // });
            //setDepartmentOptions(departmentData);
            setDepartmentLookup((old) => {
                for (let i = 0; i < getDepartment.data.length; i++) {
                    old[getDepartment.data[i].dept_id] = getDepartment.data[i].dept_name;
                }
                console.log(old);
                return old;
            });

        }

        var result4 = await ApiCallGet('/getjobnature');
        if (result4.error) {
            Toast(result4.text, 'error');
            return;
        }
        else {
            setJobNatureOptions((old) => {
                for (let i = 0; i < result4.data.length; i++) {
                    old[result4.data[i].nature_id] = result4.data[i].nature_desc;
                }
                console.log(old);
                return old;
            });
        }
        let result1 = await ApiCallGet('/get_marital_status_list');
        console.log(result1.data);
        if (result1.error) {
            Toast(result1.text, "error");
        } else {
            setMaritalStatus((old) => {
                for (let i = 0; i < result1.data.length; i++) {
                    old[result1.data[i].marital_id] = result1.data[i].marital_desc;
                }
                console.log(old);
                return old;
            });
        }
        let result6 = await ApiCallGet('/get_religion');
        if (result6.error) {
            Toast(result6.text, "error");
        }
        else {

            setReligionLookup((old) => {
                for (let i = 0; i < result6.data.length; i++) {
                    old[result6.data[i].religion_id] = result6.data[i].religion_name;
                }
                console.log(old);
                return old;
            });
        }
        let leaving = await ApiCallGet('/Get_LeavingStatus');
        if (leaving.error) {
            Toast(leaving.text, "error");
        } else {
            setLeavingStatusLookup((old) => {
                for (let i = 0; i < leaving.data.length; i++)
                    old[leaving.data[i].leaving_id] = leaving.data[i].leaving_desc;
                return old;
            });
        }
        setLoadingA(false);
    }, []);

    const fetchData = async () => {
        setLoadingB(true);
        try {
            //previous experience apis
            var result = await ApiCallPost('/get_all_employee', { emp: (values.emp) ? values.emp : null });
            if (result.error) {
                Toast(result.text, 'error');
                return;
            }
            else {

                console.log('props.idR', props.idR);
                if (props.idR === 2) {
                    console.log('result.data.filter((row)=>row.is_teaching===1)', result.data.filter((row) => row.is_teaching === 1))
                    setData(result.data.filter((row) => row.is_teaching === 1));
                } else if (props.idR === 3) {
                    setData(result.data.filter((row) => row.is_teaching === 0));
                    console.log('result.data.filter((row)=>row.is_teaching===0)', result.data.filter((row) => row.is_teaching === 0))
                } else if (props.idR === 4) {
                    console.log('result.data.filter((row)=>row.job_nature===4)', result.data.filter((row) => row.is_visiting === 1))
                    setData(result.data.filter((row) => row.is_visiting === 1))
                } else if (props.idR === 5) {
                    console.log('result.data.filter((row)=>row.job_nature===1)', result.data.filter((row) => row.job_nature === 1))
                    setData(result.data.filter((row) => row.job_nature === 1))
                } else if (props.idR === 6) {
                    console.log('result.data.filter((row)=>row.job_nature===2)', result.data.filter((row) => row.job_nature === 2))
                    setData(result.data.filter((row) => row.job_nature === 2))
                } else if (props.idR === 7) {
                    console.log('result.data.filter((row)=>row.job_nature===6)', result.data.filter((row) => row.job_nature === 6))
                    setData(result.data.filter((row) => row.job_nature === 6))
                } else if (props.idR === 8) {
                    console.log('result.data.filter((row)=>row.job_nature===3)', result.data.filter((row) => row.job_nature === 3))
                    setData(result.data.filter((row) => row.job_nature === 3))
                } else if (props.idR === 9) {
                    console.log('result.data.filter((row)=>row.scale_type===1)', result.data.filter((row) => row.scale_type === 1))
                    let arr = [];
                    result.data.map((row) => {
                        if (row.scale_id === null && row.base_scale > 15) {
                            arr.push(row)
                        }
                        else if (row.scale_type === 1) {
                            arr.push(row)
                        }
                    });
                    setData(arr);
                } else if (props.idR === 10) {
                    console.log('result.data.filter((row)=>row.scale_type===2)', result.data.filter((row) => row.scale_type === 2))
                    let arr = [];
                    result.data.map((row) => {
                        if (row.scale_id === null && row.base_scale <= 15) {
                            arr.push(row)
                        }
                        else if (row.scale_type === 2) {
                            arr.push(row)
                        }
                    });
                    setData(arr);
                }
                // else if (props.idR === 11) {
                //     console.log('result.data.filter((row)=>row.scale_type==null)', result.data.filter((row) => row.scale_type == null))
                //     setData(result.data.filter((row) => row.scale_type == null && row.dept_id != null))
             else if (props.idR === 12) {
                console.log('result.data.filter((row)=>row.gender=== f)', result.data.filter((row) => row.gender === 'F'))
                setData(result.data.filter((row) => row.gender === 'F'))
            } else if (props.idR === 13) {
                console.log('result.data.filter((row)=>row.gender===M)', result.data.filter((row) => row.gender === 'M'))
                setData(result.data.filter((row) => row.gender === 'M'))
            }
            else {
                console.log('Else');
                setData(result.data);
                console.log(result.data);
            }
        }
        }
        catch (e) {
        alert("error")
        console.log(e);
    }
    setLoadingB(false);
}
useEffect(() => {
    fetchData();
}, [values]);

const history = useHistory();
const handleClick = (emp_id) => {
    history.push({ pathname: `/main/employee-fix/update-employee/${emp_id}` });
}
const options = {
    filtering: true,
    exportAllData: true,
    exportButton: {
        csv: true,
        pdf: true
    }
}

const RedirectToEmp = () => {
    history.push({ pathname: `/main/forms/employee` })
}

const deleteEmp = async (row) => {
    if (props.user?.role === 'DVO')
        return;
    const emp_id = row.emp_id;
    const result = await ApiCallPost('/delete_employee', { emp_id: emp_id });
    if (result.error) {
        Toast(result.text, 'error');
    } else {
        fetchData();
    }
}

const recoverEmp = async (row) => {
    if (props.user?.role === 'DVO')
        return;
    const emp_id = row.emp_id;
    const result = await ApiCallPost('/recover_employee', { emp_id: emp_id });
    if (result.error) {
        Toast(result.text, 'error');
    } else {
        fetchData();
    }
}

const customadd = () => {
    if (props.user?.role !== 'DVO') { RedirectToEmp() }
}

let actions = {};
let nonDeletedActions = {};

if (props.user?.role !== 'DVO') {
    actions['customAdd'] = customadd;
    nonDeletedActions['customAdd'] = customadd;
    nonDeletedActions['onDelete'] = deleteEmp;
}




return (<>

    <Card>
        <div className='row h-100'>
            {props.sanction === undefined && !props.idR ?
                <Alert severity="info" className='col-12'>
                    This table contains all employees. Select on an employee to update it.
                </Alert>
                : null}

            {props.sanction === undefined && !props.idR ?
                <Form className='col-12'>

                    <div className='row mt-2 mb-2 ml-2'>
                        <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3'>
                            <Controls.Autocomplete
                                fullWidth variant="standard"
                                name="emp"
                                label="Employee"
                                value={values.emp}
                                setValues={setValues}
                                options={empOptions}
                            />
                        </div>
                        {/* <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3'>
                                <Controls.Autocomplete
                                    fullWidth variant="standard"
                                    name="dept"
                                    label="Select Department"
                                    value={values.dept}
                                    setValues={setValues}
                                    options={departmentOptions}
                                />
                            </div>
                            <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3'>
                                <Controls.Select
                                    fullWidth variant="standard"
                                    name="facultyType"
                                    label="Select Faculty"
                                    value={values.facultyType}
                                    onChange={handleChange}
                                    options={faculty}
                                />
                            </div> */}
                        {/* <div className={`${guidelines.inputclass}`}>
                            <Controls.Checkbox
                                name="is_primary"
                                label="Is Primary"
                                required
                                value={values.is_primary}
                                onChange={handleChange}
                            />
                        </div> */}
                    </div>
                </Form> : null}

            <div className='col-12'>
                {
                    (values.emp !== 3) ?
                        <MatTable
                            actionsAtStart={true}
                            title={props.sanction !== undefined ? null : "Employees"}
                            columns={columns}
                            data={Data}
                            bodyHeight="45vh"
                            // onUpdate={update}
                            isLoading={loadingA || loadingB}
                            onRowClick={(event, rowData) => {
                                if (props.user?.role !== 'DVO') {
                                    console.log(event.target, rowData);
                                    console.log(rowData.emp_id);
                                    handleClick(rowData.emp_id)
                                }
                            }}
                            {...nonDeletedActions}
                            Options={options}
                        /> : <MatTable
                            actionsAtStart={true}
                            title={props.sanction !== undefined ? null : "Employees"}
                            columns={columns}
                            data={Data}
                            bodyHeight="45vh"
                            // onUpdate={update}
                            isLoading={loadingA || loadingB}
                            // onRowClick={(event, rowData) => {
                            //     console.log(event.target, rowData);
                            //     console.log(rowData.emp_id);
                            //     handleClick(rowData.emp_id)
                            // }}
                            {...actions}
                            Options={options}
                        />
                }
            </div>
        </div>
    </Card>
</>
)
}

export default AllEmployees;