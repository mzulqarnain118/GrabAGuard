import React, { useState, useRef } from 'react';
import { Card, CardContent, Stack, TextField, Button } from '@mui/material';
import guidelines from "../../../../../Modules/Guidelines/Guidelines";
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import TextArea from "../../../../../Modules/UiModules/Core/TextArea";
import FileUploader from '../../../../../Modules/FileUploader/FileUploader';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import { useForm, Form } from '../../../../../Modules/UiModules/Control/useForm';
import Select from '../../../../../Modules/UiModules/Control/Select';
// import selectFormat from "../../../../../Modules/Utility/SelectFormatter";
import listformatter from '../../../../../Modules/Utility/ListFormatter';
import styles from "./UploadFile.module.css";
// import { MenuItem } from '@mui/material';
import { Autocomplete, createFilterOptions } from '@mui/material';
import Formheading from '../../../../../Modules/UiModules/Control/Formheading';
import Controls from '../../../../../Modules/UiModules/Control/Controls';

const UploadComponent = (props) => {


    return (
        <CardContent>
            <Formheading label="Upload File" />
            <UploadFile fileType={props.fileType} orderType={props.orderType} id={props.id} desig_serial={props.desig_serial} setTableUpdate={props.setTableUpdate} setOpenPopup={props.setOpenPopup} setopenPopup={(props.handlePopup) ? props.handlePopup : props.setopenPopup} label={props.label} submitAction={props.submitAction} />
        </CardContent >
    );

}

