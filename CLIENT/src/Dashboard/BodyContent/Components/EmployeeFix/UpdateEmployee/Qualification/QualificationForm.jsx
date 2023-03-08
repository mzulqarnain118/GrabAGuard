import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { ApiCallGet, ApiCallPatch } from '../../../../../../Modules/CoreModules/ApiCall';


const QualificationForm = (props) => {
    const id=props?.data?.id
    const [values, setValues] = useState(props.data ??{
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(name, value);

        setValues({
            ...values,
            [name]:  value
        })
    }
    console.log(values,"values");

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
                console.log("==========================", screenData)
  
                const response = await ApiCallPatch(`/users/${id}`, screenData);
 
                if (response?.status === 200) {
                    console.log(response, "result")
                    Toast('Data Updated Successfully!', 'success')
                    props.setTableUpdated((old) => old + 1);
                    props.setopenPopup(false);
                }
            } catch (error) {
                console.log(error, "error")
                Toast(error.message, "error");
            }
        },
        [values]
    );


    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser()
    }

    return (
        <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Stack>

                        <div className="row p-3" >

                            <div className={`${guidelines.inputclass}`} >
                                <Controls.Input id="standard-basic"
                                    label="First Name"
                                    name="firstName"
                                    required
                                    value={values?.firstName }
                                    onChange={(handleChange)}
                                />

                            </div>
                            <div className={`${guidelines.inputclass}`} >
                                <Controls.Input id="standard-basic"
                                    label="Last Name"
                                    name="lastName"
                                    required
                                value={values?.lastName }
                                    onChange={handleChange}
                                />

                            </div>
                            <div className={`${guidelines.inputclass}`} >
                                <Controls.Input id="standard-basic"
                                    inputProps={{ type: 'email' }}
                                    label="Email."
                                    name="email"
                                    required
                                value={values?.email }
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={`${guidelines.inputclass}`} >


                                <Controls.Input id="standard-basic"
                                    label="Mobile Phone"
                                    name="phone"
                                    required
                                value={values?.phone }
                                    onChange={handleChange}
                                />

                            </div>

                            <div className={`${guidelines.inputclass}`} >


                                <Controls.Input id="standard-basic"
                                    label="Address"
                                    name="address"
                                    required
                                value={values?.address }
                                    onChange={handleChange}
                                />

                            </div>
                           
                            <div className={`${guidelines.inputclass}`}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={(e)=>handleSubmit(e)}

                                >
                                    {props.label}
                                </Button>
                            </div>
                        </div>

                    </Stack>


                </div>


        </>
    );
}


export default QualificationForm;