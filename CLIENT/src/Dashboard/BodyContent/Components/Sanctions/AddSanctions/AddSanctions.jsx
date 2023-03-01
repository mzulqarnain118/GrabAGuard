import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, Typography, TextField, Divider, Hidden } from "@mui/material";
import Select from '../../../../../Modules/UiModules/Control/Select';
import guidelines from '../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import listformatter from '../../../../../Modules/Utility/ListFormatter';

const AddSanctions = () => {
    const [enable, setEnable] = useState(true);
    const [SanctionValue, setSanctionValue] = React.useState(1);
    const [department, setDepartment] = useState("");
    const [subDepartment, setSubDepartment] = useState("");
    const [subdptfilter, setSubdptfilter] = useState([]);
    const [Scale, setScale] = useState(-1);
    const [Designation, setDesignation] = useState("");
    const [ScaleOptions, setScaleOptions] = useState([]);
    const [DesignationOptions, setDesignationOption] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [subDepartmentOptions, setSubDepartmentOptions] = useState([]);
    const [OccupiedSeats, setOccupiedSeats] = useState();
    const [TotalSeats, setTotalSeats] = useState();
    const [errors, setErrors] = useState({});
    const [values, setvalues] = React.useState('');

    const SanctionType = [{ id: 1, title: 'Designation Wise' }, { id: 2, title: 'Department Wise' },

    ];







    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await ApiCallGet('/getdepartment');
                console.log(result);
                const newData1 = listformatter(result.data, 'dept_id', 'dept_name');
                setDepartmentOptions(newData1);

                let getsubDepartment = await ApiCallGet('/getsubdepartmentdata');
                console.log(getsubDepartment);
                let subDepartmentData = getsubDepartment.data.map((item) => {
                    return { id: item.sub_dept_id, title: item.sub_dept_name, main_id: item.dept_id }
                });
                setSubDepartmentOptions(subDepartmentData);

                let getscale = await ApiCallGet('/getscale');
                console.log(getscale);
                const newData3 = [{ id: -1, title: 'No Scale' }, ...listformatter(getscale.data, 'scale_id', 'scale_code')];
                setScaleOptions(newData3);


                let getDesignation = await ApiCallGet('/getdesignation');
                console.log(getDesignation);
                const newData4 = listformatter(getDesignation.data, 'desig_id', 'desig_name');
                setDesignationOption(newData4);

            }
            catch {
                alert("error")
            }
        }
        fetchData();
    }, []);




    const handleformSubmit = async (e) => {
        e.preventDefault();

        var screen = {
            deptID: department,
            subDeptID: subDepartment,
            desigID: Designation,
            totalSeats: parseInt(TotalSeats),
        }
        console.log(screen);
        // if (validate()) {

        try {

            if (screen.occupiedSeats < 0 || screen.totalSeats < 0) {
                Toast("Seats Can't Be Negative", 'error');
            } else if (screen.totalSeats < 1) {
                Toast("Total Seats Can't Be Zero", 'error');
            } else if (screen.occupiedSeats > screen.totalSeats) {
                Toast("Occupied Seats Can't Be Greater Then Total Seats", 'error');
            } else {

                let result1 = await ApiCallPost("/insert_sanction_seats", screen);
                console.log(result1.data);
                if (result1.error) {
                    Toast(result1.text, "error");
                } else if (result1.data.Status === 0) {
                    if (SanctionValue === 1)
                        Toast("Total Seats Cannot Be Less Than Sum of Assigned Dept Seats!", "error");
                    else
                        Toast("Sum of Dept Seats Cannot Be Greater Than Total Desig Seats!", "error");
                } else {
                    Toast("Success", "success")
                    setDepartment('');
                    setSubDepartment('');

                }

            }
        }
        catch {
            Toast("some Data missing", 'error')
        }

        // }
        // else
        //     Toast("validation error ", "error");


    }


    // const validate = () => {
    //     let temp = {}

    //     temp.values = values ? "" : "This field is required."
    //     setErrors({ ...temp })
    //     return Object.values(temp).every(x => x == "")


    // }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '2rem' }}>
                <Card>
                    <CardContent>
                        <form style={{ marginTop: '2rem', marginBottom: '5rem' }}
                            onSubmit={handleformSubmit}>




                            <Typography variant="h6" color="text.secondary">
                                <b>Add New Sanction</b>
                            </Typography>

                            <div className="row mt-3 mr-0 ml-0" >

                                <div className={`${guidelines.inputclass}`}>



                                    <Select fullWidth
                                        required
                                        name="Department Nature"
                                        label="Sanction Type"
                                        value={SanctionValue}
                                        options={SanctionType}
                                        onChange={(e) => { setSanctionValue(e.target.value) }} />

                                </div>


                                {SanctionValue === 2 ?
                                    <>
                                        <div className="col-4 mb-2">

                                            <Select fullWidth
                                                required
                                                name="department"
                                                label="Departments"
                                                error={errors.department}
                                                value={department}
                                                onChange={(e) => {
                                                    setDepartment(e.target.value); setEnable(false);
                                                    setSubdptfilter(subDepartmentOptions);
                                                    setSubdptfilter((v) => {
                                                        const a = v.filter((department) => department.main_id === e.target.value);
                                                        if (a.length !== 0) {
                                                            setSubDepartment(a[0].id);
                                                        }
                                                        return a;
                                                    });
                                                }}
                                                options={departmentOptions}

                                            />
                                        </div>
                                    </> : null
                                }

                                {SanctionValue === 2 ?
                                    <>
                                        <div className="col-4 mb-2">


                                            <Select fullWidth
                                                required
                                                name="subdepartment"
                                                label="Sub Departments"
                                                value={subDepartment}
                                                disabled={enable}
                                                error={errors.subdepartment}
                                                onChange={(e) => { setSubDepartment(e.target.value) }}
                                                options={subdptfilter}


                                            />
                                        </div>
                                    </> : null
                                }                                {/* <div className="col-4">


                                    <Select fullWidth
                                        required
                                        name="scale"
                                        label="Scale (Optional)"
                                        value={Scale}
                                        error={errors.scale}
                                        onChange={(e) => {
                                            setScale(e.target.value)
                                        }}
                                        options={ScaleOptions}

                                    />
                                </div> */}

                                <div className="col-4 mb-2">


                                    <Select fullWidth
                                        required
                                        name="Designation"
                                        label="Designation"
                                        value={Designation}

                                        onChange={(e) => { setDesignation(e.target.value) }}
                                        options={DesignationOptions}
                                        error={errors.Designation}

                                    />
                                </div>

                                <div className="col-4 mb-2">
                                    <TextField fullWidth
                                        required
                                        inputProps={{ type: 'number' }}
                                        label="Total Seats"
                                        variant="standard"
                                        value={TotalSeats}
                                        name="Totalseats"
                                        error={errors.Totalseats}
                                        onChange={(e) => { setTotalSeats(e.target.value) }} />

                                </div>



                            </div>
                            <div className="row mt-3 mr-0 ml-0" >








                            </div>



                            <div className="row mt-3 mr-0 ml-0 " >




                                <div className="col-12">
                                    <Button
                                        sx={{ float: 'right' }}
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    //className={styles.submit__btn}
                                    // onClick={handleSubmit}
                                    >
                                        Enter
                                    </Button>
                                </div>




                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>





        </>
    )
}

export default AddSanctions;