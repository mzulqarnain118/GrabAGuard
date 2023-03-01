import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { ApiCallGet, ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import CompareDates from '../../../../../../Modules/UiModules/Core/CompareDates';
import AddNewGeneral from '../../../../../../Modules/UiModules/Core/AddNewGeneral';
import StudyScheme from '../../../Admin/SetupForms/MasterForms/StudyScheme'
import Country from '../../../Admin/SetupForms/MasterForms/Country';

const StudySchemeForm = (props) => {
    console.log(props.data);

    const initialFValues = {
        schemeId: props.data?.scheme_id ?? '',
        country: props.data?.country ?? '',
        start_date: props.data?.start_date ?? null,
        end_date: props.data?.end_date ?? null,
    }
    const { values, setValues, handleChange } = useForm(initialFValues);
    const [studyschemes, setstudyschemes] = useState([]);
    const [Countries, setCountries] = useState([]);
    const [updated, setUpdated] = useState(0);

    useEffect(() => {
        const fetchData = async () => {


            var result1 = await ApiCallGet('/get_study_schemes');
            if (result1.error) {
                Toast(result1.text, "error");
            } else {
                let newData1 = result1.data.map((item, index) => {
                    return { id: item.scheme_id, title: item.scheme_desc }
                });
                setstudyschemes(newData1);
            }

            var result2 = await ApiCallGet('/get_countries');
            if (result2.error) {
                Toast(result2.text, "error");
            } else {
                let newData2 = result2.data.map((item) => {
                    return { id: item.country_id, title: item.country_name }
                });
                setCountries(newData2);
            }

        }
        fetchData();
    }, [updated]);


    const validate = () => {
        if (values.schemeId === '') {
            Toast("Select Study Scheme", "error");
        }
        else if (values.country === '') {
            Toast("Select Country", "error");
        }
        else if (values.start_date === null) {
            Toast("Enter Start Date", "error");
        }
        else if (values.end_date === null) {
            Toast("Enter End Date", "error");
        }
        else if (CompareDates(values.start_date, values.end_date)) {
            Toast("Contract EndDate should be greater than Contract StartDate", "error");
            return;
        }
        else {
            return true;
        }

        return false;
    }

    const submitData = async () => {
        console.log(values.start_date);
        const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();
        let screenData = {
            emp_id: props.id,
            scheme_id: values.schemeId,
            country: values.country,
            start_date: values.start_date ? CurdateFormated(new Date(values.start_date)) : null,
            end_date: values.end_date ? CurdateFormated(new Date(values.end_date)) : null,
        }

        if (props.submitAction === 'Insert') {
            console.log('Insert');
            var result = await ApiCallPost('/insert_emp_study_scheme', screenData);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Inserted Successfully!', 'success')
                props.setopenPopup(false);
            }
        }
        else if (props.submitAction === 'Update') {
            console.log('Update');
            screenData = {
                study_scheme_id: props.data.study_scheme_id,
                ...screenData, scheme_id_old: props.data.scheme_id,
                scheme_id_new: values.schemeId
            };

            const result = await ApiCallPost('/update_emp_study_scheme', screenData);
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

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div container="true" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <Stack>

                        <div className="row p-3" >

                            <div className={`${guidelines.inputclass} d-flex align-items-center justify-content-center`}>
                                <Controls.Autocomplete
                                    label="Study Scheme"
                                    value={values.schemeId}
                                    setValues={setValues}
                                    name='schemeId'
                                    options={studyschemes}
                                    required
                                />
                                <AddNewGeneral label='Study Scheme' setUpdated={setUpdated}><StudyScheme /></AddNewGeneral>

                            </div>
                            <div className={`${guidelines.inputclass} d-flex align-items-center justify-content-center`}>
                                <Controls.Autocomplete
                                    label="Country"
                                    name='country'
                                    value={values.country}
                                    setValues={setValues}
                                    options={Countries}
                                    required
                                />
                                <AddNewGeneral label='Country' setUpdated={setUpdated}><Country /></AddNewGeneral>

                            </div>


                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Start Date"
                                    name='start_date'
                                    value={values.start_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="End Date"
                                    name='end_date'
                                    value={values.end_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>



                            <div className={`${guidelines.inputclass}`}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type='submit'
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
export default StudySchemeForm;