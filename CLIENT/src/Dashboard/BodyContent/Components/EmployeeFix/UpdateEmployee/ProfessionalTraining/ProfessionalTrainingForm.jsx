import { Button, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { ApiCallGet, ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import listformatter from '../../../../../../Modules/Utility/ListFormatter';
import AddNewGeneral from '../../../../../../Modules/UiModules/Core/AddNewGeneral';
import CourseCertificateName from '../../../Admin/SetupForms/MasterForms/TrainingCourses';
import TrainingFieldOfStudy from '../../../Admin/SetupForms/MasterForms/TrainingFieldOfStudy';
import TrainingInstitue from '../../../Admin/SetupForms/MasterForms/TrainingInstitute';
import SqlDateFormat from '../../../../../../Modules/UiModules/Core/SqlDateFormat';
import CompareDates from '../../../../../../Modules/UiModules/Core/CompareDates';





const ProfessionalTrainingForm = (props) => {
    const initialFValues = {

        course_name: props.data?.course_certificate ?? '',
        field_name: props.data?.field_of_study ?? '',
        exp_inst_desc: props.data?.institute ?? '',
        start_date: props.data?.start_date ?? null,
        end_date: props.data?.end_date ?? null,
        remarks: props.data?.remarks ?? '',
    }


    const { values, setValues, handleChange } = useForm(initialFValues);
    const [trainingCourseOptions, setTrainingCourseOptions] = useState([]);
    //const [trainingFieldOfStudyOptions, setTrainingFieldOfStudyOptions] = useState([]);
    const [trainingInstituteOptions, setTrainingInstituteOptions] = useState([]);
    const [updated, setUpdated] = useState(0);



    useEffect(() => {

        const getData = async () => {

            //training
            const course = await ApiCallGet('/get_training_courses');
            if (course.error) {
                Toast(course.text, "error");
            } else {
                const newDataCourse = listformatter(course.data, 'course_id', 'course_name');
                setTrainingCourseOptions(newDataCourse);
            }
            //Hard Coding the value for others, id=7
            // const fieldofstudy = await ApiCallGet('/get_training_field_of_study');
            // if (fieldofstudy.error) {
            //     Toast(fieldofstudy.text, "error");
            // } else {
            //     const newDataField = listformatter(fieldofstudy.data, 'field_id', 'field_name');
            //     setTrainingFieldOfStudyOptions(newDataField);
            //     //Hard Coding the default value for others {id: 7, title: 'Other'}
            // }

            const courseinstitute = await ApiCallGet('/get_training_institutes');
            if (courseinstitute.error) {
                Toast(courseinstitute.text, "error");
            } else {
                const newDatainstitute = listformatter(courseinstitute.data, 'exp_inst_id', 'exp_inst_desc');
                setTrainingInstituteOptions(newDatainstitute);
            }
        }
        getData();
    }, [updated]);

    const validate = () => {

        if (values.CourseCertificateName === '') {
            Toast("Enter Course", "error");
            return false;
        }
        else if (values.FieldOfStudy === '') {
            Toast("Enter Field of Study", "error");
            return false;
        }
        else if (values.Institute === '') {
            Toast("Enter Training Institute", "error");
            return false;
        }
        else if (values.start_date === null) {
            if (values.end_date !== null) {
                Toast("Please enter End Date", "error");
                return false;
            }
            else {
                if (CompareDates(values.start_date, values.end_date)) {
                    Toast("Contract EndDate should be greater than Contract StartDate", "error");
                    return;
                }
            }
        }
        else if (values.end_date) {
            if (!values.start_date) {

                Toast("Please enter Start Date", "error");
                return;
            }
        }
        else {
            return true;
            // props.setData((v) => [...v, {

            //     course_name: trainingCourseOptions[values.coursename - 1].title,
            //     field_name: trainingFieldOfStudyOptions[values.filedofstudy - 1].title,
            //     exp_inst_desc: trainingInstituteOptions[values.trainginstitute - 1].title
            // }]);
            // props.setpopup(false)
        }
        return false

    }
    const submitData = async () => {
        const screenData1 = {
            emp_id: props.id,
            course_certificate: values.course_name,
            field_of_study: 7,//others = 7 hard coding for "Others"
            institute: values.exp_inst_desc,
            start_date: values.start_date ? SqlDateFormat(new Date(values.start_date)) : null,
            end_date: values.end_date ? SqlDateFormat(new Date(values.end_date)) : null,
            remarks: values.remarks,
        }
        if (props.submitAction === 'Insert') {

            const result = await ApiCallPost('/insert_emp_professional_training', screenData1);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Inserted Successfully!', 'success')
                props.setopenPopup(false);
            }
        }
        else if (props.submitAction === 'Update') {
            const screenData2 = {
                ...screenData1,
                training_id: props.data.training_id,
            }

            const result = await ApiCallPost('/emp_professional_training', screenData2);
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

        if (!validate)
            return;

        submitData();

    }


    return (
        <>
            <Form onSubmit={handleSubmit}>

                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <Stack>

                        <div className='row p-3  ' style={{ width: '880px' }}>

                            <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Controls.Autocomplete
                                    name="course_name"
                                    label="Course Certificate Name"
                                    value={values.course_name}
                                    setValues={setValues}

                                    options={trainingCourseOptions}
                                    required
                                />
                                <AddNewGeneral label='Course Name' setUpdated={setUpdated}><CourseCertificateName /></AddNewGeneral>

                            </div>
                            {/* 
                            <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                <Controls.Autocomplete
                                    name="field_name"
                                    label="Training Field of Study"
                                    value={values.field_name}
                                    setValues={setValues}
                                    options={trainingFieldOfStudyOptions}
                                    required
                                />
                                <AddNewGeneral label='Training Field' setUpdated={setUpdated}><TrainingFieldOfStudy /></AddNewGeneral>


                            </div> */}
                            <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                <Controls.Autocomplete
                                    name="exp_inst_desc"
                                    label="Training Institute"
                                    value={values.exp_inst_desc}
                                    setValues={setValues} s
                                    options={trainingInstituteOptions}
                                    required
                                />
                                <AddNewGeneral label='Training Institute' setUpdated={setUpdated}><TrainingInstitue /></AddNewGeneral>

                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Start Date"
                                    name='start_date'
                                    value={values.start_date}
                                    onChange={handleChange}
                                //required
                                />
                            </div>


                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    optional
                                    label="End Date"
                                    name='end_date'
                                    value={values.end_date}
                                    onChange={handleChange}
                                //required
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                <Controls.Input
                                    optional
                                    name="remarks"
                                    label="Remarks"
                                    value={values.remarks}
                                    onChange={handleChange}
                                //remarks
                                />

                            </div>
                            <div className={`${guidelines.inputclass}`} >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type='submit'                        >
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

export default ProfessionalTrainingForm;