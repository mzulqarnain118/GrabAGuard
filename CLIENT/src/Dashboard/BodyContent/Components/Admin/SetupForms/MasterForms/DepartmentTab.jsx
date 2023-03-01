import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import { ApiCallPost, ApiCallGet } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import DepartmentNature from './DepartmentNature';
import DepartmentType from './DepartmentType';
import DepartmentCategory from './DepartmentCategory';
import listformatter from '../../../../../../Modules/Utility/ListFormatter';
import Select from '../../../../../../Modules/UiModules/Control/Select';
import AddNewGeneral from '../../../../../../Modules/UiModules/Core/AddNewGeneral';


const DepartmentTab = (props) => {
    const [deptname, set_dept_name] = React.useState(props.data?.dept_name ?? '');
    const [deptcode, set_dept_code] = React.useState(props.data?.dept_code ?? '');

    const [value1, setvalue1] = React.useState(props.data?.dept_nat ?? '');
    const [value2, setvalue2] = React.useState(props.data?.dept_type ?? '');
    const [value3, setvalue3] = React.useState(props.data?.dept_cat ?? '');

    const [dept_cat, set_dept_cat] = React.useState([]);
    const [dept_type, set_dept_type] = React.useState([]);
    const [dept_nat, set_dept_nat] = React.useState([]);



    const [updated, setUpdated] = useState(0);


    useEffect(() => {

        const fetchData = async () => {

            var result0 = await ApiCallGet('/getdepartment');
            console.log(result0);
            // setrecord(result0.data);

            const result = await ApiCallGet('/Get_dept_nature');
            console.log(result);
            const newData = listformatter(result.data, 'nat_id', 'nat_desc');
            console.log(newData);
            set_dept_nat(newData);


            const result1 = await ApiCallGet('/Get_dept_type');
            console.log(result1);
            const newData1 = listformatter(result1.data, 'type_id', 'type_name');
            set_dept_type(newData1);


            const result2 = await ApiCallGet('/deptcat');
            console.log(result2);
            const newData2 = listformatter(result2.data, 'cat_id', 'cat_desc');
            set_dept_cat(newData2);
        };

        fetchData();


    }, [updated]);


    const handleformSubmit = async () => {



        var screen = {
            dept_code: deptcode,
            dept_name: deptname,
            dept_nat: value1,
            dept_type: value2,
            dept_cat: value3,
            order_no: null,
            order_file: null

        }

        if (props.submitAction === 'Insert') {
            const result1 = await ApiCallPost('/postdepartment', screen);
            if (result1.error) {
                Toast('Data Could Not be Inserted', 'error')
            }
            else {
                Toast('Data Inserted Successfully!', 'success')
                props.setopenPopup(false);
            }
        }
        else if (props.submitAction === 'Update') {

            screen = {
                ...screen, dept_id: props.data?.dept_id,
            };
            const result = await ApiCallPost('/update_department', screen);
            if (result.error) {
                Toast('Data Could Not be Updated', 'error')
            }
            else {
                Toast('Data Updated Successfully!', 'success')
                props.setopenPopup(false);
            }
        }
        else {
            Toast('Submit Action Not Defined', 'error');
        }

        props.setTable((old) => old + 1);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate())
            return;

        handleformSubmit();

    }

    const validate = () => {
        if (deptcode.dept_code === '') {
            Toast("Enter department Code", "error");
        }
        else if (deptname.dept_name === '') {
            Toast("Please enter department name", "error");
            return false;
        }
        else if (value3.dept_cat === null) {
            Toast("Enter department nature", "error");
        }
        else if (value1.dept_nat === null) {
            Toast("Enter department nature", "error");
        }
        else if (value2.dept_type === null) {
            Toast("Enter department Type", "error");
        }

        else {
            return true;
        }

        return false;
    }


    // const update = async (oldRow, newRow) => {

    //     let validate = true;
    //     if (newRow.dept_name === '' || newRow.dept_name === null || newRow.dept_name === undefined) {
    //         validate = false;
    //         Toast("Department Name  Cannot be empty", "error");
    //     }

    //     if (newRow.dept_nat === '') {
    //         validate = false;
    //         Toast("Department Nature Can't Be Empty", "error");
    //     }
    //     if (newRow.dept_type === '') {
    //         validate = false;
    //         Toast("Department Type Can't Be Empty", "error");
    //     }

    //     if (newRow.dept_cat === '') {
    //         validate = false;
    //         Toast("Department Category Can't Be Empty", "error");
    //     }



    //     if (validate === true) {

    //         const data = {
    //             dept_id: newRow.dept_id,
    //             dept_code: newRow.dept_code,
    //             dept_name: newRow.dept_name,
    //             dept_nat: parseInt(newRow.dept_nat),
    //             dept_type: parseInt(newRow.dept_type),
    //             dept_cat: parseInt(newRow.dept_cat),
    //             order_no: null,
    //             order_file: null
    //         }

    //         console.log(data);

    //         const result1 = await ApiCallPost('/Update_Designation', { ...data });
    //         if (result1.error) {
    //             Toast(result1.text, "error");
    //         } else {


    //             setUpdated(old => (old + 1));
    //             Toast('Data Updated Successfully!', 'success');
    //         }
    //     }
    // };


    return (
        <div className="w-100" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap' }}>

            <form style={{ marginTop: '2rem', marginBottom: '5rem', width: '100%' }}
            >
                <div className="row w-100" style={{ marginLeft: '10px' }}>
                    <div className={`col-2  ${guidelines.inputclass}`}  >
                        <TextField fullWidth
                            required
                            label="Department Code"
                            variant="standard"
                            value={deptcode}
                            onChange={(e) => { set_dept_code(e.target.value) }}
                        ></TextField>

                    </div>
                    <div className={`col-  ${guidelines.inputclass}`}  >
                        <TextField fullWidth
                            required
                            label="Department Name"
                            variant="standard"
                            value={deptname}
                            onChange={(e) => { set_dept_name(e.target.value) }} />


                    </div>
                    <div className={`col-4 ${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


                        <Select fullWidth
                            required
                            name="Department Nature"
                            label="Department Nature"
                            value={value1}
                            options={dept_nat}
                            onChange={(e) => { setvalue1(e.target.value) }} />

                        <AddNewGeneral label='Department Nature' setUpdated={setUpdated}><DepartmentNature /></AddNewGeneral>
                    </div>
                </div>
                <div className="row w-100" style={{ alignItems: 'center', marginLeft: '10px' }}>
                    <div className={`col-5 ${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <Select fullWidth
                            required
                            name="Department type"
                            label="Department type"
                            value={value2}
                            onChange={(e) => { setvalue2(e.target.value) }}
                            options={dept_type}

                        />


                        <AddNewGeneral label='Department Type' setUpdated={setUpdated}><DepartmentType /></AddNewGeneral>
                    </div>

                    <div className={` col-5 ${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <Select fullWidth
                            required
                            name="Departmentcategory"
                            label="Department category"
                            value={value3}
                            onChange={(e) => { setvalue3(e.target.value) }}
                            options={dept_cat}
                            onKeyDown={(event) => {
                                if (event.code === "Enter" || event.code === "NumpadEnter") {
                                    event.preventDefault();
                                    handleSubmit(event);
                                }
                            }}
                        />
                        <AddNewGeneral label='Department Category' setUpdated={setUpdated}><DepartmentCategory /></AddNewGeneral>
                    </div>

                    <div className='col-2'>
                        <Button
                            onClick={(e) => handleSubmit(e)}

                            variant="contained"
                            color="primary"
                            style={{ width: "160px" }}

                        >
                            {props.label}
                        </Button>
                    </div>

                </div>

            </form >
            {/* <div className='col-12'>
                < MatTable title="All Department" columns={columns}
                    actionsAtStart={true}
                    data={record}
                    onUpdate={update}
                />
            </div> */}

        </div >
    );
}


export default DepartmentTab;
