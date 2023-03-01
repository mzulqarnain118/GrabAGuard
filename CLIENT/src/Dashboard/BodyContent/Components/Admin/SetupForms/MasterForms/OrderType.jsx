import React, { useState, useEffect } from "react";
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import { ApiCallPost, ApiCallGet } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import MatTable from "../../../../../../Modules/MaterialTable/MaterialTable";



const OrderType = (props) => {
    const [value, setvalue] = React.useState([]);
    const [record, setrecord] = React.useState([]);
    const [errors, setErrors] = useState({});
    const [updated, setUpdated] = useState(0);  //table



    const columns = [


        {
            title: "Order Type",
            editable: () => true,
            field: "type_desc",
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
            title: " Entry Time ",
            field: "entry_datetime",
            type: "date",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },



    ]


    useEffect(() => {

        const fetchData = async () => {
            var result = await ApiCallGet('/getordertype');
            if (result.error) {
                Toast(result.text, 'error')
            }
            else {
                console.log(result);
                setrecord(result.data);
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



    const handleformSubmit = async (e) => {
        e.preventDefault();

        try {



            var result1 = await ApiCallPost("/postordertype", { type_desc: value });
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
        if (newRow.type_desc === '' || newRow.type_desc === null || newRow.type_desc === undefined) {
            validate = false;
            Toast("File Type  Cannot be empty", "error");
        }

        if (validate === true) {

            const data = {
                type_id: newRow.type_id,
                type_desc: newRow.type_desc,
            }

            console.log(data);

            const result1 = await ApiCallPost('/update_order_type', { ...data });
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

                <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', marginBottom: '5rem', position: 'relative', width: '100%' }}
                >
                    <div className="row w-100" style={{ alignItems: 'center', justifyContent: 'center' }}>


                        <div className={`col  ${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                required
                                label="Order Type"
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

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => handleformSubmit(e)}
                        >
                            Enter
                        </Button>


                    </div>


                </form>
                <MatTable title="Order Type" columns={columns} style={{ margin: '1rem' }}
                    actionsAtStart={true}
                    data={record}
                    Options={options}
                    onUpdate={update} />
            </div>
        </>

    );
}
export default OrderType;