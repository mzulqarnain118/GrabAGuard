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
import { useForm } from '../../../../../Modules/UiModules/Control/useForm';

const DesignationSanction = (props) => {
    const initialFValues = {
        desig: props.desig.designation
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
    const [PData, setPData] = useState();
    const [PCData, setPCData] = useState();
    const [updated, setUpdated] = useState(0)

    const update = async (oldRow, newRow) => {

        let validate = true;
        if (newRow.total_seats < 0) {
            validate = false;
            Toast("Total Seats Can't Be Negative!", "error");
        } else if (newRow.total_seats < newRow.occupied_seats) {
            validate = false;
            Toast("Total Seats Can't Be Less Than Occupied Seats!", "error");
        }


        if (validate === true) {


            const data = {
                total_seats: newRow.total_seats,
                desigID: newRow.desig_id
            }
            setPData(data);


            const result1 = await ApiCallPost('/Update_sanction_desig', { ...data });
            console.log(result1.data.Status);
            // console.log(result);
            if (result1.error) {
                Toast(result1.text, "error");
            } else if (result1.data.Status == 0) {
                Toast("Total Seats Can't Be Less Than Sum of Assigned Department Seats!", "error");
            } else {


                setUpdated(old => (old + 1));
                console.log(result1)
                Toast('Data Updated Successfully!', 'success');
            }
        }
    };

    const columns = [
        // { title: "Department ID", field: 'dept_id', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false, hidden: true },
        // { title: "Department", field: 'dept_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        // { title: "Sub Department ID", field: 'sub_dept_id', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false, hidden: true },
        // { title: "Sub Department", field: 'sub_dept_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        {
            title: "Designation ID ",
            field: 'desig_id',
            type: 'numeric',
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
            editable: () => false,
            hidden: true
        },
        {
            title: "Designation Name",
            field: 'desig_name',
            type: 'string',
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
            editable: () => false
        },
        {
            title: "Total Seats",
            type: 'numeric',
            field: 'total_seats',
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
            editable: () => true
        },
        {
            title: "Ocuupied Seats",
            editable: () => false,
            type: 'numeric',
            field: 'occupied_seats',
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" }
        },
        {
            title: "Seats Not Assigned To Any Dept",
            editable: () => false,
            type: 'numeric',
            field: '',
            render: (row) => (parseInt(row.total_seats) - parseInt(row.occupied_seats)),
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" }
        },
        {
            title: "Enter By",
            field: 'emp_name',
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
            editable: () => false
        },
        {
            title: "Entry Time",
            field: 'entry_datetime',
            type: 'datetime',
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
            editable: () => false
        },
    ];

    useEffect(() => {

        const fetchData = async () => {
            try {

                let result = await ApiCallGet('/get_seat_sanctions_desig');
                setData([...result.data]);
                setRealData([...result.data]);
                console.log(result.data[0].total_seats);
                // setPData(result.data.total_seats)
                setPData(result.data[0].total_seats)

            }
            catch {
                alert("error")
            }
        }

        fetchData();

    }, [updated]);

    useEffect(() => {
        setValues({ desig: props.desig.designation });
    }, [props.desig]);

    useEffect(() => {
        desigFilter();
    }, [values]);




    const desigFilter = () => {

        setData(() => [...RealData]);
        if (values.desig !== -1 && values.desig !== null) {
            setData(() => RealData.filter((val) => {
                return (val.desig_id === values.desig)
            }))
        }

    }

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

    //                 return newArr;
    //             });
    //         }
    //     }

    // }

    return (

        <>

            <div style={{ marginTop: '2rem', marginBottom: '5rem' }}>



                <MatTable
                    detailPanel={rowData => {

                        return (
                            <>
                                {console.log(rowData)}
                                <DetailPanel dept={rowData.dept_id} subdept={rowData.sub_dept_id} desig={rowData.desig_id} PData={PData} />
                            </>
                        )
                    }}
                    actionsAtStart={true}
                    title="Designation Wise Sanction Seats"
                    columns={columns}
                    data={Data}
                    onUpdate={update}

                />

            </div>

        </>
    );
}

export default DesignationSanction;

const DetailPanel = (props) => {
    const [empData, setEmpData] = useState([])
    const [updated, setUpdated] = useState(0);
    const PData = props.PData

    const update = async (oldRow, newRow) => {

        console.log('in update funtion');
        let validate = true;
        if (newRow.total_seats < 0) {
            validate = false;
            Toast("Total Seats Cant't Be Negative!", "error");
        } else if (newRow.total_seats < newRow.occupied_seats) {
            validate = false;
            Toast("Total Seats Can't Be Less Than Occupied Seats!", "error");
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
                Toast("Sum of Total Assigned Dept Seats Cannot Be Greater Than Desig Total Seats!", "error");
            } else {


                setUpdated(old => old + 1);
                Toast('Data Updated Successfully!', 'success');
            }
        }
    };

    useEffect(() => {
        const getData = async () => {

            let screendata = {
                //dept_id: props.dept,
                //sub_dept_id: props.subdept,
                desig_id: props.desig
            }
            console.log('screendata', screendata)
            let result = await ApiCallGet('/get_seat_sanctions');
            // empData([...result.data]);
            setEmpData([...result.data]);
            setEmpData((old) => old.filter((row) => row.desig_id === props.desig));
        }
        getData();
    }, [updated]);


    const columns1 = [

        { title: "Department ID", field: 'dept_id', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false, hidden: true },
        { title: "Department", field: 'dept_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        { title: "Sub Department ID", field: 'sub_dept_id', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false, hidden: true },
        { title: "Sub Department", field: 'sub_dept_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        { title: "Total Seats", type: 'numeric', field: 'total_seats', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => true },
        { title: "Ocuupied Seats", editable: () => false, type: 'numeric', field: 'occupied_seats', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Enter By", field: 'emp_name', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
        { title: "Entry Time", field: 'entry_datetime', type: 'datetime', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, editable: () => false },
    ];
    const history = useHistory();
    const handleClick = (emp_id) => {
        history.push({ pathname: `/main/employee-fix/update-employee/${emp_id}` });
    }
    return (
        <>
            <MatTable
                detailPanel={rowData => {

                    return (
                        <>
                            {console.log(rowData)}
                            <DetailPanel2 dept={rowData.dept_id} subdept={rowData.sub_dept_id} desig={rowData.desig_id} />
                        </>
                    )
                }}


                title=""
                columns={columns1}
                data={empData}
                actionsAtStart={true}
                onUpdate={update}
            // onRowClick={(event, rowData) => {
            //     console.log(event.target, rowData);
            //     handleClick(rowData.emp_id)
            // }}

            />
        </>
    )
}
export {
    DetailPanel
}



const DetailPanel2 = (props) => {
    const [empData, setEmpData] = useState([])
    useEffect(() => {
        const getData = async () => {

            let screendata = {
                dept_id: props.dept ?? null,
                sub_dept_id: props.subdept ?? null,
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
                // onUpdate={update}
                onRowClick={(event, rowData) => {
                    console.log(event.target, rowData);
                    handleClick(rowData.emp_id)
                }
                }
            />
        </>
    )
}
export {
    DetailPanel2
}
