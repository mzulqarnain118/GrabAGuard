import React from 'react';
import { useParams } from 'react-router-dom';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QualificationTable from './Qualification/QulaificationTable';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Card from '../../../../../Modules/UiModules/Core/Card';
import { ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import FrontEndDateFormat from '../../../../../Modules/UiModules/Core/FrontEndDateFormat';
import { Button } from '@mui/material';
import { jsPDF } from "jspdf";
import { FaDownload } from 'react-icons/fa';
import "jspdf-autotable";
import DesigContext from './Designation/DesigContext';
import DesignationParent from './Designation/DesignationParent';
//importing gcu hrm logo and GCU Logo:
// import HRMLogo from '../../../../Header/logo';
// import GCULogo from '../../../../Header/gcu_logo.';


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));


const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));


const getGenderDesc=( gender)=>{
    if (gender==='M'){
        return 'Male';
    }
    if (gender === 'F'){
        return 'Female';
    }
    if (gender === 'O'){
        return 'Other';
    }
    return '';
}

// const downloadForm = async (Desig, Personal, Qualification, Experience, Training, Study, Leave, Pic) => {
//     const CurdateFormated = currentDate => currentDate.getDate() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getFullYear();

//     if (Desig && Personal && Qualification && Experience && Training && Study && Leave) {
//         //URL to Image
//         function getDataUri(url) {
//             return new Promise(resolve => {
//                 var image = new Image();
//                 image.setAttribute('crossOrigin', 'anonymous'); //getting images from external domain

//                 image.onload = function () {
//                     var canvas = document.createElement('canvas');
//                     canvas.width = this.naturalWidth;
//                     canvas.height = this.naturalHeight;

//                     //next three lines for white background in case png has a transparent background
//                     var ctx = canvas.getContext('2d');
//                     ctx.fillStyle = '#fff';  /// set white fill style
//                     ctx.fillRect(0, 0, canvas.width, canvas.height);

//                     canvas.getContext('2d').drawImage(this, 0, 0);

//                     resolve(canvas.toDataURL('image/jpeg'));
//                 };

//                 image.src = url;
//             })
//         }
//         let logo;
//         console.log(Pic, 'this is picture')
//         if (Pic) { logo = await getDataUri(Pic); }
       

//         const doc = new jsPDF("l", "mm", "a4");
//         doc.setFontSize(15);
//         doc.setFont("Arial", "bold");
//         doc.setFillColor(10, 40, 65, 10);
//         doc.text("GC UNIVERSITY LAHORE", 145, 15, { align: "center" });
//         doc.text("HUMAN RESOURCE MANAGEMENT", 145, 25, { align: "center" });
//         doc.text(`EMPLOYEE DETAILS FOR ${Personal.emp_name.toUpperCase()}`, 145, 35, { align: "center" });
//         //console.log('testing Personal Variable', Personal);
//         if (logo) {
//             doc.addImage(logo, 'png', 230.8, 55, 33.5, 35);
            
//         }
//         if(GCULogo){
            
//             //For HRM Logo
//             //doc.addImage(HRMLogo, 'png', 13, 10, 36, 15);
//             doc.addImage(GCULogo, 'png', 19, 7, 28, 28);
//         }
//         //grey colored outline of cells
//         //doc.setDrawColor(150,150,150);
        
        
//         // FOR HORIZONTAL LINE  2ND & 4TH ARGUMENT SHOULD SAME AND FOR VERTICAL 1ST AND 3RD
//         //doc.line(10, 50, 291, 50);
//         //doc.line(291, 50, 291, 123);
        
//         doc.setDrawColor(255,255,255);
//         doc.setFontSize(10.5);
//         //doc.text("PERSONAL INFORMATION",145, 45);//10, 40, 248, 7,
//         doc.text('PERSONAL INFORMATION:', 10, 50);
        
