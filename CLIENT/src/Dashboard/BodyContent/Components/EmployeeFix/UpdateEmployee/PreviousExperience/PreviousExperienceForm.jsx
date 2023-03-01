import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { ApiCallGet, ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import listformatter from '../../../../../../Modules/Utility/ListFormatter';
import FrontEndDateFormat from '../../../../../../Modules/UiModules/Core/FrontEndDateFormat';
import CompareDates from '../../../../../../Modules/UiModules/Core/CompareDates';
import SqlDateFormat from '../../../../../../Modules/UiModules/Core/SqlDateFormat';
import AddNewGeneral from '../../../../../../Modules/UiModules/Core/AddNewGeneral';
import Exp_Institute_Type_Table from '../../../Admin/SetupForms/MasterForms/EmployeeExperience/Exp_Institute_Type_Table';
import Exp_Job_Type_Table from '../../../Admin/SetupForms/MasterForms/EmployeeExperience/Exp_Job_Type_Table';
import Exp_Post_Table from '../../../Admin/SetupForms/MasterForms/EmployeeExperience/Exp_Post_Table';
import Exp_Institute_Type from '../../../Admin/SetupForms/MasterForms/EmployeeExperience/Exp_Institute_type';
import TrainingInstitue from '../../../Admin/SetupForms/MasterForms/TrainingInstitute';
const PreviousExperienceForm = (props) => {

    const initialFValues = {

        prev_exp_id: props.data?.prev_exp_id ?? null,
        exp_inst_type: props.data?.exp_inst_type ?? '',
        exp_institute: props.data?.exp_institute ?? '',
        exp_job_type: props.data?.exp_job_type ?? '',
        exp_salary_scale: props.data?.exp_salary_scale ?? '',
        exp_leaving_purpose: props.data?.exp_leaving_purpose ?? '',
        exp_post: props.data?.exp_post ?? '',
        expstartdate: props.data?.exp_start_date ?? null,
        expenddate: props.data?.exp_end_date ?? null
    }

    const { values, setValues, handleChange } = useForm(initialFValues);
    const [exp_posts, setexp_posts] = useState([]);
    const [exp_inst_types, setsexp_inst_types] = useState([]);
    const [exp_job_types, setexp_job_types] = useState([])
    const [exp_institutes, setexp_institutes] = useState([]);
    const [updated, setUpdated] = useState(0);

    const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();



    useEffect(() => {

        const getData = async () => {

            //previous experience apis
            var result1 = await ApiCallGet('/getjobtype');
            if (result1.error) {
                Toast(result1.text, "error");
            } else {
                const newData1 = listformatter(result1.data, 'exp_job_type_id', 'exp_job_type_desc');
                console.log(newData1);
                setexp_job_types(newData1);
            }

            var result2 = await ApiCallGet('/getexpinstitute');
            if (result2.error) {
                Toast(result2.text, "error");
            } else {
                const newData2 = listformatter(result2.data, 'exp_inst_id', 'exp_inst_desc');
                setexp_institutes(newData2);
            }

            var result3 = await ApiCallGet('/getexppost');
            if (result3.error) {
                Toast(result3.text, "error");
            } else {
                const newData3 = listformatter(result3.data, 'exp_post_id', 'exp_post_desc');
                setexp_posts(newData3);
            }

            var result4 = await ApiCallGet('/get_exp_institute_type');
            if (result4.error) {
                Toast(result4.text, "error");
            } else {
                const newData4 = listformatter(result4.data, 'inst_type_id', 'inst_type_desc');
                setsexp_inst_types(newData4);
            }

        }
        getData();


    }, [updated]);

    const validate = () => {

        // if (values.prev_exp_id === '') {
        //     Toast("Enter Previous Experience ID", "error");
        // }
        // else
        if (values.exp_inst_type === '') {
            Toast("Enter Institute Type", "error");
            return;
        }
        else if (values.exp_institute === '') {
            Toast("Enter Institute", "error");
        }
        else if (values.exp_job_type === '') {
            Toast("Enter Job Type", "error");
        }
        else if (values.exp_inst_type === '') {
            Toast("Enter Experience Type", "error");
        }
        // else if (values.exp_salary_scale === '') {
        //     Toast("Enter Salary/Scale", "error");
        // }
        // else if (values.exp_leaving_purpose === '') {
        //     Toast("Enter Leaving Purpose", "error");
        // }
        else if (values.exp_post === '') {
            Toast("Enter Experience Post", "error");
        }
        else if (values.expstartdate === null) {
            Toast("Enter Start Date", "error");
        }
        else if (CompareDates(values.expstartdate, values.expenddate)) {
            Toast(" Experience EndDate should be greater than Experience StartDate", "error");
            return;
        }

        else {
            return true

        }
        return false

    }

    const submitData = async () => {
        console.log(SqlDateFormat(values.expenddate))
        const screenData = {
            emp_id: props.id,
            exp_inst_type: values.exp_inst_type,
            exp_institute: values.exp_institute,
            exp_job_type: values.exp_job_type,
            exp_inst_Type: values.exp_inst_type,
            exp_salary_scale: values.exp_salary_scale,
            exp_leaving_purpose: values.exp_leaving_purpose,
            exp_post: values.exp_post,
            exp_start_date: values.expstartdate ? CurdateFormated(new Date(values.expstartdate)) : null,
            exp_end_date: values.expenddate ? CurdateFormated(new Date(values.expenddate)) : null

        }
        if (props.submitAction === 'Insert') {
            const result = await ApiCallPost('/insert_emp_prev_experience', screenData);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Inserted Successfully!', 'success')
                props.setopenPopup(false);
            }
        }
        else if (props.submitAction === 'Update') {
            const screenData2 = {
                ...screenData, prev_exp_id: props.data?.prev_exp_id
            };

            const result = await ApiCallPost('/update_emp_prev_experince', screenData2);
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

        props.setTable((old) => old + 1);

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
                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <Stack>

                        <div className="row p-3" >

                            <div className={`${guidelines.inputclass} d-flex align-items-center justify-content-center`}>
                                <Controls.Autocomplete
                                    name="exp_post"
                                    label="Experience Post"
                                    value={values.exp_post}
                                    setValues={setValues}
                                    options={exp_posts}
                                    required
                                />
                                <AddNewGeneral label='Experience Post' setUpdated={setUpdated}><Exp_Post_Table /></AddNewGeneral>

                            </div>
                            <div className={`${guidelines.inputclass}  d-flex align-items-center justify-content-center`}>
                                <Controls.Autocomplete
                                    name="exp_institute"
                                    label="Experience Institute"
                                    value={values.exp_institute}
                                    setValues={setValues}
                                    options={exp_institutes}
                                    required
                                />
                                <AddNewGeneral label='Experience Institute' setUpdated={setUpdated}><TrainingInstitue /></AddNewGeneral>

                            </div>
                            <div className={`${guidelines.inputclass} d-flex align-items-center justify-content-center`}  >
                                <Controls.Select
                                    name="exp_inst_type"
                                    label="Experience Institute Type"
                                    value={values.exp_inst_type}
                                    onChange={handleChange}
                                    options={exp_inst_types}
                                    required
                                />
                                <AddNewGeneral label='Institute Type' setUpdated={setUpdated}><Exp_Institute_Type_Table /></AddNewGeneral>

                            </div>
                            <div className={`${guidelines.inputclass}  d-flex align-items-center justify-content-center`}>
                                <Controls.Select
                                    name="exp_job_type"
                                    label="Experience Job Type"
                                    value={values.exp_job_type}
                                    onChange={handleChange}
                                    options={exp_job_types}
                                    required
                                />
                                <AddNewGeneral label='Experience Job Type' setUpdated={setUpdated}><Exp_Job_Type_Table /></AddNewGeneral>

                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Salary Scale"
                                    name='exp_salary_scale'
                                    value={values.exp_salary_scale}
                                    onChange={handleChange}

                                />

                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Exp Start Date"
                                    name='expstartdate'
                                    value={values.expstartdate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Exp End Date"
                                    name='expenddate'
                                    value={values.expenddate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Leaving Purpose"
                                    name='exp_leaving_purpose'
                                    value={values.exp_leaving_purpose}
                                    onChange={handleChange}

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

export default PreviousExperienceForm;