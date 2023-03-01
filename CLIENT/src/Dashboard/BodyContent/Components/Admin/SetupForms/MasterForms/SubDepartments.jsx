import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import { ApiCallGet, ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import Select from '../../../../../../Modules/UiModules/Control/Select';
import listformatter from '../../../../../../Modules/Utility/ListFormatter';
import { useForm } from '../../../../../../Modules/UiModules/Control/useForm';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
const SubDepartments = (props) => {


    const initialFValues = {
        dept: props.data?.dept_id ?? ''

    }
    const { values, setValues, handleChange } = useForm(initialFValues);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    // const [values, setvalues] = React.useState(props.data?.sub_dept_name ?? '');
    const [value1, setvalue1] = React.useState(props.data?.sub_dept_name ?? '');
    const [dept, setdept] = React.useState([]);
    const [updated, setUpdated] = useState(0);


    useEffect(async () => {


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
        }



    }, [updated, values]);

    console.log('sd props: ', props)


    const handleformSubmit = async () => {

        var screen = {

            dept_id: values.dept,
            sub_dept_name: value1,
            order_no: null,
            order_file: null,
        }

        if (props.submitAction === 'Insert') {
            console.log('hsdjdd', value1);

            const result1 = await ApiCallPost("/Insert_Subdeptartments", screen);
            if (result1.error) {
                Toast('Data Could Not be Inserted', 'error')
            }
            else {
                Toast('Data Inserted Successfully!', 'success')
            }
        }
        else if (props.submitAction === 'Update') {

            screen = {
                ...screen, sub_dept_id: props.data?.sub_dept_id,


            };

            console.log(props.data.sub_dept_id);

            const result = await ApiCallPost('/update_subdepartment', screen);

            if (result.error) {
                Toast('Data Could Not be Updated', 'error')
            }
            else {
                Toast('Data Updated Successfully!', 'success')
            }
        }
        else {
            Toast('Submit Action Not Defined', 'error');
        }

        props?.setTableUpdated((old) => old + 1);
        props?.setOpenPopup(false);


    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate())
            return;

        handleformSubmit();
        // props.setOpenPopup(false);

    }

    const validate = () => {
        if (values.sub_dept_name === '') {
            Toast("Enter Sub Department", "error");
        }
        else if (values.dept_name === '') {
            Toast("Please enter department name", "error");
            return false;
        }


        else {
            return true;
        }
    }

    return (
        <>

            <div className="w-100" style={{ display: 'flex', flexDirection: 'column' }}>

                <form
                    container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', marginBottom: '5rem', position: 'relative', width: '100%' }} >
                    <div className="row w-100" style={{ alignItems: 'center', justifyContent: 'center' }}>

                        <div className={`col-5  ${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                required
                                label=" Sub Department"
                                variant="standard"
                                value={value1}
                                onChange={(e) => { setvalue1(e.target.value) }} />


                        </div>
                        <div className={`col-5 ${guidelines.inputclass}`}>


                            <Controls.Autocomplete
                                fullWidth variant="standard"
                                name="dept"
                                label="Select Department"
                                value={values.dept}
                                setValues={setValues}
                                options={departmentOptions}
                            />


                        </div>




                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => handleSubmit(e)}

                        >
                            Enter
                        </Button>

                    </div>




                </form>


            </div>
        </>
    );


}

export default SubDepartments;