//         doc.setFontSize(10);
//         doc.cell(10, 55, 48, 7, "Employee ID:".toUpperCase(), 40);
//         doc.setFont("Arial", "bold");
//         doc.cell(50, 55, 170, 7, Personal.emp_id ?? ' ', 40);
//         doc.setFont("Arial", "bold");
//         doc.cell(10, 40, 48, 7, "Employee Name:".toUpperCase(), 50);
//         doc.setFont("Arial", "normal");
//         doc.cell(50, 40, 170, 7, Personal.emp_name ?? ' ', 50);
//         doc.setFont("Arial", "bold");
//         doc.cell(10, 40, 48, 7, "Father Name:".toUpperCase(), 60);
//         doc.setFont("Arial", "normal");
//         doc.cell(50,40,170,7, Personal.father_name?? '', 60);
        
//         doc.setFont("Arial", "bold");
//         doc.cell(10, 40, 48, 7, "CNIC/ Passport No:".toUpperCase(), 70);
//         doc.setFont("Arial", "normal");
//         doc.cell(50, 40, 170, 7, Personal.nic ?? Personal.passport_no ?? ' ', 70);
//         doc.setFont("Arial", "bold");
//         doc.cell(10, 40, 48, 7, "Address:".toUpperCase(), 30);
//         doc.setFont("Arial", "normal");
//         doc.cell(60, 40, 170, 7, Personal.present_address ?? ' ', 30);
        
//         doc.setFont("Arial", "bold");
//         doc.cell(10, 40, 48, 7, "Email:".toUpperCase(), 80);
//         doc.setFont("Arial", "normal");
//         doc.cell(60, 40, 85, 7, Personal.email_address ?? ' ', 80);
//         doc.setFont("Arial", "bold");
//         doc.cell(145, 40, 48, 7, "Nationality:".toUpperCase(), 80);
//         doc.setFont("Arial", "normal");
//         doc.cell(185, 40, 100, 7, Personal.nat_desc ?? ' ', 80);
//         doc.setFont("Arial", "bold");
//         doc.cell(10, 40, 48, 7, "Contact No:".toUpperCase(), 90);
//         doc.setFont("Arial", "normal");
//         doc.cell(60, 40, 85, 7, Personal.phone_2 ?? ' ', 90);
//         doc.setFont("Arial", "bold");
//         doc.cell(145, 40, 48, 7, "Gender:".toUpperCase(), 90);
//         doc.setFont("Arial", "normal");
        
//         doc.cell(185, 40, 100, 7, Personal.gender?getGenderDesc(Personal.gender ):' ',90);
        
//         //doc.cell(185, 40, 100, 7, Personal.gender??' ',90);
//         doc.setFont("Arial", "bold");
//         doc.cell(10, 40, 48, 7, "Domicile:".toUpperCase(), 100);
//         doc.setFont("Arial", "normal");
//         doc.cell(60, 40, 85, 7, Personal.dom_desc ?? ' ', 100);
//         doc.setFont("Arial", "bold");
//         doc.cell(145, 40, 48, 7, "Religion:".toUpperCase(), 100);
//         doc.setFont("Arial", "normal");
//         doc.cell(185, 40, 100, 7, Personal.religion_name ?? ' ', 100);
//         doc.setFont("Arial", "bold");
//         doc.cell(10, 40, 48, 7, "Date of Birth:".toUpperCase(), 110);
//         doc.setFont("Arial", "normal");
//         doc.cell(60, 40, 85, 7, CurdateFormated(new Date(Personal.date_of_birth)) ?? ' ', 110);
//         doc.setFont("Arial", "bold");
//         doc.cell(145, 40, 48, 7, "Area of Speciality:".toUpperCase(), 110);
//         doc.setFont("Arial", "normal");
//         doc.cell(185, 40, 100, 7, Personal.area_special ?? ' ', 110);
//         //console.log(Personal, "this is it.")
//         //domicile name and nationality name needs to be fetched in Personal Object.
        
