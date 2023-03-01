import React from 'react';
import DesigContext from './DesigContext';
import DesignationTable from './DesignationTable'
const DesignationParent = (props) => {

    return (<>
        <DesigContext id={props.id} setData={props.setData}>
            <DesignationTable />
        </DesigContext>
    </>);
}

export default DesignationParent;