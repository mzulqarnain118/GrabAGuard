import React, { useState, useEffect, useContext } from 'react';
import { Alert, Button, Stack } from "@mui/material";
import Controls from '../../../../../Modules/UiModules/Control/Controls';
import guidelines from '../../../../../Modules/Guidelines/Guidelines';
//import { useForm, Form } from '../../../../../Modules/UiModules/Control/useForm';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
//import styles from "./EmployeeForm.module.css";
//import FileUploader from '../../../../../Modules/FileUploader/FileUploader';
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import AvatarUpload from '../../../../../Modules/AvatarUploader/AvatarUploader';
import Formheading from '../../../../../Modules/UiModules/Control/Formheading';
import { multiStepContext } from './StepContext';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../../../../Modules/UiModules/Control/useForm';
import AddNewGeneral from '../../../../../Modules/UiModules/Core/AddNewGeneral';
import Country1 from '../../Admin/SetupForms/MasterForms/Country';
import Domicile from '../../Admin/SetupForms/MasterForms/Domicile';
import Nationality from '../../Admin/SetupForms/MasterForms/Nationality';
import Religion from '../../Admin/SetupForms/MasterForms/Religion';
import MaritalStatus from '../../Admin/SetupForms/MasterForms/MaritalStatus'
import BoardUniversityTab from '../../Admin/SetupForms/MasterForms/BoardUniversityTab';
import DegreeTab from '../../Admin/SetupForms/MasterForms/DegreeTab';
import Subjects from '../../Admin/SetupForms/MasterForms/Subject';
import Disability from '../../Admin/SetupForms/MasterForms/Disability';



