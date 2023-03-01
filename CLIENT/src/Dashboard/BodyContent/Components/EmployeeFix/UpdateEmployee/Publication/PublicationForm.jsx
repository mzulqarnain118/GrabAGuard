import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { ApiCallGet, ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import MaxHeightTextarea from '../../../../../../Modules/UiModules/Core/TextArea';
const PublicationForm = (props) => {
    console.log(props.data);
    const initialFValues = {
        publication_desc: props.data?.publication_desc ?? '',
        publication_jounal: props.data?.publication_jounal ?? '',
        publish_year: props.data?.publish_year ?? null,
    }
    const { values, setValues, handleChange } = useForm(initialFValues);


    const validate = () => {
        if (values.publication_desc === '') {
            Toast("Enter Publication Description", "error");
            return;
        }
        else if (values.publish_year === null) {
            Toast("Enter Publish Year", "error");
        }
        else if (values.publication_jounal === '') {
            Toast("Enter Publication Jounal", "error");
        }
        else {
            return true;
        }

        return false;
    }

    const submitData = async () => {

        const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + currentDate.getMonth() + 1 + '-' + currentDate.getDate();


        let screenData = {
            emp_id: props.id,
            publication_desc: values.publication_desc,
            publication_jounal: values.publication_jounal,
            publish_year: values.publish_year?CurdateFormated(new Date(values.publish_year)):null,
        }


        if (props.submitAction === 'Insert') {
            var result = await ApiCallPost('/insert_emp_publication', screenData);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Inserted Successfully!', 'success')
                props.setopenPopup(false);
            }
        }
        else if (props.submitAction === 'Update') {
            screenData = {
                ...screenData, publication_id: props.data.publication_id
            };

            const result = await ApiCallPost('/update_emp_publication', screenData);
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
                        <MaxHeightTextarea
                            label="Publication Description"
                            rows={2}
                            value={values.publication_desc}
                            onChange={handleChange}
                            name='publication_desc'
                            required
                        />
                        <div className="row p-3" >
                            {/* <MaxHeightTextarea label="Minute Details" setValue={MeetingDesc} getValue={setMeetingDesc} /> */}


                            {/* <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic"
                                    label="Publication Description"
                                    name='publication_desc'
                                    value={values.publication_desc}
                                    onChange={handleChange}
                                    required
                                />

                            </div> */}
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                    label="Publish Year"
                                    value={values.publish_year}
                                    name="publish_year"
                                    views={['year']}
                                    inputFormat="yyyy"
                                    onChange={handleChange}
                                />

                            </div>
                            <div className={`${guidelines.inputclass}`}>
                                <Controls.Input id="standard-basic" label="Publication Jounal"
                                    value={values.publication_jounal}
                                    name="publication_jounal"
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
                                // className={styles.submit__btn}
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

export default PublicationForm;