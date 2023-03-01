import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import Select from '../../../../../../Modules/UiModules/Control/Select';
import listformatter from '../../../../../../Modules/Utility/ListFormatter';

const Designation = () => {
    const initialFValues = {
        is_teaching: false,
        is_visiting: false,

    }
    const { values, handleChange } = useForm(initialFValues);




    const [desig_name, set_desig_name] = React.useState('');
    const [desig_scale, set_desig_scale] = React.useState(null);
    const [priority, set_priority] = React.useState('');
    // const [is_teaching, set_is_teaching] = React.useState(null);
    const [record, setrecord] = React.useState([]);
    const [updated, setUpdated] = useState(0);
    const [scale, setscale] = React.useState('');
    const [scale_list, setscale_list] = useState([]);
    const [scale_loop, setscale_lookup] = useState({});




    const columns = [


        {
            title: "Designation Name",
            editable: () => true,
            field: "desig_name",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Designation Scale",
            editable: () => true,
            field: "desig_scale",
            type: "numeric",
            lookup: scale_loop,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Is Teaching",
            editable: () => true,
            field: "is_teaching",
            type: 'boolean',
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Is Visiting",
            editable: () => true,
            field: "is_visiting",
            type: 'boolean',
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
            editable: () => false,
            type: "date",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "left" },
        },

    ]


    const handleformSubmit = async (e) => {
        e.preventDefault();

        if (!desig_name) {
            Toast("Please enter designation name!", "error");
            return;
        }


        var screenData = {

            desig_name: desig_name,
            desig_scale: (scale),
            is_teaching: values.is_teaching,
            is_visiting: values.is_visiting,
            priority: (priority) ? parseInt(priority) : null


        }


        var result1 = await ApiCallPost('/Insert_Designation', screenData);

        if (result1.error) {
            Toast(result1.text, "error");
        } else {


            setUpdated(old => (old + 1));
            Toast('Data Updated Successfully!', 'success');
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

    useEffect(async () => {


        var result = await ApiCallGet('/getdesignation');
        console.log(result);
        setrecord(result.data);


        var result1 = await ApiCallGet('/getscale');
        // alert("hhshsh");
        // console.log(result1, "scaleeee");

        let scaletype_data = result1.data.map((item) => {
            return { id: item.scale_id, title: item.scale_code }
        });
        setscale_list(scaletype_data);
        // console.log(scaletype_data, "uinj");

        setscale_lookup(() => {
            const old = {};
            for (let i = 0; i < result1.data.length; i++)
                old[result1.data[i].scale_id] = result1.data[i].scale_code;
            return old;
        });





    }, [updated]);




    const update = async (oldRow, newRow) => {

        let validate = true;
        if (!newRow.desig_name) {
            validate = false;
            Toast("designation Name  Cannot be empty", "error");
        }




        if (validate === true) {

            const data = {
                desig_id: newRow.desig_id,
                desig_name: newRow.desig_name,
                desig_scale: (newRow.desig_scale) ? parseInt(newRow.desig_scale) : null,
                is_teaching: (newRow.is_teaching),
                is_visiting: (newRow.is_visiting),
                priority: (newRow.priority) ? parseInt(newRow.priority) : null
            }

            console.log(data);

            const result1 = await ApiCallPost('/Update_Designation', { ...data });
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

            <div className="w-100" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap' }}>

                <Form container style={{ marginTop: '2rem', marginLeft: '0.5rem', marginBottom: '5rem', width: '100%' }}
                >
                    <div className="row w-100" style={{ alignItems: 'center', justifyContent: 'center' }}>


                        <div className='col-3'  >
                            <TextField
                                required
                                label="Designation Name"
                                variant="standard"
                                value={desig_name}
                                name="designame"

                                onChange={(e) => { set_desig_name(e.target.value) }} />


                        </div>
                        <div className='col-3' >
                            {/* <TextField
                                label="Designation Scale"
                                variant="standard"
                                value={desig_scale}
                                name="desigscale"
                                type="number"

                                onChange={(e) => { set_desig_scale(e.target.value) }} /> */}

                            <Select fullWidth
                                required
                                name="Scale Type"
                                label="Scale Type"
                                value={scale}
                                options={scale_list}
                                onChange={(e) => { setscale(e.target.value) }}



                            />


                        </div>


                        <div className='col-2' >
                            <TextField
                                label="Priority"
                                variant="standard"
                                value={priority}
                                type='number'
                                name="priority"

                                onChange={(e) => { set_priority(e.target.value) }} />


                        </div>



                        <div className="col-2 mt-4">

                            <Controls.Checkbox
                                name="is_teaching"
                                label="Is teaching"
                                required
                                value={values.is_teaching}
                                onChange={handleChange}

                                onKeyDown={(event) => {
                                    if (event.code === "Enter" || event.code === "NumpadEnter") {
                                        event.preventDefault();
                                        handleformSubmit(event);
                                    }
                                }}
                            />


                        </div>

                        <div className="col-2 mt-4">

                            <Controls.Checkbox
                                name="is_visiting"
                                label="Is Visiting"
                                required
                                value={values.is_visiting}
                                onChange={handleChange}

                                onKeyDown={(event) => {
                                    if (event.code === "Enter" || event.code === "NumpadEnter") {
                                        event.preventDefault();
                                        handleformSubmit(event);
                                    }
                                }}
                            />


                        </div>


                    </div>

                    <Button style={{ float: 'right', marginRight: '7rem', width: '120px' }}

                        variant="contained"
                        color="primary"
                        //className={styles.submit__btn}
                        onClick={(e) => handleformSubmit(e)}
                    >
                        Enter
                    </Button>









                </Form>

                <MatTable title="Designation" columns={columns} style={{ margin: '1rem' }}
                    actionsAtStart={true}
                    data={record}
                    Options={options}
                    onUpdate={update} />


            </div >
        </>);


}
export default Designation;