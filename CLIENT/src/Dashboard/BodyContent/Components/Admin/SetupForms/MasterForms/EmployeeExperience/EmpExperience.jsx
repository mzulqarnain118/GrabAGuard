import React from 'react';
import Exp_Institute_Type_Table from './Exp_Institute_Type_Table';
import Exp_Job_Type_Table from './Exp_Job_Type_Table';
import Exp_Post_Table from './Exp_Post_Table';


const EmpExperience = () => {


    return (<>
        <div className='container'>
            <Exp_Post_Table></Exp_Post_Table>
        </div>

        <div>
            <Exp_Job_Type_Table></Exp_Job_Type_Table>
        </div>

        <div>
            <Exp_Institute_Type_Table></Exp_Institute_Type_Table>
        </div>

    </>);
}

export default EmpExperience;