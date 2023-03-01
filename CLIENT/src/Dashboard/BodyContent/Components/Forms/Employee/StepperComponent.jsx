import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EmployeeForm from './EmployeeForm';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Container, Paper } from '@mui/material';
import EmployeeWorkDetails from './EmployeeWorkDetails';
import { Done } from './EmployeeWorkDetails'
import EmployeeDesignation from './EmployeeDesignation';
import { multiStepContext } from './StepContext';
import EmployeeSelection from './EmployeeSelection';


const StepperComponent = () => {
    const { currentStep } = useContext(multiStepContext)


    const getSteps = () => {
        return [
            "Designation",
            "Selection Detail",
            "Personal Information",
            "Work Details",
            "Done",
        ];
    }
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <EmployeeDesignation />
            case 1:
                return <EmployeeSelection />
            case 2:
                return <EmployeeForm />

            case 3:
                return <EmployeeWorkDetails />
            case 4:
                return <Done />


            default:
                return "unknown step";
        }
    }
    const step = getSteps();

    return (

        <Container component={Box} p={4}>
            <Paper component={Box} p={3}>

                <div>
                    <Stepper alternativeLabel activeStep={currentStep}>
                        <Step>
                            <StepLabel >{step[0]}</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel >{step[1]}</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel >{step[2]}</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel >{step[3]}</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel >{step[4]}</StepLabel>
                        </Step>

                    </Stepper>

                    {currentStep === step.length ? (
                        <Typography variant="h3" align="center">
                            Thank You
                        </Typography>
                    ) : (
                        <>
                            <form>{getStepContent(currentStep)}</form>

                        </>
                    )}
                </div>
            </Paper>
        </Container>


        // <Card>


        //     {/* // <Box sx={{ width: '100%' }}>
        //     //     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        //     //         <Tabs selectionFollowsFocus value={value} onChange={handleChange} aria-label="basic tabs example">
        //     //             <Tab label="Designation" {...a11yProps(0)} />
        //     //             <Tab label="Personal Details" {...a11yProps(1)} />
        //     //             <Tab label="Work Details" {...a11yProps(2)} />
        //     //         </Tabs>
        //     //     </Box>
        //     //     {steps === 1 ? <TabPanel value={value} index={0}>
        //     //         <EmployeeDesignation designation={designationData} setDesignation={setDesignationData} steps={steps} setsteps={setsteps} />
        //     //     </TabPanel> : null}
        //     //     {steps === 2 ? <TabPanel value={value} index={1}>
        //     //         <EmployeeForm EmployeeFormData={EmployeeFormData} setEmployeeFormData={setEmployeeFormData} steps={steps} setsteps={setsteps} />
        //     //     </TabPanel> : null}
        //     //     {steps === 3 ? <TabPanel value={value} index={2}>
        //     //         <EmployeeWorkDetails WorkDetailData={WorkDetailData} setWorkDetailData={setWorkDetailData} steps={steps} setsteps={setsteps} />
        //     //     </TabPanel> : null}


        //     // </Box> */}
        //     <Box sx={{ width: '100%' }}>
        //         <Stepper activeStep={steps} alternativeLabel>
        //             {steps1.map((label) => (
        //                 <Step key={label}>
        //                     <StepLabel>{label}</StepLabel>
        //                 </Step>
        //             ))}
        //         </Stepper>
        //     </Box>

        //     {steps === 1 ? <EmployeeDesignation designation={designationData} setDesignation={setDesignationData} steps={steps} setsteps={setsteps} /> : null},
        //     {steps === 2 ? <EmployeeForm EmployeeFormData={EmployeeFormData} setEmployeeFormData={setEmployeeFormData} steps={steps} setsteps={setsteps} /> : null},
        //     {steps === 3 ? <EmployeeWorkDetails WorkDetailData={WorkDetailData} setWorkDetailData={setWorkDetailData} steps={steps} setsteps={setsteps} /> : null}

        // </Card>
    );
    // return (<>
    //     <StepContext>
    //         <Employee />
    //     </StepContext>
    // </>);
}

export default StepperComponent;