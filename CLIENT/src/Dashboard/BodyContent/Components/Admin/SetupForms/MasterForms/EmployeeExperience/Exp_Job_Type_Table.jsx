import React, { useEffect, useState } from "react";
import { ApiCallGet, ApiCallPost } from "../../../../../../../Modules/CoreModules/ApiCall";
import MatTable from "../../../../../../../Modules/MaterialTable/MaterialTable"
import Popup from "../../../../../../../Modules/UiModules/Core/Popup";
import Toast from "../../../../../../../Modules/UiModules/Core/Toast/Toast";
import Exp_Job_Type from "./Exp_Job_Type";



const Exp_Job_Type_Table = (props) => {

    const [openPopup, setopenPopup] = useState(false);
    const [record, setrecord] = React.useState([]);
    const [updated, setUpdated] = useState(0);

    const [row, setRow] = useState({});

    const handlePopup = (value) => {
        setopenPopup(value);
        // setAddition(value);

    }

    const columns = [


        {
            title: "Experience Job Type",
            editable: () => true,
            field: "exp_job_type_desc",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Entered By",
            field: "emp_name",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: " Entery Time ",
            field: "entry_datetime",
            type: "date",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

    ]



    const options = {
        filtering: true,
        exportAllData: true,
        exportButton: {
            csv: true,
            pdf: true
        }
    }


    useEffect(() => {

        const fetchData = async () => {
            try {
                var result = await ApiCallGet('/getjobtype');
                console.log(result);
                setrecord(result.data);


            }
            catch {
                alert("error");

            }

        }
        fetchData();

    }, [updated]);





    const update = async (oldRow, newRow) => {

        let validate = true;
        if (newRow.exp_job_type_desc === '' || newRow.exp_job_type_desc === null || newRow.exp_job_type_desc === undefined) {
            validate = false;
            Toast("Job Type  Cannot be empty", "error");
        }

        if (validate === true) {

            const data = {
                exp_job_type_id: newRow.exp_job_type_id,
                exp_job_type_desc: newRow.exp_job_type_desc,

            }

            console.log(data);

            const result1 = await ApiCallPost('/Update_exp_Job_type', { ...data });
            if (result1.error) {
                Toast(result1.text, "error");
            } else {

                setUpdated(old => (old + 1));
                Toast('Data Updated Successfully!', 'success');
            }
        }
    };

    return (<>
        <Popup title='ADD Job Type' openPopup={openPopup} setOpenPopup={setopenPopup} style={{ width: '800px' }}>
            <div style={{ width: '800px%' }}>
                <Exp_Job_Type setUpdated={setUpdated} setOpenPopup={setopenPopup} />
            </div>

        </Popup>
        <MatTable title="Experience Job Type" columns={columns} style={{ margin: '1rem' }}

            data={record}
            onUpdate={update}
            actionsAtStart={true}
            Options={options}
            customAdd={() => { setopenPopup(true); }}
            onRowClick={(event, rowData) => {
                console.log(event.target, rowData);
                setRow(rowData);
            }} />
    </>);
}


export default Exp_Job_Type_Table;