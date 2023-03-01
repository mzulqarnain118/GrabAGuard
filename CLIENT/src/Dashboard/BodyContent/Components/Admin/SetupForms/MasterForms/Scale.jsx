import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';

import { ApiCallPost, ApiCallGet } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import Select from '../../../../../../Modules/UiModules/Control/Select';
import listformatter from '../../../../../../Modules/Utility/ListFormatter';
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';




const Scale = (props) => {


    const initialFValues = {
        scaletype: props.data?.scale_type ?? null
    }

    const [updated, setUpdated] = useState(0);

    const [value1, setvalue1] = React.useState(props.data?.scale_code ?? '');
    const [value2, setvalue2] = React.useState(props.data?.scale_number ?? '');
    const [value3, setvalue3] = React.useState([]);
    const [scaletype, set_scaletype] = React.useState([]);
    const { values, setValues, handleChange } = useForm(initialFValues);
    const [loading, setLoading] = useState(true);





    const handleformSubmit = async (e) => {
        e.preventDefault();


        var Screen = {
            scale_code: value1,
            scale_number: value2,
            scale_type: values.scaletype

        }
        if (props.submitAction === 'Insert') {
            var result1 = await ApiCallPost('/insertscale', Screen);
            if (result1.error) {
                Toast('Data Could Not be Inserted', 'error')
            }
            else {
                Toast('Data Inserted Successfully!', 'success')
            }
        }
        else if (props.submitAction === 'Update') {

            Screen = {
                ...Screen, scale_id: props.data?.scale_id,
            };
            const result = await ApiCallPost('/update_scale', Screen);
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

        props.setTable((old) => old + 1);
    }



    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                // var result = await ApiCallGet('/getscale');
                // console.log(result);
                // setrecord(result.data);

                // var result1 = await ApiCallGet('/Get_Scale_Type');
                // const newData = listformatter(result.data, 'scale_type_id', 'scale_type_desc');
                // set_scaletype(newData);


                var getscaletype = await ApiCallGet('/Get_Scale_Type');
                if (getscaletype.error) {
                    Toast(getscaletype.text, 'error');
                    return;
                }
                else {

                    let scaletype_data = getscaletype.data.map((item) => {
                        return { id: item.scale_type_id, title: item.scale_type_desc }
                    });
                    setvalue3(scaletype_data);

                }


            }
            catch {
                alert("error");

            }
            setLoading(false);
        }
        fetchData();

    }, [updated]);




    return (

        <>

            <div >

                <Form container style={{ marginLeft: '2rem', marginTop: '2rem', marginBottom: '5rem', position: 'relative', width: '100%' }}
                >
                    <div className="row w-100" style={{ alignItems: 'center', justifyContent: 'center' }}>


                        <div className={`col-3  ${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                required
                                label="Scale Code"
                                variant="standard"
                                value={value1}
                                name="scalecode"
                                // error={errors.scalecode}
                                onChange={(e) => { setvalue1(e.target.value) }} />
                        </div>
                        <div className={`col-3  ${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                required
                                label="Scale number"
                                variant="standard"
                                value={value2}
                                name="scaleno"
                                // error={errors.scaleno}
                                onChange={(e) => { setvalue2(e.target.value) }} />
                        </div>


                        <div className={`col-5 ${guidelines.inputclass}`}>

                            <Controls.Select fullWidth
                                name="scaletype"
                                label="Scale Type"
                                value={values.scaletype}
                                required
                                onChange={handleChange}
                                options={value3}

                                onKeyDown={(event) => {
                                    if (event.code === "Enter" || event.code === "NumpadEnter") {
                                        event.preventDefault();
                                        handleformSubmit(event);
                                    }
                                }} />
                            {/* 
                            <Controls.Select
                                fullWidth variant="standard"
                                name="scaletype"
                                label="Scale Type"
                                value={value3}
                                required
                                onChange={(e) => { setvalue3(e.target.value) }}
                                options={scaletype}
                            /> */}



                        </div>

                        <div className="col-12">
                            <Button
                                onClick={(e) => handleformSubmit(e)}
                                variant="contained"
                                color="primary"
                                style={{ float: 'right' }}
                            >
                                Enter
                            </Button>
                        </div>

                    </div>




                </Form>




            </div>
        </>);


}
export default Scale;