
import React from 'react';
//import DesignationParent from './DesignationParent';
import DesignationTable from './DesignationTable';
const SanctionDasigContext = React.createContext();
const DesigContext = (props) => {
    const [userData, setUserData] = React.useState({});


    const submitAction = () => {

    }
    return (<>

        <SanctionDasigContext.Provider value={{ userData, setUserData, submitAction }}>
            <DesignationTable id={props.id} setData={props.setData} />
        </SanctionDasigContext.Provider>


    </>);
}
export {
    SanctionDasigContext
}
export default DesigContext;