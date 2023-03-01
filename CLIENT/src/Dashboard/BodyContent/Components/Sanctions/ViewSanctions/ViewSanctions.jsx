import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { Card, CardContent, Typography } from "@mui/material";
import Select from '../../../../../Modules/UiModules/Control/Select';
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import guidelines from '../../../../../Modules/Guidelines/Guidelines';
import AllEmployees from '../../EmployeeFix/AllEmployees/AllEmployees';
//import { GetEmpSenctionedSeats } from '../../../../../../../hrm-server/Routes/Sanctions/SanctionsData';
import Controls from '../../../../../Modules/UiModules/Control/Controls'
import DesignationSanction from './DesignationSanction';
import { useForm } from '../../../../../Modules/UiModules/Control/useForm';

const ViewSanctions = () => {
    const initialFValues = {
        dept: null,
        subdept: null,
        desig: null,
        // SanctionType: 2,
    }
    const { values, setValues, handleChange } = useForm(initialFValues);
    const [department, setDepartment] = useState(-1);
    const [subDepartment, setSubDepartment] = useState(-1);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [subDepartmentOptions, setSubDepartmentOptions] = useState([]);
    const [subdptfilter, setSubdptfilter] = useState([]);
    const [enable, setEnable] = useState(true);
    const [DesignationOptions, setDesignationOptions] = useState([])
    const [designation, setDesignation] = useState(-1);
    const [Data, setData] = useState([]);
    const [RealData, setRealData] = useState([]);
    const [SanctionValue, setSanctionValue] = React.useState(1);
    const [updated, setUpdated] = useState(0)

    const SanctionType = [{ id: 1, title: 'Designation Wise' }, { id: 2, title: 'Department Wise' },

    ];

    const update = async (oldRow, newRow) => {

        console.log('in update funtion');
        let validate = true;
        if (newRow.total_seats < 0) {
            validate = false;
            Toast("Total Seats Cannot Be Negative!", "error");
        } else if (newRow.total_seats < newRow.occupied_seats) {
            validate = false;
            Toast("Total Seats Can't Less Than Occupied Seats!", "error");
        }


        if (validate === true) {

            const data = {
                total_seats: parseInt(newRow.total_seats),
                dept_id: newRow.dept_id,
                sub_dept_id: newRow.sub_dept_id,
                desigID: newRow.desig_id

            }
            console.log(data);

            const result1 = await ApiCallPost('/Update_sanction_dept', { ...data });
            if (result1.error) {
                Toast(result1.text, "error");
            } else if (result1.data.Status === 0) {
                Toast("Sum of Dept Total Seats Can't Be Greater Than Desig Total Seats!", "error");
            } else {


                setUpdated(old => (old + 1));
                Toast('Data Updated Successfully!', 'success');
            }
        }
    };


    const columns = [
        { title: "Department ID", field: 'dept_id', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false, hidden: true },
        { title: "Department", field: 'dept_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        { title: "Sub Department ID", field: 'sub_dept_id', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false, hidden: true },
        { title: "Sub Department", field: 'sub_dept_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        { title: "Designation ID ", field: 'desig_id', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false, hidden: true },
        { title: "Designation Name", field: 'desig_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        { title: "Total Seats", type: 'numeric', field: 'total_seats', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => true },
        { title: "Ocuupied Seats", editable: () => false, type: 'numeric', field: 'occupied_seats', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Enter By", field: 'emp_name', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        { title: "Entry Time", field: 'entry_datetime', type: 'datetime', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
    ];

    useEffect(() => {

        const fetchData = async () => {
            try {


                let getDepartment = await ApiCallGet('/getdepartment');
                //console.log(getDepartment);
                let departmentData = getDepartment.data.map((item) => {
                    return { id: item.dept_id, title: item.dept_name }
                });
                setDepartmentOptions(() => [{ id: -1, title: 'All departments' }, ...departmentData]);
                setDepartment(() => -1);
                setSubDepartment(() => -1);

                let getsubDepartment = await ApiCallGet('/getsubdepartmentdata');
                //console.log(getsubDepartment);
                let subDepartmentData = getsubDepartment.data.map((item) => {
                    return { id: item.sub_dept_id, title: item.sub_dept_name, main_id: item.dept_id }
                });
                setSubDepartmentOptions(() => [{ id: -1, title: 'All Sub departments' }, ...subDepartmentData]);
                setSubDepartment(() => -1);

                let getDesignation = await ApiCallGet('/getdesignation');
                if (getDesignation.error) {
                    Toast(getDesignation.text, "error");
                }
                else {
                    let designationData = getDesignation.data.map((item) => {
                        return { id: item.desig_id, title: item.desig_name }
                    });
                    setDesignationOptions(() => [{ id: -1, title: 'All Designation' }, ...designationData]);
                    setDesignation(() => -1)
                }

                let result = await ApiCallGet('/get_seat_sanctions');
                setData([...result.data]);
                setRealData([...result.data]);

            }
            catch {
                alert("error")
            }
        }

        fetchData();

    }, [updated]);



    const filter = (dept, subdept, desig) => {

        setData(() => [...RealData]);
        if (dept !== -1 && desig === -1) {
            setData(() => RealData.filter((val) => {
                return (val.dept_id === dept && val.sub_dept_id === subdept)
            }))
        }
        else if (dept !== -1 && desig !== -1) {
            setData(() => RealData.filter((val) => {
                return (val.dept_id === dept && val.sub_dept_id === subdept && val.desig_id === desig)
            }))
        }
        else if (dept === -1 && desig !== -1) {
            setData(() => RealData.filter((val) => {
                return (val.desig_id === desig)
            }))
        }

    }

    // const desigFilter = (desig, dept, subdept) => {

    //     setData(() => [...RealData]);
    //     if (desig !== -1) {
    //         setData(() => RealData.filter((val) => {
    //             return (val.desig_id === desig)
    //         }))
    //     }

    // }

    // const update = async (oldRow, newRow) => {

    //     if (newRow.occupied_seats < 0 || newRow.total_seats < 0) {
    //         Toast("Seats Can't Be Negative", 'error');
    //     } else {
    //         const result = await ApiCallPost('/updatesanctionseats', { deptID: oldRow.dept_id, subDeptID: oldRow.sub_dept_id, desigID: oldRow.desig_id, totalSeats: newRow.total_seats });
    //         if (result.error) {
    //             Toast(result.text, 'error');
    //         } else {
    //             setRealData((old) => {
    //                 const newArr = [...old];
    //                 for (let i = 0; i < newArr.length; i++) {
    //                     if (newArr[i].dept_id === newRow.dept_id && newArr[i].sub_dept_id === newRow.sub_dept_id && newArr[i].desig_id === newRow.desig_id) {
    //                         newArr[i].total_seats = newRow.total_seats;
    //                         newArr[i].occupied_seats = newRow.occupied_seats;
    //                         break;
    //                     }
    //                 }
    //                 setData(() => newArr);
    //                 filter(department, subDepartment);
    //                 return newArr;
    //             });
    //         }
    //     }

    // }

    return (

        <>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '2rem' }}>
                <Card>
                    <CardContent>
                        <form style={{ marginTop: '2rem', marginBottom: '5rem' }}>


                            <Typography variant="h6" color="text.secondary">
                                <b>Department Seats</b>

                            </Typography>


                            <div className="row mt-3 mr-0 ml-0" >


                                <div className={`${guidelines.inputclass}`}>



                                    <Select fullWidth
                                        required
                                        name="Department Nature"
                                        label="Sanction Type"
                                        value={SanctionValue}
                                        options={SanctionType}
                                        onChange={(e) => { setSanctionValue(e.target.value) }} />

                                </div>
                                {SanctionValue === 2 ?
                                    <>
                                        <div className={`${guidelines.inputclass}`}>
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
                                                                setSubDepartment(a[0].id);
                                                                filter(e, a[0].id, designation);
                                                            }
                                                            return a;
                                                        });
                                                    else
                                                        setSubDepartment(null);

                                                }}
                                                options={departmentOptions}
                                            />


                                        </div>


                                        <div className={`${guidelines.inputclass}`}>

                                            <Controls.Autocomplete
                                                name="sub_dept_id"
                                                label="Sub Department"
                                                options={subdptfilter}
                                                required
                                                change={(e) => { setSubDepartment(e); filter(department, e, designation); }}
                                                value={subDepartment ?? values.sub_dept_id}
                                                setValues={setValues}
                                            // disabled
                                            />
                                        </div>
                                    </>
                                    : null}

                                <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete fullWidth
                                        required
                                        name="designation"
                                        label="Designation"
                                        value={designation ?? values.desig}
                                        setValues={setValues}
                                        //disabled={enable}
                                        change={(e) => { setDesignation(e); filter(department, subDepartment, e); }}
                                        options={DesignationOptions}

                                    />
                                </div>
                            </div>
                            {SanctionValue === 2 ?
                                <div style={{ marginTop: '2rem', marginBottom: '5rem' }}>



                                    <MatTable
                                        detailPanel={rowData => {

                                            return (
                                                <>
                                                    {console.log(rowData)}
                                                    <DetailPanel dept={rowData.dept_id} subdept={rowData.sub_dept_id} desig={rowData.desig_id} />
                                                </>
                                            )
                                        }}
                                        actionsAtStart={true}
                                        title="Department Wise Sanction Seats"
                                        columns={columns}
                                        data={Data}
                                        onUpdate={update}

                                    />

                                </div> : <DesignationSanction desig={values} />}
                        </form>
                    </CardContent>
                </Card>

            </div>

        </>
    );
}