//         // doc.setFont("Arial", "bold");
//         // doc.cell(145, 40, 48, 7, "Spouse Name:".toUpperCase(), 30);
//         // doc.setFont("Arial", "normal");
//         // doc.cell(185, 40, 100, 7, Personal.spouse_name ?? ' ', 30);
//         // marital_desc, spouse
//         doc.setFont("Arial", "bold");
//         doc.cell(10, 40, 48, 7, "Marital Status:".toUpperCase(), 120);
//         doc.setFont("Arial", "normal");
//         doc.cell(60, 40, 85, 7, Personal.marital_desc, 120);
//         doc.setFont("Arial", "bold");
//         doc.cell(145, 40, 48, 7, "Spouse Name:".toUpperCase(), 120);
//         doc.setFont("Arial", "normal");
//         doc.cell(185, 40, 100, 7, Personal.spouse_name ?? ' ', 120);
//         doc.setFont("Arial", "bold");
//         doc.cell(10, 40, 48, 7, "Disability:".toUpperCase(), 130);
//         doc.setFont("Arial", "normal");
//         console.log('This is the personal variable: ',Personal);
//         doc.cell(60, 40, 85, 7, Personal.disability_type ?? ' ', 130);
        

//         //AUTOTABLES

//         const arr = [[], [], [], [], [], []];
//         let titles = ['Designation', 'Qualification', 'Previous Experience', 'Professional Training', ' Study Scheme', 'Leave']
//         let headers = [[], [], [], [], [], []];
//         //headers[0].push(['Designation', 'OrderType', 'Nature', 'AdvNo', 'OrderNo', 'OrderDate', 'WEF Date', 'Dept', 'Sub-Dept', 'Scale', 'PackageType', 'PackageAmount', 'ContractStart', 'ContractEnd', 'Joining', 'Leaving', 'LeaveStatus', 'LeaveRemarks']);
//         headers[0].push(['Designation', 'OrderType', 'Nature', 'AdvNo', 'OrderNo', 'WEF Date', 'Dept', 'Sub-Dept', 'Scale', 'PackageType', 'PackageAmount','Contract Start Date', 'Contract End Date', 'Joining', 'Leaving']);
        
//         headers[1].push(['Degree / Certificate', 'Subject', 'Board', 'Passing Year', 'Obtained Marks', 'Total Marks', 'CGPA', 'Division', 'Board Position', 'Country', 'Remarks']);
//         headers[2].push(['Experience Post', 'Experience Institute', 'Experience Institute Type', 'Experience Job Type', 'Salary Scale', 'Experience Start Date', 'Experience End Date', 'Leaving Purpose']);
//         headers[3].push(['Certificate/Course Name', 'Field of Study', 'Training Institute', 'Start Date', 'End Date']);
//         headers[4].push(['Study Scheme Description', 'Country', 'Start Date', 'End Date']);
//         headers[5].push(['Leave Type', 'Pay Type', 'Leave Order No', 'Start Date', 'End Date', 'Remarks'])
//         //const fontS = {6, 8, 10, 10, 10, 10};
//         const fontS = [8, 8, 8, 8, 8, 8];
//         //console.log(Desig)

