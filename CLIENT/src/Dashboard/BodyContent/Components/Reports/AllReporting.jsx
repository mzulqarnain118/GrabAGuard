import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { Button, Stack } from '@mui/material';
import { ApiCallGet, ApiCallPost } from '../../../../Modules/CoreModules/ApiCall';
import guidelines from '../../../../Modules/Guidelines/Guidelines';
import Select from '../../../../Modules/UiModules/Control/Select';
import { Form, useForm } from '../../../../Modules/UiModules/Control/useForm';
import Toast from '../../../../Modules/UiModules/Core/Toast/Toast';
import Formheading from '../../../../Modules/UiModules/Control/Formheading';
import Controls from '../../../../Modules/UiModules/Control/Controls';
import GetFormattedDate from '../../../../Modules/CoreModules/FormattedDate';
import GetFormattedDateDMY from '../../../../Modules/CoreModules/FormattedDateDMY';
import MatTable from '../../../../Modules/MaterialTable/MaterialTable';
import CompareDates from '../../../../Modules/UiModules/Core/CompareDates';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import SqlDateFormat from '../../../../Modules/UiModules/Core/SqlDateFormat';
import XLFile from './XLFile';
import GCULogo from '../../../Header/gcu_logo.png';
const AllReporting = () => {

    let allcampuses = [{ id: 3, title: 'All Employees' }];
    const [deptCats, setDeptCats] = useState([]);
    const [FacultyWiseReporting, setFacultyWiseReporting] = useState([]);
    const [degreetypes, setdegreetypes] = useState([]);
    const [Campus, SetCampus] = useState(allcampuses);
    const [degreetypesLookup, setdegreetypesLookup] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [SubdepartmentOptions, setSubDepartmentOptions] = useState([]);
    const [SeniorityData, setSeniorityData] = useState([]);


    const [jobNatureOptions, setJobNatureOptions] = useState([]);
    const [jobNatureLookup, setJobNatureLookup] = useState([]);
    const [maritalStatusOptions, setMaritalStatus] = useState([])
    const [maritalStatusLookup, setMaritalLookup] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadingB, setLoadingB] = useState(true);
    const [column, EnableColumn] = useState(false);
    const [updated, setUpdated] = useState(0);
    const [Data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [empOptions, setEmpOptions] = useState([{ id: 1, title: 'Current Employees' }, { id: 2, title: 'Left Employees' }, { id: 3, title: 'All Employees' }]);

    const [empScaleOptions, setEmpScaleOptions] = useState([]);
    const [empScaleLookup, setEmpScaleLookup] = useState([]);
    const [designationOptions, setDesignationOptions] = useState([]);
    const [designationLookup, setDesignationLookup] = useState([]);
    const [Religion, setReligion] = useState([]);
    const [ReligionLookup, setReligionLookup] = useState([]);
    const [LeavingStatusOptions, setLeavingStatusOptions] = useState([]);
    const [LeavingStatusLookup, setLeavingStatusLookup] = useState([]);
    const [genderLookup, setgenderLookup] = useState([]);
    const [departmentlookup, setDepartmentLookup] = useState([]);
    const [disabilityOptions,setDisabilityOptions] = useState('');
    const [Enable, setEnable] = useState(false);
    const EmployeeType = [{ id: 1, title: "All Employee" }, { id: 2, title: "Gazzeted" }, { id: 3, title: "Non-Gazzeted" }];
    const ReportingType = [{ id: 1, title: "Joining" }, { id: 2, title: "Leaving" }, { id: 4, title: "Active" }, { id: 5, title: "DOB" }];
    let count = 5;

    const CustomReporting = [{ id: 1, title: "List Of Departments" }, { id: 2, title: "List of Designations" }, { id: 3, title: "Overall Working Employee" }, { id: 14, title: "Employees Personal Info" }, { id: 16, title: "HEC Recruited" }, { id: count++, title: "Department Wise" }, { id: count++, title: "Base Wise" }, { id: count++, title: "Scale Wise" }, { id: count++, title: "Designation Wise" }, { id: count++, title: "Marital Status Wise" }, { id: count++, title: "Gender Wise" }, { id: count++, title: "Religion Wise" }, { id: count++, title: "Leaving Status Wise" }, { id: 15, title: "Qualification Wise" }, { id: count++, title: "Duration Wise" }, { id: 20, title: "Seniority Wise" }, { id: 21, title: "Time Scale Promotion To Be Granted" }, { id: 22, title: "Time Scale Promotion (After)" }, { id: 23, title: "Hired and Promoted employees(After Jan 2020)" }, { id: 24, title: "Employees Working After Retirement" }, { id: 25, title: "Faculty Wise Reporting based on Departments" }, { id: 26, title: "Overall Department Wise Employee" },{ id: 27, title: "Disabled Employees" },];


    const DownloadTypes = [{ id: 1, title: "PDF" }, { id: 2, title: "CSV" }];

    const initialFValues = {
        EmpType: 1,
        dept: null,
        jobNature: null,
        scale: null,
        desig: null,
        genderValue: null,
        facultyType: 2,
        religionID: null,
        martial: null,
        ReportType: null,
        Leaving_status: null,
        to: null,
        from: null,
        emp: 1,
        CustomReport: null,
        degree: null,
        seniority: null,
        campus_id: 3,
        facType: null,
        disability: 0,
        download: 1
    }
    const gender = [{ id: 'M', title: "Male" }, { id: 'F', title: "Female" }];
    const CurdateFormated = currentDate => currentDate.getDate() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getFullYear();

    const faculty = [
        { id: 2, title: 'All Employees' }, { id: 0, title: 'Non-Teaching' }, { id: 1, title: 'Teaching' }
    ]

    const {
        values,
        setValues,
        handleChange
    } = useForm(initialFValues);
    const filter = async () => {
        // var img = new Image();
        // img.src = './gc.png';
        let i = 1; var body = []; const header = [];
        const doc = new jsPDF("l", "mm", "legal");
        doc.setFontSize(24);
        doc.setFont("Arial", "bold");

        //doc.AddImage()
        if (GCULogo) {
            doc.addImage(GCULogo, 'png', 158, 10, 45, 45);
        }
        doc.text("GC University Lahore".toUpperCase(), 130, 65);
        // doc.addImage(img, 'png', 311, -12, 60, 60);

        doc.setFontSize(15);
        const footer = () => {
            const today = new Date();

            doc.setDrawColor(120, 150, 120);
            doc.line(10, 205, 330, 205);
            doc.setFont("Arial", "italic");
            doc.setFontSize(11);
            doc.text(`Report generated on ${CurdateFormated(today)} by HRM © All Copyrights reserved for DIT, GCU ${today.getFullYear()}`, 115, 209);

        }
        var startY = 80, docTextY = 76;
        const fillBody = (header, body) => {
            doc.autoTable({ startY: (startY), margin: { top: 15, right: 20, bottom: 10, left: 20 }, headStyles: { fillColor: [135, 43, 38] }, body: body, head: header, });


        }
        //Commenting format for PDF
        //     if (values.facultyType !== null) {

    // }
         if (values.dept !== null) {
                doc.text((filterData[0]?.dept_name + " Department Employees:").toUpperCase(), 20, docTextY);
                header.push(["Sr. No.", "Emp Name", 'Father Name','Department', 'Designation', 'BPS', 'Base']);
                filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name,item.sub_dept_name, item.desig_name, item.emp_scale, item.nature_desc,]); });
                
                doc.text((`Total Number of Employees:                                             `+filterData.length),20,docTextY+10); //", filterData.length), 20, docTextY+10
                startY+=10;
                fillBody(header, body);
                //console.log('The total number of employees in department: ', filterData.length)
        }
        else if (values.jobNature !== null) {
            doc.text((filterData[0]?.nature_desc + " Base Employees:").toUpperCase(), 20, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Designation', 'Department', 'BPS', 'Starting Date', 'Ending Date']);
            filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, item.desig_name, item.dept_name, item.emp_scale, item.contract_startdate ? item.contract_startdate.split('T')[0] : null, item.contract_enddate ? item.contract_enddate.split('T')[0] : null]); });
            fillBody(header, body);
        }
        else if (values.scale !== null) {
            doc.text(('BPS-' + filterData[0]?.emp_scale + " Employees:").toUpperCase(), 20, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Designation', 'Department', 'Base']);
            filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, item.desig_name, item.sub_dept_name, item.nature_desc]); });
            fillBody(header, body);
        }
        else if (values.CustomReport === 8 && values.desig !== null) {
            doc.text((filterData[0]?.desig_name + " Designation Employees:").toUpperCase(), 20, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Department', 'Joining Date', 'BPS', 'Base']);
            filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, item.sub_dept_name, item.joining_date ? GetFormattedDateDMY(item.joining_date) : null, item.emp_scale, item.nature_desc,]); });
            fillBody(header, body);
        }
        else if (values.genderValue !== null) {
            doc.text(((filterData[0]?.gender === 'F' ? "Female" : "Male ") + "Staff Employees:").toUpperCase(), 20, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Designation', 'Department', 'Base']);
            filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, item.desig_name, item.sub_dept_name, item.nature_desc]); });
            fillBody(header, body);
        }
        else if (values.martial !== null) {
            doc.text((filterData[0]?.marital_desc + ' Employees:').toUpperCase(), 20, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Designation', 'Department', 'Base']);
            filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, item.desig_name, item.sub_dept_name, item.nature_desc]); });
            fillBody(header, body);
        }
        else if (values.religionID !== null) {
            doc.text(("Employees with religion " + filterData[0]?.religion_name + ':').toUpperCase(), 20, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Designation', 'Department', 'Base']);
            filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, item.desig_name, item.sub_dept_name, item.nature_desc]); });
            fillBody(header, body);
        }
        else if (values.CustomReport === 12 && values.Leaving_status && values.to && values.from) {
            doc.text(("Employees with Leaving Status " + values.leaving_desc ?? '' + ':').toUpperCase(), 20, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Designation', 'Department', 'Base', 'DOB', 'Joining Date', 'Leaving Date']);
            filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, item.desig_name, item.sub_dept_name, item.nature_desc, GetFormattedDateDMY(item.date_of_birth), GetFormattedDateDMY(item.joining_date), GetFormattedDateDMY(item.leaving_date),]); });
            fillBody(header, body);
        }

        else if (values.ReportType === 1) {
            if (values.to <= values.from) {
                Toast("To should be greater than From", "error");
                return;
            }
            doc.text(("Employees with Joining Date B/W (" + CurdateFormated(new Date(values.from)) + ') AND (' + CurdateFormated(new Date(values.to)) + '):').toUpperCase(), 20, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Designation', 'Department', 'Base', 'Joining Date', 'BPS',]);
            filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, item.desig_name, item.sub_dept_name, item.nature_desc, GetFormattedDateDMY(item.joining_date), item.emp_scale,]); });
            fillBody(header, body);
        }
        else if (values.ReportType === 2) {
            if (values.to <= values.from) {
                Toast("To should be greater than From", "error");
                return;
            }

            doc.text(("Employees with Leaving Date B/W(" + CurdateFormated(new Date(values.from)) + ' AND ' + CurdateFormated(new Date(values.to)) + ':').toUpperCase(), 20, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Designation', 'Department', 'Base', 'Leaving Date', 'Leaving Status', 'BPS',]);
            filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, item.desig_name, item.sub_dept_name, item.nature_desc, GetFormattedDateDMY(item.leaving_date), item.leaving_desc, item.emp_scale,]); });
            fillBody(header, body);
        }
        else if (values.ReportType === 5) {
            if (values.to <= values.from) {
                Toast("To should be greater than From", "error");
                return;
            }
            doc.text(("Employees with DOB B/W(" + CurdateFormated(new Date(values.from)) + ' AND ' + CurdateFormated(new Date(values.to)) + ':').toUpperCase(), 10, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Date of birth', 'Designation', 'Department', 'Base', 'Leaving Date', 'BPS']);
            filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, GetFormattedDateDMY(item?.date_of_birth.split("T")[0]), item.desig_name, item.sub_dept_name, item.nature_desc, GetFormattedDateDMY(item.leaving_date), item.emp_scale]); });
            fillBody(header, body);
        }
        else if (values.ReportType === 4) {
            if (values.to <= values.from) {
                Toast("To should be greater than From", "error");
                return;
            }
            doc.text(("Active Employees B/W(" + CurdateFormated(new Date(values.from)) + ' AND ' + CurdateFormated(new Date(values.to)) + ':').toUpperCase(), 20, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Designation', 'Department', 'Base', 'Leaving Date', 'BPS',]);
            filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, item.desig_name, item.sub_dept_name, item.nature_desc, GetFormattedDateDMY(item.leaving_date), item.emp_scale,]); });
            fillBody(header, body);
        }
        else if (values.CustomReport === 2) {
            doc.text("List of Designations".toUpperCase(), 20, docTextY);
            header.push(["SERIAL NUMBER", "DESIGNATION", "BASIC SCALE"]);
            designationOptions.map((item, index) => { body.push([i++, item.title, item.scale]); });
            fillBody(header, body);
        }
        else if (values.CustomReport === 1) {
            doc.text("List of Departments".toUpperCase(), 20, docTextY);
            header.push(["Serial No.", "Dept Code", "Dept Name", 'Sub Dept Name']);
            departmentOptions.map((item, index) => {
                let size = body.length;
                body.push([i++, item.dept_code, item.title, '']);
                SubdepartmentOptions.filter(row => row.dept_id === item.id && row.title !== item.title).map((item, index) => { if (index === 0) { body[size][3] = item.title } else body.push([' ', ' ', ' ', item.title]) });
            });
            console.log(SubdepartmentOptions, SubdepartmentOptions.dept_id, departmentOptions)
            fillBody(header, body);
        }
        else if (values.CustomReport === 3) {
            let FT = filterData.filter(row => row.gender === 'F' && row.is_teaching === 1).length;
            setFilterData(() => [...Data]);
            let MT = filterData.filter(row => row.gender === 'M' && row.is_teaching === 1).length;
            setFilterData(() => [...Data]);
            let MNTG = filterData.filter(row => row.gender === 'M' && row.is_teaching === 0 && row.scale_type === 1).length;
            setFilterData(() => [...Data]);
            let FNTG = filterData.filter(row => row.gender === 'F' && row.is_teaching === 0 && row.scale_type === 1).length;
            setFilterData(() => [...Data]);
            let MNTNG = filterData.filter(row => row.gender === 'M' && row.is_teaching === 0 && row.scale_type === 2).length;
            setFilterData(() => [...Data]);
            let FNTNG = filterData.filter(row => row.gender === 'F' && row.is_teaching === 0 && row.scale_type === 2).length;
            setFilterData(() => [...Data]);
            let MNTNGO = filterData.filter(row => row.gender === 'M' && row.is_teaching === 0 && row.scale_type == null).length;
            setFilterData(() => [...Data]);
            let FNTNGO = filterData.filter(row => row.gender === 'F' && row.is_teaching === 0 && row.scale_type == null).length;
            doc.text("Overall Working Employees".toUpperCase(), 20, docTextY);
            header.push([" ", "MALE", "FEMALE", 'TOTAL']);
            body.push(['Teaching Staff', MT, FT, FT + MT]);
            body.push(['Non-Teaching Gazzetted', MNTG, FNTG, MNTG + FNTG]);
            body.push(['Non-Teaching Non-Gazzetted', MNTNG, FNTNG, MNTNG + FNTNG]);
            body.push(['Non-Teaching Others', MNTNGO, FNTNGO, MNTNGO + FNTNGO]);
            body.push(['Grand Total', MT + MNTG + MNTNG, FT + FNTG + FNTNG, FT + MT + MNTG + FNTG + MNTNG + FNTNG + MNTNGO + FNTNGO]);
            fillBody(header, body);
        }
        else if (values.CustomReport === 14) {
            var old = filterData
            doc.text(("Personal Info of Employees:").toUpperCase(), 20, docTextY);
            console.log(filterData);
            header.push(["Sr. No.", "Emp ID", "Emp Name", 'Father Name', 'Date of birth', 'Designation', 'Department', 'Gender', 'CNIC', 'Email', 'Cell No', 'Adress', 'Marital Status', 'Domicile', 'Nationality', 'Religion', 'Highest Degree', 'Passing Year']);
            old.map((item, index) => { body.push([i++, item.emp_id, item.emp_name, item.father_name, GetFormattedDateDMY(item?.date_of_birth.split("T")[0]), item.desig_name, item.sub_dept_name, item.gender, item.nic, item.email_address, item.phone_1, item.permanent_addreess, item.marital_desc, item.dom_desc, item.nat_desc, item.religion_name, item.deg_desc, item.year_of_passing]); });
            doc.autoTable({
                styles: { fontSize: 7 },
                startY: startY,
                headStyles: { fillColor: [135, 43, 38] },
                margin: { top: 22, right: 10, bottom: 10, left: 10 }, body: body, head: header,// theme: "grid",
            });
        }
        else if (values.CustomReport === 23) {
            doc.text(('Hired and Promoted Employees after Jan 2020:').toUpperCase(), 20, docTextY);

            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Date of birth', 'Designation', 'Department', 'Email', 'Cell No', 'Date of joining']);
            filterData.map((item) => { body.push([i++, item.emp_name, item.father_name, GetFormattedDateDMY(item?.date_of_birth.split("T")[0]), item.desig_name, item.sub_dept_name, item.email_address, item.phone_1, GetFormattedDateDMY(item?.joining_date.split("T")[0])]); });
            doc.autoTable({
                styles: { fontSize: 7 },
                startY: startY,
                headStyles: { fillColor: [135, 43, 38] },
                margin: { top: 22, right: 20, bottom: 10, left: 20 }, theme: "grid", body: body, head: header,
            });
        }
        else if (values.CustomReport == 25) {//Faculty(Dept) Wise Reporting 

            doc.text((`Faculty Wise Reporting for ${filterData[0]?.cat_desc}`).toUpperCase(), 20, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Designation', 'Department', 'Job Nature', 'Scale']);
            filterData.map((item) => { body.push([i++, item.emp_name, item.father_name, item.desig_name, item.sub_dept_name, item.nature_desc, item.emp_scale,]); });
            fillBody(header, body);
        }
        else if (values.CustomReport == 26) {//Overall Department Wise Employees
            var getOverallDeptWiseReporting = await ApiCallGet('/get_overall_dept_wise');
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            var arr = getOverallDeptWiseReporting.data[0];
            if(values.download === 1){
            console.log(arr);

            var arrr1 = []
            var arrrr2 = []
            var tempt = arr[0].sub_dept_name
            for (let i = 0; i < arr.length; i++) {
                console.log(i);
                if (arr[i].sub_dept_name == tempt) {
                    arrr1.push([
                            arr[i].desig_name,
                            arr[i].desig_count
                    ])
                }else{
                    arrrr2.push({
                        dept : tempt,
                        info : arrr1
                    })

                    arrr1 = []
                    arrr1.push([
                        arr[i].desig_name,
                        arr[i].desig_count
                     ])
                    console.log(arrr1);
                    tempt = arr[i].sub_dept_name
                }
                console.log(arrrr2)
            }
            // console.log('loop end')
            // arr.push(arrrr2)
            arr = arrrr2
            // console.log('new rep ', arr);
            
            doc.text((`Overall Department Wise Employees Reporting`).toUpperCase(), 20, docTextY);
            //Array of Dept Names and Below is the designation and number of count
            let y = docTextY;
            doc.setFont("Arial", "bold");
            let h = [];
            h.push(['Designation Name', 'Employee Count']);

            for (let i = 0; i < (arr.length); i++) {
                doc.text(arr[i].dept.toUpperCase() + ":", 20, (y + 10));//y+9
                doc.autoTable({
                    didDrawPage: (d) => { y = d.cursor.y; },
                    startY: (y + 15),
                    styles: { fontSize: 10 },
                    margin: { right: 20, top: 10, bottom: 10, left: 20 },
                    head: h,
                    //body: [arr[i].info.desig ,arr[i].info.count] ,
                    body: arr[i].info,
                    theme: "grid",
                    headStyles: { fillColor: [135, 43, 38] },

                });
            }
        }//ending of if for pdf download.
            else{
                
                header.push(["Department", "Designation", "Employee Count"]);
            
                arr.map((item)=> {body.push([item?.sub_dept_name, item?.desig_name, item?.desig_count])})
            }

        }
        else if (values.CustomReport === 24) {
            doc.text(("Employees working after Retirement ").toUpperCase(), 20, docTextY);

            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Date of Birth', 'Designation', 'Department', 'Joining Date after Retirement']);
            filterData.map((item) => { body.push([i++, item.emp_name, item.father_name, item.date_of_birth ? GetFormattedDateDMY(item.date_of_birth) : null, item.desig_name, item.sub_dept_name, item.retirement_date ? GetFormattedDateDMY(item.retirement_date) : null, item.joining_date ? GetFormattedDateDMY(item.joining_date) : null]); });

            fillBody(header, body);
        }
        else if (values.CustomReport === 27) {
            doc.text(("Disabled Employees ").toUpperCase(), 20, docTextY);

            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Date of Birth', 'Designation', 'Department', 'Disbality']);
            filterData.map((item) => { body.push([i++, item.emp_name, item.father_name, item.date_of_birth ? GetFormattedDateDMY(item.date_of_birth) : null, item.desig_name, item.dept_name, item.disability_type]); });

            fillBody(header, body);
        }

        else if (values.CustomReport === 20) {
            doc.text((`Seniority Wise Employees for ${filterData[0]?.desig_name ?? null}:`).toUpperCase(), 20, docTextY);

            header.push(["Sr no. ", "Emp Name", "Father's Name", "Department", "Qualification", "Scale", "Joining Date", "Date Of birth"]);
            // console.log( getSeniority.data[0].map((item, index) => { i++, item.emp_id, item.emp_name, item.desig_name, item.dept_name, item.nature_desc, item.joining_date, item.emp_scale }));
            filterData.map((item, index) => { body.push([index + 1, item?.emp_name, item?.father_name, item?.sub_dept_name, item?.deg_desc, item?.emp_scale, GetFormattedDateDMY(item?.joining_date.split("T")[0]), GetFormattedDateDMY(item?.date_of_birth.split("T")[0])]); });
            fillBody(header, body);
        }
        else if (values.CustomReport === 21) {
            doc.text((`Time Scale Promotion To Be Granted Of ${filterData[0]?.desig_name ?? null}:`).toUpperCase(), 20, docTextY);
            header.push(["Sr. No", "Name", "Father Name", "Department", "Current Scale", "Date of Joining In Current Scale", "Duration"]);
            // { }
            console.log(filterData, 'filter data');
            // console.log( getGrantScale.data[0].map((item, index) => { i++, item.emp_id, item.emp_name, item.desig_name, item.dept_name, item.nature_desc, GetFormattedDateDMY(item.joining_date)  , item.emp_scale }));
            filterData?.map((item, index) => { body.push([index + 1, item?.emp_name, item?.father_name, item?.sub_dept_name, item?.emp_scale, item?.joining_date ? GetFormattedDateDMY(item?.joining_date.split("T")[0]) : '', item?.duration + " Years"]); });
            fillBody(header, body);
            //window.open(doc.output('bloburl'), '_blank');
        }
        else if (values.CustomReport === 22) {
            doc.text((`Time Scale Promotion (After) :`).toUpperCase(), 20, docTextY);
            header.push(["Sr. No", "Name", "Father Name", "Department", "Current Scale", "Date of Joining In Current Scale"]);
            { }
            // console.log( getGrantScale.data[0].map((item, index) => { i++, item.emp_id, item.emp_name, item.desig_name, item.dept_name, item.nature_desc, GetFormattedDateDMY(item.joining_date)  , item.emp_scale }));
            filterData?.map((item, index) => { body.push([index + 1, item?.emp_name, item?.father_name, item?.sub_dept_name, item?.emp_scale, item.joining_date ? GetFormattedDateDMY(item?.joining_date.split("T")[0]) : '']); });
            fillBody(header, body);
        }
        else if (values.degree) {
            doc.text((`Qualification Wise Employees for "${filterData[0]?.deg_desc ?? null}":`).toUpperCase(), 10, docTextY);
            header.push(["Sr. No.", "Emp Name", 'Father Name', 'Designation', 'Department', 'BPS', 'Highest Degree', 'Passing Year', 'Degree Specialization', 'Institution of HighestDegree', 'Country of HighestDegree',]);
            filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, item.desig_name, item.sub_dept_name, item.emp_scale, item.deg_desc, item.year_of_passing ?? ' ', item.subject_name, item.board_uni_name, item.country_name,]); });
            fillBody(header, body);
        }
        else if (values.CustomReport === 16) {
            doc.text(("List of employee").toUpperCase(), 20, docTextY);
            header.push(["Sr. No.", "University Name", "Faculty", 'Father Name', 'Designation', 'Additional Charge', 'Department', 'Employement Type', 'Gender', 'Email', 'CNIC', 'Cell No', 'Nationality', 'Highest Degree', 'Degree Specialization', 'Institution of HighestDegree', 'Country of HighestDegree', 'Pay Scale',
                'Total Experience', 'Area of Expertise', 'DOB', 'Joining Date', 'Leaving Date', 'Status']);
            filterData.map((item, index) => {
                body.push([i++, 'GCUL', item.emp_name, (item.is_teaching === 1 ? 'Teaching' : 'Non-Teaching'), item.desig_name, item.additional_charge, item.nat_desc, item.sub_dept_name, item.gender, item.email_address, item.nic, item.phone_1, item.nat_desc, item.deg_desc, item.subject_name, item.board_uni_name, item.country_name, item.scale,
                item.seniority_in_years, item.area_special, GetFormattedDateDMY(item?.date_of_birth.split("T")[0]), GetFormattedDateDMY(item?.joining_date.split("T")[0]), GetFormattedDateDMY(item?.leaving_date.split("T")[0]), item.leaving_date === null ? 'Working' : item?.leaving_desc]);
            });
            doc.autoTable({
                styles: { fontSize: 6 },
                startY: startY,
                headStyles: { fillColor: [135, 43, 38] },
                margin: { top: 22, right: 5, bottom: 10, left: 5 }, theme: "grid", body: body, head: header,
            });
        }
        else if (values.CustomReport === 12 && values.Leaving_status && values.to && values.from) {
            if (values.to <= values.from) {
                Toast("To should be greater than From", "error");
                return;
            }
            if (values.Leaving_status === 1) {

                doc.text(("Retired Employees B/W(" + CurdateFormated(new Date(values.from)) + ' AND ' + CurdateFormated(new Date(values.to)) + ':').toUpperCase(), 10, docTextY);
                header.push(["Sr. No.", "Emp Name", 'Father Name', 'Designation', 'Department', 'Base', 'Leaving Date', 'BPS']);
                filterData.map((item, index) => { body.push([i++, item.emp_name, item.father_name, item.desig_name, item.sub_dept_name, item.nature_desc, GetFormattedDateDMY(item?.leaving_date.split("T")[0]), item.emp_scale]); });
                fillBody(header, body);
            }

        }
        footer();
        
        if (values.download === 1)
            window.open(doc.output('bloburl'), '_blank');
        else {
            header.push(...body)
            XLFile(header, 'CSV');

        }
        NullValues();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        filter();

    }

    const columns = [
        { title: "Emp ID", field: 'emp_id', type: 'numeric', export: true, cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "left" } },
        // { title: "Form No",    field: 'form_no', type: 'numeric', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        // { title: "AdvertNo", render: (row) => (row.adv_no === null) ? <b style={{ marginLeft: "15px" }} > —</b > : row.adv_no,  field: 'adv_no', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Employee Name", field: 'emp_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "NIC", field: 'nic', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Father Name", field: 'father_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Spouse Name", export: true, field: 'spouse_name', render: (row) => (row.spouse_name === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.spouse_name, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Designation", field: 'desig_id', lookup: designationLookup, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Visiting", editable: () => false, field: 'is_visiting', type: 'boolean', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "AdditionalCharge", field: 'additional_charge', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },

        { title: "Job Nature", field: "job_nature", lookup: jobNatureLookup, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Scale", field: "emp_scale", lookup: empScaleLookup, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Scale Code", field: "scale_code", cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Employee Type", field: "scale_type_desc", cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Campus", field: 'campus_desc', type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Department", field: 'dept_id', lookup: departmentlookup, type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "SubDepartment", export: true, field: 'sub_dept_name', type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Teaching", field: 'is_teaching', type: 'boolean', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Gender", field: 'gender', type: 'text', lookup: genderLookup, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Religion", field: 'religion', type: 'text', lookup: ReligionLookup, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "MaritalStatus", field: 'marital_status', type: 'text', lookup: maritalStatusLookup, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "LeavingStatus", field: 'leaving_status', lookup: LeavingStatusLookup, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Joining", type: "date", dateSetting: { locale: "en-GB" }, field: 'joining_date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Leaving", type: "date", dateSetting: { locale: "en-GB" }, field: 'leaving_date', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },

        // { title: "OrderNo",  field: 'order_no', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Passport No", field: 'passport_no', render: (row) => (row.passport_no === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.passport_no, type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Mobile No", export: true, field: 'phone_1', type: 'text', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Office No", export: true, field: 'phone_2', type: 'text', render: (row) => (row.phone_2 === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.phone_2, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "DOB", field: 'date_of_birth', type: 'date', dateSetting: { locale: "en-GB" }, export: () => false, cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Area Special", export: true, type: 'text', render: (row) => (row.area_special === null) ? <b style={{ marginLeft: "30px" }} > —</b > : row.area_special, field: 'area_special', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Nationality", field: 'nat_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" }, export: true, },
        { title: "Present Address", field: 'present_address', type: 'string', cellStyle: { textAlign: "left", whiteSpace: "break-spaces" }, headerStyle: { textAlign: "left" }, export: true, },
        { title: "Permanent Address", field: 'permanent_addreess', type: 'string', cellStyle: { textAlign: "left", whiteSpace: "break-spaces" }, headerStyle: { textAlign: "left" }, export: true, },
        { title: "Email", export: true, render: (row) => (row.email_address === null) ? <b style={{ marginLeft: "60px" }} > —</b > : row.email_address, field: 'email_address', type: 'email', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Domicile", field: 'dom_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left", }, export: true },
        { title: "Qualification", field: 'deg_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left", } },
        { title: "Passing Year", field: 'year_of_passing', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left", } }
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoadingB(true);
            try {

                var result = await ApiCallPost('/get_all_employee_with_qualif', { emp: (values.emp && values.emp !== 3) ? values.emp : null });
                console.log('dataemployee', result)
                if (result.error) {
                    Toast(result.text, 'error');
                    return;
                }
                else {
                    setData(result.data);
                    setFilterData(result.data);
                }


                let disability = await ApiCallGet('/get_disability');
                if(disability.error){
                    Toast(disability.text,'error');
                }else{
                    // console.log(disability);
                    let newData1 = disability.data.map((item) => {
                        // if(item.disability_id > 1)
                        return { id: item.disability_id, title: item.disability_type }
                        // else                        
                        // return { id: 0, title: 'All Disabled' }
                    });
                    newData1 = [...newData1 , { id: 0, title: 'All Disabled' }]
                    // console.log(newData1)
                    setDisabilityOptions(newData1);
                }


                var getDepartment = await ApiCallGet('/getdepartment');
                if (getDepartment.error) {
                    Toast(getDepartment.text, 'error');
                    return;
                }
                else {
                    //setNames(current => ['Zoey', ...current]);
                    //setDepartmentOptions([{id: 0, title : "All Departments"}]);
                    //let departmentData = [{id: 0, title : "All Departments"}];

                    let departmentData = getDepartment.data.map((item) => {
                        return { id: item.dept_id, title: item.dept_name, dept_code: item.dept_code }
                    });





                    //departmentData.push({id: 0, title : "All Departments"});
                    //setDepartmentOptions({id: 0, title: "All Departments", dept_code:'ALL'},departmentData);
                    //setDepartmentOptions(departmentData);
                    //console.log("I am Here!", departmentData)
                    //setDepartmentOptions({id:0 , title : "All Departmentssssssssssss" ,  dept_code:"ALL"}, ...departmentData);
                    //console.log('---------------------', [{id:0 , title : "All Departments"}], departmentData)
                    setDepartmentOptions(departmentData);
                    setDepartmentLookup((old) => {
                        for (let i = 0; i < getDepartment.data.length; i++) {
                            old[getDepartment.data[i].dept_id] = getDepartment.data[i].dept_name;
                        }
                        return old;
                    });
                }

                var getSubDepartment = await ApiCallGet('/getsubdepartmentdata');
                if (getSubDepartment.error) {
                    Toast(getSubDepartment.text, 'error');
                    return;
                }
                else {
                    let SubdepartmentData = getSubDepartment.data.map((item) => {
                        return { dept_id: item.dept_id, title: item.sub_dept_name, sub_dept_id: item.sub_dept_id }
                    });
                    setSubDepartmentOptions(SubdepartmentData);
                }



                var get_campus = await ApiCallGet('/get_campus');
                if (get_campus.error) {
                    Toast(get_campus.text, 'error');
                    return;
                }
                else {

                    let campus_data = get_campus.data.map((item) => {
                        return { id: item.campus_id, title: item.campus_desc }
                    });

                    allcampuses = [...allcampuses, ...campus_data]
                    SetCampus(allcampuses);
                    // setDepartmentOptions(departmentData);
                    // setDepartmentLookup((old) => {
                    //     for (let i = 0; i < getDepartment.data.length; i++) {
                    //         old[getDepartment.data[i].dept_id] = getDepartment.data[i].dept_name;
                    //     }
                    //     return old;
                    // });
                }
                var result4 = await ApiCallGet('/getjobnature');
                if (result4.error) {
                    Toast(result4.text, 'error');
                    return;
                }
                else {
                    let JobData = result4.data.map((item) => {
                        return { id: item.nature_id, title: item.nature_desc }
                    });
                    setJobNatureOptions(JobData);
                    setJobNatureLookup((old) => {
                        for (let i = 0; i < result4.data.length; i++) {
                            old[result4.data[i].nature_id] = result4.data[i].nature_desc;
                        }
                        return old;
                    });
                }

                setgenderLookup((old) => {
                    for (let i = 0; i < gender.length; i++) {
                        old[gender[i].id] = gender[i].title;
                    }
                    return old;
                });

                var getDesignation = await ApiCallGet('/getdesignation');
                if (getDesignation.error) {
                    Toast(getDesignation.text, "error");
                    return;
                }
                else {
                    let designationData = getDesignation.data.map((item) => {
                        return { id: item.desig_id, title: item.desig_name, scale: item.desig_scale }
                    });
                    setDesignationOptions(designationData);
                    setDesignationLookup((old) => {
                        for (let i = 0; i < getDesignation.data.length; i++) {
                            old[getDesignation.data[i].desig_id] = getDesignation.data[i].desig_name;
                        }
                        return old;
                    });
                }


                var getScale = await ApiCallGet('/getscale');
                if (getScale.error) {
                    Toast(getScale.text, "error");
                    return;
                }
                else {
                    let getScale1 = getScale.data.map((item) => {
                        return { id: item.scale_id, title: item.scale_number }
                    });
                    setEmpScaleOptions(getScale1);
                    setEmpScaleLookup((old) => {
                        for (let i = 0; i < getScale.data.length; i++) {
                            old[getScale.data[i].scale_id] = getScale.data[i].scale_number;
                        }
                        return old;
                    });
                }


                var result5 = await ApiCallGet('/get_marital_status_list');
                if (result5.error) {
                    Toast(result4.text, 'error');
                    return;
                }
                else {
                    let getMartial = result5.data.map((item) => {
                        return { id: item.marital_id, title: item.marital_desc }
                    });
                    setMaritalStatus(getMartial);
                    setMaritalLookup((old) => {
                        for (let i = 0; i < result5.data.length; i++) {
                            old[result5.data[i].marital_id] = result5.data[i].marital_desc;
                        }
                        return old;
                    });
                }
                let result6 = await ApiCallGet('/get_religion');
                if (result6.error) {
                    Toast(result6.text, "error");
                }
                else {
                    let newData = result6.data.map((item) => {
                        return { id: item.religion_id, title: item.religion_name }
                    });
                    setReligion(newData);
                    setReligionLookup((old) => {
                        for (let i = 0; i < result6.data.length; i++) {
                            old[result6.data[i].religion_id] = result6.data[i].religion_name;
                        }
                        return old;
                    });
                }
                var GetLeavingStatus = await ApiCallGet('/GetLeavingStatus');
                if (GetLeavingStatus.error) {
                    Toast(GetLeavingStatus.text, "error");
                }
                else {
                    let LeavingData = GetLeavingStatus.data.map((item) => {
                        return { id: item.leaving_id, title: item.leaving_desc }
                    });
                    setLeavingStatusOptions(LeavingData);
                    setLeavingStatusLookup((old) => {
                        for (let i = 0; i < GetLeavingStatus.data.length; i++) {
                            old[GetLeavingStatus.data[i].leaving_id] = GetLeavingStatus.data[i].leaving_desc;
                        }
                        return old;
                    });
                }
                var result10 = await ApiCallGet('/getdegree');
                if (result10.error) {
                    Toast(result10.text, "error");
                } else {
                    let newData10 = result10.data.map((item) => {
                        return { id: item.deg_id, title: item.deg_desc }
                    });
                    setdegreetypes([{ id: -1, title: "All Degrees" }, ...newData10]);
                    setdegreetypesLookup((old) => {
                        for (let i = 0; i < result10.data.length; i++) {
                            old[result10.data[i].deg_id] = result10.data[i].deg_desc;
                        }
                        return old;
                    });
                }
                //Get dept categories for dept_facutly wise reporting 
                let result11 = await ApiCallGet('/deptcat');

                console.log('Dept Cat data from API is as: ', result11);
                if (result11.error) {
                    Toast(result11.text, "error");
                }
                else {
                    let faculties = result11.data.map((item) => {
                        return { id: item.cat_id, title: item.cat_desc }
                    });
                    setDeptCats(faculties);
                    console.log('Dept Cat data is as: ', deptCats);

                }



            }
            catch (error) {
                console.log(error)
            }
            setLoadingB(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                //previous experience apis
                // var result = await ApiCallPost('/get_all_employee_with_qualif', { emp: (values.emp && values.emp !== 3) ? values.emp : null });
                // console.log('dataemployee', result)
                // if (result.error) {
                //     Toast(result.text, 'error');
                //     return;
                // }
                // else {
                // setData(result.data);
                var arr = []
                var arr1 = []
                arr = Data

                console.log(arr);


                if (values.dept !== null) {
                    arr.map((row) => {
                        if (row.dept_id === -1) {
                            arr.push(row);
                        }
                        else if (row.dept_id === values.dept) {
                            arr1.push(row)
                        }
                    })
                    arr = arr1
                    arr1 = []
                } else if (values.jobNature !== null) {
                    arr.map((row) => {
                        if (row.job_nature === values.jobNature) {
                            arr1.push(row)
                        }
                    });
                    arr = arr1
                    arr1 = []
                } else if (values.scale !== null) {
                    arr.map((row) => {
                        if (row.emp_scale === values.scale) {
                            arr1.push(row)
                        }
                    })
                    arr = arr1
                    arr1 = []
                } else if (values.CustomReport === 8 && values.desig !== null) {
                    arr.map((row) => {
                        if (row.desig_id === values.desig) {
                            arr1.push(row)
                        }
                    })
                    arr = arr1
                    arr1 = []
                } else if (values.genderValue !== null) {

                    arr.map((row) => {
                        if (row.gender === values.genderValue) {
                            arr1.push(row)
                        }
                    });
                    arr = arr1
                    arr1 = []
                }
                else if (values.martial !== null) {
                    arr.map((row) => {
                        if (row.marital_status === values.martial) {
                            arr1.push(row)
                        }
                    })
                    arr = arr1
                    arr1 = []
                }
                else if (values.religionID !== null) {
                    arr.map((row) => {
                        if (row.religion === values.religionID) {
                            arr1.push(row)
                        }
                    })
                    arr = arr1
                    arr1 = []
                }
                else if (values.CustomReport === 12 && values.Leaving_status && values.to && values.from) {
                    if (values.to <= values.from) {
                        Toast("To should be greater than From", "error");
                        return;
                    }
                    let from = new Date(values.from);
                    let to = new Date(values.to);
                    arr.map((row) => {
                        const leaving_date = new Date(row.leaving_date);
                        if (row.leaving_status === values.Leaving_status && leaving_date >= from && leaving_date <= to) {
                            arr1.push(row)
                        };
                    });
                    arr = arr1
                    arr1 = []
                } else if (values.ReportType === 1) {
                    let from = new Date(values.from);
                    let to = new Date(values.to);
                    arr.map((row) => {
                        const joining_date = new Date(row.joining_date);
                        if (joining_date >= from && joining_date <= to) {
                            arr1.push(row)
                        };
                    });
                    arr = arr1
                    arr1 = []
                }
                else if (values.ReportType === 2) {
                    let from = new Date(values.from);
                    let to = new Date(values.to);
                    arr.map((row) => {
                        const leaving_date = new Date(row.leaving_date);
                        if (leaving_date >= from && leaving_date <= to) {
                            arr1.push(row)
                        };
                    });
                    arr = arr1
                    arr1 = []
                }
                else if (values.ReportType === 5) {
                    let from = new Date(values.from);
                    let to = new Date(values.to);
                    arr.map((row) => {
                        const date_of_birth = new Date(row.date_of_birth);
                        if (date_of_birth >= from && date_of_birth <= to) {
                            arr1.push(row)
                        };
                    });
                    arr = arr1
                    arr1 = []
                }
                else if (values.ReportType === 4) {
                    let to = new Date(values.to);
                    arr.map((row) => {
                        let joining_date = new Date(row.joining_date);
                        let leaving_date = new Date(row.leaving_date);
                        if (!(joining_date >= to) && (leaving_date === null || (leaving_date >= to))) {
                            arr1.push(row)
                        };
                    });
                    arr = arr1
                    arr1 = []
                }
                else if (values.CustomReport === 23) {
                    var getSeniority = await ApiCallGet('/get_IR_promotions');
                    arr = getSeniority.data[0]
                }
                else if (values.CustomReport === 27) {
                    console.log(values)
                    var getDisabledEmp = await ApiCallPost('/get_disabled_employees',{disability_id : values.disability});
                    console.log(getDisabledEmp);
                    arr = getDisabledEmp.data[0]
                }
                else if (values.CustomReport == 25) {//Faculty(Dept) Wise Reporting ////
                    var getFacultyWiseReporting = await ApiCallPost('/get_Faculty_wise_employee', { cat_id: values.facType, emp_type: values.emp });
                    console.log('Faculty Wise Reporting Called, result is as: ', getFacultyWiseReporting)
                    arr = getFacultyWiseReporting.data
                }
                else if (values.CustomReport === 24) {

                    var getEmpAftrRet = await ApiCallGet('/get_emp_aftr_ret');
                    arr = getEmpAftrRet.data[0]

                }
                else if (values.CustomReport === 20) {
                    var getSeniority = await ApiCallPost('/get_seniority_list', { desig_id: values.desig });
                    arr = getSeniority.data[0]
                }
                else if (values.CustomReport === 21) {
                    // console.log(values.desig);
                    var getGrantScale = await ApiCallPost('/get_grant_scale', { desig_id: values.desig });
                    arr = getGrantScale.data[0]
                }
                else if (values.CustomReport === 22) {
                    var getGrantScale = await ApiCallPost('/get_grant_scale_after', { desig_id: values.desig });
                    arr = getGrantScale.data[0]
                }
                else if (values.degree) {
                    if (values.degree !== -1) {
                        {
                            arr.map((row) => {
                                if (row.deg_id === values.degree) {
                                    arr1.push(row)
                                }
                            })
                            arr = arr1
                            arr1 = []
                        }
                    }
                }
                else if (values.CustomReport === 12 && values.Leaving_status && values.to && values.from) {
                    if (values.Leaving_status === 1) {

                        arr.map((row) => {
                            if (row.leaving_date && new Date(row.leaving_date) >= new Date(values.from) && new Date(row.leaving_date) <= new Date(values.to) && row.leaving_status === 1) {
                                arr1.push(row)
                            }
                        })
                        arr = arr1
                        arr1 = []
                    }
                }


                // Filters of Selectors (Campus , Faculty, Employee type Gaz, Non-Gaz)


                if (values.facultyType !== 2) {
                    arr.map((row) => {
                        if (parseInt(row.is_teaching) === parseInt(values.facultyType)) {
                            arr1.push(row)
                        }
                    })
                    arr = arr1
                    arr1 = []
                }

                if (values?.campus_id !== 3) {
                    console.log(values.campus_id)
                    arr = arr.filter(row => parseInt(row.campus_id) === parseInt(values.campus_id))
                }
                if (values?.EmpType === 2) {
                    arr.map((row) => {
                        if ((row.scale_type === 1) || (row.scale_id === null && row.base_scale > 15)) {
                            arr1.push(row)
                        }
                    });
                    arr = arr1

                }
                else if (values?.EmpType === 3) {
                    arr.map((row) => {
                        if ((row.scale_type === 2) || (row.scale_id === null && row.base_scale <= 15)) {
                            arr1.push(row)
                        }
                    });
                    arr = arr1
                }

                setFilterData(arr);



                console.log('arr', arr)


            }
            catch {

            }
            setLoading(false);
        }

        fetchData();

    }, [values]);
    const options = {
        filtering: true,
        exportAllData: true,
        exportButton: {
            pdf: true,
            csv: true,
        }
    }


    const NullValues = () => {
        values.dept = null;
        values.jobNature = null;
        values.scale = null;
        values.desig = null;
        values.genderValue = null;
        values.facultyType = null;
        values.facType = null;
        values.religionID = null;
        values.martial = null;
        values.ReportType = null;
        values.to = null;
        values.from = null;
        values.degree = null;
    }


    return (
        <>
            <Card>
                <CardContent>
                    <Stack>
                        <Form onSubmit={handleSubmit}>

                            <Formheading label='All Reporting' />
                            <div className="row pl-3 pr-3 pt-0 pb-0">
                                <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="campus_id"
                                        label="Campus"
                                        value={values.campus_id}
                                        setValues={setValues}
                                        options={Campus}
                                        required
                                    />
                                </div>
                                {!(values.CustomReport >= 18 && values.CustomReport <= 24) ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="emp"
                                        label="Employee"
                                        value={values.emp}
                                        setValues={setValues}
                                        options={empOptions}
                                        required
                                    />
                                </div> : null}
                                <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="EmpType"
                                        label="Employee Type"
                                        value={values.EmpType}
                                        setValues={setValues}
                                        // change={filter}
                                        options={EmployeeType}
                                        required
                                    />
                                </div>
                                <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="facultyType"
                                        label="Select Faculty"
                                        value={values.facultyType}
                                        //       change={filter}
                                        setValues={setValues}
                                        options={faculty}
                                        required
                                    />
                                </div>
                                <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="CustomReport"
                                        label="Reporting Types"
                                        value={values.CustomReport}
                                        setValues={setValues}
                                        change={(e) => { NullValues(); setEnable(() => false) }
                                        }
                                        options={CustomReporting}
                                        required
                                    />
                                </div>
                                {values.CustomReport === 25 ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="facType"
                                        label="Select Faculty"
                                        value={values.facType}
                                        //       change={filter}
                                        setValues={setValues}
                                        options={deptCats}
                                        required
                                    />
                                </div> : null}
                                {values.CustomReport === 5 ? <div className={`${guidelines.inputclass}`}>

                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="dept"
                                        label="Department Wise"
                                        value={values.dept}
                                        setValues={setValues}
                                        // change={filter}
                                        options={departmentOptions}

                                        //options={[{id:-1, title:"All Departments", dept_code:"ALL"}]}
                                        required
                                    />
                                </div> : null}
                                {values.CustomReport === 6 ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="jobNature"
                                        label="Base Wise"
                                        value={values.jobNature}
                                        setValues={setValues}
                                        //       change={filter}
                                        options={jobNatureOptions}
                                        required
                                    />
                                </div> : null}

                                {values.CustomReport === 7 ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="scale"
                                        label="Scale Wise"
                                        value={values.scale}
                                        //       change={filter}
                                        setValues={setValues}
                                        options={empScaleOptions}
                                        required
                                    />
                                </div> : null}
                                {values.CustomReport === 8 || values.CustomReport === 20 || values.CustomReport === 21 || values.CustomReport === 22 ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="desig"
                                        label="Designation Wise"
                                        value={values.desig}
                                        //       change={filter}
                                        setValues={setValues}
                                        options={designationOptions}
                                        required
                                    />
                                </div> : null}
                                {values.CustomReport === 9 ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="martial"
                                        label="Marital Status"
                                        value={values.martial}
                                        setValues={setValues}
                                        options={maritalStatusOptions}
                                        required
                                    />
                                </div> : null}
                                {values.CustomReport === 27 ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="disability"
                                        label="disability"
                                        value={values.disability}
                                        setValues={setValues}
                                        options={disabilityOptions}
                                        required
                                    />
                                </div> : null}
                                {values.CustomReport === 10 ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="genderValue"
                                        label="Select Gender"
                                        value={values.genderValue}
                                        setValues={setValues}
                                        //       change={filter}
                                        options={gender}
                                        required
                                    />
                                </div> : null}
                                {values.CustomReport === 11 ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        name="religionID"
                                        label="Religion"
                                        //       change={filter}
                                        value={values.religionID}
                                        setValues={setValues}
                                        options={Religion}
                                        required
                                    />
                                </div> : null}
                                {values.CustomReport === 12 ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        name="Leaving_status"
                                        label="Leaving Status"
                                        options={LeavingStatusOptions}
                                        value={values.Leaving_status}
                                        change={() => setEnable(true)}
                                        setValues={setValues}
                                        required
                                    />
                                </div> : null}

                                {values.CustomReport === 13 ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="ReportType"
                                        label="Duration Wise Reporting"
                                        value={values.ReportType}
                                        change={() => setEnable(true)}
                                        setValues={setValues}
                                        options={ReportingType}
                                        required />
                                </div> : null}
                                {values.CustomReport === 15 ? <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Controls.Autocomplete
                                        name="degree"
                                        label="Degree"
                                        value={values.degree}
                                        setValues={setValues}
                                        options={degreetypes}
                                        required
                                    />
                                </div> : null}
                                {/* {values.CustomReport === 40 ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        fullWidth variant="standard"
                                        name="ReportType"
                                        label="Temporary Employees"
                                        value={values.ReportType}
                                        change={() => setEnable(true)}
                                        setValues={setValues}
                                        options={ReportingType}
                                        required />
                                </div> : null} */}

                                {/* {values.CustomReport === 20 ? <div className={`${guidelines.inputclass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Controls.Autocomplete
                                        name="seniority"
                                        label="Seniority"
                                        value={values.seniority}
                                        setValues={setValues}
                                        // options={degreetypes}
                                        required
                                    />
                                </div> : null} */}


                                {Enable ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                        label="From"
                                        name='from'
                                        value={values.from}
                                        onChange={handleChange}
                                        required
                                    />
                                </div> : null}
                                {Enable ? <div className={`${guidelines.inputclass}`}>
                                    <Controls.DatePicker variant='standard' fullWidth id="standard-basic"
                                        label="To"
                                        name='to'
                                        value={values.to}
                                        onChange={handleChange}
                                        required
                                    />
                                </div> : null}

                                <div className={`${guidelines.inputclass}`}>
                                    <Controls.Autocomplete
                                        variant="contained" color="primary"
                                        name="download"
                                        label="Select Download Type"
                                        value={values.download}
                                        setValues={setValues}
                                        options={DownloadTypes}
                                        required
                                    />
                                </div>
                                <div className={`${guidelines.inputclass}`} style={{ paddingTop: '3px' }}>

                                    <Button variant="contained" color="primary"
                                        size="large"
                                        type='submit'
                                    // onClick={() => { filter() }}
                                    >
                                        DOWNLOAD</Button>

                                </div>
                            </div>


                            <div className='col-12'>
                                <MatTable
                                    // actionsAtStart={true}
                                    title={"Employee Data"}
                                    columns={columns}
                                    data={filterData}
                                    bodyHeight="45vh"
                                    isLoading={loading || loadingB}
                                    Options={options}
                                />
                            </div>
                        </Form>
                    </Stack >
                </CardContent >
            </Card >
        </>

    );
}


export default AllReporting;