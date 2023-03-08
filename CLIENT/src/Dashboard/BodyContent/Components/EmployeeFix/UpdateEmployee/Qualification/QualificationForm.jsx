import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { ApiCallGet, ApiCallPatch } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import Subjects from '../../../Admin/SetupForms/MasterForms/Subject';
import AddNewGeneral from '../../../../../../Modules/UiModules/Core/AddNewGeneral';
import BoardUniversityTab from '../../../Admin/SetupForms/MasterForms/BoardUniversityTab';
import DegreeTab from '../../../Admin/SetupForms/MasterForms/DegreeTab';
import Country1 from '../../../Admin/SetupForms/MasterForms/Country';


const QualificationForm = (props) => {

    const [isLoading, setLoading] = useState(false);
    const initialFValues = {
        email: props.data?.email ?? '',
        firstName: props.data?.firstName ?? '',
        lastName: props.data?.lastName ?? '',
        address: props.data?.address ?? '',
        phone: props.data?.phone ?? '',
    }

    const updateUser = React.useCallback(

        async () => {
            try {
                const screenData = {
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    address: values.address,
                    phone: values.phone,

                }

                // setLoading(true);
                const response = await ApiCallPatch(`/users/${props?.data?.id}`, screenData);
                if (response.status === 200) {
                    console.log(response, "result")
                    debugger
                    Toast('Data Updated Successfully!', 'success')
                    props.setopenPopup(false);
                }
            } catch (error) {
                console.log(error, "error")
                setLoading(false);
                Toast(error.message, "error");

            }
        },
        []
    );
    const { values, setValues, handleChange } = useForm(initialFValues);

    console.log(props.data, "==========================",values)


    const submitData = async () => {

        if (props.submitAction === 'Insert') {
            const result = await ApiCallPost('/insert_emp_qualification', screenData);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Inserted Successfully!', 'success')
                props.setopenPopup(false);
            }
        }
        else if (props.submitAction === 'Update') {
            updateUser(values)
        }
        else {
            Toast('Submit Action Not Defined', 'error');
        }
        props.setTableUpdated((old) => old + 1);

    }

    const handleSubmit = (e) => {

        e.preventDefault();
        updateUser()
        props.setTableUpdated((old) => old + 1);

    }


    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Stack>

                        <div className="row p-3" >

                            <div className={`${guidelines.inputclass}`} >
                                <Controls.Input id="standard-basic"
                                    label="First Name"
                                    name="firstName"
                                    required
                                    value={values.firstName}
                                    onChange={handleChange}
                                />

                            </div>
                            <div className={`${guidelines.inputclass}`} >
                                <Controls.Input id="standard-basic"
                                    label="Last Name"
                                    name="lastName"
                                    required
                                    value={values.lastName}
                                    onChange={handleChange}
                                />

                            </div>
                            <div className={`${guidelines.inputclass}`} >
                                <Controls.Input id="standard-basic"
                                    inputProps={{ type: 'email' }}
                                    label="Email."
                                    name="email"
                                    required
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={`${guidelines.inputclass}`} >


                                <Controls.Input id="standard-basic"
                                    label="Mobile Phone"
                                    name="phone"
                                    required
                                    value={values.phone}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className={`${guidelines.inputclass}`} >


                                <Controls.Input id="standard-basic"
                                    label="Address"
                                    name="address"
                                    required
                                    value={values.address}
                                    onChange={handleChange}
                                />

                            </div>
                            {/* <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Registration Date"
                                    value={values.yearofpassing}
                                    name="yearofpassing"
                                    onChange={handleChange}
                                    required
                                />

                            </div> */}
                            {/* <div className={`${guidelines.inputclass}`}>
                               
                                <Controls.Input inputProps={{ type: 'number', min: '1' }} id="standard-basic" label="Total Marks"
                                    value={values.totalmarks}
                                    name="totalmarks"
                                    onChange={handleChange}
                                // onBlur={(e) => { Percentage() }}
                                />
                            
                            
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input inputProps={{ type: 'number', min: '1' }} id="standard-basic"
                                    label="Marks Obtained"
                                    value={values.marksobtained}
                                    name="marksobtained"
                                    onChange={handleChange}
                                // onBlur={(e) => { Percentage() }}

                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Select id="standard-basic"
                                    label="Division"
                                    value={values.devision}
                                    name="devision"
                                    onChange={handleChange}
                                    options={devision}
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic" inputProps={{ type: 'number' }}
                                    label="CGPA"
                                    value={values.cgpa}
                                    name="cgpa"
                                    onChange={handleChange}
                                    required={false}
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Remarks/Distinction"
                                    value={values.remarks}
                                    name="remarks"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Position in Board/Uni"
                                    value={values.position}
                                    name="position"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`} >
                                <Controls.Autocomplete
                                    name="country"
                                    label="Country"
                                    value={values.country}
                                    setValues={setValues}
                                    options={Country}
                                    required
                                />
                                <AddNewGeneral label='Country' setUpdated={setUpdated}><Country1 /></AddNewGeneral>
                            </div> */}
                            <div className={`${guidelines.inputclass}`}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type="submit"

                                >
                                    {props.label}
                                </Button>
                            </div>
                        </div>

                    </Stack>


                </div>

            </Form>


        </>
    );
}


export default QualificationForm;