const EmployeeForm = (props) => {


    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)
    const [religionOptions, setReligionOptions] = useState([])
    const [gender, setgender] = useState(userData['gender'] ?? '');
    const [dob, setdob] = useState(null);
    const [nationalityOptions, setNationalities] = useState([])
    const [Domiciles, setDomiciles] = useState([])
    const [areaspecial, setareaspecial] = useState(null);   
    const [maritalStatusOptions, setMaritalStatus] = useState([]);
    const [married, setmarried] = useState('');
    //qualification
    const [degreetypes, setdegreetypes] = useState([]);
    const [degree, setDegree] = useState('');
    const [subject, setsubject] = useState('');
    const [subjectOptions, setsubjectOptions] = useState([]);
    const [boardtype, setboardtype] = useState([])
    const [board, setboard] = useState('');
    const [yearofpassing, setyearofpassing] = useState(null);
    const [totalmarks, settotalmarks] = useState('');
    const [marksobtained, setmarksobtained] = useState('');
    const [cgpa, setcgpa] = useState('');
    const [remarks, setremarks] = useState('');
    const [Country, setcountry] = useState([])
    const [updated, setUpdated] = useState(0);
    const [Devision, setDevision] = useState('')
    const [position, setPosition] = useState('');
    const [countryValue, setCountryValue] = useState('');
    const [disability, setDisability] = useState('')
    const [disabilityOptions,setDisabilityOptions] = useState([])

    //uploader
    const [image, updateImage] = useState(userData['image'] ?? null);
    const [imageTaker, setTaker] = useState(userData['imageTaker'] ?? null);
    // const [picpath, setPicpath] = useState(null);
    const [enable, setEnable] = useState(true)
    // eslint-disable-next-line no-unused-vars
    const [imageError, setImageError] = useState(false);

    //console.log(degreetypes)



    useEffect (()=>{
        console.log('abc',maritalStatusOptions);
        console.log(disabilityOptions)
    },[])

    useEffect(() => {
        const fetchData = async () => {

            let result = await ApiCallGet('/get_marital_status_list');
            if (result.error) {
                Toast(result.text, "error");
            } else {
                let newData1 = result.data.map((item) => {
                    return { id: item.marital_id, title: item.marital_desc }
                });
                setMaritalStatus(newData1);
            }
            let result1 = await ApiCallGet('/get_disability');
            if(result1.error){
                Toast(result1.text,'error');
            }else{
                console.log(result1);
                let newData1 = result1.data.map((item) => {
                    return { id: item.disability_id, title: item.disability_type }
                });
                setDisabilityOptions(newData1);
            }
            let result2 = await ApiCallGet('/get_religion');
            if (result2.error) {
                Toast(result2.text, "error");
            } else {
                let newData = result2.data.map((item) => {
                    return { id: item.religion_id, title: item.religion_name }
                });
                setReligionOptions(newData);
            }

            var result3 = await ApiCallGet('/getdegree');
            let newData3 = result3.data.map((item, index) => {
                return { id: item.deg_id, title: item.deg_desc }
            });
            setdegreetypes(newData3);

            var result4 = await ApiCallGet('/getboarduniversity');
            let newData4 = result4.data.map((item) => {
                return { id: item.board_uni_id, title: item.board_uni_name }
            });
            setboardtype(newData4);

            var getSubjects = await ApiCallGet('/Get_Subjects');
            let SubjectsData = getSubjects.data.map((item) => {
                return { id: item.subject_id, title: item.subject_name }
            });
            setsubjectOptions(SubjectsData);

            let domicile = await ApiCallGet('/Get_Domicile');
            if (domicile.error) {
                Toast(domicile.text, "error");
            } else {
                let newData = domicile.data.map((item) => {
                    return { id: item.dom_id, title: item.dom_desc }
                });
                setDomiciles(newData);
            }

            let nationality = await ApiCallGet('/Get_Nationality');
            if (nationality.error) {
                Toast(nationality.text, "error");
            } else {
                console.log('first', nationality)
                let newData = nationality.data.map((item) => {
                    return { id: item.nat_id, title: item.nat_desc }
                });
                setNationalities(newData);
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

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updated]);
    React.useEffect(() => {
        setUserData({ ...userData, 'image': image, 'imageTaker': imageTaker });
    }, [image, imageTaker]);

    const initialFValues = {
        domicile: userData?.selectorValues?.domicile ?? '',
        nationality: userData?.selectorValues?.nationality ?? '',
        religion: userData?.selectorValues?.religion ?? '',
        empid: userData?.DesignationData?.empid ?? '',
        cnic: userData?.DesignationData?.cnic ?? '',
        pasportno: userData?.DesignationData?.pasportno ?? '',


    }
    const { values, setValues, handleChange } = useForm(initialFValues);

    const genderItems = [
        { id: 'M', title: 'Male' },
        { id: 'F', title: 'Female' },
        { id: 'O', title: 'Other' },
    ];
    const devision = [
        { id: '1st', title: '1st' },
        { id: '2nd', title: '2nd' },
        { id: '3rd', title: '3rd' }
    ]

    const [Data, setData] = useState([]);
    const columns = [

        { title: "Degree/Certificate", field: 'degree_name', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, editable: () => false },
        { title: "Subject", field: 'subject', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Board", field: 'board', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Year of Passing", field: 'yearofpassing', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Total Marks", field: 'totalmarks', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Marks Obtained", field: 'marksobtained', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Division/CGPA", field: 'cgpa', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Remarks/Distinction", field: 'remarks', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Division", field: 'devision', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, editable: () => true },
        { title: "Position in Board/University", field: 'position_in_board_uni', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, editable: () => true },
        { title: "Country", field: 'country_name', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, editable: () => true },

    ];
    const addQualification = () => {
        const CurdateFormated = currentDate => currentDate.getFullYear();

        if (board === '') {
            Toast("Please Enter Board", "error");
        }
        else if (degree === '') {
            Toast("Please Enter Degree", "error");
            return;
        }
        else if (subject === '') {
            Toast("Enter Subject", "error");
        }
        else if (yearofpassing === null) {
            Toast("Enter year of passing", "error");
        }
        else if (parseInt(totalmarks) < 0) {
            Toast("Enter Total Marks", "error");
        }
        else if (parseInt(marksobtained) < 0) {
            Toast("Enter Marks Obtained", "error");
        }
        else if (parseInt(marksobtained) > parseInt(totalmarks)) {
            Toast("Invalid Obtain marks", "error");
        }
        else {

            const degobj = degreetypes.filter(x => (x.id == degree));
            const subjectobj = subjectOptions.filter(x => (x.id == subject));
            const boardobj = boardtype.filter(x => (x.id == board));
            const Countryobj = Country.filter(x => (x.id == countryValue));

            const newQualif = {
                deg_id: degree,
                degree_name: degobj[0].title,
                boardUni_id: board,
                board: boardobj[0].title,
                subject_id: subject,
                subject: subjectobj[0].title,
                yearofpassing: CurdateFormated(new Date(yearofpassing)),
                totalmarks: parseInt(totalmarks),
                marksobtained: parseInt(marksobtained),
                cgpa: cgpa,
                remarks: remarks,
                devision: Devision,
                country: countryValue,
                country_name: Countryobj[0].title,
                position_in_board_uni: position,

            };

            const newarr = [...Data, newQualif]
            setData(newarr);
            setUserData({ ...userData, 'QualificationData': newarr });
            setDegree('');
            setsubject('');
            setboard('');
            setyearofpassing(null);
            settotalmarks('');
            setmarksobtained('');
            setcgpa('');
            setremarks('');
            setCountryValue('');
            setPosition('');
            setDevision('');
        }

    }

    const Validations = () => {

        if (userData.empname === undefined) {
            Toast("Enter Employee Name", "error");
        }
        else if (userData.fname === undefined) {
            Toast("Please Enter Employee Father Name", "error");
            return;
        }
        else if (userData.phone1 === undefined) {
            Toast("Enter Mobile Phone", "error");
            return
        }
        else if (userData.email === undefined) {
            Toast("Please Enter Email", "error");
            return;
        }
        else if (userData.presentAdress === undefined) {
            Toast("Please Enter Present Address", "error");
            return;
        }
        else if (userData.permanentAddress === undefined) {
            Toast("Please Enter Permanent Address", "error");
            return;
        }
        else if (values.domicile === '') {
            Toast("Please Enter Domicile", "error");
            return;
        }
        else if (values.religion === '') {
            Toast("Please Enter Religion", "error");
            return;
        }
        else if (userData.gender === undefined) {
            Toast("Please Enter Gender", "error");
            return;
        }
        else if (userData.marital_status === undefined) {
            Toast("Please Enter Marital Status", "error");
            return;
        }
        else if (userData.dob === undefined) {
            Toast("Enter Date of BirthDate", "error");
            return
        }
        else if (values.nationality === '') {
            Toast("Please Enter Nationality", "error");
            return;
        }
        else if (disability === undefined) {
            Toast("Please Enter Disability", "error");
            return;
        }
        else if (userData.QualificationData?.length < 1) {
            Toast("Please Enter Qualification", "error");
            return;
        }
        else {
            setCurrentStep(3);
            setUserData({ ...userData, selectorValues: values })
            console.log('Third step  returned userData and Values ',userData, values);
        }
    }
    return (
        <>


            <Stack>

                <div className={`m-3`}>
                    <Formheading label="Personal Details" />
                </div>

                <div className="row  " >

                    {/* emplyee personal details */}
                    <div className='col-8'>

                        <div className="row p-3" >
                            <div className="col-6 pb-2">
                                <Controls.Input inputProps={{ type: 'number' }} id="standard-basic"
                                    label="CNIC No."
                                    name="cnic"
                                    disabled
                                    required
                                    value={values.cnic}
                                //onChange={(e) => setUserData({ ...userData, cnic: e.target.value })}
                                />
                            </div>

                            <div className="col-6 pb-2" >
                                <Controls.Input id="standard-basic"
                                    label="Employee ID"
                                    required
                                    name="empid"
                                    disabled
                                    value={values.empid}
                                //onChange={(e) => setUserData({ ...userData, 'empid': e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="row p-3" >
                            <div className="col-6 pb-2">
                                <Controls.Input id="standard-basic"
                                    label="Passport No."
                                    required
                                    disabled
                                    name="pasportno"
                                    value={values.pasportno}
                                //onChange={(e) => setUserData({ ...userData, 'pasportno': e.target.value })}
                                />
                            </div>

                            <div className="col-6 pb-2" >
                                <Controls.Input id="standard-basic"
                                    label="Employee Name"
                                    name="empname"
                                    required
                                    value={userData['empname']}
                                    onChange={(e) => setUserData({ ...userData, 'empname': e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="row p-3" >
                            <div className="col-6 pb-2">
                                <Controls.Input id="standard-basic"
                                    label="Fathers Name."
                                    name="fname"
                                    required
                                    value={userData['fname']}
                                    onChange={(e) => setUserData({ ...userData, 'fname': e.target.value })}
                                />
                            </div>

                            <div className="col-6 pb-2" >
                                <Controls.Input id="standard-basic"
                                    label="Spouse's Name"
                                    name="sname"
                                    value={userData['sname']}
                                    onChange={(e) => setUserData({ ...userData, 'sname': e.target.value? e.target.value:null })}
                                />
                            </div>
                        </div>

                    </div>
                    {/* emplyee profile */}
                    {/* Image */}
                    <div className='col-4'>

                        <div style={{ marginTop: "20px", width: "300px" }} >
                            {/* <Uploader label='Profile' files={files} setFiles={setFiles} imgSource={imgSource} setImgSource={setImgSource} limit='1' minHeight="50px" maxWidth='350px' /> */}
                            <AvatarUpload image={image} updateImage={updateImage} imagetaker={imageTaker} setTaker={setTaker} />
                            {imageError ? <Alert severity="error">Max Size Limit Exceeded!</Alert> : <Alert severity="info">Max Size Allowed: 500KB</Alert>}
                        </div>
                    </div>

                </div>

                {/* emplyee personal details */}
                <div className="row p-3" >

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            label="Mobile Number"
                            name="phone1"
                            required
                            value={userData['phone1']}
                            onChange={(e) => setUserData({ ...userData, 'phone1': e.target.value })}

                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            label="Office Phone"
                            name="phone2"
                            value={userData['phone2']}
                            onChange={(e) => setUserData({ ...userData, 'phone2': e.target.value? e.target.value:null })}

                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            inputProps={{ type: 'email' }}
                            label="Email."
                            name="email"
                            required

                            value={userData['email']}
                            onChange={(e) => setUserData({ ...userData, 'email': e.target.value })}
                        />
                    </div>
                    <div className="col-lg-12 col-md-6 col-sm-12 col-12  pb-3">
                        <Controls.Input id="standard-basic"
                            label="Present Address"
                            name="presentAdress"
                            required
                            value={userData['presentAdress']}
                            onChange={(e) => setUserData({ ...userData, 'presentAdress': e.target.value })}
                        />
                    </div>

                    <div className="col-lg-12 col-md-6 col-sm-12 col-12  pb-3">
                        <Controls.Input id="standard-basic"
                            label="Permanent Address"
                            name="permanentAddress"
                            required
                            value={userData['permanentAddress']}
                            onChange={(e) => setUserData({ ...userData, 'permanentAddress': e.target.value })}

                        />
                    </div>


                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <Controls.Autocomplete
                            name="domicile"
                            label="Domicile"
                            value={values.domicile}
                            setValues={setValues}
                            options={Domiciles}
                            required

                        />
                        <AddNewGeneral label='Domicile' setUpdated={setUpdated}><Domicile /></AddNewGeneral>

                    </div>


                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Autocomplete id="standard-basic"
                            label="Religion"
                            value={values.religion}
                            setValues={setValues}
                            name="religion"

                            options={religionOptions}
                            required />
                        <AddNewGeneral label='Religion' setUpdated={setUpdated}><Religion /></AddNewGeneral>
                    </div>



                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Select
                            name="gender"
                            label="Gender"
                            value={gender}
                            onChange={(e) => {
                                setgender(e.target.value);
                                setUserData({ ...userData, 'gender': e.target.value })
                            }}
                            options={genderItems}
                            required

                        />
                    </div>
                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Select
                            name="marital_status"
                            label="Marital Status"
                            value={userData['marital_status'] ?? married}
                            onChange={(e) => { setmarried(e.target.value); setUserData({ ...userData, 'marital_status': e.target.value }) }}
                            options={maritalStatusOptions}
                            required

                        />
                        <AddNewGeneral label='Marital Status' setUpdated={setUpdated}><MaritalStatus /></AddNewGeneral>

                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.DatePicker
                            name="dob"
                            label="Date of Birth"
                            value={userData['dob'] ?? dob}
                            onChange={(e) => {
                                setdob(e.target.value)
                                setUserData({ ...userData, 'dob': e.target.value })
                            }}
                            required
                            // error={errors.dob}
                            // errorText={errors.dob}
                            helperText="as recorded in matriculation Certificate"
                            fullWidth variant="standard"
                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            label="Area Spaciality"
                            value={userData['areaspecial'] ?? areaspecial}
                            name="areaspecial"
                            onChange={(e) => {
                                setareaspecial(e.target.value);
                                setUserData({ ...userData, 'areaspecial': e.target.value })
                            }} />
                    </div>

                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Autocomplete id="standard-basic"
                            label="Nationality"
                            value={values.nationality}
                            setValues={setValues}
                            name="nationality"
                            required
                            options={nationalityOptions}
                        />
                        <AddNewGeneral label='Nationality' setUpdated={setUpdated}><Nationality /></AddNewGeneral>

                    </div>
                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Select
                            name="disability"
                            label="Disability"
                            value={userData['disability'] ?? disability}
                            onChange={(e) => { setDisability(e.target.value); setUserData({ ...userData, 'disability': e.target.value }) }}
                            options={disabilityOptions}
                            required

                        />
                        
                        

                        <AddNewGeneral label='Disability' setUpdated={setUpdated}><Disability /></AddNewGeneral>

                    </div>


                </div>



                <div>
                    <Formheading label="Employee Qualification" />
                </div>
                Emplyee Qualification
                <div className="row p-3" >

                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Autocomplete
                            name="board"
                            label="Board/University"
                            value={board}
                            change={(e) => {
                                setboard(e)
                            }}
                            options={boardtype}
                            required

                        />
                        <AddNewGeneral label='Board/University' setUpdated={setUpdated}><BoardUniversityTab /></AddNewGeneral>

                    </div>
                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Autocomplete
                            name="degree"
                            label="Degree"
                            value={degree}
                            change={(e) => {
                                setDegree(e);
                                setEnable(false);
                            }}
                            options={degreetypes}
                            required

                        />
                        <AddNewGeneral label='Degree' setUpdated={setUpdated}><DegreeTab /></AddNewGeneral>
                    </div>

                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Autocomplete
                            name="subject"
                            label="Subject"
                            disabled={enable}
                            value={subject}
                            change={(e) => {
                                setsubject(e)
                            }}
                            options={subjectOptions}

                            required

                        />
                        <AddNewGeneral label='Subject' setUpdated={setUpdated}><Subjects /></AddNewGeneral>
                    </div>

                    <div className={`${guidelines.inputclass}`} >
                        <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                            label="Year of Passing"
                            value={yearofpassing}
                            name="yearofpassing"
                            views={['year']}
                            inputFormat="yyyy"
                            onChange={(e) => {
                                setyearofpassing(e.target.value)
                            }}
                            required />

                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input inputProps={{ type: 'number', min: '1' }} id="standard-basic" label="Total Marks"
                            value={totalmarks}
                            name="totalmarks"
                            onChange={(e) => {
                                settotalmarks(e.target.value)
                            }}
                            required
                        />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input inputProps={{ type: 'number' }} id="standard-basic"
                            label="Marks Obtained"
                            value={marksobtained}
                            name="marksobtained"
                            onChange={(e) => {
                                setmarksobtained(e.target.value)
                            }}
                            required
                        />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            label="CGPA"
                            value={cgpa}
                            name="cgpa"
                            onChange={(e) => {
                                setcgpa(e.target.value)
                            }}
                        />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            label="Remarks/Distinction"
                            value={remarks}
                            name="remarks"
                            onChange={(e) => {
                                setremarks(e.target.value)
                            }}
                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Select id="standard-basic"
                            label="Division"
                            value={Devision}
                            name="devision"
                            onChange={(e) => {
                                setDevision(e.target.value)
                            }}
                            options={devision}
                        />
                    </div>


                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            label="Position in Board/Uni"
                            value={position}
                            name="position"
                            onChange={(e) => {
                                setPosition(e.target.value)
                            }}

                        />
                    </div>
                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Controls.Autocomplete id="standard-basic"
                            name="country"
                            label="Country"
                            value={countryValue}
                            change={(e) => {
                                setCountryValue(e)
                            }}
                            options={Country}
                            required
                            
                        />
                        <AddNewGeneral label='Country' setUpdated={setUpdated}><Country1 /></AddNewGeneral>
                    </div>




                    <div className={`${guidelines.inputclass}`}>
                        <Button

                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => {
                                (addQualification());

                            }}
                        >
                            Add
                        </Button>
                    </div>
                </div>
                <MatTable
                    style={{ marginBottom: '2rem' }}
                    title="Qualification"
                    columns={columns}
                    data={userData['QualificationData'] ?? Data}
                />
                <div >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setCurrentStep(1)}
                    >
                        back
                    </Button>
                    <Button
                        style={{ float: 'right' }}
                        variant="contained"
                        color="primary"
                        onClick={() => { Validations() }}
                    >
                        Next
                    </Button>
                </div>
            </Stack>
        </>
    );


}

export default EmployeeForm;

