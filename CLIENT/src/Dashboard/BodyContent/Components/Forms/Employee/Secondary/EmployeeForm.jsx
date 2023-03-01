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


const EmployeeForm = (props) => {

    // { setCurrentStep, userData, setUserData } = useContext(multiStepContext)

    const genderItems = [
        { id: 'male', title: 'Male' },
        { id: 'female', title: 'Female' },
        { id: 'other', title: 'Other' },
    ];

    // useEffect(() => {

    //     const getData = async () => {

    //         var result1 = await ApiCallGet('/getdegree');
    //         let newData1 = result1.data.map((item, index) => {
    //             return { id: index, title: item.deg_desc }
    //         });
    //         setdegreetypes(newData1);

    //         var result2 = await ApiCallGet('/getboarduniversity');
    //         let newData2 = result2.data.map((item) => {
    //             return { id: item.board_uni_id, title: item.board_uni_name }
    //         });
    //         setboardtype(newData2);

    //         // var getJobNature = await ApiCallGet('/getjobnature');
    //         // let jobnatureData = getJobNature.data.map((item) => {
    //         //     return { id: item.nature_id, title: item.nature_desc }
    //         // });
    //         // setJobnatureType(jobnatureData);

    //         var getSubjects = await ApiCallGet('/Get_Subjects');
    //         let SubjectsData = getSubjects.data.map((item) => {
    //             return { id: item.subject_id, title: item.subject_name }
    //         });
    //         console.log(SubjectsData);
    //         setsubjectOptions(SubjectsData);
    //     }
    //     getData();
    // }, []);

    //personaldetails
    const [empid, setempid] = useState(null);
    const [cnic, setcnic] = useState(null);
    const [passportno, setpassportno] = useState(null);
    const [empname, setempname] = useState(null);
    const [fname, setFname] = useState(null);
    const [sname, setSname] = useState(null);
    const [phone1, setphone1] = useState(null);
    const [phone2, setphone2] = useState(null);
    const [email, setemail] = useState(null);
    const [presentAdress, setpresentAdress] = useState(null);
    const [permanentAddress, setpermanentAddress] = useState(null);
    //const [domicile, setdomicile] = useState(userData['domicile'] ?? '');
    const [domicile, setdomicile] = useState('');
    const [religion, setreligion] = useState(null);
    const [religionOptions, setReligionOptions] = useState([])
    //const [gender, setgender] = useState(userData['gender'] ?? '');
    const [gender, setgender] = useState('');
    const [dob, setdob] = useState(null);
    const [nationality, setNationality] = useState('');
    const [areaspecial, setareaspecial] = useState(null);
    const [maritalStatusOptions, setMaritalStatus] = useState([]);
    const [married, setmarried] = useState('')
    //qualification
    // const [degreetypes, setdegreetypes] = useState([]);
    // const [degree, setDegree] = useState('');
    // const [subject, setsubject] = useState('');
    // const [subjectOptions, setsubjectOptions] = useState([]);
    // const [boardtype, setboardtype] = useState([])
    // const [board, setboard] = useState('');
    // const [yearofpassing, setyearofpassing] = useState(null);
    // const [totalmarks, settotalmarks] = useState('');
    // const [marksobtained, setmarksobtained] = useState('');
    // const [cgpa, setcgpa] = useState('');
    // const [remarks, setremarks] = useState('');
    // uploader
    // const [image, updateImage] = useState(userData['image'] ?? null);
    // const [imageTaker, setTaker] = useState(userData['imageTaker'] ?? null);
    const [image, updateImage] = useState(null);
    const [imageTaker, setTaker] = useState(null);
    const [picpath, setPicpath] = useState(null);

    // eslint-disable-next-line no-unused-vars
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

            let result1 = await ApiCallGet('/get_marital_status_list');
            if (result1.error) {
                Toast(result1.text, "error");
            } else {
                let newData1 = result1.data.map((item) => {
                    return { id: item.marital_id, title: item.marital_desc }
                });
                setMaritalStatus(newData1);
            }

            let result2 = await ApiCallGet('/get_religion');
            if (result2.error) {
                Toast(result1.text, "error");
            } else {
                let newData = result2.data.map((item) => {
                    return { id: item.religion_id, title: item.religion_name }
                });
                setReligionOptions(newData);
            }


        }

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const [Data, setData] = useState([]);
    // const columns = [

    //     { title: "Degree/Certificate", field: 'degree', type: 'numeric', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, editable: () => false },
    //     { title: "Subject", field: 'subject', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    //     { title: "Board", field: 'board', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    //     { title: "Year of Passing", field: 'yearofpassing', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    //     { title: "Total Marks", field: 'totalmarks', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    //     { title: "Marks Obtained", field: 'marksobtained', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    //     { title: "Division/CGPA", field: 'cgpa', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    //     { title: "Remarks/Distinction", field: 'remarks', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } }
    // ];

    const DomicileItems = [
        { id: '1', title: 'Punjab' },
        { id: '2', title: 'Sindh' },
        { id: '3', title: 'Khyber Pakhtunkhwa' },
        { id: '4', title: 'Balochistan' },
    ]

    // const AllValues = {
    //     image: image,
    //     orderno: '',
    //     ordertype: '',
    //     orderdate: '',
    //     jobnature: jobnature,
    //     deptid: '',
    //     desigid: '',
    //     empscale: '',
    //     joiningdate: '',
    //     advno: '',
    //     empid: empid,
    //     empname: empname,
    //     emptype: '',
    //     cnic: cnic,
    //     passportno: passportno,
    //     phone1: phone1,
    //     phone2: phone2,
    //     dob: dob,
    //     gender: gender,
    //     religion: religion,
    //     expyear: '',
    //     expmonth: '',
    //     expday: '',
    //     areaspecial: areaspecial,
    //     fname: fname,
    //     sname: sname,
    //     presentAdress: presentAdress,
    //     permanentAddress: permanentAddress,
    //     email: email,
    //     domicile: domicile,
    //     isleft: false,
    //     isteaching: isteaching,
    //     qalificationdata: Data,


    // };


    // const addQualification = () => {
    //     const CurdateFormated = currentDate => currentDate.getFullYear();

    //     if (board === '') {
    //         Toast("Enter degree", "error");
    //     }
    //     else if (degree === '') {
    //         Toast("Please enter subject", "error");
    //         return;
    //     }
    //     else if (subject === '') {
    //         Toast("Enter board", "error");
    //     }
    //     else if (yearofpassing === null) {
    //         Toast("Enter year of passing", "error");
    //     }
    //     else if (totalmarks <= 0) {
    //         Toast("Enter Total Marks", "error");
    //     }
    //     else if (marksobtained <= 0) {
    //         Toast("Enter Marks Obtained", "error");
    //     }
    //     else if (marksobtained > totalmarks) {
    //         Toast("Invalid Obtain marks", "error");
    //     }
    //     else if (cgpa === '') {
    //         Toast("Enter CGPA", "error");
    //     }
    //     else if (remarks === '') {
    //         Toast("Enter Remarks", "error");
    //     }

    //     else {

    //         const newQualif = {
    //             degree: degreetypes[degree - 1].title,
    //             subject: subjectOptions[subject - 1].title,
    //             board: boardtype[board - 1].title,
    //             yearofpassing: CurdateFormated(new Date(yearofpassing)),
    //             totalmarks: totalmarks,
    //             marksobtained: marksobtained,
    //             cgpa: cgpa,
    //             remarks: remarks,
    //         };
    //         const newarr = [...Data, newQualif]
    //         setData(newarr);
    //         // setUserData({ ...userData, 'QualificationData': newarr });
    //         setDegree('');
    //         setsubject('');
    //         setboard('');
    //         setyearofpassing(null);
    //         settotalmarks('');
    //         setmarksobtained('');
    //         setcgpa('');
    //         setremarks('');
    //     }

    //  }
    // const setFields = () => {
    //     setDegree('');
    //     setsubject('');
    //     setboard('');
    //     setyearofpassing(null);
    //     settotalmarks('');
    //     setmarksobtained('');
    //     setcgpa('');
    //     setremarks('');
    // }
    // React.useEffect(() => {
    //     setUserData({ ...userData, 'image': image, 'imageTaker': imageTaker });
    // }, [image, imageTaker]);

    const submitData = async () => {

        const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();


        console.log('Image props: ', imageTaker, image);

        if (imageError) {
            Toast('Image Size Limit Reached', 'error');
            return;
        }

        let formData = new FormData();
        formData.append("empID", empid);
        formData.append("emp_name", empname);
        formData.append("old_pic", image);
        formData.append("emp_pic", imageTaker);
        formData.append("pic_path", picpath);
        formData.append("nic", cnic);
        formData.append("passport_no", passportno);
        formData.append("phone_1", phone1);
        formData.append("phone_2", phone2);
        formData.append("date_of_birth", CurdateFormated(new Date(dob)));
        formData.append("gender", gender);
        formData.append("religion", religion);
        formData.append("nationality", nationality);
        formData.append("father_name", fname);
        formData.append("spouse_name", sname);
        formData.append("present_address", presentAdress);
        formData.append("permanent_addreess", permanentAddress);
        formData.append("email_address", email);
        formData.append("domicile", domicile);
        formData.append("area_special", areaspecial);
        formData.append("marital_status", married);

        const result = await ApiCallPost('/employeee', formData);
        if (result.error) {
            Toast(result.text, 'error')
        }
        else {
            Toast('Employee Added Successfully!', 'success')
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
                                    required
                                    value={cnic}
                                    onChange={(e) => setcnic(e.target.value)}
                                //value={userData['cnic']}
                                // onChange={(e) => setUserData({ ...userData, 'cnic': e.target.value })}
                                />
                            </div>

                            <div className="col-6 pb-2" >
                                <Controls.Input id="standard-basic"
                                    label="Employee ID"
                                    required
                                    name="empid"
                                    value={empid}
                                    onChange={(e) => setempid(e.target.value)}
                                // value={userData['empid']}
                                // onChange={(e) => setUserData({ ...userData, 'empid': e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="row p-3" >
                            <div className="col-6 pb-2">
                                <Controls.Input id="standard-basic"
                                    label="Passport No."
                                    required
                                    name="pasportno"
                                    value={passportno}
                                    onChange={(e) => setpassportno(e.target.value)}
                                // value={userData['pasportno']}                                  
                                // onChange={(e) => setUserData({ ...userData, 'pasportno': e.target.value })}
                                />
                            </div>

                            <div className="col-6 pb-2" >
                                <Controls.Input id="standard-basic"
                                    label="Employee Name"
                                    name="empname"
                                    required
                                    value={empname}
                                    onChange={(e) => setempname(e.target.value)}
                                // value={userData['empname']}
                                // onChange={(e) => setUserData({ ...userData, 'empname': e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="row p-3" >
                            <div className="col-6 pb-2">
                                <Controls.Input id="standard-basic"
                                    label="Fathers Name."
                                    name="fname"
                                    required
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                // value={userData['fname']}
                                // onChange={(e) => setUserData({ ...userData, 'fname': e.target.value })}
                                />
                            </div>

                            <div className="col-6 pb-2" >
                                <Controls.Input id="standard-basic"
                                    label="Spouse's Name"
                                    name="sname"
                                    required
                                    value={sname}
                                    onChange={(e) => setSname(e.target.value)}
                                // value={userData['sname']}
                                // onChange={(e) => setUserData({ ...userData, 'sname': e.target.value })}
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
                            // value={userData['phone1']}
                            // onChange={(e) => setUserData({ ...userData, 'phone1': e.target.value })}
                            value={phone1}
                            onChange={(e) => setphone1(e.target.value)}
                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            label="Office Phone"
                            name="phone2"
                            required
                            // value={userData['phone2']}
                            // onChange={(e) => setUserData({ ...userData, 'phone2': e.target.value })}
                            value={phone2}
                            onChange={(e) => setphone2(e.target.value)}
                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            inputProps={{ type: 'email' }}
                            label="Email."
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        // value={userData['email']}
                        // onChange={(e) => setUserData({ ...userData, 'email': e.target.value })}
                        />
                    </div>
                    <div className="col-lg-12 col-md-6 col-sm-12 col-12  pb-3">
                        <Controls.Input id="standard-basic"
                            label="Present Address"
                            name="presentAdress"
                            required
                            value={presentAdress}
                            onChange={(e) => setpresentAdress(e.target.value)}
                        // value={userData['presentAdress']}
                        // onChange={(e) => setUserData({ ...userData, 'presentAdress': e.target.value })}
                        />
                    </div>

                    <div className="col-lg-12 col-md-6 col-sm-12 col-12  pb-3">
                        <Controls.Input id="standard-basic"
                            label="Permanent Address"
                            name="permanentAddress"
                            required
                            value={permanentAddress}
                            // value={userData['permanentAddress']}
                            // onChange={(e) => setUserData({ ...userData, 'permanentAddress': e.target.value })}
                            onChange={(e) => setpermanentAddress(e.target.value)}
                        />
                    </div>


                    <div className={`${guidelines.inputclass}`}>

                        <Controls.Select
                            name="domicile"
                            label="Domicile"
                            value={domicile}
                            onChange={(e) => {
                                setdomicile(e.target.value);
                                // setUserData({ ...userData, 'domicile': e.target.value })
                            }}
                            options={DomicileItems}
                            required

                        />
                    </div>


                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Select id="standard-basic"
                            label="Religion"
                            value={religion}
                            name="religion"
                            onChange={(e) => {
                                setreligion(e.target.value)
                                // setUserData({ ...userData, 'religion': e.target.value })
                            }}
                            options={religionOptions}
                            required />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Select
                            name="gender"
                            label="Gender"
                            value={gender}
                            onChange={(e) => {
                                setgender(e.target.value);
                                // setUserData({ ...userData, 'gender': e.target.value })
                            }}
                            options={genderItems}
                            required

                        />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Select
                            name="marital_status"
                            label="Marital Status"
                            value={married}
                            onChange={(e) => setmarried(e.target.value)}
                            options={maritalStatusOptions}
                            required

                        />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.DatePicker
                            name="dob"
                            label="Date of Birth"
                            value={dob}
                            onChange={(e) => {
                                setdob(e.target.value)
                                // setUserData({ ...userData, 'dob': e.target.value })
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
                            value={areaspecial}
                            name="areaspecial"
                            required
                            onChange={(e) => {
                                setareaspecial(e.target.value);
                                // setUserData({ ...userData, 'areaspecial': e.target.value })
                            }} />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            label="Nationality"
                            value={nationality}
                            name="nationality"
                            required
                            onChange={(e) => {
                                setNationality(e.target.value);
                                // setUserData({ ...userData, 'nationality': e.target.value })
                            }} />
                    </div>

                </div>
                <div className={`${guidelines.inputclass} m-2`} >
                    <Button

                        // style={{ float: 'right' }}
                        variant="contained"
                        color="primary"
                        size="large"

                        onClick={() => {
                            submitData()
                        }}

                    >
                        Submit
                    </Button>
                </div>

                {/* <div>
                    <Formheading label="Employee Qualification" />
                </div>
                emplyee Qualification
                <div className="row p-3" >

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Select
                            name="board"
                            label="Board/University"
                            value={board}
                            onChange={(e) => {
                                setboard(e.target.value)
                            }}
                            options={boardtype}
                            required

                        />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Select
                            name="degree"
                            label="Degree"
                            value={degree}
                            onChange={(e) => {
                                setDegree(e.target.value);
                                setEnable(false);
                            }}
                            options={degreetypes}
                            required

                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Select
                            name="subject"
                            label="Subject"
                            disabled={enable}
                            value={subject}
                            onChange={(e) => {
                                setsubject(e.target.value)
                            }}
                            options={subjectOptions}
                            required

                        />
                    </div>

                    <div className={`${guidelines.inputclass}`}>
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
                            required />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input inputProps={{ type: 'number' }} id="standard-basic"
                            label="Marks Obtained"
                            value={marksobtained}
                            name="marksobtained"
                            onChange={(e) => {
                                setmarksobtained(e.target.value)
                            }}
                            required />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            label="Division/CGPA"
                            value={cgpa}
                            name="cgpa"
                            onChange={(e) => {
                                setcgpa(e.target.value)
                            }}
                            required />
                    </div>
                    <div className={`${guidelines.inputclass}`}>
                        <Controls.Input id="standard-basic"
                            label="Remarks/Distinction"
                            value={remarks}
                            name="remarks"
                            onChange={(e) => {
                                setremarks(e.target.value)
                            }}
                            required />
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
                    // data={userData['QualificationData'] ?? Data}
                    data={Data}
                /> 

               
                <div >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setCurrentStep(0)}
                    >
                        back
                    </Button>
                    <Button
                        style={{ float: 'right' }}
                        variant="contained"
                        color="primary"
                        onClick={() => setCurrentStep(2)}
                    >
                        Next
                    </Button>
                </div> */}
            </Stack>
        </>
    );


}

export default EmployeeForm;

