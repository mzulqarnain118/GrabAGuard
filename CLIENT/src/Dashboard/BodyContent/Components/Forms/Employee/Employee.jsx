import React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import EmployeeForm from './EmployeeForm';
// import Card from "../../../../../Modules/UiModules/Core/Card"
//import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import { Button, Container, Divider, Paper } from '@mui/material';
// import EmployeeWorkDetails from './EmployeeWorkDetails';
// import EmployeeDesignation from './EmployeeDesignation';
// import { multiStepContext } from './StepContext';
import StepContext from './StepContext';
import Stepper from './StepperComponent'
import EmployeeForm from './EmployeeForm'



// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }
const Employee = () => {
    return (
        <>
            <StepContext>
                <Stepper />
            </StepContext>
        </>
    )


}
export default Employee;