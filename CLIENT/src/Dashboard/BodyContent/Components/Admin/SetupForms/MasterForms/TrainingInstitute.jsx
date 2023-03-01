import React, { useState, useEffect } from 'react';
import Card from '../../../../../../Modules/UiModules/Core/Card';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';

const TrainingInstitue = () => {
    const [values, setvalues] = React.useState('');
    const [record, setrecord] = React.useState([]);
    const [errors, setErrors] = useState({});
    const [updated, setUpdated] = useState(0);



    const columns = [

        {
            title: "Institute Name",
            editable: () => true,
            field: "exp_inst_desc",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Entered By",
            field: "emp_name",
            type: "string",
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



    const options = {
        filtering: true,
        exportAllData: true,
        exportButton: {
            csv: true,
            pdf: true
        }
    }

    const handleformSubmit = async (e) => {
        e.preventDefault();



        try {

            var result1 = await ApiCallPost("/Insert_exp_institute", { exp_inst_desc: values });
            console.log(result1.data)
            if (result1.error) {
                Toast(result1.text, 'error');
            }
            else {
                console.log(result1.data);
                Toast("Success", "success");
                setUpdated(old => (old + 1));
            }

        }


        catch {
            Toast("some Data missing", 'error')
        }




    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                var result = await ApiCallGet('/get_training_institutes');
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
        if (newRow.exp_inst_desc === '' || newRow.exp_inst_desc === null || newRow.exp_inst_desc === undefined) {
            validate = false;
            Toast("Course Name Cannot be empty", "error");
        }




        if (validate === true) {

            const data = {
                exp_inst_id: newRow.exp_inst_id,
                exp_inst_desc: newRow.exp_inst_desc,


            }

            console.log(data);

            const result1 = await ApiCallPost('/update_exp_institute', { ...data });
            if (result1.error) {
                Toast(result1.text, "error");
            } else {

                setUpdated(old => (old + 1));
                Toast('Data Updated Successfully!', 'success');
            }
        }
    };

    return (
        <div className="w-100" style={{ display: 'flex', flexDirection: 'column' }}>

            <form container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', marginBottom: '5rem', position: 'relative', width: '100%' }}>
                <div className="row w-100" style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <div className={`col  ${guidelines.inputclass}`}  >
                        <TextField fullWidth
                            required
                            label="Training Institute"
                            variant="standard"
                            name="institute"
                            value={values}
                            error={errors.institute}
                            onChange={(e) => { setvalues(e.target.value) }}

                            onKeyDown={(event) => {
                                if (event.code === "Enter" || event.code === "NumpadEnter") {
                                    event.preventDefault();
                                    handleformSubmit(event);
                                }
                            }} />


                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => handleformSubmit(e)}


                    >
                        Enter
                    </Button>

                </div>




            </form>

            <MatTable title="Training Institute" columns={columns} style={{ margin: '1rem' }}
                actionsAtStart={true}
                data={record}
                onUpdate={update}
                Options={options}
            />


        </div>
    );
}


export default TrainingInstitue;
