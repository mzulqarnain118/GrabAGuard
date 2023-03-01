import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';

const SelectionType = (props) => {

    const [record, setrecord] = React.useState([]);
    const [values, setvalues] = React.useState('');
    const [updated, setUpdated] = useState(0);

    const columns = [


        {
            title: "Selection Type",
            editable: () => true,
            field: "sel_type_desc",
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


            var result1 = await ApiCallPost('/Insert_Selection_Type', { sel_type_desc: values });
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



    const update = async (oldRow, newRow) => {

        let validate = true;
        if (newRow.sel_type_desc === '' || newRow.sel_type_desc === null || newRow.sel_type_desc === undefined) {
            validate = false;
            Toast("Selection Type Cannot be empty", "error");
        }




        if (validate === true) {

            const data = {
                sel_type_id: newRow.sel_type_id,
                sel_type_desc: newRow.sel_type_desc,

            }

            console.log(data);

            const result1 = await ApiCallPost('/Update_Selection_Type', { ...data });
            if (result1.error) {
                Toast(result1.text, "error");
            } else {

                setUpdated(old => (old + 1));
                Toast('Data Updated Successfully!', 'success');
            }
        }
    };


    useEffect(() => {

        const fetchData = async () => {
            try {
                var result = await ApiCallGet('/Get_Selection_Type');
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


    return (

        <>

            <div className="w-100" style={{ display: 'flex', flexDirection: 'column' }}>

                <form container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', marginBottom: '5rem', position: 'relative', width: '100%' }}
                >
                    <div className="row w-100" style={{ alignItems: 'center', justifyContent: 'center' }}>


                        <div className={`col  ${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                required
                                label="Selection Type"
                                variant="standard"
                                value={values}
                                name="seltype"
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

                <MatTable title="Selection Type" columns={columns} style={{ margin: '1rem' }}
                    data={record}
                    onUpdate={update}
                    Options={options}
                    actionsAtStart={true} />


            </div>
        </>);


}
export default SelectionType;