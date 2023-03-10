import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '../../../../../../Modules/UiModules/Core/Card'
import BoardUniversityTab from './BoardUniversityTab';
import DegreeTab from './DegreeTab';
import OrderType from './OrderType';
import FileType from './FileType';
import JobNature from './JobNature';
import LeaveType from './LeaveType';
import PackageType from './PackageType';
import ScaleType from './ScaleType';
import PayType from './PayType';
import Subjects from './Subject';
import DepartmentTabTable from './DepartmentTabTable';
import Designation from './Designation';
import StudyScheme from './StudyScheme';
import TrainingFieldOfStudy from './TrainingFieldOfStudy';
import TrainingInstitue from './TrainingInstitute';
import Country from './Country';
import EmpExperience from './EmployeeExperience/EmpExperience';
import TrainingCourses from './TrainingCourses';
import SubDepartmentTable from './SubDepartmentTable';
import ScaleTable from './ScaleTable';
import Religion from './Religion';
import MeritalStatus from './MaritalStatus'
import SelectionType from './SelectionType';
import LeavingStatus from './LeavingStatus';
import Nationality from './Nationality';
import Domicile from './Domicile';
import UploadFile from '../../../Files/UploadFile/UploadFile';
import FAQS from '../../../Files/UploadFile/FAQS';
import AboutApp from '../../../Files/UploadFile/AboutApp';
import TermsAndConditions from '../../../Files/UploadFile/TermsAndConditions';





function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            className=" h-100"
            style={{ width: '85%', overflow: 'auto' }}
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function MasterForms() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Card height="86vh">

            <Box
                sx={{ bgcolor: 'background.paper', display: 'flex', direction: 'column', width: '100%', height: '100% !important', overflow: 'auto' }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}

                    sx={{ borderRight: 1, borderColor: 'divider', height: '100%' }}
                >
                    <Tab label="About App" {...a11yProps(0)} />
                    <Tab label="Terms & Conditions" {...a11yProps(1)} />
                    <Tab label="Reports" {...a11yProps(2)} />
                    <Tab label="FAQs" {...a11yProps(3)} />
                    {/* <Tab label="job Nature" {...a11yProps(4)} />
                    <Tab label="Leave Type" {...a11yProps(5)} />
                    <Tab label="Package Type" {...a11yProps(6)} />
                    <Tab label="Scale Type" {...a11yProps(7)} />
                    <Tab label="Pay Type" {...a11yProps(8)} />
                    <Tab label="Subjects" {...a11yProps(9)} />
                    <Tab label="Training Course" {...a11yProps(10)} />
                    <Tab label="Training Field" {...a11yProps(11)} />
                    <Tab label="Training Institute" {...a11yProps(12)} />
                    <Tab label="Country Name" {...a11yProps(13)} />
                    <Tab label="Employee Experience" {...a11yProps(14)} />


                    <Tab label="Study Scheme" {...a11yProps(15)} />
                    <Tab label="Department" {...a11yProps(16)} />
                    <Tab label="Designation" {...a11yProps(17)} />
                    <Tab label="Religion" {...a11yProps(18)} />

                    <Tab label="Scale" {...a11yProps(19)} />
                    <Tab label="Merital Status" {...a11yProps(20)} />
                    <Tab label="Sub Department" {...a11yProps(21)} />
                    <Tab label="Selection Type" {...a11yProps(22)} />
                    <Tab label="Leaving Status" {...a11yProps(23)} />
                    <Tab label="Nationality" {...a11yProps(24)} />
                    <Tab label="Domicile" {...a11yProps(25)} /> */}

                </Tabs>
                 <TabPanel value={value} index={0} sx={{ width: '100% !important' }}>
                    <AboutApp/>
                </TabPanel>
                <TabPanel value={value} index={1} sx={{ width: '100% !important' }}>
                    <TermsAndConditions/>
                </TabPanel>
               


                <TabPanel value={value} index={2}>
                    <UploadFile/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <FAQS/>
                </TabPanel>
                {/* <TabPanel value={value} index={4}>
                    <JobNature></JobNature>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <LeaveType></LeaveType>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <PackageType></PackageType>
                </TabPanel>

                <TabPanel value={value} index={7}>
                    <ScaleType></ScaleType>
                </TabPanel>
                <TabPanel value={value} index={8}>
                    <PayType></PayType>
                </TabPanel>
                <TabPanel value={value} index={9}>
                    <Subjects></Subjects>
                </TabPanel>

                <TabPanel value={value} index={10}>
                    <TrainingCourses></TrainingCourses>
                </TabPanel>

                <TabPanel value={value} index={11}>
                    <TrainingFieldOfStudy></TrainingFieldOfStudy>
                </TabPanel>

                <TabPanel value={value} index={12}>
                    <TrainingInstitue></TrainingInstitue>
                </TabPanel>

                <TabPanel value={value} index={13}>
                    <Country></Country>
                </TabPanel>

                <TabPanel value={value} index={14}>
                    <EmpExperience></EmpExperience>
                </TabPanel>



                <TabPanel value={value} index={15}>
                    <StudyScheme></StudyScheme>
                </TabPanel>

                <TabPanel value={value} index={16} >

                    <DepartmentTabTable></DepartmentTabTable>
                </TabPanel>

                <TabPanel value={value} index={17}>
                    <Designation></Designation>
                </TabPanel>

                <TabPanel value={value} index={18}>
                    <Religion></Religion>
                </TabPanel>


                <TabPanel value={value} index={19}>
                    <ScaleTable></ScaleTable>
                </TabPanel>


                <TabPanel value={value} index={20}>
                    <MeritalStatus></MeritalStatus>
                </TabPanel>


                <TabPanel value={value} index={21}>
                    <SubDepartmentTable />
                </TabPanel>


                <TabPanel value={value} index={22}>
                    <SelectionType></SelectionType>
                </TabPanel>

                <TabPanel value={value} index={23}>
                    <LeavingStatus></LeavingStatus>
                </TabPanel>
                <TabPanel value={value} index={24}>
                    <Nationality></Nationality>
                </TabPanel>

                <TabPanel value={value} index={25}>
                    <Domicile></Domicile>
                </TabPanel> */}
            </Box>

        </Card>
    );
}


