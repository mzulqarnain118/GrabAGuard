import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import {  Stack } from '@mui/material';
import { ApiCallGet, ApiCallPost } from '../../../../Modules/CoreModules/ApiCall';
import guidelines from '../../../../Modules/Guidelines/Guidelines';
import Select from '../../../../Modules/UiModules/Control/Select';
import { Form, useForm } from '../../../../Modules/UiModules/Control/useForm';
import Toast from '../../../../Modules/UiModules/Core/Toast/Toast';
import Formheading from '../../../../Modules/UiModules/Control/Formheading';
import Controls from '../../../../Modules/UiModules/Control/Controls';
import GetFormattedDate from '../../../../Modules/CoreModules/FormattedDate';
import MatTable from '../../../../Modules/MaterialTable/MaterialTable';   
const Gazzated = () => {
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [jobNatureOptions, setJobNatureOptions] = useState([]);
    const [jobNatureLookup, setJobNatureLookup] = useState([]);
    const [maritalStatusOptions, setMaritalStatus] = useState([])
    const [maritalStatusLookup, setMaritalLookup] = useState([])
    const [loading, setLoading] = useState(true);
    const [column, EnableColumn] = useState(false);
    const [updated, setUpdated] = useState(0);
    const [Data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const [empScaleOptions, setEmpScaleOptions] = useState([]);
    const [empScaleLookup, setEmpScaleLookup] = useState([]);
    const [designationOptions, setDesignationOptions] = useState([]);
    const [designationLookup, setDesignationLookup] = useState([]);
    const [Religion, setReligion] = useState([]);
    const [ReligionLookup, setReligionLookup] = useState([]);
    const [LeavingStatusOptions, setLeavingStatusOptions] = useState([]);
    const [LeavingStatusLookup, setLeavingStatusLookup] = useState([]);
    const [genderLookup, setgenderLookup] = useState([]);
    const [departmentlookup, setDepartmentLookup] = useState([]);
    const ReportingType=[{ id:1,title: "All Employee"},{id:2,title: "Gazzeted" },{id:3,title: "Non-Gazzeted" }];

    const initialFValues = {
        dept: '',
        jobNature: '',
        EmpType:ReportingType[0].id?? '',
        scale: '',
        desig: '',
        genderValue: '',
        facultyType: '',
        religion:'',
        martial:''
    }
    const gender = [{ id:'M',title: "Male"},{id:'F',title: "Female" }];
    const CurdateFormated = currentDate =>  currentDate.getDate() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' +currentDate.getFullYear();

    const faculty = [
        { id: 0, title: 'Non - Teaching' }, { id: 1, title: 'Teaching' }
    ]
    const {
        values,
        setValues,
        handleChange
    } = useForm(initialFValues);
    const handleSubmit = async (e) => {
        e.preventDefault();


    }

    const columns = [
        { title: "Emp ID",   field: 'emp_id', type: 'numeric', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "left" } ,export:false},
        // { title: "Form No",    field: 'form_no', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        // { title: "AdvertNo", render: (row) => (row.adv_no === null) ? <b style={{ marginLeft: "15px" }} > —</b > : row.adv_no,  field: 'adv_no', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Employee Name",  field: 'emp_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "NIC",  field: 'nic', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Father Name", field: 'father_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        // { title: "Spouse Name",  export:false,field: 'spouse_name', render: (row) => (row.spouse_name === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.spouse_name, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Designation",   field: 'desig_id',  lookup: designationLookup,type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Job Nature", field: "job_nature", lookup: jobNatureLookup,   cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Scale", field: "emp_scale", lookup:  empScaleLookup,   cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Department", field: 'dept_id', lookup: departmentlookup, type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        // { title: "SubDepartment",export:false, field: 'sub_dept_name', type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Teaching", field: 'is_teaching', type: 'boolean', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Gender", field: 'gender', type: 'text',  lookup: genderLookup, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Religion",  field: 'religion', type: 'text', lookup: ReligionLookup, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "MaritalStatus",  field: 'marital_status', type: 'text', lookup: maritalStatusLookup, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Releaving Status", field: 'leaving_status', lookup: LeavingStatusLookup,  type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
               { title: "JoiningDate",  field: 'joining_date',render:(row)=>CurdateFormated(new Date(row.joining_date)), cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
               { title: "Leaving", field: 'leaving_date',render:(row)=>CurdateFormated(new Date(row.leaving_date)), type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: (e, rowData) => { return { textAlign: "center" } }, headerStyle: { textAlign: "center" } },
              
        // { title: "OrderNo",  field: 'order_no', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    //     { title: "Passport No",  field: 'passport_no', render: (row) => (row.passport_no === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.passport_no, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    //     { title: "Mobile No",export:false,  field: 'phone_1', type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    //     { title: "Office No", export:false, field: 'phone_2', type: 'text', render: (row) => (row.phone_2 === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.phone_2, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    //     { title: "Date of Birth",export:false,  type: 'date', dateSetting: { locale: "en-GB" }, field: 'date_of_birth', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    //   { title: "Area Special", export:false, type: 'text', render: (row) => (row.area_special === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.area_special, field: 'area_special', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    //     { title: "Nationality",  field: 'nationality', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" },export:false, },
    //     { title: "Present Address",  field: 'present_address', type: 'string', cellStyle: { textAlign: "left", whiteSpace: "break-spaces" }, headerStyle: { textAlign: "left" } ,export:false,},
    //     { title: "Permanent Address",  field: 'permanent_addreess', type: 'string', cellStyle: { textAlign: "left", whiteSpace: "break-spaces" }, headerStyle: { textAlign: "left" },export:false, },
    //     { title: "Email", export:false, render: (row) => (row.email_address === null) ? <b style={{ marginLeft: "60px" }} > —</b > : row.email_address, field: 'email_address', type: 'email', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    //     { title: "Domicile",field: 'domicile', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left",   }       , export:false, 
    // },
    ];
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                //previous experience apis
                var result = await ApiCallPost('/get_all_employee', { emp:null });
                console.log('dataemployee', result)
                if (result.error) {
                    Toast(result.text, 'error');
                    return;
                }
                else {

                    if(values.EmpType===1)
                    setData(result.data);
                    if(values.EmpType===2)
                    setData(result.data.filter(row=>row.emp_scale>15));
                   else if(values.EmpType===3)
                    setData(result.data.filter(row=>row.emp_scale<16));

                    // setFilterData(result.data.filter(row=>row.emp_scale>15));
                }
                
                var getDepartment = await ApiCallGet('/getdepartment');
                if (getDepartment.error) {
                    Toast(getDepartment.text, 'error');
                    return;
                }
                else {
                    let departmentData = getDepartment.data.map((item) => {
                        return { id: item.dept_id, title: item.dept_name }
                    });
                    setDepartmentOptions(departmentData);
                    setDepartmentLookup((old) => {
                        for (let i = 0; i < getDepartment.data.length; i++) {
                            old[getDepartment.data[i].dept_id] = getDepartment.data[i].dept_name;
                        }
                        return old;
                    });
                }

                var result4 = await ApiCallGet('/getjobnature');
                if (result4.error) {
                    Toast(result4.text, 'error');
                    return;
                }
                else {
                    let JobData = result4.data.map((item) => {
                        return { id: item.nature_id, title: item.nature_desc }         });
                        setJobNatureOptions(JobData);
                    setJobNatureLookup((old) => {
                        for (let i = 0; i < result4.data.length; i++) {
                            old[result4.data[i].nature_id] = result4.data[i].nature_desc;
                        }
                        return old;
                    });
                }
        
                    setgenderLookup((old) => {
                        for (let i = 0; i < gender.length; i++) {
                            old[gender[i].id] = gender[i].title;
                        }
                        return old;
                    });

                var getDesignation = await ApiCallGet('/getdesignation');
                if (getDesignation.error) {
                    Toast(getDesignation.text, "error");
                    return;
                }
                else {
                    let designationData = getDesignation.data.map((item) => {
                        return { id: item.desig_id, title: item.desig_name }         });
                        setDesignationOptions(designationData);
                    setDesignationLookup((old) => {
                        for (let i = 0; i < getDesignation.data.length; i++) {
                            old[getDesignation.data[i].desig_id] = getDesignation.data[i].desig_name;
                        }
                        return old;
                    });
                }
            
               
                var getScale = await ApiCallGet('/getscale');
                if (getScale.error) {
                    Toast(getScale.text, "error");
                    return;
                }
                else {
                    let getScale1 = getScale.data.map((item) => {
                        return { id: item.scale_id, title: item.scale_number }         });
                        setEmpScaleOptions(getScale1);
                    setEmpScaleLookup((old) => {
                        for (let i = 0; i < getScale.data.length; i++) {
                            old[getScale.data[i].scale_id] = getScale.data[i].scale_number;
                        }
                        return old;
                    });
                }
            
             
                var result5 = await ApiCallGet('/get_marital_status_list');
                if (result5.error) {
                    Toast(result4.text, 'error');
                    return;
                }
                else {
                    let getMartial = result5.data.map((item) => {
                        return { id: item.marital_id, title: item.marital_desc }         });
                        setMaritalStatus(getMartial);
                    setMaritalLookup((old) => {
                        for (let i = 0; i < result5.data.length; i++) {
                            old[result5.data[i].marital_id] = result5.data[i].marital_desc;
                        }
                        return old;
                    });
                }
                let result6 = await ApiCallGet('/get_religion');
                if (result6.error) {
                    Toast(result6.text, "error");
                } 
                else {
                    let newData = result6.data.map((item) => {
                        return { id: item.religion_id, title: item.religion_name }
                    });
                    setReligion(newData);
                    setReligionLookup((old) => {
                        for (let i = 0; i < result6.data.length; i++) {
                            old[result6.data[i].religion_id] = result6.data[i].religion_name;
                        }
                        return old;
                    });
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
                setLeavingStatusLookup((old) => {
                    for (let i = 0; i < GetLeavingStatus.data.length; i++) {
                        old[GetLeavingStatus.data[i].leaving_id] = GetLeavingStatus.data[i].leaving_desc;
                    }
                    return old;
                });
            }
    

            }
            catch {
                alert("error")
            }
            setLoading(false);
        }
        fetchData();
    }, [updated, values]);
    const options = {
        filtering: true,
         exportAllData:true,
        exportButton: {
            pdf: true,
            csv: true,     
        }
    }
    return (
        <>
            <Card>
                <CardContent>
                        <Stack>
                            <Formheading label='Gazzated' /> 
                             <div className="row pl-3 pr-3 pt-0 pb-0">
                               <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="EmpType"
                                        label="Employee Type"
                                        value={values.EmpType}
                                        setValues={setValues}
                                     options={ReportingType}
                                    />
                                </div>
                               <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="dept"
                                        label="Department Wise"
                                        value={values.dept}
                                        setValues={setValues}
                                        
                                        options={departmentOptions}
                                    />
                                </div>
                                <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="jobNature"
                                        label="Base Wise"
                                        value={values.jobNature}
                                        setValues={setValues}
                                        options={jobNatureOptions}
                                    />
                                </div>
                                <div className={`${guidelines.inputclass}`}>
                                    <Controls.Select
                                        fullWidth variant="standard"
                                        name="facultyType"
                                        label="Select Faculty"
                                        value={values.facultyType}
                                        onChange={handleChange}
                                        options={faculty}
                                    />
                                </div>
                               <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="scale"
                                        label="Scale Wise"
                                        value={values.scale}
                                        setValues={setValues}
                                        options={empScaleOptions}
                                    />
                                </div>  <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="desig"
                                        label="Designation Wise"
                                        value={values.desig}
                                        setValues={setValues}
                                        options={designationOptions}
                                    />
                                </div>
                                <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="martial"
                                        label="Martial Status"
                                        value={values.martial}
                                        setValues={setValues}
                                         change={(e)=>{setFilterData(Data.filter(row=>row.marital_status===e))}}
                                        options={maritalStatusOptions}
                                    />
                                </div>
                               
                                <div className={`${guidelines.inputclass}`}>
                                    <Controls.Select
                                        fullWidth variant="standard"
                                        name="genderValue"
                                        label="Select Gender"
                                        value={values.genderValue}
                                        onChange={handleChange}
                                        options={gender}
                                    />
                                </div>
                                   <div className={`${guidelines.inputclass}`}>
                                    <Controls.Select
                                        name="religion"
                                        label="Religion"
                                        value={values.religion}
                                        onChange={handleChange
                                            // Data.filter(row=>row.religion===e.target.value)
                                        }
                                        options={Religion}

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
</div>
                            <div className='col-12'>
                                <MatTable
                                    // actionsAtStart={true}
                                    title={"Gazzated Employees"}
                                    columns={columns}
                                    data={Data}
                                    bodyHeight="45vh"
                                    isLoading={loading}
                                    Options={options}
                                />
                            </div>
                        </Stack >
                </CardContent >
            </Card >
        </>

    );
}

export default Gazzated;