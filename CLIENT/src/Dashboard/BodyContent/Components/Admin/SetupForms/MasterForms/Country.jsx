import React, { useState, useEffect } from 'react';
import Card from '../../../../../../Modules/UiModules/Core/Card';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';

const Country = () => {
    const [country_code, set_country_code] = React.useState('');
    const [country_name, set_country_name] = React.useState('');
    const [record, setrecord] = React.useState([]);
    const [errors, setErrors] = useState({});
    const [updated, setUpdated] = useState(0);



    const columns = [

        {
            title: "Country Code",
            editable: () => true,
            field: "country_code",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Country Name",
            editable: () => true,
            field: "country_name",
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
            var ScreenData = {

                country_code: country_code,
                country_name: country_name,

            }

            var result1 = await ApiCallPost("/insert_country", ScreenData);
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
                var result = await ApiCallGet('/get_countries');
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
        if (newRow.country_name === '' || newRow.country_name === null || newRow.country_name === undefined) {
            validate = false;
            Toast("Course Name Cannot be empty", "error");
        }




        if (validate === true) {

            const data = {
                country_id: newRow.country_id,
                country_code: newRow.country_code,
                country_name: newRow.country_name,


            }

            console.log(data);

            const result1 = await ApiCallPost('/update_country', { ...data });
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
                            label="Country Code"
                            variant="standard"
                            name="countrycode"
                            value={country_code}
                            error={errors.countrycode}
                            onChange={(e) => { set_country_code(e.target.value) }} />


                    </div>

                    <div className={`col  ${guidelines.inputclass}`}  >
                        <TextField fullWidth
                            required
                            label="Country Name"
                            variant="standard"
                            name="countryname"
                            value={country_name}
                            error={errors.countryname}
                            onChange={(e) => { set_country_name(e.target.value) }}
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
                        onClick={handleformSubmit}
                    >
                        Enter
                    </Button>

                </div>




            </form>

            <MatTable title=" Country Names" columns={columns} style={{ margin: '1rem' }}
                actionsAtStart={true}
                data={record}
                onUpdate={update}
                Options={options}
            />


        </div>
    );
}


export default Country;
