import React, { useState, useEffect } from 'react';
import Card from '../../../../../../Modules/UiModules/Core/Card';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';

const LeaveType = () => {


    const [values, setvalues] = React.useState('');
    const [record, setrecord] = React.useState([]);
    const [errors, setErrors] = useState({});
    const [updated, setUpdated] = useState(0);




    const columns = [


        {
            title: "Leave Type",
            editable: () => true,
            field: "leave_type_desc",
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


            var result1 = await ApiCallPost("/postleavetype", { leave_type_desc: values });
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
                var result = await ApiCallGet('/getleavetype');
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
        if (newRow.leave_type_desc === '' || newRow.leave_type_desc === null || newRow.leave_type_desc === undefined) {
            validate = false;
            Toast("Nature Description Cannot be empty", "error");
        }




        if (validate === true) {

            const data = {
                leave_type_id: newRow.leave_type_id,
                leave_type_desc: newRow.leave_type_desc,

            }

            console.log(data);

            const result1 = await ApiCallPost('/update_leave_type', { ...data });
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
                                label="Leave Type"
                                variant="standard"
                                value={values}
                                name="leavetype"
                                error={errors.leavetype}
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
                        //className={styles.submit__btn}
                        // onClick={handleSubmit}
                        >
                            Enter
                        </Button>

                    </div>




                </form>

                <MatTable title="Leave Type" columns={columns} style={{ margin: '1rem' }}
                    data={record}
                    onUpdate={update}
                    Options={options}
                    actionsAtStart={true} />


            </div>
        </>);


}
export default LeaveType;