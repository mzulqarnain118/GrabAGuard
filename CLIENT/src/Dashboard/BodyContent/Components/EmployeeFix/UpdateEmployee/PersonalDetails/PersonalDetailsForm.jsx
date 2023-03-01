import { Button, CardContent, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { ApiCallGet, ApiCallPost, ApiCallGetFile } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import Formheading from '../../../../../../Modules/UiModules/Control/Formheading';
import AvatarUpload from '../../../../../../Modules/AvatarUploader/AvatarUploader';
import Alert from '@mui/material/Alert';
import Loading from '../../../../../../Modules/UiModules/Core/Loading/Loading';
import Religion from '../../../Admin/SetupForms/MasterForms/Religion'
import AddNewGeneral from '../../../../../../Modules/UiModules/Core/AddNewGeneral';
import Domicile from '../../../Admin/SetupForms/MasterForms/Domicile';
import Nationality from '../../../Admin/SetupForms/MasterForms/Nationality';
import Disability from '../../../Admin/SetupForms/MasterForms/Disability';
import { ConstructionOutlined } from '@mui/icons-material';



const PersonalDetailsForm = (props) => {

    const initialFValues = {

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
        area_special: '',
        disability: '',
        marital_status: '',
        disability_type: '',
    }
    const emp_id = props.id
    const [nationalityOptions, setNationalities] = useState([])
    const [Domiciles, setDomiciles] = useState([])
    const { values, setValues, handleChange } = useForm(initialFValues);
    const [image, updateImage] = useState(null);
    const [imageTaker, setTaker] = useState(null);
    const [picpath, setPicpath] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [maritalStatusOptions, setMaritalStatus] = useState([])
    const [religionOptions, setReligion] = useState([])
    const [loading, setLoading] = useState(true);
    const [updated, setUpdated] = useState(0);
    const [updated1, setUpdated1] = useState(0);
    
    //const [updated3, setUpdated3] = useState(0);
    
    const [disabilityOptions,setDisabilityOptions] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            let result3 = await ApiCallPost('/get_employee', { emp_id: emp_id });
            if (result3.error) {
                Toast(result3.text, 'error');
            }
            else {
                setValues(result3.data[0]);
                props.setData(result3.data[0]);
                console.log('DEBUG API DATA: ', result3.data[0])

                var pic = await ApiCallGetFile(`/getProfile/${emp_id}`);
                if (pic.error) {
                    Toast('Failed to load Picture!', 'error');

                }
                else {
                    if (pic?.data.type !== 'text/html') {
                        console.log('Pic Data: ', typeof pic.headers['content-type']);
                        setPicpath(pic.headers['content-type'].replace("HRM-FILES/", ""));
                        updateImage(URL.createObjectURL(pic.data));
                    }

                }
            }

            setLoading(false);

        }

        fetchData();



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updated]);

    useEffect(() => {




        const fetchData = async () => {

            let result2 = await ApiCallGet('/get_religion');
            if (result2.error) {
                Toast(result2.text, "error");
            } else {
                let newData = result2.data.map((item) => {
                    return { id: item.religion_id, title: item.religion_name }
                });
                setReligion(newData);
            }

            let result1 = await ApiCallGet('/get_marital_status_list');
            if (result1.error) {
                Toast(result1.text, "error");
            } else {
                let newData1 = result1.data.map((item) => {
                    return { id: item.marital_id, title: item.marital_desc }
                });
                setMaritalStatus(newData1);
            }

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

            let disability = await ApiCallGet('/get_disability');
            if(disability.error){
                Toast(disability.text,'error');
            }else{
                console.log(disability);
                let newData1 = disability.data.map((item) => {
                    return { id: item.disability_id, title: item.disability_type }
                });
                setDisabilityOptions(newData1);
            }




        }

        fetchData();




    }, [updated1]);

    useEffect(() => {
        props.setPic(image);
    }, [updated, image]);



    // document.write(image);
    // console.log(image);

    useEffect(() => {
        if (imageTaker) {
            if (imageTaker?.size > 500000) {
                setImageError(true);
            }
            else {
                setImageError(false)
            }
        }
    }, [imageTaker])



    const genderItems = [
        { id: 'M', title: 'Male' },
        { id: 'F', title: 'Female' },
        { id: 'O', title: 'Other' },
    ];


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('DEBUG SUBMITTED', values)
        submitData();
    }

    console.log('DEBUG ON CHANGE', values)

    const submitData = async () => {

        const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();
        console.log(values.date_of_birth);

        console.log('Image props: ', imageTaker, image);

        if (imageError) {
            Toast('Image Size Limit Reached', 'error');
            return;
        }

        if (values.nationality === 1) {
            console.log('DEBUG NIC: ', values)
            if (values.nic.length < 13) {
                Toast("NIC Must Be of 13 Digits For Pakistani!", "error");
                return;
            } else if (values.gender === 'F' && parseInt(values.nic.toString()[12]) % 2 !== 0) {
                Toast("Last Digit of CNIC of Pakistani Females Must Be Even!", "error");
                return;
            } else if (values.gender === 'M' && parseInt(values.nic.toString()[12]) % 2 === 0) {
                Toast("Last Digit of CNIC of Pakistani Males Must Be Odd!", "error");
                return;
            }

        }

        let formData = new FormData();
        formData.append("empID", emp_id);
        formData.append("emp_name", values.emp_name);
        formData.append("old_pic", image);
        formData.append("emp_pic", imageTaker);
        formData.append("pic_path", picpath);
        formData.append("nic", values.nic);
        formData.append("passport_no", values.passport_no);
        formData.append("phone_1", values.phone_1);
        formData.append("phone_2", values.phone_2);
        formData.append("date_of_birth", CurdateFormated(new Date(values.date_of_birth)));
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
        formData.append("marital_status", values.marital_status);
        
        formData.append("disability", values.disability);
        console.log('Disability is ------------',values.disability)
        //console.log(formData)
        const result = await ApiCallPost('/update_employee', formData);
        if (result.error) {
            Toast(result.text, 'error')
        }
        else {
            Toast('Data Updated Successfully!', 'success');
            setUpdated((old) => old + 1);
        }
    }



    return (
        <>
            {loading ? <Loading />
                :

                <Form onSubmit={handleSubmit}>
                    <head>

                        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.debug.js" ></script>
                    </head>

                    <CardContent>
                        <Stack>
                            <div className="container " id='test'>

                                <Formheading label="Personal Details" />
                                <div className="row ">

                                    <div className='col-8' >

                                        <div className="row p-3" >
                                            <div className="col-6 mb-5"></div>
                                            <div className="col-6 mb-5" ></div>
                                            <div className="col-6">
                                                <Controls.Input inputProps={{ type: 'number' }} id="standard-basic"
                                                    label="CNIC No."
                                                    name="nic"
                                                    required
                                                    value={values.nic}
                                                    onChange={handleChange}

                                                />
                                            </div>

                                            <div className="col-6" >
                                                <Controls.Input id="standard-basic"
                                                    label="Employee Name"
                                                    name="emp_name"
                                                    required
                                                    value={values.emp_name}
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
                                                    inputProps={{ type: 'email' }}
                                                    label="Email."
                                                    name="email_address"
                                                    value={values.email_address}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="row p-3" >
                                            <div className="col-6">
                                                <Controls.Input id="standard-basic"
                                                    label="Fathers Name."
                                                    name="father_name"
                                                    required
                                                    value={values.father_name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {/* <div className="col-6" >
                                        <Controls.Checkbox
                                            name="is_primary"
                                            label="Martial Status"
                                            required
                                            value={values.is_primary}
                                            onChange={handleChange}
                                        />
                                    </div> */}
                                            <div className="col-6" >
                                                <Controls.Input id="standard-basic"
                                                    label="Spouse's Name"
                                                    name="spouse_name"
                                                    value={values.spouse_name}
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
                                            label="Mobile Phone"
                                            name="phone_1"
                                            required
                                            value={values.phone_1}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className={`${guidelines.inputclass}`}>
                                        <Controls.Input id="standard-basic"
                                            label="Office Phone"
                                            name="phone_2"
                                            value={values.phone_2}
                                            onChange={handleChange}
                                        />
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
                                        <AddNewGeneral label='Nationality' setUpdated={setUpdated1}><Nationality /></AddNewGeneral>

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


                                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        <Controls.Autocomplete
                                            name="domicile"
                                            label="Domicile"
                                            value={values.domicile}
                                            setValues={setValues}
                                            options={Domiciles}
                                            required

                                        />
                                        <AddNewGeneral label='Domicile' setUpdated={setUpdated1}><Domicile /></AddNewGeneral>

                                    </div>


                                    <div className={`${guidelines.inputclass} d-flex align-items-center justify-content-center`}>
                                        <Controls.Select id="standard-basic"
                                            label="Religion"
                                            value={values.religion}
                                            name="religion"
                                            onChange={handleChange}
                                            options={religionOptions}
                                            required />
                                        <AddNewGeneral label='Religion' setUpdated={setUpdated1}><Religion /></AddNewGeneral>

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
                                        <Controls.Select
                                            name="marital_status"
                                            label="Marital Status"
                                            value={values.marital_status}
                                            onChange={handleChange}
                                            options={maritalStatusOptions}
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
                                    
                                    <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Controls.Autocomplete id="standard-basic"
                                            label="Disability"
                                            value={values.disability}
                                            setValues={setValues}
                                            name="disability"
                                            required
                                            options={disabilityOptions}

                                            
                                        />
                                        <AddNewGeneral label='Disability' setUpdated={setUpdated1}><Disability /></AddNewGeneral>

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
                                    //     (generatePDF());
                                    // }}

                                    >
                                        Update
                                    </Button>
                                </div>


                            </div>
                        </Stack>

                    </CardContent >
                </Form>


            }
        </>
    );
}

export default PersonalDetailsForm;