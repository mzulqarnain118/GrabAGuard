import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';

const Subjects = () => {


    const [values, setvalues] = React.useState('');
    const [record, setrecord] = React.useState([]);
    const [errors, setErrors] = useState({});
    const [updated, setUpdated] = useState(0);




    const columns = [


        {
            title: "Subject",
            editable: () => true,
            field: "subject_name",
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
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "left" },
        },

    ]


    const handleformSubmit = async (e) => {
        e.preventDefault();


        try {


            var result1 = await ApiCallPost('/Insert_Subject', { subject_name: values });

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
                var result = await ApiCallGet('/Get_Subjects');
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
        if (newRow.subject_name === '' || newRow.subject_name === null || newRow.subject_name === undefined) {
            validate = false;
            Toast("Subjects Name  Cannot be empty", "error");
        }

        if (validate === true) {

            const data = {
                subject_id: newRow.subject_id,
                subject_name: newRow.subject_name,


            }

            console.log(data);

            const result1 = await ApiCallPost('/update_subjects', { ...data });
            if (result1.error) {
                Toast(result1.text, "error");
            } else {


                setUpdated(old => (old + 1));
                Toast('Data Updated Successfully!', 'success');
            }
        }
    };


    const options = {
        filtering: true,
        exportAllData: true,
        exportButton: {
            csv: true,
            pdf: true
        }
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
                                label="Subject"
                                variant="standard"
                                value={values}
                                name="subject"
                                error={errors.subject}
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

                <MatTable title="Subjects" columns={columns} style={{ margin: '1rem' }}
                    actionsAtStart={true}
                    data={record}
                    Options={options}
                    onUpdate={update} />


            </div>
        </>);


}
export default Subjects;