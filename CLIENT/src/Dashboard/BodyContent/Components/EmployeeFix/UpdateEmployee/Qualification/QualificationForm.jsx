import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { ApiCallGet, ApiCallPatch } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Link } from 'react-router-dom';

const QualificationForm = (props) => {
    console.log(props, "props")
    const id=props?.data?.id
    const [values, setValues] = useState(props.data ??{
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        status: '',
    });
    const [statusLookup, setStatusLookup] = useState([{ id: 1, title: 'Approved' }, { id: 2, title: 'Pending' }, { id: 3, title: 'Blocked' }]);
    const { response, error } = ApiCallGet(`/files/${id}`);
    console.log(response, "ImageDisplayPayload")

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
                    status: values.status==1?"Approved":values.status==2?"Pending":"Blocked",
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
                        <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Controls.Select fullWidth

                                name="status"
                                label="Change Status"
                                value={values?.status === "Pending" ? 2 : values?.status === "Approved" ? 1 : values?.status === "Blocked" ? 3 : values?.status}
                                onChange={handleChange}
                                options={statusLookup}

                            />
                        </div>
                        <div className={`${guidelines.inputclass}`}>
                            <Link to={{ pathname: 'showDocs', state: { data: response } }}>
                                 <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Check Docs
                            </Button>
                            </Link>
                           
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