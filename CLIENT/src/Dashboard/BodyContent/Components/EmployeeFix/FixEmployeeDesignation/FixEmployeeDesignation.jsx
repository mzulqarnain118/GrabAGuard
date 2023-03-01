import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import GetFormattedDate from '../../../../../Modules/CoreModules/FormattedDate';

const FixEmployeeDesignation = () => {
    const [jobNatureOptions, setJobNatureOptions] = useState({});
    const [departmentOption, setDepartmentOption] = useState({});
    const [SubDepartmentOption, setSubDepartmentOption] = useState({});
    const [leavingStatus, setLeavingStatus] = useState({});
    const [getScale, setgetScale] = useState({});
    const [OrderType, setOrderType] = useState({});
    const [Designation, setDesignation] = useState({});
    const [PackageType, setPackageType] = useState({});
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [vacant, setVacant] = useState({ 'N': 'Not Vacant', 'Y': 'Vacant' });
    // eslint-disable-next-line no-unused-vars
    const [absorb, setAbsorb] = useState({ 'N': 'Not Absorbed', 'Y': 'Absorbed' });

    useEffect(() => {

        const fetchData = async () => {
            try {
                //previous experience apis
                var result = await ApiCallGet('/get_emp_designation_data');
                console.log(result.data)
                setData(result.data);

                // GetLeavingStatus
                var result2 = await ApiCallGet('/GetLeavingStatus');
                console.log(result2.data)
                setLeavingStatus((old) => {
                    old[null] = <b style={{ marginLeft: "40px" }} > —</b >;
                    for (let i = 1; i < result2.data.length; i++) {
                        old[result2.data[i - 1].leaving_id] = result2.data[i - 1].leaving_desc;
                    }
                    console.log(old);
                    return old;
                });

                var result4 = await ApiCallGet('/getjobnature');
                setJobNatureOptions((old) => {
                    for (let i = 0; i < result4.data.length; i++) {
                        old[result4.data[i].nature_id] = result4.data[i].nature_desc;
                    }
                    console.log('Job nat: ', old);
                    return old;
                });



                var result5 = await ApiCallGet('/getdepartment');
                setDepartmentOption((old) => {
                    for (let i = 0; i < result5.data.length; i++) {
                        old[result5.data[i].dept_id] = result5.data[i].dept_name;
                    }
                    console.log('dept', old);
                    console.log("hhhhhh", result5);
                    return old;
                });



                var result6 = await ApiCallGet('/getsubdepartmentdata');
                setSubDepartmentOption((old) => {
                    old[null] = <b style={{ marginLeft: "40px" }} > —</b >;
                    for (let i = 0; i < result6.data.length; i++) {
                        old[result6.data[i].sub_dept_id] = result6.data[i].sub_dept_name;
                    }
                    console.log(old);
                    console.log("subdept", result6);
                    return old;
                });



                var result7 = await ApiCallGet('/getscale');
                setgetScale((old) => {
                    for (let i = 0; i < result7.data.length; i++) {
                        old[result7.data[i].scale_id] = result7.data[i].scale_code;
                    }
                    console.log(old);
                    console.log("scale", result7);
                    return old;
                });

                var result8 = await ApiCallGet('/getordertype');
                setOrderType((old) => {
                    for (let i = 0; i < result8.data.length; i++) {
                        old[result8.data[i].type_id] = result8.data[i].type_desc;
                    }
                    console.log(old);
                    console.log("order type", result8);
                    return old;
                });


                var result9 = await ApiCallGet('/getdesignation');
                setDesignation((old) => {
                    for (let i = 0; i < result9.data.length; i++) {
                        old[result9.data[i].desig_id] = result9.data[i].desig_name;
                    }
                    console.log(old);
                    console.log("designation", result8);
                    return old;
                });


                var result10 = await ApiCallGet('/Select_Package_Type');
                setPackageType((old) => {
                    old[null] = <b style={{ marginLeft: "40px" }} > —</b >;
                    for (let i = 0; i < result10.data.length; i++) {
                        old[result10.data[i].package_type_id] = result10.data[i].package_desc;
                    }
                    console.log(old);
                    console.log("packagetype", result10);
                    return old;
                });
            }
            catch {
                alert("error")
            }
            setLoading(false);
        }
        fetchData();
    }, []);


    const [Data, setData] = useState([]);
    const columns = [

        { title: "Serial No", field: "serial_no", hidden: () => true, editable: () => false, type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Emp ID", field: "emp_id", editable: () => false, type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Employee Name", field: "emp_name", editable: () => false, type: 'string', cellStyle: { textAlign: "left", whiteSpace: "nowrap" }, headerStyle: { textAlign: "left" } },
        { title: "Father Name", field: "father_name", editable: () => false, type: 'string', cellStyle: { textAlign: "left", whiteSpace: "nowrap" }, headerStyle: { textAlign: "left" } },
        { title: "Spouse Name", field: 'spouse_name', editable: () => false, render: (row) => (row.spouse_name === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.spouse_name, type: 'string', cellStyle: { textAlign: "left", whiteSpace: "nowrap" }, headerStyle: { textAlign: "left" } },
        { title: "CNIC", field: "nic", editable: () => false, type: 'string', cellStyle: { textAlign: "left", whiteSpace: "nowrap" }, headerStyle: { textAlign: "left" } },
        { title: "Passport No", field: "passport_no", editable: () => false, render: (row) => (row.passport_no === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.passport_no, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Adverdistment No", field: 'adv_no', editable: () => false, render: (row) => (row.adv_no === null) ? <b style={{ marginLeft: "45px" }} > —</b > : row.adv_no, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Form No", field: 'form_no', editable: () => true, type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Job Nature", field: "job_nature", lookup: jobNatureOptions, editable: () => true, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Order No", field: 'order_no', editable: () => true, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Order Type", field: 'order_type', lookup: OrderType, editable: () => true, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Order Date", field: "order_date", editable: () => true, type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Department", field: "dept_id", lookup: departmentOption, editable: () => true, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "SubDepartment", field: "sub_dept_id", lookup: SubDepartmentOption, editable: () => true, type: 'string', cellStyle: { textAlign: "left", whiteSpace: "break-spaces" }, headerStyle: { textAlign: "left" } },
        { title: "Designation", field: 'desig_id', lookup: Designation, editable: () => true, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Desig Remarks", field: 'remarks', render: (row) => (row.remarks === null) ? <b style={{ marginLeft: "40px" }} > —</b > : row.remarks, editable: () => true, type: 'string', cellStyle: { textAlign: "left", whiteSpace: "break-spaces" }, headerStyle: { textAlign: "left" } },
        { title: "Scale", field: 'emp_scale', lookup: getScale, editable: () => true, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Package Type", field: 'package_type', lookup: PackageType, editable: () => true, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Package Amount", field: "package_amount", render: (row) => (row.package_amount === null) ? <b style={{ marginLeft: "45px" }} > —</b > : row.package_amount, editable: () => true, type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Teaching", field: 'is_teaching', type: 'boolean', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Vacant ", field: "vacant", lookup: vacant, editable: () => true, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Absorb ", field: "abosrb", lookup: absorb, editable: () => true, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Contact Start Date", field: "contract_startdate", render: (row) => (row.contract_startdate === null) ? <b style={{ marginLeft: "45px" }} > —</b > : row.contract_startdate, editable: () => true, type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Contact End Date", field: "contract_enddate", render: (row) => (row.contract_enddate === null) ? <b style={{ marginLeft: "45px" }} > —</b > : row.contract_enddate, editable: () => true, type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Joining Date", field: "joining_date", editable: () => true, type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Releaving Date", field: "leaving_date", render: (row) => (row.leaving_date === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.leaving_date, editable: () => true, type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Releaving Remarks", field: "leaving_remarks", render: (row) => (row.leaving_remarks === null) ? <b style={{ marginLeft: "40px" }} > —</b > : row.leaving_remarks, editable: () => true, type: 'string', cellStyle: { textAlign: "left", whiteSpace: "break-spaces" }, headerStyle: { textAlign: "left" } },
        { title: "Releaving Status", field: 'leaving_status', lookup: leavingStatus, editable: () => true, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },

    ];

    const update = async (oldRow, newRow) => {

        let validate = true;

        if (newRow.form_no < 0) {
            validate = false;
            Toast("Form No. Can't Be Negative", "error");
        }
        if (newRow.form_no === 0) {
            validate = false;
            Toast("Form No. Can't Be Zero", "error");
        }
        if (newRow.form_no === '' || isNaN(newRow.form_no)) {
            validate = false;
            Toast("Form No. Can't Be Empty", "error");
        }
        if (newRow.order_no === '') {
            validate = false;
            Toast("Order No. Can't Be Empty", "error");
        }
        if (newRow.order_date === '' || newRow.order_date === null || newRow.order_date === undefined) {
            validate = false;
            Toast("Order Date Can't Be Empty", "error");
        }
        if (newRow.package_amount < 0) {
            validate = false;
            Toast("Package Amount Can't Be Negative", "error");
        }
        if (newRow.joining_date === '' || newRow.joining_date === null || newRow.joining_date === undefined) {
            validate = false;
            Toast("Joining Date Can't Be Empty", "error");
        }

        if (validate === true) {

            const data = {
                serial_no: newRow.serial_no,
                emp_id: newRow.emp_id,
                form_no: newRow.form_no,
                job_nature: newRow.job_nature,
                order_no: newRow.order_no,
                order_type: newRow.order_type,
                adv_no: (newRow.adv_no === '') ? null : newRow.adv_no,
                order_date: GetFormattedDate(new Date(newRow.order_date)),
                emp_scale: newRow.emp_scale,
                package_type: newRow.package_type,
                package_amount: (newRow.package_amount === '' || newRow.package_amount === 0 || newRow.package_amount === '0' || isNaN(newRow.package_amount)) ? null : newRow.package_amount,
                remarks: (newRow.remarks === '') ? null : newRow.remarks,
                is_teaching: newRow.is_teaching,
                dept_id: newRow.dept_id,
                sub_dept_id: newRow.sub_dept_id,
                desig_id: newRow.desig_id,
                vacant: newRow.vacant,
                abosrb: newRow.abosrb,
                contract_startdate: (newRow.contract_startdate === '' || newRow.contract_startdate === null || newRow.contract_startdate === undefined) ? null : GetFormattedDate(new Date(newRow.contract_startdate)),
                contract_enddate: (newRow.contract_enddate === '' || newRow.contract_enddate === null || newRow.contract_enddate === undefined) ? null : GetFormattedDate(new Date(newRow.contract_enddate)),
                joining_date: GetFormattedDate(new Date(newRow.joining_date)),
                leaving_date: (newRow.leaving_date === '' || newRow.leaving_date === null || newRow.leaving_date === undefined) ? null : GetFormattedDate(new Date(newRow.leaving_date)),
                leaving_remarks: (newRow.leaving_remarks === '') ? null : newRow.leaving_remarks,
                leaving_status: newRow.leaving_status
            }

            console.log(data);

            const result = await ApiCallPost('/update_emp_designation', { ...data });

            if (result.error) {
                Toast(result.text, "error");
            } else {
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].serial_no === data.serial_no) {
                        const newData = [...Data];
                        newData[i] = {
                            ...Data[i],
                            emp_id: data.emp_id,
                            form_no: data.form_no,
                            job_nature: data.job_nature,
                            order_no: data.order_no,
                            order_type: data.order_type,
                            adv_no: (data.adv_no === '') ? null : data.adv_no,
                            order_date: data.order_date,
                            emp_scale: data.emp_scale,
                            package_type: data.package_type,
                            package_amount: (data.package_amount === '' || data.package_amount === 0 || data.package_amount === '0') ? null : data.package_amount,
                            remarks: (data.remarks === '') ? null : data.remarks,
                            is_teaching: data.is_teaching,
                            dept_id: data.dept_id,
                            sub_dept_id: data.sub_dept_id,
                            desig_id: data.desig_id,
                            vacant: data.vacant,
                            abosrb: data.abosrb,
                            contract_startdate: (data.contract_startdate === '') ? null : data.contract_startdate,
                            contract_enddate: (data.contract_enddate === '') ? null : data.contract_enddate,
                            joining_date: data.joining_date,
                            leaving_date: (data.leaving_date === '') ? null : data.leaving_date,
                            leaving_remarks: (data.leaving_remarks === '') ? null : data.leaving_remarks,
                            leaving_status: data.leaving_status
                        };
                        setData([...newData]);
                        break;
                    }
                }
                Toast('Data Updated Successfully!', 'success');
            }

        }

    }
    return (
        <>
            <Stack>
                <MatTable
                    actionsAtStart={true}
                    title="Fix Employees Designation"
                    columns={columns}
                    data={Data}
                    onUpdate={update}
                    isLoading={loading}
                    bodyHeight={'68vh'}
                />

            </Stack>

        </>
    )
}

export default FixEmployeeDesignation
