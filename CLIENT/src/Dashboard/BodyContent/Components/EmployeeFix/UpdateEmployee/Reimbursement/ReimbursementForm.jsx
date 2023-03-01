import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { ApiCallGet, ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
const ReimbursementForm = (props) => {
    console.log(props.data);

    const initialFValues = {
        hospital: props.data?.hospital ?? '',
        amount: props.data?.embr_amount ?? null,
        reimbursetype: props.data?.embr_type ?? '',
        reimbursrelationtype: props.data?.embr_relation_type ?? '',
        reimbersmentdate: props.data?.embr_date ?? null
    }

    const { values, setValues, handleChange } = useForm(initialFValues);
    const [reimburseRelationTypes, setreimburseRelationTypes] = useState([]);
    const [reimburseTypes, setreimburseTypes] = useState([]);
    const [hospitalTypes, sethospitalTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {


            var result1 = await ApiCallGet('/get_reimbursment_types');
            if (result1.error) {
                Toast(result1.text, "error");
            } else {
                let newData1 = result1.data.map((item, index) => {
                    return { id: item.reimb_type_id, title: item.reimb_type_desc }
                });
                setreimburseTypes(newData1);
            }

            var result2 = await ApiCallGet('/get_reimbursment_relation_types');
            if (result2.error) {
                Toast(result2.text, "error");
            } else {
                let newData2 = result2.data.map((item) => {
                    return { id: item.reimb_rel_type_id, title: item.reimb_rel_desc }
                });
                setreimburseRelationTypes(newData2);
            }

            var getHospital = await ApiCallGet('/get_hospitals');
            if (getHospital.error) {
                Toast(getHospital.text, "error");
            } else {
                let HospitalData = getHospital.data.map((item) => {
                    return { id: item.hospital_id, title: item.hospital_name }
                });
                sethospitalTypes(HospitalData);
            }
        }
        fetchData();
    }, []);

    const validate = () => {
        if (values.reimb_id === null) {
            Toast("Enter Reimbursement ID", "error");
        }
        else if (values.hospital === '') {
            Toast("Select Hospital", "error");
            return;
        }
        else if (values.reimbursetype === '') {
            Toast("Select Reimbursement Type", "error");
        }
        else if (values.reimbursrelationtype === '') {
            Toast("Select Reimbursement Relation Type", "error");
        }

        else if (values.amount === null) {
            Toast("Enter Reimbursement Amount", "error");
        }
        else if (values.reimbersmentdate === null) {
            Toast("Enter Reimbursement Date", "error");
        }
        else {
            return true;
        }

        return false;
    }

    const submitData = async () => {

        const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();

        const screenData = {
            emp_id: props.id,
            hospital: values.hospital,
            embr_amount: values.amount,
            embr_type: values.reimbursetype,
            embr_relation_type: values.reimbursrelationtype,
            embr_date: values.reimbersmentdate?CurdateFormated(new Date(values.reimbersmentdate)):null,
        }

        if (props.submitAction === 'Insert') {
            var result = await ApiCallPost('/insert_emp_reimbursement', screenData);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Inserted Successfully!', 'success')
                props.setopenPopup(false);
            }
        }
        else if (props.submitAction === 'Update') {
            const screenData1 = {
                ...screenData,
                reimb_id: props.data.reimb_id,

            }

            const result = await ApiCallPost('/update_emp_reimbursement', screenData1);
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


                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Select
                                    label="Hospital"
                                    name='hospital'
                                    value={values.hospital}
                                    onChange={handleChange}
                                    options={hospitalTypes}
                                    required


                                />
                            </div>

                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Select
                                    name="reimbursetype"
                                    label="Reimbursment Type"
                                    value={values.reimbursetype}
                                    onChange={handleChange}
                                    options={reimburseTypes}
                                    required


                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Select
                                    name="reimbursrelationtype"
                                    label="Reimbursment Relation Type"
                                    value={values.reimbursrelationtype}
                                    onChange={handleChange}
                                    options={reimburseRelationTypes}

                                />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    inputProps={{ type: 'number', min: '1' }}
                                    label="Reimbursement Amount"
                                    value={values.amount}
                                    onChange={handleChange}
                                    name='amount'
                                    required />
                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Reimbursement Date"
                                    value={values.reimbersmentdate}
                                    name={'reimbersmentdate'}
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

export default ReimbursementForm;