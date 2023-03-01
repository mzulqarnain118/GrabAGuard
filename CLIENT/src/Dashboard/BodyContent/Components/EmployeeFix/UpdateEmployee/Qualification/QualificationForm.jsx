import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { ApiCallGet, ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import Subjects from '../../../Admin/SetupForms/MasterForms/Subject';
import AddNewGeneral from '../../../../../../Modules/UiModules/Core/AddNewGeneral';
import BoardUniversityTab from '../../../Admin/SetupForms/MasterForms/BoardUniversityTab';
import DegreeTab from '../../../Admin/SetupForms/MasterForms/DegreeTab';
import Country1 from '../../../Admin/SetupForms/MasterForms/Country';


const QualificationForm = (props) => {
    console.log(props.data)
    const initialFValues = {

        board: props.data?.board_university ?? '',
        degree: props.data?.deg_id ?? '',
        subject: props.data?.subject_id ?? '',
        yearofpassing: props.data?.year_of_passing ? new Date(parseInt(props.data.year_of_passing), 0) : null,
        totalmarks: props.data?.total_marks ?? null,
        marksobtained: props.data?.obtained_marks ?? null,
        cgpa: props.data?.cgpa ?? null,
        remarks: props.data?.remarks_distinction ?? '',
        devision: props.data?.devision ?? '',
        position: props.data?.position_in_board_uni ?? '',
        country: props.data?.country ?? ''
    }

    console.log('InYear: ', props.data?.year_of_passing);
    console.log('Year: ', initialFValues.yearofpassing);

    const { values, setValues, handleChange } = useForm(initialFValues);

    const CurdateFormated = currentDate => currentDate.getFullYear();

    const [percentage, setPercentage] = useState('');
    const [degreetypes, setdegreetypes] = useState([]);
    const [subjectOptions, setsubjectOptions] = useState([]);
    const [boardtype, setboardtype] = useState([])
    const [Country, setcountry] = useState([])
    const [updated, setUpdated] = useState(0);

    const devision = [
        { id: '1st', title: '1st' },
        { id: '2nd', title: '2nd' },
        { id: '3rd', title: '3rd' }
    ]


    useEffect(() => {
        const getData = async () => {

            var result1 = await ApiCallGet('/getdegree');
            if (result1.error) {
                Toast(result1.text, "error");
            } else {
                let newData1 = result1.data.map((item) => {
                    return { id: item.deg_id, title: item.deg_desc }
                });
                setdegreetypes(newData1);
            }
            var result2 = await ApiCallGet('/getboarduniversity');
            if (result2.error) {
                Toast(result2.text, "error");
            } else {
                let newData2 = result2.data.map((item) => {
                    return { id: item.board_uni_id, title: item.board_uni_name }
                });
                setboardtype(newData2);
            }
            var getSubjects = await ApiCallGet('/Get_Subjects');
            if (getSubjects.error) {
                Toast(getSubjects.text, "error");
            } else {
                let SubjectsData = getSubjects.data.map((item) => {
                    return { id: item.subject_id, title: item.subject_name }
                });
                setsubjectOptions(SubjectsData);
            }

            var getCountry = await ApiCallGet('/get_countries');
            if (getCountry.error) {
                Toast(getCountry.text, "error");
            } else {
                let CountryData = getCountry.data.map((item) => {
                    return { id: item.country_id, title: item.country_name }
                });
                setcountry(CountryData);
            }
        }
        getData();

    }, [updated]);

    const validate = () => {
        if (values.boardUni === '') {
            Toast("Enter Board", "error");
        }
        else if (values.degree === '') {
            Toast("Please enter degree", "error");
        }
        else if (values.subject === '') {
            Toast("Enter subject", "error");
        }
        else if (values.yearofpassing === null) {
            Toast("Enter year of passing", "error");
        }
        else if (values.country === '') {
            Toast("Enter country of degree", "error");
        }
        // else if (values.totalmarks <= 0) {
        //     Toast("Enter Total Marks", "error");
        // }
        // else if (values.marksobtained <= 0) {
        //     Toast("Enter Marks Obtained", "error");
        // }
        else if (values.marksobtained && !values.totalmarks) {
            Toast("Enter Total Marks", "error");
            return;
        }
        else if (values.totalmarks && !values.marksobtained) {
            Toast("Enter Obtained Marks", "error");
            return;
        }
        else if (parseInt(values.marksobtained) > parseInt(values.totalmarks)) {
            Toast("Invalid Obtain marks", "error");
        }
        // else if (values.cgpa === null) {
        //     Toast("Enter CGPA", "error");
        // }
        // else if (values.remarks === '') {
        //     Toast("Enter Remarks", "error");
        // }
        else {
            return true;
        }

        return false;
    }

    const submitData = async () => {

        let screenData = {

            emp_id: props.id,
            deg_id: values.degree,
            subject_id: values.subject,
            board_university: values.board,
            year_of_passing: values.yearofpassing ? CurdateFormated(new Date(values.yearofpassing)) : null,
            total_marks: parseInt(values.totalmarks),
            obtained_marks: parseInt(values.marksobtained),
            cgpa: parseFloat(values.cgpa),
            devision: values.devision,
            country: values.country,
            position_in_board_uni: values.position,
            remarks_distinction: values.remarks

        }

        if (props.submitAction === 'Insert') {
            const result = await ApiCallPost('/insert_emp_qualification', screenData);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Inserted Successfully!', 'success')
                props.setopenPopup(false);
            }
        }
        else if (props.submitAction === 'Update') {

            screenData = {
                ...screenData,
                qualif_id: props.data.qualif_id,
                year_of_passing_old: props.data.year_of_passing,
                year_of_passing_new: CurdateFormated(new Date(values.yearofpassing))
            };
            const result = await ApiCallPost('/update_emp_qualification', screenData);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Updated Successfully!', 'success')
                 props.setopenPopup(false);

            }
        }
        else {
            Toast('Submit Action Not Defined', 'error');
        }
        props.setTableUpdated((old) => old + 1);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate())
            return;

        submitData();

    }
    const Percentage = () => {
        if (values.totalmarks && values.marksobtained) {
            let p = (values.marksobtained / values.totalmarks) * 100;
            console.log("PERCENTAGE IS: ", p)
            p *= 100;
            p = Math.round(p);
            p /= 100;
            setPercentage((prev) => `${p}%`);
        }
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Stack>

                        <div className="row p-3" >

                            <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Controls.Autocomplete
                                    name="board"
                                    label="Board/University"
                                    value={values.board}
                                    setValues={setValues}
                                    options={boardtype}
                                    required
                                />
                                <AddNewGeneral label='Board/University' setUpdated={setUpdated}><BoardUniversityTab /></AddNewGeneral>

                            </div>
                            <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Controls.Autocomplete
                                    name="degree"
                                    label="Degree"
                                    value={values.degree}
                                    setValues={setValues}
                                    options={degreetypes}
                                    required
                                />
                                <AddNewGeneral label='Degree' setUpdated={setUpdated}><DegreeTab /></AddNewGeneral>
                            </div>

                            <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


                                <Controls.Autocomplete
                                    name="subject"
                                    label="Subject"
                                    value={values.subject}
                                    setValues={setValues}
                                    options={subjectOptions}
                                    required
                                />
                                <AddNewGeneral label='Subject' setUpdated={setUpdated}><Subjects /></AddNewGeneral>

                            </div>


                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Year of Passing"
                                    value={values.yearofpassing}
                                    name="yearofpassing"
                                    views={['year']}
                                    inputFormat="yyyy"
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                            <div className={`${guidelines.inputclass}`}>
                               
                                <Controls.Input inputProps={{ type: 'number', min: '1' }} id="standard-basic" label="Total Marks"
                                    value={values.totalmarks}
                                    name="totalmarks"
                                    onChange={handleChange}
                                // onBlur={(e) => { Percentage() }}
                                />
                            
                            
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input inputProps={{ type: 'number', min: '1' }} id="standard-basic"
                                    label="Marks Obtained"
                                    value={values.marksobtained}
                                    name="marksobtained"
                                    onChange={handleChange}
                                // onBlur={(e) => { Percentage() }}

                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Select id="standard-basic"
                                    label="Division"
                                    value={values.devision}
                                    name="devision"
                                    onChange={handleChange}
                                    options={devision}
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic" inputProps={{ type: 'number' }}
                                    label="CGPA"
                                    value={values.cgpa}
                                    name="cgpa"
                                    onChange={handleChange}
                                    required={false}
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Remarks/Distinction"
                                    value={values.remarks}
                                    name="remarks"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Position in Board/Uni"
                                    value={values.position}
                                    name="position"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Controls.Autocomplete
                                    name="country"
                                    label="Country"
                                    value={values.country}
                                    setValues={setValues}
                                    options={Country}
                                    required
                                />
                                <AddNewGeneral label='Country' setUpdated={setUpdated}><Country1 /></AddNewGeneral>
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type="submit"

                                >
                                    {props.label}
                                </Button>
                            </div>
                        </div>

                    </Stack>


                </div>

            </Form>


        </>
    );
}


export default QualificationForm;