export default ViewSanctions;

const DetailPanel = (props) => {
    const [empData, setEmpData] = useState([])
    useEffect(() => {
        const getData = async () => {

            let screendata = {
                dept_id: props.dept,
                sub_dept_id: props.subdept,
                desig_id: props.desig
            }
            console.log('screendata', screendata)
            let result1 = await ApiCallPost('/get_senctioned_emp', screendata);
            console.log('dataemployee', result1)
            if (result1.error) {
                Toast(result1.text, 'error');
                return;
            }
            else {
                setEmpData(result1.data);
                return;
            }
        }
        getData();
    }, []);
    const columns1 = [

        { title: "Employee ID", field: 'emp_id', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        { title: "Employee Name", field: 'emp_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        { title: "Father Name", field: 'father_name', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        { title: "Employee CNIC", field: 'nic', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        { title: "Enter By", field: 'log_id', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        { title: "Entry Time", field: 'entry_datetime', type: 'datetime', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
    ];
    const history = useHistory();
    const handleClick = (emp_id) => {
        history.push({ pathname: `/main/employee-fix/update-employee/${emp_id}` });
    }
    return (
        <>
            <MatTable

                title=""
                columns={columns1}
                data={empData}
                onRowClick={(event, rowData) => {
                    console.log(event.target, rowData);
                    handleClick(rowData.emp_id)
                }}

            />
        </>
    )
}
export {
    DetailPanel
}