//         Desig.map((item, index) => {
//             arr[0].push([
//                 item.desig_name,
//                 item.type_desc,
//                 item.nature_desc,
//                 item.adv_no,
//                 item.order_no,
//                 //CurdateFormated(new Date(item.order_date)),
//                 item.wef_date?CurdateFormated(new Date(item.wef_date)):'',
//                 item.dept_name,
//                 item.sub_dept_name,
//                 item.emp_scale,
//                 item.package_desc,
//                 item.package_amount,
//                 item.contract_startdate?CurdateFormated(new Date(item.contract_startdate)):'',
//                 item.contract_enddate?CurdateFormated(new Date(item.contract_enddate)):'',
//                 item.joining_date?CurdateFormated(new Date(item.joining_date)):'',
//                 item.leaving_date?CurdateFormated(new Date(item.leaving_date)):'',
//                 //item.leaving_status,
//                 //item.leaving_remarks,
//             ]);
//         });
//         Qualification.map((item, index) => {
//             arr[1].push([
//                 item.deg_desc,
//                 item.subject_name,
//                 item.board_uni_name,
//                 item.year_of_passing,
//                 item.obtained_marks,
//                 item.total_marks,
//                 item.cgpa,
//                 item.devision,
//                 item.position_in_board_uni,
//                 item.country_name,
//                 item.remarks_distinction,
//             ]);
//         });
//         console.log(Experience, 'this is experience');
//         Experience.map((item, index) => {
//             arr[2].push([
//                 item.exp_post_desc,
//                 item.exp_inst_desc,
//                 item.inst_type_desc,
//                 item.exp_job_type_desc,
//                 item.exp_salary_scale,
//                 item.exp_start_date?CurdateFormated(new Date(item.exp_start_date)):'',
//                 item.exp_end_date?CurdateFormated(new Date(item.exp_end_date)):'',
//                 item.exp_leaving_purpose,
//             ]);
//         });
//         Training.map((item, index) => {
//             arr[3].push([
//                 item.course_name,
//                 item.field_name,
//                 item.exp_inst_desc,
//                 item.start_date?CurdateFormated(new Date(item.start_date)):'',
//                 item.end_date?CurdateFormated(new Date(item.end_date)):'',
//             ]);
//         });
//         Study.map((item, index) => {
//             arr[4].push([
//                 item.scheme_desc,
//                 item.country_name,
//                 item.start_date?CurdateFormated(new Date(item.start_date)):'',
//                 item.end_date?CurdateFormated(new Date(item.end_date)):'',
//             ]);
//         });
//         Leave.map((item, index) => {
//             arr[5].push([
//                 item.leave_type_desc,
//                 item.pay_desc,
//                 item.leave_order_file,
//                 item.leave_startdate?CurdateFormated(new Date(item.leave_startdate)):'',
//                 item.leave_enddate?CurdateFormated(new Date(item.leave_enddate)):'',
//                 item.leave_remarks,
//             ]);
//         });
//         let y = 134;
//         doc.setFont("Arial", "bold");
//         var i;
//         // for (let i = 0; i < (arr.length); i++) {
//         //     doc.text(arr[i].dept.toUpperCase() + ":", 20, (y + 10));//y+9
//         //     doc.autoTable({
//         //         didDrawPage: (d) => { y = d.cursor.y; },
//         //         startY: (y + 15),
//         //         styles: { fontSize: 10 },
//         //         margin: { right: 20, top: 10, bottom: 10, left: 20 },
//         //         head: h,
//         //         //body: [arr[i].info.desig ,arr[i].info.count] ,
//         //         body: arr[i].info,
//         //         theme: "grid",
//         //         headStyles: { fillColor: [135, 43, 38] },

//         //     });
//         // }
//         for (i = 0; i < (headers.length); i++) {
//             if(y>=174){
//                 //y+=52;//42 to end this page and 10 for next page
//                 doc.addPage();
//                 y=10;
//                 console.log('Y exceeded limit as ',y);
//             }
//             doc.text('EMPLOYEE ' + titles[i].toUpperCase() + ":", 10, (y+10));//y+9
//             doc.autoTable({
//                 didDrawPage: (d) => { y = d.cursor.y; },
//                 startY: (y + 15),
//                 styles: { fontSize: fontS[i] },
//                 margin: { right: 10, bottom: 10, left: 10, top:10},
                
//                 theme: "grid",
//                 head: headers[i],
//                 body: arr[i],
//                 headStyles: { fillColor: [135, 43, 38] },
//             }
            
//             );
//         }
        
//             doc.setDrawColor(120,150,120);
//             doc.line(10, 196, 291, 196);
//             doc.setFont("Arial", "italic");
//             //doc.setFont()
//             var today = new Date();
//             doc.text(`Report generated on ${CurdateFormated(today)} by HRM © All Copyrights reserved for DIT, GCU ${today.getFullYear()}`,100,203);
            

