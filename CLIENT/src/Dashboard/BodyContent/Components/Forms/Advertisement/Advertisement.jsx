import React, { useState, /*useRef*/ } from "react";
import { TextField, Typography, CardContent, Stack, Divider, /*Button, IconButton, Input, filledInputClasses, */ } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
// import RichText from "./RichText1"
// import Upload from "../../../../../Modules/UiModules/Core/Upload"
import TextArea from "../../../../../Modules/UiModules/Core/TextArea"
import { ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import guidelines from "../../../../../Modules/Guidelines/Guidelines";
//import FileUploader from "../../../../../Modules/FileUploader/FileUploader";
import styles from "./Advertisement.module.css";
import Toast from "../../../../../Modules/UiModules/Core/Toast/Toast";
import FileSelector from "../../../../../Modules/UiModules/Core/FileSelector";
import Card from '../../../../../Modules/UiModules/Core/Card'
const Advertisment = () => {
    //Advertisment
    const [advNumber, setadvNumber] = useState(null);
    const [advDate, setadvDate] = useState(null);
    const [advAppDate, setAdvAppDate] = useState(null);
    const [advFilePath, setAdvFile] = useState([]);
    // Meeting
    const [MeetingNumber, setMeetingNumber] = useState(null);
    const [MeetingDate, setMeetingDate] = useState(null);
    const [MeetingDesc, setMeetingDesc] = useState(null);
    //Syndicate
    const [SyndicateNumber, setSyndicateNumber] = useState(null);
    const [SyndicateDate, setSyndiacateDate] = useState(null);
    const [SyndicateDesc, setSyndicateDesc] = useState(null);
    const [fileSelect, setfileSelect] = React.useState('');

    //Date Formator
    const CurdateFormated = currentDate => currentDate.getMonth() + 1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();

    //Errors
    //const [errors, setErrors] = useState({});

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('hello')



        if ((new Date(CurdateFormated(advDate))) > (new Date(CurdateFormated(new Date())))) {
            console.log(new Date(advDate) + 'hello' + new Date(CurdateFormated(advDate)))
            Toast("Enter Valid Advertisement Date", "error");
        }
        else if (advAppDate <= advDate) {
            Toast("Enter Valid Application Date.", "error");
        }
        else if (advFilePath === null) {
            Toast("Please Upload Advertisement File", "error");
            return;
        }
        else if (MeetingDate <= advAppDate) {
            Toast("Enter Valid Selection Meeting Date.", "error");
        }
        else if (SyndicateDate <= MeetingDate) {
            Toast("Enter Valid Syndicate Meeting Date.", "error");
        }

        else {

            let user = {
                advNumber: advNumber, advDate: advDate,
                advAppDate: advAppDate, MeetingNumber: MeetingNumber, MeetingDate: MeetingDate,
                MeetingDesc: MeetingDesc, SyndicateNumber: SyndicateNumber, SyndicateDate: SyndicateDate,
                SyndicateDesc: SyndicateDesc
            };
            let formData = new FormData();

            formData.append("advNumber", advNumber);
            formData.append("advDate", advDate);
            formData.append(" advAppDate", advAppDate);
            formData.append("MeetingNumber", MeetingNumber);
            formData.append("MeetingDate", MeetingDate);
            formData.append(" MeetingDesc", MeetingDesc);
            formData.append("SyndicateNumber", SyndicateNumber);
            formData.append("SyndicateDate", SyndicateDate);
            formData.append("SyndicateDesc", SyndicateDesc);
            formData.append("fileExtension", ".jpg");

            formData.append("file", advFilePath.target.files[0], advFilePath.target.files[0].name);

            console.log(formData);
            try {
                await ApiCallPost('/advertismentform', formData);
                Toast("Form Submitted Successfully", "success");

            } catch (error) {
                Toast("Something went wrong", "error");
            }

            // } catch (error) {
            //     Toast("Something went WRONG", "error");
            // }
        }



    }



    return (
        <>
            <div container="true" style={{ display: 'flex', justifyContent: 'center', marginBottom: '5rem', position: 'relative' }}>
                <Card>
                    <CardContent>
                        <form onSubmit={onSubmit}>
                            <Stack>

                                <Typography sx={{ mb: 1.5 }} variant="h8" color="text.secondary">
                                    <b>Advertisment Details</b>
                                </Typography>
                                <Divider />

                                <div className="row p-3 " >

                                    <div className={`${guidelines.inputclass}`}  >
                                        <TextField fullWidth
                                            required
                                            value={advNumber}
                                            onChange={(e) => { setadvNumber(e.target.value) }}
                                            label="Advertisment No"
                                            variant="standard" /></div>
                                    <div className={`${guidelines.inputclass}`}  >
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker

                                                value={advDate}
                                                onChange={(e) => { setadvDate(e) }}
                                                renderInput={(params) => <TextField {...params} fullWidth required variant="standard" id="adv-date" label="Advertisment Date" />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div className={`${guidelines.inputclass}`}  >
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                value={advAppDate}
                                                onChange={(e) => { setAdvAppDate(e) }}
                                                name='appDate'
                                                renderInput={(params) => <TextField {...params} fullWidth required variant="standard" label="Application Last Date" />}
                                            />
                                        </LocalizationProvider>
                                    </div>

                                    {/* <div className={`${styles.padder} w-100`}>
                                        <FileUploader files={advFilePath} setFiles={setAdvFile} label="Upload Advertisement Image" limit={1}
                                        />
                                    </div> */}
                                </div>
                                <FileSelector fileType='5' label='Advertisement' fileSelect={fileSelect} setfileSelect={setfileSelect} />



                                <Typography sx={{ mb: 1.5, fontWeight: '500', }} variant="h8" color="text.secondary">
                                    <b>Selection Board</b>
                                </Typography>
                                <Divider />


                                <div className="row p-3">
                                    <div className={`${guidelines.inputclass}`}  >
                                        <TextField fullWidth
                                            value={MeetingNumber}
                                            required
                                            onChange={(e) => { setMeetingNumber(e.target.value) }}
                                            label="Meeting No"
                                            variant="standard" /></div>
                                    <div className={`${guidelines.inputclass}`}  >
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                value={MeetingDate}
                                                onChange={(e) => { setMeetingDate(e) }}
                                                name='synMeetDate'
                                                renderInput={(params) => <TextField {...params} fullWidth required id='syn-meeting-date' variant="standard" label="Meeting Date" />}
                                            />
                                        </LocalizationProvider></div>
                                    {/* <Upload /> */}
                                </div>
                                <TextArea label="Minute Details" setValue={MeetingDesc} getValue={setMeetingDesc} />

                                <Typography sx={{ mb: 1.5 }} variant="h8" color="text.secondary">
                                    <b>Syndicate Board</b>
                                </Typography>
                                <Divider />


                                <div className="row p-3">
                                    <div className={`${guidelines.inputclass}`}  >
                                        <TextField fullWidth
                                            value={SyndicateNumber}
                                            required
                                            onChange={(e) => { setSyndicateNumber(e.target.value) }}
                                            name='selMeetNo' label="Meeting No."
                                            variant="standard" /></div>
                                    <div className={`${guidelines.inputclass}`}  >
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                value={SyndicateDate}
                                                onChange={(e) => { setSyndiacateDate(e) }}
                                                name='selMeetDate'
                                                renderInput={(params) => <TextField {...params} required id='sel-meeting-date' fullWidth variant="standard" label="Meeting Date" />}
                                            />
                                        </LocalizationProvider></div>


                                </div>
                                <TextArea label="Syndication Details" setValue={SyndicateDesc} getValue={setSyndicateDesc} />

                                <div className={styles.submit__button__wrapper} >
                                    <Button type="submit" variant="contained" className={styles.btn} >Submit</Button>
                                </div>

                            </Stack>
                        </form>

                    </CardContent>

                </Card>





            </div>
        </>
    );
};

export default Advertisment;
