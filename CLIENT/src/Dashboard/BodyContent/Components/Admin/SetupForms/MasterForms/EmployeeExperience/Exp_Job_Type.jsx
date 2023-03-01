import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { ApiCallPost } from '../../../../../../../Modules/CoreModules/ApiCall';
import guidelines from '../../../../../../../Modules/Guidelines/Guidelines';
import Toast from '../../../../../../../Modules/UiModules/Core/Toast/Toast'


const Exp_Job_Type = (props) => {


    const [values, setvalues] = React.useState('');
    const [record, setrecord] = React.useState([]);
    const [errors, setErrors] = useState({});






    const handleformSubmit = async (e) => {
        e.preventDefault();





        var result1 = await ApiCallPost("/Insert_Exp_job_Type", { exp_job_type_desc: values });
        if (result1.error) {
            Toast(result1.text, 'error');
        }
        else {
            console.log(result1.data);
            Toast("Success", "success");
            props.setUpdated(old => (old + 1));
        }





    }




    return (

        <>

            <div className="w-100" style={{ display: 'flex', flexDirection: 'column', width: '800px' }}>

                <form container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', marginBottom: '5rem', position: 'relative', width: '100%' }}
                    onSubmit={handleformSubmit}>
                    <div className="row " style={{ alignItems: 'center', justifyContent: 'center', width: "800px" }}>


                        <div className={`col  ${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                required
                                label="Experience Job Type"
                                variant="standard"
                                value={values}
                                name="jobtype"
                                error={errors.jobtype}
                                onChange={(e) => { setvalues(e.target.value) }} />


                        </div>

                        <Button
                            type='submit'
                            onClick={() => props.setOpenPopup(false)}
                            variant="contained"
                            color="primary"

                        >
                            Enter
                        </Button>

                    </div>




                </form>



            </div >
        </>);


}
export default Exp_Job_Type;