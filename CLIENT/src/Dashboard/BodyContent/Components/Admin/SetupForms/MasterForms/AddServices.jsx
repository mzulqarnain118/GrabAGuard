import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet, ApiCallPut } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';

const AddServices = () => {
    const [name, setName] = React.useState('');
    const [min_hourly_rate, setMin_hourly_rate] = React.useState('');
    const [max_hourly_rate, setMax_hourly_rate] = React.useState('');
    const [updated, setUpdated] = useState(0);
    const { response, error } = ApiCallGet('/AddServices', { getUpdatedData: updated });
    const columns = [
        {
            title: "Name",
            editable: () => true,
            field: "name",
            type: "text",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Min Hourly Rate",
            field: "min_hourly_rate",
            type: "number",
            editable: () => true,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Max Hourly Rate",
            field: "max_hourly_rate",
            type: "number",
            editable: () => true,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

    ]

    const handleformSubmit = async (e) => {
        e.preventDefault();

        const result1 = await ApiCallPost('/AddServices', { name, max_hourly_rate, min_hourly_rate });
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
    const update = async (oldRow, newRow) => {

        let validate = true;
        if (newRow.name === '' || newRow.name === null || newRow.name === undefined) {
            validate = false;
            Toast("Name Cannot be empty", "error");
        }
        else if (newRow.max_hourly_rate === '' || newRow.max_hourly_rate === null || newRow.max_hourly_rate === undefined) {
            validate = false;
            Toast("Max Hourly Rate Cannot be empty", "error");
        }
        else if (newRow.min_hourly_rate === '' || newRow.min_hourly_rate === null || newRow.min_hourly_rate === undefined) {
            validate = false;
            Toast("Min Hourly Rate Cannot be empty", "error");
        }


        if (validate === true) {

            const result1 = await ApiCallPut(`/AddServices/${newRow._id}`, { ...newRow });
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

                <form container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', marginBottom: '5rem', position: 'relative', width: '100%' }}
                >
                    <div className="row w-100" style={{ alignItems: 'center', justifyContent: 'center' }}>


                        <div className={`col  ${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                required
                                label="Name"
                                variant="standard"
                                value={name}
                                name="name"
                                onChange={(e) => { setName(e.target.value) }}
                              />
                           
                        

                        </div>
                        <div className={`col  ${guidelines.inputclass}`}  >

                        <TextField fullWidth
                            required
                            label="Min Hourly Rate"
                                variant="standard"
                                type='number'
                            value={min_hourly_rate}
                            name="min_hourly_rate"
                            onChange={(e) => { setMin_hourly_rate(e.target.value) }}
                            />
                        </div>
                        <div className={`col  ${guidelines.inputclass}`}  >

                            <TextField fullWidth
                                required
                                label="Max Hourly Rate"
                                variant="standard"
                                type='number'
                                value={max_hourly_rate}
                                name="max_hourly_rate"
                                onChange={(e) => { setMax_hourly_rate(e.target.value) }}
                            />

                        </div>
                        <div className={`col  ${guidelines.inputclass}`}  >

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

                <MatTable title="Services" columns={columns} style={{ margin: '1rem' }}
                    data={response ?? []}
                    onUpdate={update}
                    // Options={options}
                    actionsAtStart={true} />
            </div>
        </>);
}
export default AddServices;