//         doc.setProperties({
//             title: `${Personal.emp_id}-${Personal.emp_name}-${Personal.nic}`
//         });
//         window.open(doc.output('bloburl'), '_blank');
//     }
// }

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function UpdateEmployee(props) {
    const [Personal, setPersonal] = React.useState({});
    const [Qualification, setQualification] = React.useState([]);
    const [Experience, setExperience] = React.useState([]);
    const [Training, setTraining] = React.useState([]);
    const [Leave, setLeave] = React.useState([]);
    const [Study, setStudy] = React.useState([]);
    const [Pic, setPic] = React.useState(null);
    const { id } = useParams();
    const [info, setInfo] = React.useState({});
    const [Desig, setDesig] = React.useState([]);
    const [file, setFile] = React.useState([])




    React.useEffect(() => {
        const fetchData = async () => {
            const result = await ApiCallPost('/get_employee_profile_short', { emp_id: id });
            console.log('this is result from api ', result);
            if (result.error) {
                Toast(result.text, 'error');
            }
            else {
                setInfo(result.data[0]);
            }
        }
        fetchData();
    }, []);

    console.log(info);

    return (

        <div>
            <Card>
                <div className='row d-flex align-items-center justify-content-center'>
                    <h5 className='mr-4 col-12 text-center'> ID:  {info?.emp_id ?? ''}</h5>
                    <h5 className='mr-4 col-12 text-center' >NAME: {info?.emp_name ?? ''}</h5>
                    <h5 className='mr-4 col-12 text-center'> NIC: {info?.nic ?? ''}</h5>
                    {/* <Button variant="contained" onClick={() => downloadForm(Desig, Personal, Qualification, Experience, Training, Study, Leave, Pic)}
                    >  <FaDownload className="download-icon" />
                        Download Details</Button> */}
                </div>
            </Card>
{/* 
            <Accordion defaultExpanded>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    IconButtonProps={{ edge: 'start' }}
                    aria-controls="panela-content"
                    id="panela-header"
                >

                    <Typography variant="button" display="block">Employee Personal Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PersonalDetails id={id} setData={setPersonal} setPic={setPic} />
                </AccordionDetails>
            </Accordion> */}

            {/* <Accordion>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    IconButtonProps={{ edge: 'start' }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >

                    <Typography variant="button" display="block">Employee Deisgnation</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DesignationParent id={id} setData={setDesig} />
                </AccordionDetails>
            </Accordion> */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="button" display="block">Employee Qualification</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <QualificationTable id={id} setData={setQualification} />
                </AccordionDetails>
            </Accordion>
            {/* <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel8a-content"
                    id="panel8a-header"
                >
                    <Typography variant="button" display="block">Employee Previous Experience</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PreviousExperienceTable id={id} setData={setExperience} />
                </AccordionDetails>
            </Accordion> */}
            {/* <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography variant="button" display="block">Employee Reimbursement</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ReimbursementTable id={id} />
                </AccordionDetails>
            </Accordion> */}


            {/* 
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                >
                    <Typography variant="button" display="block">Employee Publication</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PublicationTable id={id} />
                </AccordionDetails>
            </Accordion> */}

            {/* <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5a-content"
                    id="panel5a-header"
                >
                    <Typography variant="button" display="block">Employee Professional Training</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ProfessionalTrainingTable id={id} setData={setTraining} />
                </AccordionDetails>
            </Accordion> */}

            {/* <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel6a-content"
                    id="panel6a-header"
                >
                    <Typography variant="button" display="block">Employee Study Scheme</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StudySchemeTable id={id} setData={setStudy} />
                </AccordionDetails>
            </Accordion> */}


            {/* <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel7a-content"
                    id="panel7a-header"
                >
                    <Typography variant="button" display="block">Employee Leaves</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <LeavesTable id={id} setData={setLeave} />
                </AccordionDetails>
            </Accordion> */}

            {/* <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel8a-content"
                    id="panel8a-header"
                >
                    <Typography variant="button" display="block">Employee Files</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Files id={id} setData={setFile} />
                </AccordionDetails>
            </Accordion> */}


        </div>

    );
}