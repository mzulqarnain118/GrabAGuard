import React, { useState, useEffect } from 'react';
import Card from '../../../../../../Modules/UiModules/Core/Card';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';


const DegreeTab = () => {
    const [values, setvalues] = React.useState('');
    const [record, setrecord] = React.useState([]);
    const [errors, setErrors] = useState({});
    const [updated, setUpdated] = useState(0);
    const [priority, set_priority] = React.useState('');




    const columns = [


        {
            title: "Degree",
            editable: () => true,
            field: "deg_desc",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Priority",
            editable: () => true,
            field: "priority",
            type: "numeric",
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

        if (priority <= 0) {
            Toast("Enter priorty greater than 0", "error");
        }

        else {
            try {
                let Screen = {
                    deg_desc: values,
                    priority: parseInt(priority)

                }


                var result1 = await ApiCallPost("/postdegree", Screen);


                if (priority <= 0) {
                    Toast("Enter priorty greater than 0", "error");
                }
                else if (result1.error) {
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

    }


    useEffect(async () => {


        var result = await ApiCallGet('/getdegree');
        console.log(result);
        setrecord(result.data);


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
        if (newRow.deg_desc === '' || newRow.deg_desc === null || newRow.deg_desc === undefined) {
            validate = false;
            Toast("degree Name Cannot be empty", "error");
        }

        if (validate === true) {

            const data = {
                deg_id: newRow.deg_id,
                deg_desc: newRow.deg_desc,
                priority: parseInt(newRow.priority)


            }

            console.log(data);

            const result1 = await ApiCallPost('/update_degree', { ...data });
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
                            label="Degree Name"
                            variant="standard"
                            value={values}
                            name="degree"
                            onChange={(e) => { setvalues(e.target.value) }} />


                    </div>

                    <div className='col-3' >
                        <TextField
                            required
                            label="Priority"
                            variant="standard"
                            value={priority}
                            type='number'
                            name="priority"
                            onChange={(e) => { set_priority(e.target.value) }}

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

            <MatTable title="All Degree" columns={columns} style={{ margin: '1rem' }}
                actionsAtStart={true}
                data={record}
                onUpdate={update}
                Options={options} />


        </div>
    );
}


export default DegreeTab;
