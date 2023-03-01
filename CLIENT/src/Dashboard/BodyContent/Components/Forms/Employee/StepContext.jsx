import React, { useState } from 'react';
import StepperComponent from './StepperComponent';
import { ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';

const multiStepContext = React.createContext();
const StepContext = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const SubmitData = async () => {
        const CurdateFormated = currentDate => currentDate.getFullYear() + '-' + (parseInt(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();

        let formData = new FormData();

        formData.append("cnic", userData.DesignationData.cnic);
        formData.append("emp_id", userData.DesignationData.empid);
        formData.append("pasportno", userData.DesignationData.pasportno);
        formData.append("emp_name", userData.empname);
        formData.append("father_name", userData.fname);
        formData.append("spouse_name", userData.sname);
        formData.append("Image", userData.imageTaker);
        formData.append("Phone1", userData.phone1);
        formData.append("Phone2", userData.phone2);
        formData.append("email", userData.email);
        formData.append("present_address", userData.presentAdress);
        formData.append("permanent_addreess", userData.permanentAddress);
        formData.append("domicile", userData.selectorValues.domicile);
        formData.append("religion", userData.selectorValues.religion);
        formData.append("gender", userData.gender);
        formData.append("marital_status", userData.marital_status);
        formData.append("dob", CurdateFormated(new Date(userData.dob)));
        formData.append("area_special", userData.areaspecial);
        formData.append("nationality", userData.selectorValues.nationality);
        formData.append("Designation", JSON.stringify(userData.DesignationData));
        formData.append("Selection", JSON.stringify(userData.selection));
        formData.append("Qalification", JSON.stringify(userData.QualificationData));
        formData.append("PreviousExp", JSON.stringify(userData.PreviousExpData));
        formData.append("ProfessionalTrainings", JSON.stringify(userData.ProfessionalTrainingData));
        
        formData.append("disability", userData.disability);
        //
        console.log('Form data at the time of submission: ', userData);

        const result = await ApiCallPost('/employeee', formData);
        if (result.error) {
            Toast(result.text, "error");
        } else {
            setCurrentStep(4);
            setUserData([])
            Toast("Success", "sucess");
        }
    }
    return (
        <>
            <multiStepContext.Provider value={{ currentStep, setCurrentStep, userData, setUserData, finalData, setFinalData, SubmitData }}>
                <StepperComponent />
            </multiStepContext.Provider>
        </>
    );
}
export {
    multiStepContext
}
export default StepContext;