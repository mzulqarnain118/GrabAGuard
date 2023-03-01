import React, { useState, useEffect } from 'react';
import Card from '../../../../../../Modules/UiModules/Core/Card';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';

const JobNature = () => {


    const [values, setvalues] = React.useState('');
    const [record, setrecord] = React.useState([]);
    const [errors, setErrors] = useState({});
    const [updated, setUpdated] = useState(0);


    const columns = [


        {
            title: "Job Nature",
            editable: () => true,
            field: "nature_desc",
            type: "text",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Entered By",
            field: "emp_name",
            type: "text",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: " Entery Time ",
            field: "entry_datetime",
            type: "date",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

    ]


    const handleformSubmit = async (e) => {
        e.preventDefault();

        var result1 = await ApiCallPost("/postjobnature", { nature_desc: values });
        if (result1.error) {
            Toast(result1.text, 'error');
        }
        else {
            console.log(result1.data);
            Toast("Success", "success");
            setUpdated(old => (old + 1));
        }










    }


    const options = {
        filtering: true,
        exportAllData: true,
        exportButton: {
            csv: true,
            pdf: true
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                var result = await ApiCallGet('/getjobnature');
                console.log(result);
                setrecord(result.data);


            }
            catch {
                alert("error");

            }

        }
        fetchData();

    }, [updated]);




    const update = async (oldRow, newRow) => {

        let validate = true;
        if (newRow.nature_desc === '' || newRow.nature_desc === null || newRow.nature_desc === undefined) {
            validate = false;
            Toast("Nature Description Cannot be empty", "error");
        }




        if (validate === true) {

            const data = {
                nature_id: newRow.nature_id,
                nature_desc: newRow.nature_desc,

            }

            console.log(data);

            const result1 = await ApiCallPost('/update_job_nature', { ...data });
            if (result1.error) {
                Toast(result1.text, "error");
            } else {

                setUpdated(old => (old + 1));
                Toast('Data Updated Successfully!', 'success');
            }
        }
    };


    const validate = () => {
        // let temp = {}

        // temp.values = values ? "" : "This field is required."
        // setErrors({ ...temp })
        // return Object.values(temp).every(x => x == "")


    }

    return (

        <>

            <div className="w-100" style={{ display: 'flex', flexDirection: 'column' }}>

                <form container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', marginBottom: '5rem', position: 'relative', width: '100%' }}
                >
                    <div className="row w-100" style={{ alignItems: 'center', justifyContent: 'center' }}>


                        <div className={`col  ${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                required
                                label="Job Nature"
                                variant="standard"
                                value={values}
                                name="jobnature"
                                error={errors.jobnature}
                                onChange={(e) => { setvalues(e.target.value) }}
                                onKeyDown={(event) => {
                                    if (event.code === "Enter" || event.code === "NumpadEnter") {
                                        event.preventDefault();
                                        handleformSubmit(event);
                                    }
                                }} />


                        </div>

                        <Button
                            onClick={(e) => handleformSubmit(e)}
                            variant="contained"
                            color="primary"

                        >
                            Enter
                        </Button>

                    </div>




                </form>

                <MatTable title="Job Nature" columns={columns} style={{ margin: '1rem' }}
                    data={record}
                    onUpdate={update}
                    Options={options}
                    actionsAtStart={true} />


            </div>
        </>);


}
export default JobNature;