const UploadFile = (props) => {

    console.log(props);
    const [advAppDate, setAdvAppDate] = useState(null);
    const [fileEmployee, setFileEmployee] = useState(null);

    const fileIdRef = useRef('');
    const fileSubjectRef = useRef('');
    const fileDateRef = useRef('');
    const fileDescriptionRef = useRef('');
    const fileEmployeeRef = useRef('');

    //Async Loaded Data
    const [loadedData, setLoadedData] = useState({
        fileTypes: [],
        orderTypes: [],
        allEmployees: [],
    });
    //Filetypes
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState([]);

    //Order selected and types
    const [orderSelected, setOrderSelected] = useState(false);

    //Keyword
    const [KeyWord, setKeyWord] = useState('');
    const [keywordData, setKeywordData] = React.useState([]);

    const initialFValues = {
        emp_id: props?.emp_id ?? '',
        desig_serial: props?.desig_serial ?? '',
        fileType: props?.fileType ?? '',
        orderType: props?.orderType ?? '',
        fileID: fileIdRef.current.value,
        fileSubject: fileSubjectRef.current.value,
        employee: fileEmployeeRef.current.value,
        datee: fileDateRef.current.value,
        description: fileDescriptionRef.current.value,
        filedate: null,
        wefdate: null

    }
    const {
        values,
        setValues,
        handleChange
    } = useForm(initialFValues);



    const handleFileTypeChange = (e) => {
        console.log(e.target.value);
        if (e.target.value) {
            if (e.target.value == '1') {

                console.log("Selected Order")
                setOrderSelected(true);
            }
            else {
                setOrderSelected(false);
            }
        }
        else {
            setOrderSelected(false);
        }
        handleChange(e);

    };

    const ListItem = styled('ul')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));




    const handleDelete = (chipToDelete) => () => {
        setKeywordData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleKeywordChange = (e) => {
        if (e.target.value) {
            let keyword = e.target.value;
            if (keyword.charAt(keyword.length - 1) === ',') {
                setKeywordData((prev) => [...prev, { key: prev.length, label: `${keyword.substring(0, keyword.length - 1)}` }]);
                setKeyWord('');
            }
            else {

                setKeyWord(e.target.value)
            }
        }
        else {

            setKeyWord(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();


        if (files.length == 0) {
            Toast("Please Upload atleast one file!!", "error")
            return;
        }
        try {

            let formData = new FormData();
            let order_selected = false;
            let order_Type = 0;
            formData.append("fileNo", fileIdRef.current.value);
            formData.append("fileType", values.fileType);
            if (orderSelected) {
                order_Type = values.orderType;
                order_selected = true;
            }
            formData.append("orderType", order_Type);
            formData.append("fileSubject", fileSubjectRef.current.value);
            formData.append("fileDate", CurdateFormated(new Date(values.filedate)));
            formData.append("fileEffectiveDate", values.wefdate ? CurdateFormated(new Date(values.wefdate)) : null);
            formData.append("fileEmployee", fileEmployeeRef.current.value.split(',')[0]);
            formData.append("fileDescription", fileDescriptionRef.current.value);
            formData.append("fileKeywords", JSON.stringify(keywordData));
            formData.append("isOrder", order_selected);
            formData.append("desig_serial", (props.desig_serial) ? props.desig_serial : null);

            formData.append("file", files[0].file, files[0].file.name);

            console.log(formData);
            try {
                const result = await ApiCallPost('/insertfile', formData);
                console.log('Result: ', result)
                if (result.status === 200) {
                    console.log(result.data);
                    if (props.setopenPopup) {
                        props.setopenPopup(false);
                    }
                    Toast("Form Submitted Successfully", "success");
                }
                else
                    Toast("Could Not Upload File", "error");

            } catch (error) {
                Toast("Something went wrong", "error");
            }

        } catch (error) {
            Toast("Something went wrong", "error");
        }

    }

    // const add = async () => {
    //     var Screendata = { fileId: fileID, Filename: fileName, date: datee, keyword: KeyWord }

    //     var result = await ApiCallPost('/generalfile', Screendata);
    //     setDataValues(result.data[0]);
    //     console.log(result.data[0]);

    // }

    React.useEffect(() => {
        const fetchData = async () => {
            //Get File Types
            const result = await ApiCallGet('/getfiletypes');
            console.log(result.data)
            // setFile(result.data);
            console.log(file);

            // const file1 = file.filter(word => word.file_type_id === parseInt(props.fileType));
            // console.log(file1);

            // result.data[0].filter(word => word.file_type_id === props.fileType)
            // console.log(result.data[0])
            const newData = listformatter(result.data, 'file_type_id', 'file_type_desc');
            // setFileTypes(newData);

            //Get Order Types
            const result2 = await ApiCallGet('/getordertypes');
            const newData2 = listformatter(result2.data, 'type_id', 'type_desc');
            // setOrderTypes(newData2);

            //Get Employee General Data-------------------------------------------------------------------------------------------------------
            const result3 = await ApiCallGet('/getEmpGeneralDataFile');
            // setAllEmployees(result3.data);
            setLoadedData((old) => ({ ...old, fileTypes: newData, orderTypes: newData2, allEmployees: result3.data }));

            if (props.id) {
                const selectedEmployee = result3.data.filter((emp) => emp.emp_id === props.id);
                setFileEmployee(selectedEmployee[0]);
            }
            // loadedData['fileTypes'].filter(word => word.id === parseInt(props.fileType));
        }
        fetchData();

    }, []);

    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        limit: 100,
    });

    let keyWordRequired = true;

    if (keywordData.length > 0)
        keyWordRequired = false;

    if (props?.fileType == '1' && !orderSelected) {
        setOrderSelected(true);
    }

    return (
        <>
            <Form>
                <Stack>

                    <div className="row pl-3 pr-3 pt-0 pb-0">
                        <div className={`${guidelines.inputclass}`}  >
                            <Select fullWidth
                                required
                                name="fileType"
                                label="Select File Type*"
                                value={values.fileType}
                                options={loadedData['fileTypes']}
                                onChange={(e) => handleFileTypeChange(e)} />

                        </div>

                        {orderSelected ? <div className={`${guidelines.inputclass} ${styles.transition}`}  >
                            <Select fullWidth
                                required
                                name="orderType"
                                label="Select Order Type*"
                                value={values.orderType}
                                options={loadedData['orderTypes']}
                                onChange={(e) => handleChange(e)} />

                        </div> : null}

                        <div className={`${guidelines.inputclass} `}  >
                            {/* <Select fullWidth
                                            name="employee"
                                            label="Select For Employee"
                                            value={values.employee}
                                            options={allEmployees}
                                            onChange={(e) => handleEmployeeChange(e)} >
                                           {
                                              empdata
                                           }

                                        </Select> */}
                            <Autocomplete
                                fullWidth
                                filterOptions={filterOptions}
                                options={loadedData['allEmployees']}
                                autoHighlight
                                inputRef={fileEmployeeRef}
                                value={fileEmployee}
                                onChange={(event, item) => {
                                    console.log(item);
                                    setFileEmployee(item)
                                }}
                                getOptionLabel={(option) => option.emp_id + ',' + option.emp_name}
                                renderOption={(props, item) => (
                                    <div {...props}>
                                        <span className="mr-3" id="emp_name">{item.emp_name}</span>
                                        <span className="uff" id="emp_id">{item.emp_id}</span>
                                    </div>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        inputRef={fileEmployeeRef}
                                        label="Select For Employee"
                                    />
                                )}
                            />

                        </div>

                        <div className={`${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                required
                                name="fileID"
                                label="File ID/Order No"
                                variant="standard"
                                autoComplete='off'
                                helperText='Example: EA-I/XX-XX/XXXX/YY'
                                inputRef={fileIdRef}
                            // value={values.fileID}
                            // onChange={(e) => handleChange(e)} 
                            />

                        </div>

                        <div className={`${guidelines.inputclass}`}  >
                            <TextField fullWidth
                                required
                                name="fileName"
                                label="Subject/Title"
                                variant="standard"
                                inputRef={fileSubjectRef}
                            // value={values.fileName}
                            // onChange={(e) => handleChange(e)} 
                            />

                        </div>

                        <div className={`${guidelines.inputclass}`}  >
                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                            <Controls.DatePicker variant='standard' fullWidth id="standard-basic"

                                name="filedate"
                                // name='appDate'
                                value={values.filedate}
                                onChange={handleChange}
                                // inputRef={fileDateRef}
                                label="File/Order Date"
                                required

                            // value={values.datee}
                            // onChange={(e) => handleChange(e)} 

                            />
                            {/* </LocalizationProvider> */}
                        </div>
                        <div className={`${guidelines.inputclass}`}  >
                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                            <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                name="wefdate"
                                // name='appDate'
                                value={values.wefdate}
                                onChange={handleChange}
                                // inputRef={fileEffectiveRef}
                                label="W.E.F Date"
                            // inputFormat="yyyy-mm-dd"
                            />
                            {/* </LocalizationProvider> */}
                        </div>

                    </div>
                    <div className="row pl-3 pr-3 ml-0 pt-0 pb-0" >
                        <TextField fullWidth className={`${guidelines.inputclass}`}
                            name="KeyWord"
                            label="Keywords"
                            variant="standard"
                            required={keyWordRequired}
                            value={KeyWord}
                            autoComplete='off'
                            helperText='Press Enter or type comma(,) to insert keyword'
                            onChange={(e) => handleKeywordChange(e)}
                            onKeyDown={(event) => {

                                if (event.code === "Enter" || event.code === "NumpadEnter") {
                                    event.preventDefault();
                                    let keyword = event.target.value;
                                    setKeywordData((prev) => [...prev, { key: prev.length, label: `${keyword}` }]);
                                    setKeyWord('');

                                }
                            }}
                        />

                        {keywordData.map((data) => {
                            let icon;

                            return (
                                <ListItem key={data.key}>
                                    <Chip
                                        icon={icon}
                                        label={data.label}
                                        onDelete={data.label === '' ? undefined : handleDelete(data)}
                                    />
                                </ListItem>
                            );
                        })}

                    </div>
                    <div className='row align-items-center'>
                        <div className='col-6 col-lg-6 col-md-12 col-sm-12'>
                            <TextArea
                                required
                                label="Description" name="description"
                                inputRef={fileDescriptionRef}
                            // value={values.description}
                            // onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div className="col-6 col-lg-6 col-md-12 col-sm-12 pl-4 pr-4 pt-1 pb-2">
                            <FileUploader files={files} setFiles={setFiles} label='Upload File'
                                accept="image/*,.pdf" limit={1}
                            />

                        </div>
                    </div>




                    {/* <div className=" row p-3"> */}
                    <Button variant="contained" style={{
                        float: 'right', backgroundColor: '#872b26', alignItems: 'right', marginTop: '1rem'
                        , fontSize: '0.9rem', letterSpacing: '0.05rem'
                    }}
                        onClick={() => handleSubmit()}
                    > Upload</Button>
                    {/* </div> */}
                </Stack >
            </Form >
        </>
    );


}

export { UploadFile };
export default UploadComponent;