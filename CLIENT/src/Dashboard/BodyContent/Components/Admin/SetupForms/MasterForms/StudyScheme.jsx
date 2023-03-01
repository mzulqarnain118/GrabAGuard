import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';

const StudyScheme = () => {


    const [scheme_year, set_scheme_year] = React.useState(null);
    const [scheme_desc, set_scheme_desc] = React.useState('');
    const [record, setrecord] = React.useState([]);
    const [errors, setErrors] = useState({});
    const [updated, setUpdated] = useState(0);
    const CurdateFormated = currentDate => currentDate.getFullYear();




    const columns = [


        {
            title: "scheme Year",
            editable: () => true,
            field: "scheme_year",
            type: "numeric",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },


        {
            title: "scheme Name",
            editable: () => true,
            field: "scheme_desc",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Enter By",
            field: "log_id",
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

            var ScreenData = {


                scheme_desc: scheme_desc,
                scheme_year: scheme_year ? CurdateFormated(new Date(scheme_year)) : null,
            }


            var result1 = await ApiCallPost('/insert_study_scheme', ScreenData);

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
                var result = await ApiCallGet('/get_study_schemes');
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
        if (newRow.scheme_year === '') {
            validate = false;
            Toast("Scheme Year  Cannot be empty", "error");
        }

        if (newRow.scheme_desc === '') {
            validate = false;
            Toast("Scheme Name  Cannot be empty", "error");
        }

        if (validate === true) {

            const data = {
                scheme_id: newRow.scheme_id,
                scheme_year: newRow.scheme_year,
                scheme_desc: newRow.scheme_desc,


            }

            console.log(data);

            const result1 = await ApiCallPost('/update_study_scheme', { ...data });
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
                    onSubmit={handleformSubmit}>
                    <div className="row w-100" style={{ alignItems: 'center', justifyContent: 'center' }}>


                        <div className={`col  ${guidelines.inputclass}`}  >


                            <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                label="Year"
                                value={scheme_year}
                                name="year"
                                views={['year']}
                                inputFormat="yyyy"
                                onChange={(e) => { set_scheme_year(e.target.value) }}
                            />


                        </div>
                        <div className={`col  ${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                required
                                label="Scheme Name "
                                variant="standard"
                                value={scheme_desc}
                                name="Schemename"
                                error={errors.Schemename}
                                onChange={(e) => { set_scheme_desc(e.target.value) }}

                                onKeyDown={(event) => {
                                    if (event.code === "Enter" || event.code === "NumpadEnter") {
                                        event.preventDefault();
                                        handleformSubmit(event);
                                    }
                                }} />
                        </div>



                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        //className={styles.submit__btn}
                        // onClick={handleSubmit}
                        >
                            Enter
                        </Button>

                    </div>




                </form>

                <MatTable title="Study Scheme" columns={columns} style={{ margin: '1rem' }}
                    actionsAtStart={true}
                    data={record}
                    Options={options}
                    onUpdate={update} />


            </div>
        </>);


}
export default StudyScheme;