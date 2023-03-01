import React, { useState, useEffect } from 'react';
import Card from '../../../../../../Modules/UiModules/Core/Card';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import Select from '../../../../../../Modules/UiModules/Control/Select';

const TrainingCourses = () => {
    const [values, setvalues] = React.useState('');
    const [record, setrecord] = React.useState([]);
    const [errors, setErrors] = useState({});
    const [updated, setUpdated] = useState(0);



    const columns = [

        {
            title: "Course Name",
            editable: () => true,
            field: "course_name",
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


    const handleformSubmit = async (e) => {
        e.preventDefault();



        try {

            var result1 = await ApiCallPost("/Insert_training_courses", { course_name: values });
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
                var result = await ApiCallGet('/get_training_courses');
                console.log(result);
                setrecord(result.data);



            }
            catch {
                alert("error");

            }

        }
        fetchData();

    }, [updated]);


    const options = {
        filtering: true,
        exportAllData: true,
        exportButton: {
            csv: true,
            pdf: true
        }
    }





    const update = async (oldRow, newRow) => {

        let validate = true;
        if (newRow.course_name === '' || newRow.course_name === null || newRow.course_name === undefined) {
            validate = false;
            Toast("Course Name Cannot be empty", "error");
        }




        if (validate === true) {

            const data = {
                course_id: newRow.course_id,
                course_name: newRow.course_name,


            }

            console.log(data);

            const result1 = await ApiCallPost('/update_training_course', { ...data });
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

            <form container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', marginBottom: '5rem', position: 'relative', width: '100%' }}
            >
                <div className="row w-100" style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <div className={`col  ${guidelines.inputclass}`}  >
                        <TextField fullWidth
                            required
                            label="Course Name"
                            variant="standard"
                            name="coursename"
                            value={values}
                            error={errors.coursename}
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

            <MatTable title="Training Course Name" columns={columns} style={{ margin: '1rem' }}
                actionsAtStart={true}
                data={record}
                Options={options}
                onUpdate={update}

            />


        </div>
    );
}


export default TrainingCourses;
