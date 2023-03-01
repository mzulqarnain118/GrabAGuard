import { Button, CardContent, Stack } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { useForm, Form } from '../../../../../Modules/UiModules/Control/useForm';
import guidelines from '../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../Modules/UiModules/Control/Controls';
import { ApiCallGet, ApiCallPost, ApiCallGetFile, ApiCallGetDownloadFile } from '../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import Formheading from '../../../../../Modules/UiModules/Control/Formheading';
import AvatarUpload from '../../../../../Modules/AvatarUploader/AvatarUploader';
import Alert from '@mui/material/Alert';




const AddEmployee = (props) => {
    const history = useHistory();
    const initialFValues = {
        emp_id: '',
        emp_name: '',
        nic: '',
        passport_no: '',
        phone_1: '',
        phone_2: '',
        date_of_birth: null,
        gender: '',
        religion: '',
        nationality: '',
        father_name: '',
        spouse_name: '',
        present_address: '',
        permanent_addreess: '',
        email_address: '',
        domicile: '',
        area_special: ''
    }
    // const emp_id = props.id
    const { values, handleChange } = useForm(initialFValues);
    const [image, updateImage] = useState(null);
    const [imageTaker, setTaker] = useState(null);
    //const [picpath, setPicpath] = useState(null);
    const [imageError, setImageError] = useState(false);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         var result = await ApiCallPost('/get_employee', { emp_id: emp_id });
    //         if (result.error) {
    //             Toast(result.text, 'error');
    //         }
    //         else {
    //             setValues(result.data[0]);
    //             var pic = await ApiCallGetFile(`/getProfile/${emp_id}`);
    //             if (pic.error) {
    //                 Toast('Failed to load Picture!', 'error');

    //             }
    //             else {
    //                 if (pic?.data.type !== 'text/html') {
    //                     console.log('Pic Data: ', typeof pic.headers['content-type']);
    //                     setPicpath(pic.headers['content-type'].replace("HRM-FILES/", ""));
    //                     updateImage(URL.createObjectURL(pic.data));
    //                 }

    //             }
    //         }
    //     }

    //     fetchData();


    // }, []);

    // useEffect(() => {
    //     if (imageTaker) {
    //         if (imageTaker?.size > 500000) {
    //             setImageError(true);
    //         }
    //         else {
    //             setImageError(false)
    //         }
    //     }
    // }, [imageTaker])


    const genderItems = [
        { id: 'M', title: 'Male' },
        { id: 'F', title: 'Female' },
        { id: 'O', title: 'Other' },
    ];




    const handleSubmit = (e) => {
        e.preventDefault();

        submitData();


    }



    const submitData = async () => {

        const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();
        console.log(values.date_of_birth);

        console.log('Image props: ', imageTaker, image);

        if (imageError) {
            Toast('Image Size Limit Reached', 'error');
            return;
        }

        let formData = new FormData();
        formData.append("emp_id", values.emp_id);
        formData.append("emp_name", values.emp_name);
        formData.append("emp_pic", imageTaker);
        formData.append("nic", values.nic);
        formData.append("passport_no", values.passport_no);
        formData.append("phone_1", values.phone_1);
        formData.append("phone_2", values.phone_2);
        formData.append("date_of_birth", values.date_of_birth ? CurdateFormated(new Date(values.date_of_birth)) : null);
        formData.append("gender", values.gender);
        formData.append("religion", values.religion);
        formData.append("nationality", values.nationality);
        formData.append("father_name", values.father_name);
        formData.append("spouse_name", values.spouse_name);
        formData.append("present_address", values.present_address);
        formData.append("permanent_addreess", values.permanent_addreess);
        formData.append("email_address", values.email_address);
        formData.append("domicile", values.domicile);
        formData.append("area_special", values.area_special);

        const result = await ApiCallPost('/insert_employee', formData);
        if (result.error) {
            Toast(result.text, 'error')
        }
        else {
            Toast('Data Updated Successfully!', 'success')
            history.push({ pathname: `/main/employee-fix/update-employee/${values.emp_id}` });
        }
    }

    console.log('Image: ', image);


    return (
        <>
            <Form onSubmit={handleSubmit}>


                <CardContent>
                    <Stack>
                        <Formheading label="Personal Details" />
                        <div className="row " >

                            <div className='col-8'>

                                <div className="row p-3" >
                                    <div className="col-6 mb-5"></div>
                                    <div className="col-6 mb-5" ></div>
                                    <div className="col-6">
                                        <Controls.Input id="standard-basic"
                                            label="Employee ID"
                                            name="emp_id"
                                            required
                                            value={values.emp_id}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-6" >
                                        <Controls.Input inputProps={{ type: 'number' }} id="standard-basic"
                                            label="CNIC No."
                                            name="nic"
                                            required
                                            value={values.nic}
                                            onChange={handleChange}

                                        />

                                    </div>
                                </div>
                                <div className="row p-3" >
                                    <div className="col-6">
                                        <Controls.Input id="standard-basic"
                                            label="Employee Name"
                                            name="emp_name"
                                            required
                                            value={values.emp_name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-6" >
                                        <Controls.Input id="standard-basic"
                                            inputProps={{ type: 'email' }}
                                            label="Email."
                                            name="email_address"
                                            required
                                            value={values.email_address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row p-3" >
                                    <div className="col-6">
                                        <Controls.Input id="standard-basic"
                                            label="Passport No."
                                            name='passport_no'
                                            // sx={{backgroundColor: values?.passport_no? '' : 'var(--error-cell)'}}
                                            value={values.passport_no}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-6" >
                                        <Controls.Input id="standard-basic"
                                            label="Fathers Name."
                                            name="father_name"
                                            required
                                            value={values.father_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Image */}
                            <div className='col-4'>

                                <div style={{ marginTop: "20px", width: "300px" }} >
                                    {/* <Uploader label='Profile' files={files} setFiles={setFiles} imgSource={imgSource} setImgSource={setImgSource} limit='1' minHeight="50px" maxWidth='350px' /> */}
                                    <AvatarUpload image={image} updateImage={updateImage} imagetaker={imageTaker} setTaker={setTaker} />
                                    {imageError ? <Alert severity="error">Max Size Limit Exceeded!</Alert> : <Alert severity="info">Max Size Allowed: 500KB</Alert>}
                                </div>
                            </div>

                        </div>

                        <div className="row p-3 " >
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Spouse's Name"
                                    name="spouse_name"
                                    value={values.spouse_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Phone No.1"
                                    name="phone_1"
                                    required
                                    value={values.phone_1}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Phone No.2"
                                    name="phone_2"
                                    value={values.phone_2}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="col-lg-12 col-md-6 col-sm-12 col-12  pb-3">
                                <Controls.Input id="standard-basic"
                                    label="Present Address"
                                    name="present_address"
                                    required
                                    value={values.present_address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-lg-12 col-md-6 col-sm-12 col-12  pb-3">
                                <Controls.Input id="standard-basic"
                                    label="Permanent Address"
                                    name="permanent_addreess"
                                    required
                                    value={values.permanent_addreess}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className={`${guidelines.inputclass}`}>

                                <Controls.Input
                                    name="domicile"
                                    label="Domicile"
                                    value={values.domicile}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Religion"
                                    value={values.religion}
                                    name="religion"
                                    onChange={handleChange}
                                    required />
                            </div>

                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Select
                                    name="gender"
                                    label="Gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                    options={genderItems}
                                    required

                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker
                                    name="date_of_birth"
                                    label="Date of Birth"
                                    value={values.date_of_birth}
                                    onChange={handleChange}
                                    required

                                    helperText="as recorded in matriculation Certificate"
                                    fullWidth variant="standard"
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Area Spaciality"
                                    value={values.area_special}
                                    name="area_special"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Nationality"
                                    value={values.nationality}
                                    name="nationality"
                                    required
                                    onChange={handleChange}
                                />
                            </div>


                        </div>

                        <div className=" p-3" >
                            <Button

                                style={{ float: 'right' }}
                                variant="contained"
                                color="primary"
                                size="large"
                                type='submit'
                            // onClick={() => {
                            //     (addQualification());
                            //     setUserData({ ...userData, 'QualificationData': Data })
                            // }}

                            >
                                Enter
                            </Button>
                        </div>



                    </Stack>

                </CardContent >
            </Form>


        </>
    );
}

export default AddEmployee;