import { Button, formLabelClasses } from '@mui/material';
import { Stack } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import guidelines from '../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable';
import Controls from '../../../../../Modules/UiModules/Control/Controls';
import Formheading from '../../../../../Modules/UiModules/Control/Formheading';
import { Form, useForm } from '../../../../../Modules/UiModules/Control/useForm';
import AddNewGeneral from '../../../../../Modules/UiModules/Core/AddNewGeneral';
import MaxHeightTextarea from '../../../../../Modules/UiModules/Core/TextArea';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import UploadComponent from '../../Files/UploadFile/UploadFile';
import { multiStepContext } from './StepContext';
const EmployeeSelection = (props) => {
    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext);
    console.log('context data', userData)
    const [fileSelect, setfileSelect] = React.useState('');
    const [file, setFile] = React.useState([]);
    const [updated, setUpdated] = useState(0);
    const [record, setRecord] = React.useState([]);
    const [selectionid, setSelectionID] = useState('')
    const [newSelections, setNewSelections] = useState([]);


    const [selectionType, setSelectionType] = useState('');
    const [selectionDesc, setSelectionDesc] = useState('');
    const [selectionDate, setSelectionDate] = useState(null);
    const [selectionTypes, setSelectionTypes] = useState([]);
    const [Data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            var result = await ApiCallPost('/get_file_select', { file_type: '1', order_type: '1' ?? 0 });
            if (result.error) {
                Toast('Data Could Not be Fetched', 'error')
            }
            else {
                let settedResult = result.data.map((item, index) => {
                    return { id: item.file_id, title: item.file_no }
                });
                setRecord(settedResult);
                console.log('record', settedResult);
            }

            let result1 = await ApiCallGet('/get_selection_type');
            if (result1.error) {
                Toast('Data Could Not be Fetched', 'error')
            }
            else {
                let newData1 = result1.data.map((item, index) => {
                    return { id: item.sel_type_id, title: item.sel_type_desc }
                });
                setSelectionTypes(newData1);
            }


        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updated]);
    const columns = [
        { title: "Selection ID", field: 'selection_id', type: 'string', hidden: true, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "center" } },
        { title: "Employee Serial_No", field: 'emp_desig_serial', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "center" }, hidden: true },
        { title: "Selection Type", field: 'selection_type', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "center" }, hidden: true },
        { title: "Selection Type", field: 'sel_type_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "center" } },
        { title: "Selection Date", field: 'selection_date', type: 'date', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "File No", field: 'selection_file', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "File Name", field: 'file_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Description", field: 'selection_desc', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    ];

    const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();


    const addSelectionDetail = () => {
        if (selectionType === '') {
            Toast("Enter selection Type", "error");
            return false
        }
        else if (selectionDate === null) {
            Toast(" Enter Selection Date", "error");
            return false;
        }
        else if (fileSelect === '') {
            Toast("Enter File No", "error");
            return false;
        }
        else if (selectionDesc === '') {
            Toast("Add Discription", "error");
            return false
        }
        else {


            const getIndex = (id) => {
                for (let i = 0; i < record.length; i++) {
                    if (record[i].id === id)
                        return i;
                }
                return 0;
            }
            const getIndexData = (id) => {
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].selection_id === id && id)
                        return i;
                }
                return -1;
            }
            const getIndexSelection = (id) => {
                for (let i = 0; i < newSelections.length; i++) {
                    if (newSelections[i].selection_id === id && id)
                        return i;
                }
                return -1;
            }
            const newSelection = {
                selection_id: selectionid,
                emp_desig_serial: userData.serial_no,
                selection_type: parseInt(selectionType),
                sel_type_desc: selectionTypes[parseInt(selectionType) - 1].title,
                selection_date: selectionDate ? CurdateFormated(new Date(selectionDate)) : null,
                selection_file: parseInt(fileSelect),
                file_desc: record[getIndex(parseInt(fileSelect))].title,
                selection_desc: selectionDesc,
            };
            const dataindex = getIndexData(newSelection.selection_id);
            const newarray = [...Data, newSelection]
            if (dataindex === -1) {

                setData(newarray)
            } else {
                setData((old) => {
                    old[dataindex] = { ...newSelection };
                    return old;
                });
            }

            setUserData({ ...userData, 'selection': newarray });
            //setUserData((old) => ({ ...old, selection: [...old.selection, ...newarray] }));
            const selectionindex = getIndexSelection(newSelection.selection_id);
            if (selectionindex === -1) {
                setNewSelections((old) => ([...old, { ...newSelection }]));
            } else {
                setNewSelections((old) => {
                    old[selectionindex] = { ...newSelection };
                    return old;
                });
            }

            // console.log(Data)
            // console.log(userData)

            setSelectionType('');
            setSelectionID(undefined);
            setSelectionDate(null);
            setSelectionDesc('');
            setfileSelect('');


        }

    }
    const rowClick = (rowData) => {
        console.log('rowDtaaa', rowData)
        setSelectionType(rowData.selection_type)
        setSelectionDate(rowData.selection_date)
        setfileSelect(rowData.selection_file)
        setSelectionDesc(rowData.selection_desc)
        setSelectionID(rowData.selection_id)
    }

    const submitData = async () => {

        const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();

        var screenData = {
            emp_id: props.id,
            form_no: parseInt(userData.rowData.form_no),
            job_nature: userData.rowData.job_nature,
            order_no: userData.rowData.order_no,
            order_type: userData.rowData.order_type,
            adv_no: userData.rowData.adv_no,
            order_date: userData.rowData.order_date ? CurdateFormated(new Date(userData.rowData.order_date)) : null,
            emp_scale: parseInt(userData.rowData.emp_scale),
            package_type: parseInt(userData.rowData.package_type),
            package_amount: userData.rowData.package_amount,
            dept_id: parseInt(userData.rowData.dept_id),
            sub_dept_id: parseInt(userData.rowData.sub_dept_id),
            desig_id: userData.rowData.desig_id,
            is_primary: userData.rowData.is_primary === true ? 1 : 0,
            contract_startdate: userData.rowData.contract_startdate ? CurdateFormated(new Date(userData.rowData.contract_startdate)) : null,
            contract_enddate: userData.rowData.contract_enddate ? CurdateFormated(new Date(userData.rowData.contract_enddate)) : null,
            joining_date: userData.rowData.joining_date ? CurdateFormated(new Date(userData.rowData.joining_date)) : null,
            leaving_date: userData.rowData.leaving_date ? CurdateFormated(new Date(userData.rowData.leaving_date)) : null,
            leaving_status: parseInt(userData.rowData.leaving_status),
            leave_remarks: userData.rowData.leave_remarks,
            wef_date: userData.rowData.wef_date ? CurdateFormated(new Date(userData.rowData.wef_date)) : null,
            selection_detail: [...newSelections]
        }


        if (userData.rowData.asNewRecord === true || props.submitAction === 'Insert') {
            var result = await ApiCallPost('/insert_emp_designation', screenData);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Inserted Successfully!', 'success')
            }
        }
        else if (!userData.rowData.asNewRecord && props.submitAction === 'Update') {
            screenData = {
                ...screenData,
                serial_no: userData.rowData.serial_no
            };

            const result = await ApiCallPost('/update_emp_designation', screenData);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                Toast('Data Updated Successfully!', 'success')
                if(props?.setopenPopup)
                    props?.setopenPopup(false);

            }
        }
        else {
            Toast('Submit Action Not Defined', 'error');
        }

        props.setTableUpdate((old) => old + 1);
        console.log(screenData);



    }
    const handleSubmit = (e) => {
        e.preventDefault();


        submitData();

        setUserData([]);


    }

    return (
        <>
            <Form>

                <Stack>
                    <Formheading label="" />
                    <div className="row  p-3" >

                        <div className={`${guidelines.inputclass} `}>
                            <Controls.Autocomplete
                                name="selection_type"
                                label="Selection Type"
                                options={selectionTypes}
                                value={selectionType}
                                change={setSelectionType}
                            // disabled
                            />

                        </div>
                        <div className={`${guidelines.inputclass} `}  >
                            <Controls.DatePicker
                                fullWidth
                                variant='standard'
                                name="date"
                                label='Selection Date'
                                value={selectionDate}
                                onChange={(e) => setSelectionDate(e.target.value)}
                                inputFormat="yyyy-MM-dd">
                            </Controls.DatePicker>
                        </div>



                        <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Controls.Select fullWidth

                                name="selection_file"
                                label="Select File No."
                                value={fileSelect}
                                onChange={(e) => {
                                    (setfileSelect(e.target.value));
                                    setFile(record.filter((row) => row.id === e.target.value))
                                }}
                                options={record}

                            />
                            <AddNewGeneral label='File' setUpdated={setUpdated}><UploadComponent fileType={1} orderType={1} /></AddNewGeneral>


                        </div>

                        <div className={` ${guidelines.inputclass} `} style={{ width: '100%' }}>

                            <MaxHeightTextarea
                                rows={3}
                                label="Description" name="description"
                                value={selectionDesc}
                                onChange={(e) => setSelectionDesc(e.target.value)}
                            />

                        </div>
                        <div className={`${guidelines.inputclass}`} style={{ paddingTop: '65px' }}>

                            <Button variant="contained"
                                onClick={() => { addSelectionDetail(); }}
                            >Add</Button>

                        </div>



                    </div>
                    <MatTable
                        actionsAtStart={true}
                        title="Selection Details"
                        columns={columns}
                        data={userData['selection'] ?? Data}
                        onRowClick={(event, rowData) => {
                            rowClick(rowData)
                        }}


                    />
                    <div className='row'>
                        {/* {(props.submitAction === 'Update') ?
                            <div className={`${guidelines.inputclass}`} style={{ paddingTop: '3px' }}>
                                <Controls.Checkbox
                                    name="newrecord"
                                    label="Add as new Record"
                                    value={newRecord}
                                    onChange={() => setNewrecord()}
                                />
                            </div> : null
                        } */}
                    </div>
                    <div style={{ marginTop: '10px' }} >

                        <Button style={{ marginRight: '10px' }}
                            variant="contained"
                            color="primary"
                            onClick={() => { setCurrentStep(0) }}
                        >
                            back
                        </Button>
                        <Button variant="contained" color="primary"
                            style={{ float: 'right' }}
                            onClick={() => { setCurrentStep(2); }}
                        >Next</Button>
                    </div>


                </Stack>
            </Form>
        </>
    );
}

export default EmployeeSelection;