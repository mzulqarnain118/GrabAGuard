import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Stack } from "@mui/material";
import Controls from '../../../../../Modules/UiModules/Control/Controls';
import guidelines from '../../../../../Modules/Guidelines/Guidelines';
import { ApiCallGet } from '../../../../../Modules/CoreModules/ApiCall';
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable';
import Toast from "../../../../../Modules/UiModules/Core/Toast/Toast"
import listformatter from '../../../../../Modules/Utility/ListFormatter'
import Formheading from '../../../../../Modules/UiModules/Control/Formheading';
import { multiStepContext } from './StepContext';
import SqlDateFormat from '../../../../../Modules/UiModules/Core/SqlDateFormat';
import AddNewGeneral from '../../../../../Modules/UiModules/Core/AddNewGeneral';
import Exp_Post_Table from '../../Admin/SetupForms/MasterForms/EmployeeExperience/Exp_Post_Table';
import TrainingInstitue from '../../Admin/SetupForms/MasterForms/TrainingInstitute';
import Exp_Job_Type_Table from '../../Admin/SetupForms/MasterForms/EmployeeExperience/Exp_Job_Type_Table';
import Exp_Institute_Type_Table from '../../Admin/SetupForms/MasterForms/EmployeeExperience/Exp_Institute_Type_Table';
import TrainingCourses from '../../Admin/SetupForms/MasterForms/TrainingCourses';
import TrainingFieldOfStudy from '../../Admin/SetupForms/MasterForms/TrainingFieldOfStudy';
//import styles from "./EmployeeForm.module.css"
//import { Scale } from '@mui/icons-material';
const EmployeeWorkDetails = (props) => {

    const { setCurrentStep, userData, setUserData, SubmitData } = useContext(multiStepContext)
    //previous experience details
    const [ExpPostsOptions, setExpPostsOptions] = useState([]);
    const [ExpPosts, setExpPosts] = useState('');
    const [ExpInstituteOptions, setExpInstituteOptions] = useState([]);
    const [ExpInstitute, setExpInstitute] = useState('');
    const [instituteTypeOptions, setInstituteTypeOptions] = useState([]);
    const [instituteTypes, setInstituteTypes] = useState('');
    const [jobTypeOptions, setJobTypeOptions] = useState([]);
    const [jobType, setJobtype] = useState('');
    const [SalaryScale, setSalaryScale] = useState('');
    const [expStartDate, setExpStartDate] = useState(null);
    const [expEndDate, setExpEndDate] = useState(null);
    const [leavingPurpose, setLeavingPurpose] = useState('');
    //profesional training
    const [trainingCourse, setTrainingCourse] = useState('');
    const [trainingCourseOptions, setTrainingCourseOptions] = useState([]);
    const [trainingFieldOfStudy, setTrainingFieldOfStudy] = useState('');
    const [trainingFieldOfStudyOptions, setTrainingFieldOfStudyOptions] = useState([]);
    const [trainingInstitute, setTrainingInstitute] = useState('');
    const [trainingInstituteOptions, setTrainingInstituteOptions] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null)
    const CurdateFormated = currentDate => currentDate.getMonth() + 1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
    const [updated, setUpdated] = useState(0)

    useEffect(() => {
        const getData = async () => {

            //previous experience apis
            var result1 = await ApiCallGet('/getjobtype');
            const newData1 = listformatter(result1.data, 'exp_job_type_id', 'exp_job_type_desc');
            setJobTypeOptions(newData1);

            var result2 = await ApiCallGet('/getexpinstitute');
            const newData2 = listformatter(result2.data, 'exp_inst_id', 'exp_inst_desc');
            setExpInstituteOptions(newData2);

            var result3 = await ApiCallGet('/getexppost');
            const newData3 = listformatter(result3.data, 'exp_post_id', 'exp_post_desc');
            setExpPostsOptions(newData3);

            var result4 = await ApiCallGet('/get_exp_institute_type');
            const newData4 = listformatter(result4.data, 'inst_type_id', 'inst_type_desc');
            setInstituteTypeOptions(newData4);

            //training
            const course = await ApiCallGet('/get_training_courses');
            const newDataCourse = listformatter(course.data, 'course_id', 'course_name');
            setTrainingCourseOptions(newDataCourse);

            const fieldofstudy = await ApiCallGet('/get_training_field_of_study');
            const newDataField = listformatter(fieldofstudy.data, 'field_id', 'field_name');
            setTrainingFieldOfStudyOptions(newDataField);

            const courseinstitute = await ApiCallGet('/get_training_institutes');
            const newDatainstitute = listformatter(courseinstitute.data, 'exp_inst_id', 'exp_inst_desc');
            setTrainingInstituteOptions(newDatainstitute);


        }
        getData();

    }, [updated]);



    //Previous Experience
    const [Data, setData] = useState([]);
    const columns = [

        { title: "Experience Post", field: 'expPost', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Experience Institute", field: 'expInstitute', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Institute Type", field: 'instituteTypes', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Job Type", field: 'jobType', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Salary Scale", field: 'salaryScale', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Start Date", field: 'expStartDate', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "End Date", field: 'expEndDate', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Leaving Purpose", field: 'leavingPurpose', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } }
    ];
    const addPreviousExperience = () => {

        if (ExpPosts === '') {
            Toast("Enter post", "error");
        }
        else if (ExpInstitute === '') {
            Toast("Please enter institute", "error");
            return;
        }
        else if (instituteTypes === '') {
            Toast("Enter institute type", "error");
        }
        else if (jobType === '') {
            Toast("Enter job type", "error");
        }
        else if (SalaryScale === '') {
            Toast("Enter salary scale", "error");
        }
        else if (!expStartDate) {
            Toast("Enter start date", "error");
        }
        else if (!expEndDate) {
            Toast("Enter End Date", "error");
        }
        else {
            const expPostobj = ExpPostsOptions.filter(x => (x.id == ExpPosts));
            const expInstituteobj = ExpInstituteOptions.filter(x => (x.id == ExpInstitute));
            const instituteTypeobj = instituteTypeOptions.filter(x => (x.id == instituteTypes));
            const jobTypeobj = jobTypeOptions.filter(x => (x.id == jobType));



            const newPreviousExp = {
                expPost: expPostobj[0].title,
                expPost_id: ExpPosts,
                expInstitute: expInstituteobj[0].title,
                expInstitute_id: ExpInstitute,
                instituteTypes: instituteTypeobj[0].title,
                instituteType_id: instituteTypes,
                jobType: jobTypeobj[0].title,
                jobType_id: jobType,
                salaryScale: SalaryScale,
                expStartDate: (expStartDate) ? SqlDateFormat(new Date(expStartDate)) : null,
                expEndDate: (expEndDate) ? SqlDateFormat(new Date(expEndDate)) : null,
                leavingPurpose: leavingPurpose
            };
            const newarr = [...Data, newPreviousExp]
            setData(newarr);
            setUserData({ ...userData, 'PreviousExpData': newarr });
            setExpPosts('');
            setExpInstitute('');
            setInstituteTypes('');
            setJobtype('');
            setSalaryScale('');
            setExpStartDate(null);
            setExpEndDate(null);
            setLeavingPurpose('');


        }

    }

    //Professional Training
    const [Data1, setData1] = useState([]);
    const columns1 = [

        { title: "Course/Certificate Name", field: 'traingcourse', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Field Of Study", field: 'traingfieldofstudy', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Training Institute", field: 'traininginstitute', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Start Date", editable: () => false, field: 'start_date', dateSetting: { locale: "en-GB" }, type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "End Date", editable: () => false, field: 'end_date', dateSetting: { locale: "en-GB" }, type: 'date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    ];
    const addProfessionalTraining = () => {

        if (trainingCourse === '') {
            Toast("Enter Course", "error");
        }
        else if (trainingFieldOfStudy === '') {
            Toast("Enter Field of Study", "error");
            return;
        }
        else if (trainingInstitute === '') {
            Toast("Enter Training Institute", "error");
        }
        else {
            const traingcourseName = trainingCourseOptions.filter(x => (x.id == trainingCourse));
            const traingfieldofstudyName = trainingFieldOfStudyOptions.filter(x => (x.id == trainingFieldOfStudy));
            const traininginstituteName = trainingInstituteOptions.filter(x => (x.id == trainingInstitute));
            const newProfessionalTraining = {
                traingcourse: traingcourseName[0].title,
                traingfieldofstudy: traingfieldofstudyName[0].title,
                traininginstitute: traininginstituteName[0].title,
                traingcourse_id: trainingCourse,
                traingfieldofstudy_id: trainingFieldOfStudy,
                traininginstitute_id: trainingInstitute,
                start_date: (startDate) ? SqlDateFormat(new Date(startDate)) : null,
                end_date: (endDate) ? SqlDateFormat(new Date(endDate)) : null,
            };
            const newarray = [...Data1, newProfessionalTraining]
            setData1(newarray);
            setUserData({ ...userData, 'ProfessionalTrainingData': newarray });
            setTrainingCourse('');
            setTrainingFieldOfStudy('');
            setTrainingInstitute('');
        }

    }

    // const AllValues = {
    //     trainingData: Data,
    //     previouExpData: Data1

    // }

    return (
        <>



            <Stack>
                <Formheading label="" />
                <Formheading label="Add Previous Experience" />

                <div className="row p-3" styles={{ marginBottom: '5rem' }}>
                    <div className={`${guidelines.inputclass}  d-flex align-items-center justify-content-center`}>
                        <Controls.Autocomplete
                            name="exppost"
                            label="Experience Post"
                            required
                            value={userData['exppost'] ?? ExpPosts}
                            change={(e) => {
                                setExpPosts(e)
                            }}
                            options={ExpPostsOptions}

                        />
                        <AddNewGeneral label='Experience Post' setUpdated={setUpdated}><Exp_Post_Table /></AddNewGeneral>

                    </div>

                    <div className={`${guidelines.inputclass}  d-flex align-items-center justify-content-center`}>

                        <Controls.Autocomplete
                            name="expinstitute"
                            label="Experience Institute"
                            value={userData['expinstitute'] ?? ExpInstitute}
                            change={(e) => { setExpInstitute(e) }}
                            options={ExpInstituteOptions}
                        />
                        <AddNewGeneral label='Experience Institute' setUpdated={setUpdated}><TrainingInstitue /></AddNewGeneral>

                    </div>
                    <div className={`${guidelines.inputclass}  d-flex align-items-center justify-content-center`}>
                        <Controls.Autocomplete
                            name="instituteType"
                            label="Institute Type"
                            value={userData['instituteType'] ?? instituteTypes}
                            change={(e) => { setInstituteTypes(e) }}
                            options={instituteTypeOptions}
                        />
                        <AddNewGeneral label='Institute Type' setUpdated={setUpdated}><Exp_Institute_Type_Table /></AddNewGeneral>

                    </div>

                    <div className={`${guidelines.inputclass}  d-flex align-items-center justify-content-center`}>
                        <Controls.Autocomplete
                            name="jobtype"
                            label="Job Type"
                            value={userData['jobtype'] ?? jobType}
                            change={(e) => { setJobtype(e) }}
                            options={jobTypeOptions}
                        />
                        <AddNewGeneral label='Experience Job Type' setUpdated={setUpdated}><Exp_Job_Type_Table /></AddNewGeneral>

                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <TextField id="standard-basic" label="Salary Scale" fullWidth variant="standard"
                            value={SalaryScale}
                            name="salaryscale"
                            onChange={(e) => { setSalaryScale(e.target.value); }}
                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.DatePicker
                            name="expstartdate"
                            label="Start Date"
                            value={expStartDate}
                            onChange={(e) => { setExpStartDate(e.target.value) }}
                            fullWidth variant="standard"
                            required
                        />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.DatePicker
                            label="End Date"
                            value={expEndDate}
                            name="expenddate"
                            onChange={(e) => { setExpEndDate(e.target.value) }}
                            fullWidth variant="standard"
                            required
                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <TextField id="standard-basic" label="Leaving Purpose" fullWidth variant="standard"
                            value={leavingPurpose}
                            name="leavingpurpose"
                            onChange={(e) => {
                                setLeavingPurpose(e.target.value);

                            }}


                        />
                    </div>


                    <div className={`${guidelines.inputclass}`} >
                        <Button

                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => {
                                (addPreviousExperience());
                                // (setFields())
                            }}
                        >
                            Add
                        </Button>
                    </div>
                </div>

                <MatTable
                    style={{ marginBottom: '2rem' }}

                    title="Previous Experience"
                    columns={columns}
                    data={userData['PreviousExpData'] ?? Data}

                />

                <Formheading label="Add Professional Training" />

                <div className="row p-3" >
                    <div className={`${guidelines.inputclass}  d-flex align-items-center justify-content-center`}>

                        <Controls.Autocomplete
                            name="coursename"
                            label="Training Course/Certificate Name"
                            value={trainingCourse}
                            change={(e) => { setTrainingCourse(e) }}
                            options={trainingCourseOptions}
                        />
                        <AddNewGeneral label='Course Name' setUpdated={setUpdated}><TrainingCourses /></AddNewGeneral>

                    </div>
                    <div className={`${guidelines.inputclass}  d-flex align-items-center justify-content-center`}>

                        <Controls.Autocomplete
                            name="filedofstudy"
                            label="Training Field of Study"
                            value={trainingFieldOfStudy}
                            change={(e) => { setTrainingFieldOfStudy(e) }}
                            options={trainingFieldOfStudyOptions}
                        />
                        <AddNewGeneral label='Training Field' setUpdated={setUpdated}><TrainingFieldOfStudy /></AddNewGeneral>

                    </div>
                    <div className={`${guidelines.inputclass}  d-flex align-items-center justify-content-center`}>

                        <Controls.Autocomplete
                            name="trainginstitute"
                            label="Training Institute"
                            value={trainingInstitute}
                            change={(e) => { setTrainingInstitute(e) }}
                            options={trainingInstituteOptions}
                        />
                        <AddNewGeneral label='Training Institute' setUpdated={setUpdated}><TrainingInstitue /></AddNewGeneral>

                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                            label="Start Date"
                            name='start_date'
                            value={startDate}
                            onChange={(e) => { setStartDate(e.target.value) }}
                        />
                    </div>


                    <div className={`${guidelines.inputclass}`}>
                        <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                            label="End Date"
                            name='end_date'
                            value={endDate}
                            onChange={(e) => { setEndDate(e.target.value) }}

                        />
                    </div>


                </div>
                <div >
                    <Button
                        style={{ float: 'right', marginBottom: '2rem' }}
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => {
                            (addProfessionalTraining());
                            // (setFields());

                        }}

                    >Add
                    </Button>
                </div>

                <MatTable
                    style={{ marginBottom: '2rem' }}
                    title="Professional Training"
                    columns={columns1}
                    data={userData['ProfessionalTrainingData'] ?? Data1}
                />

                {/* BACK OR SUBMIT */}
                <div>
                    <Button

                        variant="contained"
                        color="primary"
                        onClick={() => setCurrentStep(2)}

                    >
                        Back
                    </Button>


                    <Button
                        style={{ float: 'right' }}
                        variant="contained"
                        color="primary"
                        onClick={() => { (SubmitData()) }}

                    >
                        Submit
                    </Button>
                </div>

            </Stack>



        </>);
}

export default EmployeeWorkDetails;



//last Step of Employee Form
const Done = () => {
    const { setCurrentStep, setUserData } = useContext(multiStepContext)
    return (<>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', position: 'relative' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => { setCurrentStep(0); }}>
                Add New Employee
            </Button>
        </div>

    </>
    )
}

export {
    Done
}