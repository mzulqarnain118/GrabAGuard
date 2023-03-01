import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import { ApiCallPost, ApiCallGet } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
const DepartmentCategory = () => {
    const [value, setvalue] = React.useState([]);
    const [record, setrecord] = React.useState([]);
    const [updated, setUpdated] = React.useState([]);






    const columns = [


        {
            title: "Job Nature",
            editable: () => true,
            field: "cat_desc",
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


        var result = await ApiCallPost("/insertdeptcat", { cat_desc: value });
        if (result.error) {
            Toast(result.text, 'error');
        }
        else {
            console.log(result.data);
            Toast("Success", "success");
            setUpdated(old => (old + 1));
        }

    }




    useEffect(() => {

        const fetchData = async () => {
            try {
                var result = await ApiCallGet('/deptcat');
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
        if (newRow.cat_desc === '' || newRow.cat_desc === null || newRow.cat_desc === undefined) {
            validate = false;
            Toast("Department Type Cannot be empty", "error");
        }




        if (validate === true) {

            const data = {
                cat_id: newRow.cat_id,
                cat_desc: newRow.cat_desc,

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


    return (

        <>

            <div className="w-100" style={{ display: 'flex', flexDirection: 'column' }}>

                <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', marginBottom: '5rem', position: 'relative', width: '100%' }}>
                    <div className="row w-100" style={{ alignItems: 'center', justifyContent: 'center' }}>


                        <div className={`col-lg-6 col-md-6 col-sm-6 col-6  pb-3  ${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                required
                                label="Department Category"
                                variant="standard"
                                value={value}
                                onChange={(e) => { setvalue(e.target.value) }}

                                onKeyDown={(event) => {
                                    if (event.code === "Enter" || event.code === "NumpadEnter") {
                                        event.preventDefault();
                                        handleformSubmit(event);
                                    }
                                }}
                            ></TextField>

                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6  pb-3">
                            <Button
                                onClick={(e) => handleformSubmit(e)}
                                variant="contained"
                                color="primary"

                            >
                                Enter
                            </Button>
                        </div>



                    </div>

                </form>
            </div>

            <MatTable
                actionsAtStart={true}
                title="Department Category"
                columns={columns}
                data={record}
                Options={options}
            // onDelete={onDelete}
            // onUpdate={update}


            />
        </>

    );


}


export default DepartmentCategory;